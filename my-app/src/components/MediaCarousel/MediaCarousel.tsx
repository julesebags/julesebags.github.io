import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './MediaCarousel.module.css'

interface MediaCarouselProps {
  /**
   * Array of CSS gradient strings OR image paths/URLs. The component
   * auto-detects format: anything starting with `/`, `.`, `http`, or
   * `data:` is treated as an image; everything else is rendered as
   * a CSS gradient `background-image`.
   */
  images: string[]
  /** Optional small label rendered top-left of the slide. */
  label?: string
  /** Background gradient shown if the slide list is empty. */
  fallback?: string
}

function isImagePath(s: string): boolean {
  return (
    s.startsWith('/') ||
    s.startsWith('.') ||
    s.startsWith('http') ||
    s.startsWith('data:')
  )
}

/**
 * Cross-fading media carousel. Hover surfaces prev/next arrows and a
 * dot row at the bottom; clicking dots jumps directly to a slide.
 */
export function MediaCarousel({ images, label, fallback }: MediaCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = images.length || 1
  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total)
  }

  const current = images[index] ?? fallback ?? ''
  const slideStyle = isImagePath(current)
    ? {
        backgroundImage: `url(${current})`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
      }
    : { backgroundImage: current }

  return (
    <div
      className={styles.carousel}
      style={{ ['--carousel-grad' as string]: fallback ?? current }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.slide}
          style={slideStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        />
      </AnimatePresence>

      {label && <span className={styles.label}>{label}</span>}

      {total > 1 && (
        <>
          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => go(1)}
              aria-label="Next image"
            >
              ›
            </button>
          </div>

          <div className={styles.dots} role="tablist">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
