import { motion } from 'framer-motion'
import { type Experience } from '../../data/experience'
import { MediaCarousel } from '../MediaCarousel/MediaCarousel'
import styles from './Experience.module.css'

interface ExperienceCardProps {
  experience: Experience
}

/**
 * Experience row: media on the left, everything written on the right.
 *
 *   [ media col ]   [ body col ]
 *     carousel      dates · duration
 *                   role / organization
 *                   pitch / description / bullets / metrics
 *
 * Mobile stacks the two columns. The per-role accent is exposed as
 * `--story-color` on the article; the bullets, metrics, and link all
 * read it.
 */
export function ExperienceCard({ experience }: ExperienceCardProps) {
  const {
    role,
    organization,
    dateRange,
    duration,
    pitch,
    description,
    bullets,
    tags,
    metrics,
    link,
    images,
    color,
  } = experience

  return (
    <motion.article
      layout
      className={styles.story}
      style={{ ['--story-color' as string]: color }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className={styles.storyMedia}>
        <MediaCarousel images={images} label={organization} />
      </div>

      <div className={styles.storyBody}>
        <p className={styles.storyMeta}>
          <span>{dateRange}</span>
          <span className={styles.storyMetaDot} aria-hidden="true">
            ·
          </span>
          <span>{duration}</span>
        </p>

        <h3 className={styles.storyRole}>{role}</h3>
        <p className={styles.storyOrg}>{organization}</p>

        <p className={styles.storyPitch}>{pitch}</p>
        <p className={styles.storyDescription}>{description}</p>

        <ul className={styles.storyBullets}>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        {metrics && metrics.length > 0 && (
          <div className={styles.storyMetrics}>
            {metrics.map((m) => (
              <div className={styles.storyMetric} key={m.label}>
                <span className={styles.storyMetricVal}>{m.val}</span>
                <span className={styles.storyMetricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.storyTags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.storyTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {link && (
          <a
            className={styles.storyLink}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{link.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </motion.article>
  )
}
