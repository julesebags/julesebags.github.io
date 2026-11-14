import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Experience } from '../../data/experience'
import { MediaCarousel } from '../MediaCarousel/MediaCarousel'
import { BrandMotion } from './BrandMotion'
import { isGradient } from '../../lib/assetLoader'
// Same panel layout as the project modal, so the two feel like one system.
import styles from '../Projects/ProjectModal.module.css'
import local from './Experience.module.css'

interface ExperienceModalProps {
  experience: Experience | null
  onClose: () => void
}

/**
 * Full details for one role: media on the left (real photos if there
 * are any, otherwise the role's motion graphic), and the description,
 * highlights, metrics and tags on the right. Closes on backdrop click,
 * the × button, or Escape; locks page scroll while open.
 */
export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  useEffect(() => {
    if (!experience) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [experience, onClose])

  const photos = experience?.images.filter((src) => !isGradient(src)) ?? []

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
          >
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close experience details"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className={styles.media}>
              {photos.length > 0 ? (
                <MediaCarousel images={photos} />
              ) : experience.motion ? (
                <div className={local.modalMotion}>
                  <BrandMotion kind={experience.motion} />
                </div>
              ) : (
                <MediaCarousel images={experience.images} />
              )}
            </div>

            <div className={styles.detail}>
              <div className={styles.detailTop}>
                <p className={styles.detailEyebrow}>
                  {experience.dateRange}
                  <span className={styles.detailEyebrowDot}>·</span>
                  {experience.duration}
                </p>
                <h2 id="experience-modal-title" className={styles.detailName}>
                  {experience.role}
                </h2>
                <p className={local.modalOrg}>{experience.organization}</p>

                {experience.tags && experience.tags.length > 0 && (
                  <div className={styles.techPills}>
                    {experience.tags.map((tag) => (
                      <span key={tag} className={styles.techPill}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <section className={styles.section}>
                <p className={styles.detailDescription}>
                  {experience.description}
                </p>
              </section>

              {experience.metrics && experience.metrics.length > 0 && (
                <section className={local.modalMetrics}>
                  {experience.metrics.map((m) => (
                    <div key={m.label} className={local.modalMetric}>
                      <span className={local.modalMetricVal}>{m.val}</span>
                      <span className={local.modalMetricLabel}>{m.label}</span>
                    </div>
                  ))}
                </section>
              )}

              <section className={styles.section}>
                <p className={styles.detailMetaLabel}>Highlights</p>
                <ul className={styles.featureList}>
                  {experience.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>

              {experience.link && (
                <a
                  className={local.modalLink}
                  href={experience.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {experience.link.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
