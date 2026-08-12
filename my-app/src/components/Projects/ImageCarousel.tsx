import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ImageCarousel.module.css'

/**
 * Variants for the slide transition. `custom` is the direction (+1 or -1)
 * — Framer Motion runs each variant function with that value so the new
 * slide enters from the correct side.
 */
const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
  }),
}

interface ImageCarouselProps {
  images: string[]
  /** Resets the active index when this changes (e.g. switching projects). */
  resetKey?: string | number
  altLabel: string
}

function isGradient(s: string): boolean {
  return /^(linear|radial|conic)-gradient\(/.test(s.trim())
}

/**
 * Image carousel for the project modal. Supports:
 *  - arrow navigation (buttons)
 *  - thumbnail navigation (strip below the stage)
 *  - keyboard navigation (← / →)
 *  - touch + mouse swipe (Framer Motion drag, snap on release)
 *
 * Renders an `<img>` for real images and a gradient `<div>` for
 * placeholder gradients — same auto-detect pattern used by the card.
 */
export function ImageCarousel({ images, resetKey, altLabel }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  // Direction is +1 when advancing, -1 when going back. Used by the
  // slide-in animation so the new image enters from the correct side.
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    setIndex(0)
    setDirection(1)
  }, [resetKey])

  const total = images.length
  const goTo = (next: number) => {
    if (next === index) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }
  const goPrev = () => goTo((index - 1 + total) % total)
  const goNext = () => goTo((index + 1) % total)

  // Keyboard navigation while the carousel (or its modal) is mounted.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total])

  const current = images[index]

  return (
    <div className={styles.carousel}>
      <div className={styles.stage}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            className={styles.slideWrap}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {isGradient(current) ? (
              <div
                className={styles.slideGradient}
                style={{ background: current }}
                role="img"
                aria-label={`${altLabel} — image ${index + 1}`}
              />
            ) : (
              <img
                className={styles.slide}
                src={current}
                alt={`${altLabel} — image ${index + 1}`}
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Drag layer — full-stage motion div that captures swipes. */}
        <motion.div
          className={styles.dragLayer}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            const { offset, velocity } = info
            // Swipe threshold: meaningful displacement OR fast flick.
            const threshold = 80
            if (offset.x < -threshold || velocity.x < -500) goNext()
            else if (offset.x > threshold || velocity.x > 500) goPrev()
          }}
        />

        <span className={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className={styles.thumbs} role="tablist" aria-label="Image thumbnails">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show image ${i + 1}`}
              className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
              onClick={() => goTo(i)}
            >
              {isGradient(img) ? (
                <div className={styles.thumbImage} style={{ background: img }} />
              ) : (
                <img className={styles.thumbImage} src={img} alt="" loading="lazy" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
