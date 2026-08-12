import { motion } from 'framer-motion'
import {
  type Experience,
  categoryLabels,
} from '../../data/experience'
import { MediaCarousel } from '../MediaCarousel/MediaCarousel'
import styles from './Experience.module.css'

interface ExperienceCardProps {
  experience: Experience
}

/**
 * Experience row laid out as a 3-column timeline:
 *
 *   [ timeline col ]   [ media col ]   [ body col ]
 *   start date              ●          eyebrow → role
 *   – end date            carousel     organization
 *   duration pill                      pitch / description / bullets
 *
 * A single continuous vertical line is rendered by `.grid::before`
 * in the parent — the dot on each row sits ON that line so all rows
 * read as a connected timeline. Mobile collapses to a single stacked
 * column with the date inlined above the media.
 */
export function ExperienceCard({ experience }: ExperienceCardProps) {
  const {
    category,
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

  // Split the pre-formatted range so start/end stack on two lines in
  // the narrow timeline column. Falls back to a single line if the
  // string isn't a true range (e.g. "5+ yrs").
  const [startDate, endDate] = dateRange.split(' – ')

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
      <div className={styles.storyTimeline}>
        <span className={styles.storyTimelineStart}>{startDate}</span>
        {endDate && (
          <span className={styles.storyTimelineEnd}>– {endDate}</span>
        )}
        <span className={styles.storyTimelineDur}>{duration}</span>
      </div>

      <div className={styles.storyMedia}>
        <MediaCarousel images={images} label={organization} />
      </div>

      <div className={styles.storyBody}>
        <p className={styles.storyEyebrow}>{categoryLabels[category]}</p>
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
