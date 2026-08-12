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

interface TileProps {
  item: GalleryItem
  hovered: boolean
  onHover: (id: string | null) => void
}

const aspectClass: Record<NonNullable<GalleryItem['aspect']>, string> = {
  portrait: styles.aspectPortrait,
  tall: styles.aspectTall,
  extraTall: styles.aspectExtraTall,
  square: styles.aspectSquare,
  landscape: styles.aspectLandscape,
}

function Tile({ item, hovered, onHover }: TileProps) {
  // Real images get rendered as <img> so the tile height matches the
  // photo's natural aspect ratio (only the column width is constrained).
  // Gradient placeholders fall back to a fixed aspect ratio class so the
  // tile still has a sensible shape when no photo is dropped in yet.
  const hasImage = isImagePath(item.image)
  const aspect = hasImage ? '' : aspectClass[item.aspect ?? 'square']

  return (
    <div
      className={`${styles.tile} ${aspect} ${hovered ? styles.tileHovered : ''}`}
      style={
        hasImage
          ? undefined
          : { ['--tile-image' as string]: tileBackground(item.image) }
      }
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="article"
      aria-label={`${item.title} — ${item.meta}`}
    >
      {hasImage && (
        <img
          className={styles.tileImage}
          src={item.image}
          alt=""
          loading="lazy"
        />
      )}
      <div className={styles.meta}>
        <span className={styles.metaCategory}>{item.category}</span>
        <h3 className={styles.metaTitle}>{item.title}</h3>
        <span className={styles.metaSub}>{item.meta}</span>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  )
}

/**
 * Creative / Community Gallery — masonry-style image wall at the
 * bottom of the site. Cinematic hover: focused tile lifts and
 * brightens, surrounding tiles dim. The hover overlay reveals a one-
 * sentence description so the section humanizes without resume-style
 * bullet density.
 */
export function CreativeGallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'All'>('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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

      <div
        className={`${styles.grid} ${hoveredId ? styles.gridHovering : ''}`}
      >
        {visible.map((item) => (
          <Tile
            key={item.id}
            item={item}
            hovered={hoveredId === item.id}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </section>
  )
}
