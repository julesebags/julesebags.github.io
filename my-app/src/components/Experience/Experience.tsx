import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  experiences,
  type ExperienceCategory,
} from '../../data/experience'
import { FilterTabs } from './FilterTabs'
import { ExperienceCard } from './ExperienceCard'
import styles from './Experience.module.css'

export function Experience() {
  const [active, setActive] = useState<ExperienceCategory>('professional')

  const filtered = useMemo(
    () => experiences.filter((e) => e.category === active),
    [active],
  )

  return (
    <section id="experience" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Experience</p>
        <h2 className={styles.title}>
          A few <span className={styles.titleAccent}>chapters</span>.
        </h2>
      </header>

      <LayoutGroup>
        <FilterTabs active={active} onChange={setActive} />
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </section>
  )
}
