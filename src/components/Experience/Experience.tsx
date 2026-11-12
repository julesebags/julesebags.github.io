import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  experiences,
  type Experience as ExperienceItem,
  type ExperienceCategory,
} from '../../data/experience'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import { FilterTabs } from './FilterTabs'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceModal } from './ExperienceModal'
import styles from './Experience.module.css'

export function Experience() {
  const [active, setActive] = useState<ExperienceCategory>('professional')
  const [selected, setSelected] = useState<ExperienceItem | null>(null)

  const filtered = useMemo(
    () => experiences.filter((e) => e.category === active),
    [active],
  )

  return (
    <section id="experience" className={styles.section}>
      <SectionLabel index="002" label="Experience" />

      <LayoutGroup>
        <FilterTabs active={active} onChange={setActive} />
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={i}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
      <ExperienceModal experience={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
