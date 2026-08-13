import { motion } from 'framer-motion'
import styles from './Skills.module.css'

interface SkillGroup {
  label: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      'Python',
      'C++',
      'Java',
      'JavaScript',
      'TypeScript',
      'Swift',
      'SQL',
      'HTML/CSS',
    ],
  },
  {
    label: 'Frameworks / Technologies',
    items: [
      'React',
      'FastAPI',
      'Spring Boot',
      'AWS',
      'PostgreSQL',
      'MongoDB',
      'Git',
      'Docker',
      'Kubernetes',
    ],
  },
  {
    // Grounded in the Workday usability audit, PVS client reviews /
    // user flows, Tailor UX decisions, and Figma on the dashboard work.
    label: 'Product / Design',
    items: [
      'UI/UX',
      'User Research',
      'Usability Testing',
      'User Flows',
      'Prototyping',
      'Figma',
      'Requirements Gathering',
    ],
  },
]

/**
 * Skills section. Languages and frameworks come from the resume;
 * Product / Design reflects work already detailed elsewhere on the site.
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
          Languages, frameworks, and the product/design skills I use to
          ship things people can actually use.
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
