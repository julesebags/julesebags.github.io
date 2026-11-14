import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { galleryItems, type GalleryItem } from '../../data/gallery'
import { isImagePath } from '../../lib/assetLoader'
import { PinGrid } from './PinGrid'
import styles from './CreativeGallery.module.css'

/** The group a pin belongs to: the part of `meta` before the "·". */
function group(item: GalleryItem): string {
  return item.meta.split('·')[0].trim().toLowerCase()
}

/**
 * Everything except `item`, most related first: same group (e.g. all
 * Tinikling pins) ranks above same category, which ranks above the rest.
 * Ties keep the gallery's own order.
 */
function moreLikeThis(item: GalleryItem): GalleryItem[] {
  const score = (other: GalleryItem) =>
    (group(other) === group(item) ? 2 : 0) +
    (other.category === item.category ? 1 : 0)
  return galleryItems
    .filter((other) => other.id !== item.id)
    .map((other, i) => ({ other, i, s: score(other) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map(({ other }) => other)
}

interface PinCloseupProps {
  item: GalleryItem | null
  onOpen: (item: GalleryItem) => void
  onClose: () => void
}

/**
 * Full-screen close-up for one pin: the photo large on the left, its
 * details on the right, and a "More like this" wall underneath. Picking
 * a pin from that wall swaps the close-up to it. Closes with the back
 * arrow or Escape; page scroll is locked while it's open.
 */
export function PinCloseup({ item, onOpen, onClose }: PinCloseupProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const related = useMemo(() => (item ? moreLikeThis(item) : []), [item])

  useEffect(() => {
    if (!item) return
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
  }, [item, onClose])

  // Jump back to the top whenever a different pin is shown.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [item])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={scrollRef}
          className={styles.closeupPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pin-closeup-title"
        >
          <motion.article
            key={item.id}
            className={styles.closeup}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <button
              type="button"
              className={styles.closeupBack}
              onClick={onClose}
              aria-label="Back to gallery"
            >
              <ArrowLeft size={22} strokeWidth={2} />
            </button>

            <div className={styles.closeupMedia}>
              {isImagePath(item.image) ? (
                <img
                  className={styles.closeupImage}
                  src={item.image}
                  alt={item.title}
                />
              ) : (
                <div
                  className={styles.closeupPlaceholder}
                  style={{ background: item.image }}
                />
              )}
            </div>

            <div className={styles.closeupDetail}>
              <span className={styles.closeupCategory}>{item.category}</span>
              <h2 id="pin-closeup-title" className={styles.closeupTitle}>
                {item.title}
              </h2>
              <p className={styles.closeupMeta}>{item.meta}</p>
              <p className={styles.closeupHeading}>Description</p>
              <p className={styles.closeupDescription}>{item.description}</p>
            </div>
          </motion.article>

          <section className={styles.moreLikeThis}>
            <h3 className={styles.moreLikeThisTitle}>More like this</h3>
            <PinGrid items={related} onOpen={onOpen} />
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
