import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { isGradient } from '../../lib/assetLoader'
import styles from './Projects.module.css'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

/*
 * Frame shapes, cycled by position. Screenshots are all landscape, so
 * varying the frame (not cropping the screenshot) is what gives the
 * masonry columns their uneven heights.
 */
const FRAMES = [
  styles.frameTall,
  styles.frameWide,
  styles.frameSquare,
  styles.frameWide,
  styles.frameTall,
  styles.frameSquare,
]

/**
 * Masonry project card: the first screenshot sitting on a soft tinted
 * frame, then a plain-language headline and a grey context line (name,
 * award, event). Everything else lives in the modal the card opens.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { headline, context, tint, images } = project
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
      <div
        className={`${styles.frame} ${FRAMES[index % FRAMES.length]}`}
        style={{ background: isGradient(hero) ? hero : tint }}
      >
        {!isGradient(hero) && (
          <img className={styles.shot} src={hero} alt="" loading="lazy" />
        )}
      </div>

      <span className={styles.headline}>{headline}</span>
      <span className={styles.context}>{context}</span>
    </motion.button>
  )
}
