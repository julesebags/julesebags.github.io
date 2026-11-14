import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { isGradient } from '../../lib/assetLoader'
import styles from './Projects.module.css'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
}

/**
 * Project card: the first screenshot as-is (its own shape, no frame),
 * then a plain-language headline and a grey context line (name, award,
 * event, or "Concept"). Everything else lives in the modal it opens.
 */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { headline, context, images } = project
  const hero = images[0] ?? ''

  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      aria-label={`Open ${project.name} details`}
    >
      <div className={styles.media}>
        {isGradient(hero) ? (
          <div className={styles.placeholder} style={{ background: hero }} />
        ) : (
          <img className={styles.shot} src={hero} alt="" loading="lazy" />
        )}
      </div>

      <span className={styles.headline}>{headline}</span>
      <span className={styles.context}>{context}</span>
    </motion.button>
  )
}
