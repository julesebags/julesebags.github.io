import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from '../../data/gallery'
import { PinCloseup } from './PinCloseup'
import { PinGrid } from './PinGrid'
import styles from './CreativeGallery.module.css'

const FILTERS: Array<{ id: GalleryCategory | 'All'; label: string }> = [
  { id: 'All', label: 'All' },
  { id: 'Performance', label: 'Performance' },
  { id: 'Choreography', label: 'Choreography' },
  { id: 'Community', label: 'Community' },
  { id: 'Jewelry', label: 'Juliery Box' },
]

/**
 * "Beyond" — a pin-board of performances, choreography, community work
 * and jewelry: underlined text tabs over a masonry wall. Clicking a pin
 * opens its close-up (big photo, details, "More like this").
 *
 * Opening a pin adds a browser-history entry, so the browser's Back
 * button closes it like leaving a page; switching to a related pin
 * replaces that entry instead of stacking more.
 */
export function CreativeGallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'All'>('All')
  const [openPin, setOpenPin] = useState<GalleryItem | null>(null)

  const visible = useMemo(
    () =>
      filter === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  )

  const open = useCallback(
    (item: GalleryItem) => {
      const state = { pin: item.id }
      if (openPin) window.history.replaceState(state, '')
      else window.history.pushState(state, '')
      setOpenPin(item)
    },
    [openPin],
  )

  // Go back through history so the entry added on open is removed; the
  // popstate listener below then clears the close-up.
  const close = useCallback(() => {
    if (window.history.state?.pin) window.history.back()
    else setOpenPin(null)
  }, [])

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const id = (e.state as { pin?: string } | null)?.pin
      setOpenPin(galleryItems.find((item) => item.id === id) ?? null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

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

      <PinGrid items={visible} onOpen={open} />
      <PinCloseup item={openPin} onOpen={open} onClose={close} />
    </section>
  )
}
