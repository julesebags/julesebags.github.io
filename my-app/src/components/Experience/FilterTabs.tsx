import { motion } from 'framer-motion'
import {
  categoryLabels,
  type ExperienceCategory,
} from '../../data/experience'
import styles from './Experience.module.css'

const ORDER: ExperienceCategory[] = [
  'professional',
  'leadership',
  'creative',
  'entrepreneurship',
]

interface FilterTabsProps {
  active: ExperienceCategory
  onChange: (next: ExperienceCategory) => void
}

/**
 * Pill-style filter tabs. The active "pill" background uses Framer Motion's
 * shared `layoutId` so it slides smoothly between tabs instead of fading in
 * place — small touch, big perceived quality.
 */
export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Experience filter">
      {ORDER.map((cat) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => onChange(cat)}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className={styles.tabPill}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={styles.tabLabel}>{categoryLabels[cat]}</span>
          </button>
        )
      })}
    </div>
  )
}
