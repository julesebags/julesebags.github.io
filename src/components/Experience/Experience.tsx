import { useState } from 'react'
import {
  experiences,
  type Experience as ExperienceItem,
  type ExperienceCategory,
} from '../../data/experience'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceModal } from './ExperienceModal'
import styles from './Experience.module.css'

interface ExperienceProps {
  /** Section anchor (the navbar scrolls to it). */
  id: string
  /** Section name, announced by screen readers (not shown). */
  label: string
  /** Which experience categories this section shows. */
  categories: ExperienceCategory[]
}

/**
 * Experience tiles in two columns, masonry-style: tiles alternate left,
 * right, left… so the first two start level at the top and each column
 * packs tightly whatever the tile heights. On phones the columns
 * dissolve into one list in the original order (see the CSS `order`).
 */
export function Experience({ id, label, categories }: ExperienceProps) {
  const [selected, setSelected] = useState<ExperienceItem | null>(null)
  const items = experiences.filter((e) => categories.includes(e.category))
  const columns = [
    items.map((exp, i) => ({ exp, i })).filter(({ i }) => i % 2 === 0),
    items.map((exp, i) => ({ exp, i })).filter(({ i }) => i % 2 === 1),
  ]

  return (
    <section id={id} className={styles.section}>
      <h2 className="sr-only">{label}</h2>

      <div className={styles.grid}>
        {columns.map((column, c) => (
          <div key={c} className={styles.column}>
            {column.map(({ exp, i }) => (
              <div key={exp.id} style={{ order: i }}>
                <ExperienceCard experience={exp} onOpen={setSelected} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <ExperienceModal experience={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
