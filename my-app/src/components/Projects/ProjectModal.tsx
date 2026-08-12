import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GithubIcon } from '../icons/BrandIcons'
import type { Project } from '../../data/projects'
import { ImageCarousel } from './ImageCarousel'
import styles from './ProjectModal.module.css'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

/**
 * Focused detail view for a single project. Two-pane layout on desktop
 * (carousel left, copy right), stacked on mobile. Backdrop blurs the
 * page behind it. Closes on:
 *   - clicking the backdrop
 *   - clicking the × button
 *   - pressing Escape
 *
 * Body scroll is locked while the modal is open.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Body scroll lock + Escape-to-close, but only while open.
  useEffect(() => {
    if (!project) return
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
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
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
            // Stop clicks inside the panel from bubbling up to the backdrop
            // (which would otherwise close the modal).
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className={styles.media}>
              <ImageCarousel
                images={project.images}
                resetKey={project.name}
                altLabel={project.name}
              />
            </div>

            <div className={styles.detail}>
              <div className={styles.detailTop}>
                <div className={styles.detailHeaderRow}>
                  <p className={styles.detailEyebrow}>
                    Project
                    {project.date && (
                      <>
                        <span className={styles.detailEyebrowDot}>·</span>
                        {project.date}
                      </>
                    )}
                  </p>
                  <a
                    className={styles.repoLinkTop}
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on GitHub (opens in new tab)`}
                    title="View on GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
                <h2 id="project-modal-title" className={styles.detailName}>
                  {project.name}
                </h2>

                {/* Tech stack — names only, in a single row of pills,
                    sitting directly under the title. No box, no role
                    descriptions; supplementary info that should read
                    quickly. */}
                <div className={styles.techPills}>
                  {project.tech.map((t) => {
                    const name = typeof t === 'string' ? t : t.name
                    return (
                      <span key={name} className={styles.techPill}>
                        {name}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Story — single persistent panel, multi-paragraph,
                  visible all at once (no carousel, no next/prev). */}
              <section className={styles.section}>
                {project.story && project.story.length > 0 ? (
                  project.story.map((para, i) => (
                    <p key={i} className={styles.detailDescription}>
                      {para}
                    </p>
                  ))
                ) : (
                  <p className={styles.detailDescription}>
                    {project.description}
                  </p>
                )}
              </section>

              {project.features && project.features.length > 0 && (
                <section className={styles.section}>
                  <p className={styles.detailMetaLabel}>Key features</p>
                  <ul className={styles.featureList}>
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </section>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
