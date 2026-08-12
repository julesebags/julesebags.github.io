import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
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
 * Minimal product tile. Default state shows: representative image, name,
 * pitch, and a single key highlight (or, fallback, a row of tag pills).
 * The whole card is a button — clicking opens the focused modal.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { name, pitch, highlight, tags, tech, images } = project
  const hero = images[0] ?? ''
  const heroIsGradient = isGradient(hero)
  // Pills are only used when no `highlight` is provided. Prefer
  // semantic tags, fall back to tech names so legacy projects still
  // render something useful.
  const cardPills =
    tags && tags.length > 0
      ? tags
      : tech.map((t) => (typeof t === 'string' ? t : t.name))

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
        <span className={styles.viewHint}>
          View <ArrowUpRight size={12} strokeWidth={2} />
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.pitch}>{pitch}</p>
        {highlight ? (
          <span className={styles.highlight}>{highlight}</span>
        ) : (
          <div className={styles.tags}>
            {cardPills.map((label) => (
              <span key={label} className={styles.tag}>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  )
}
