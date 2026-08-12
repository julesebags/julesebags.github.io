import { motion } from 'framer-motion'
import styles from './Skills.module.css'

interface SkillGroup {
  label: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Framer Motion', 'CSS Modules', 'Tailwind'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Firebase', 'WebSockets'],
  },
  {
    label: 'AI / Data',
    items: ['OpenAI APIs', 'Computer Vision', 'pandas', 'NumPy', 'LangChain'],
  },
  {
    label: 'Tooling',
    items: ['Git', 'Docker', 'GitHub Actions', 'Vercel', 'Figma', 'Linux'],
  },
]

/**
 * Skills section — five grouped pill clusters that scan in a single
 * glance. Languages first because that's what recruiters search.
 */
export function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Skills</p>
        <h2 className={styles.title}>
          Tools I <span className={styles.titleAccent}>build</span> with.
        </h2>
        <p className={styles.lede}>
          Languages, frameworks, and platforms I reach for most. Sorted by
          category, not by years — what matters is what ships.
        </p>
      </header>

      <div className={styles.grid}>
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            className={styles.group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <p className={styles.groupLabel}>{group.label}</p>
            <div className={styles.list}>
              {group.items.map((item) => (
                <span key={item} className={styles.pill}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
