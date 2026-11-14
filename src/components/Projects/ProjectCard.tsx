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
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(project)}
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
    </button>
  )
}
