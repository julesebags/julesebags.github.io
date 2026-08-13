import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import styles from './Projects.module.css'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

function isGradient(image: string): boolean {
  return /^(linear|radial|conic)-gradient\(/.test(image.trim())
}

/**
 * Image-forward product tile: just the hero image, the name, and the
 * pitch. Everything else — highlights, tags, tech, links — lives in the
 * modal, which the whole card opens.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { name, pitch, highlight, images } = project
  const hero = images[0] ?? ''
  const heroIsGradient = isGradient(hero)

  return (
    <motion.button
      type="button"
      className={styles.card}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      aria-label={`Open ${name} details`}
    >
      <div className={styles.imageWrap}>
        {heroIsGradient ? (
          <div className={styles.image} style={{ background: hero }} />
        ) : (
          <img
            className={styles.imageEl}
            src={hero}
            alt={`${name} preview`}
            loading="lazy"
          />
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.pitch}>{pitch}</p>
        {highlight && <span className={styles.highlight}>{highlight}</span>}
      </div>
    </motion.button>
  )
}
