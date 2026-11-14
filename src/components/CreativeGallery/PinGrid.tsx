import type { GalleryItem } from '../../data/gallery'
import { isImagePath } from '../../lib/assetLoader'
import styles from './CreativeGallery.module.css'

const aspectClass: Record<NonNullable<GalleryItem['aspect']>, string> = {
  portrait: styles.aspectPortrait,
  tall: styles.aspectTall,
  extraTall: styles.aspectExtraTall,
  square: styles.aspectSquare,
  landscape: styles.aspectLandscape,
}

/*
 * Most photos are landscape, which makes a wall of them look like a
 * uniform grid. Items without their own `aspect` cycle through this mix
 * so the columns get uneven, staggered heights; photos are cropped to
 * fit (object-fit: cover).
 */
const ASPECT_CYCLE: NonNullable<GalleryItem['aspect']>[] = [
  'tall',
  'square',
  'extraTall',
  'portrait',
  'landscape',
]

/** Photo (or gradient placeholder) filling its box. */
export function PinImage({ item }: { item: GalleryItem }) {
  return isImagePath(item.image) ? (
    <img className={styles.pinImage} src={item.image} alt="" loading="lazy" />
  ) : (
    <div className={styles.pinImage} style={{ background: item.image }} />
  )
}

interface PinGridProps {
  items: GalleryItem[]
  onOpen: (item: GalleryItem) => void
}

/**
 * Masonry wall of pins: a rounded photo with the title and meta
 * underneath. Hovering darkens the photo and shows the category and
 * description; clicking opens the pin's close-up.
 */
export function PinGrid({ items, onOpen }: PinGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <button
          key={item.id}
          type="button"
          className={styles.pin}
          onClick={() => onOpen(item)}
          aria-label={`Open ${item.title}`}
        >
          <div
            className={`${styles.pinMedia} ${
              aspectClass[item.aspect ?? ASPECT_CYCLE[i % ASPECT_CYCLE.length]]
            }`}
          >
            <PinImage item={item} />
            <div className={styles.pinOverlay}>
              <span className={styles.pinCategory}>{item.category}</span>
              <p className={styles.pinDescription}>{item.description}</p>
            </div>
          </div>
          <span className={styles.pinCaption}>
            <span className={styles.pinTitle}>{item.title}</span>
            <span className={styles.pinMeta}>{item.meta}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
