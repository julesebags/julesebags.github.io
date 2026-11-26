import { type Experience } from '../../data/experience'
import { getImageSize, isGradient, isVideoSrc } from '../../lib/assetLoader'
import { BrandMotion } from './BrandMotion'
import styles from './Experience.module.css'

interface ExperienceCardProps {
  experience: Experience
  onOpen: (experience: Experience) => void
}

/**
 * Compact experience tile: the picture at its own shape (heights vary),
 * then company and dates on one line, the role, and a one-line summary.
 * Everything else lives in the modal the tile opens.
 */
export function ExperienceCard({ experience, onOpen }: ExperienceCardProps) {
  const {
    role,
    organization,
    company,
    summary,
    pitch,
    dateRange,
    images,
    motion: motionKind,
  } = experience
  const hero = images.find((src) => !isVideoSrc(src)) ?? images[0] ?? ''

  return (
    <button
      type="button"
      className={styles.tile}
      onClick={() => onOpen(experience)}
      aria-label={`Open ${role} at ${organization} details`}
    >
      <div className={styles.tileMedia}>
        {motionKind ? (
          <BrandMotion kind={motionKind} />
        ) : isGradient(hero) ? (
          <div className={styles.tilePlaceholder} style={{ background: hero }} />
        ) : (
          /* width/height reserve the picture's space before it loads,
           * so the tiles below don't jump when it arrives. */
          <img
            className={styles.tileImage}
            src={hero}
            alt=""
            decoding="async"
            {...getImageSize(hero)}
          />
        )}
      </div>

      <div className={styles.tileBody}>
        <p className={styles.tileHead}>
          <span className={styles.tileCompany}>{company ?? organization}</span>
          <span className={styles.tileDates}>{dateRange}</span>
        </p>
        <h3 className={styles.tileRole}>{role}</h3>
        <p className={styles.tileSummary}>{summary ?? pitch}</p>
      </div>
    </button>
  )
}
