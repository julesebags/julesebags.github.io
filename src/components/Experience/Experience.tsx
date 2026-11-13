import { useState } from 'react'
import {
  experiences,
  type Experience as ExperienceItem,
  type ExperienceCategory,
} from '../../data/experience'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceModal } from './ExperienceModal'
import styles from './Experience.module.css'

interface ExperienceProps {
  /** Section anchor (the navbar scrolls to it). */
  id: string
  /** Zero-padded ordinal for the section label, e.g. "001". */
  index: string
  label: string
  /** Which experience categories this section shows. */
  categories: ExperienceCategory[]
  /** Show each tile's category above its dates (useful when mixed). */
  showCategory?: boolean
}

/**
 * A staggered grid of experience tiles; each opens the details modal.
 * Used twice: once for professional roles (right after the hero) and
 * once for leadership, creative and entrepreneurship.
 */
export function Experience({
  id,
  index,
  label,
  categories,
  showCategory = false,
}: ExperienceProps) {
  const [selected, setSelected] = useState<ExperienceItem | null>(null)
  const items = experiences.filter((e) => categories.includes(e.category))

  return (
    <section id={id} className={styles.section}>
      <SectionLabel index={index} label={label} />

      <div className={styles.grid}>
        {items.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            experience={exp}
            index={i}
            onOpen={setSelected}
            showCategory={showCategory}
          />
        ))}
      </div>
      <ExperienceModal experience={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
