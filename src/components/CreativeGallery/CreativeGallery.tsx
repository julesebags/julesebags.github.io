import { useMemo, useState } from 'react'
import {
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from '../../data/gallery'
import styles from './CreativeGallery.module.css'

const FILTERS: Array<{ id: GalleryCategory | 'All'; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'Performance', label: 'Performance' },
  { id: 'Choreography', label: 'Choreography' },
  { id: 'Community', label: 'Community' },
  { id: 'Jewelry', label: 'Juliery Box' },
]

function isImagePath(s: string): boolean {
  return (
    s.startsWith('/') ||
    s.startsWith('.') ||
    s.startsWith('http') ||
    s.startsWith('data:')
  )
}

function tileBackground(image: string): string {
  return isImagePath(image) ? `url(${image})` : image
}

interface PinProps {
  item: GalleryItem
  index: number
}

const aspectClass: Record<NonNullable<GalleryItem['aspect']>, string> = {
  portrait: styles.aspectPortrait,
  tall: styles.aspectTall,
  extraTall: styles.aspectExtraTall,
  square: styles.aspectSquare,
  landscape: styles.aspectLandscape,
}

/*
 * Most photos are landscape, which makes the wall look like a uniform
 * grid. Items without their own `aspect` cycle through this mix so the
 * columns get Pinterest's uneven, staggered heights; photos are cropped
 * to fit (object-fit: cover).
 */
const ASPECT_CYCLE: NonNullable<GalleryItem['aspect']>[] = [
  'tall',
  'square',
  'extraTall',
  'portrait',
  'landscape',
]

/**
 * One "pin": a rounded photo with the title and meta underneath, like
 * a Pinterest card. Hovering darkens the photo and reveals the
 * one-sentence description on top of it.
 */
function Pin({ item, index }: PinProps) {
  const hasImage = isImagePath(item.image)
  const aspect = aspectClass[item.aspect ?? ASPECT_CYCLE[index % ASPECT_CYCLE.length]]

  return (
    <article
      className={styles.pin}
      tabIndex={0}
      aria-label={`${item.title} — ${item.meta}`}
    >
      <div
        className={`${styles.pinMedia} ${aspect}`}
        style={
          hasImage
            ? undefined
            : { ['--tile-image' as string]: tileBackground(item.image) }
        }
      >
        {hasImage && (
          <img
            className={styles.pinImage}
            src={item.image}
            alt=""
            loading="lazy"
          />
        )}
        <div className={styles.pinOverlay}>
          <span className={styles.pinCategory}>{item.category}</span>
          <p className={styles.pinDescription}>{item.description}</p>
        </div>
      </div>
      <div className={styles.pinCaption}>
        <h3 className={styles.pinTitle}>{item.title}</h3>
        <p className={styles.pinMeta}>{item.meta}</p>
      </div>
    </article>
  )
}

/**
 * Creative / Community Gallery — a Pinterest-style masonry wall of
 * pins (rounded photo + caption underneath) at the bottom of the site.
 */
export function CreativeGallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'All'>('All')

  const visible = useMemo(() => {
    if (filter === 'All') return galleryItems
    return galleryItems.filter((item) => item.category === filter)
  }, [filter])

  return (
    <section id="gallery" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Beyond the code</p>
        <h2 className={styles.title}>
          What I make <span className={styles.titleAccent}>off-screen.</span>
        </h2>
        <p className={styles.lede}>
          Performances, choreography, community work, and a small jewelry
          business I’ve run since 2020. The other half of how I learn to
          build things.
        </p>
      </header>

      <div className={styles.filters} role="tablist" aria-label="Gallery filter">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`${styles.filter} ${filter === f.id ? styles.filterActive : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((item, i) => (
          <Pin key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
