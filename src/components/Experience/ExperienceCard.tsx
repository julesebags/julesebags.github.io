import { motion } from 'framer-motion'
import { type Experience } from '../../data/experience'
import { isGradient, isVideoSrc } from '../../lib/assetLoader'
import { BrandMotion } from './BrandMotion'
import styles from './Experience.module.css'

interface ExperienceCardProps {
  experience: Experience
  index: number
  onOpen: (experience: Experience) => void
}

/**
 * Compact experience tile: picture, role, organization, dates and the
 * one-line pitch. Everything else (description, bullets, metrics, more
 * photos) lives in the modal the whole tile opens, like Projects.
 */
export function ExperienceCard({
  experience,
  index,
  onOpen,
}: ExperienceCardProps) {
  const {
    role,
    organization,
    dateRange,
    pitch,
    images,
    motion: motionKind,
  } = experience
  const hero = images.find((src) => !isVideoSrc(src)) ?? images[0] ?? ''

  return (
    // The animated wrapper owns `transform` for the enter/exit motion, so
    // the stagger offset (also a transform) goes on the button inside.
    <motion.div
      layout
      className={styles.cell}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <button
        type="button"
        className={styles.tile}
        onClick={() => onOpen(experience)}
        aria-label={`Open ${role} at ${organization} details`}
      >
        {/* The Mastercard Lottie is 16:9, so its tile keeps that shape
         * instead of the usual 16:10 to show the whole animation. */}
        <div
          className={styles.tileImageWrap}
          style={motionKind === 'mastercard' ? { aspectRatio: '16 / 9' } : undefined}
        >
          {motionKind ? (
            <BrandMotion kind={motionKind} />
          ) : isGradient(hero) ? (
            <div className={styles.tileImage} style={{ background: hero }} />
          ) : (
            <img className={styles.tileImage} src={hero} alt="" loading="lazy" />
          )}
        </div>

        <div className={styles.tileBody}>
          <p className={styles.tileMeta}>{dateRange}</p>
          <h3 className={styles.tileRole}>{role}</h3>
          <p className={styles.tileOrg}>{organization}</p>
          <p className={styles.tilePitch}>{pitch}</p>
        </div>
      </button>
    </motion.div>
  )
}
