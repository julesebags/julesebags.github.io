import { useReducedMotion } from 'framer-motion'
import mastercardVideo from '../../assets/motion/mastercard.webm'
import pvsDashboardVideo from '../../assets/motion/pvs-dashboard.mp4'
import wustlVideo from '../../assets/motion/wustl.webm'
import mastercardPoster from '../../assets/motion/posters/mastercard.jpg'
import pvsDashboardPoster from '../../assets/motion/posters/pvs-dashboard.jpg'
import wustlPoster from '../../assets/motion/posters/wustl.jpg'
import styles from './BrandMotion.module.css'

/**
 * Looping videos used as the "picture" for some experience tiles
 * (Mastercard, WashU Di2, Head TA) in place of a photo.
 */

export type BrandMotionKind = 'mastercard' | 'washu-di2' | 'washu-ta'

/*
 * Each video's pixel size (so the browser reserves the tile's height
 * before the file loads) and a poster of its first frame (so the tile
 * shows a still instead of an empty box while it buffers). If a video
 * is swapped out, update its size and re-export the poster.
 *
 * The PVS walkthrough is trimmed to the 7.5 seconds that are shown
 * (1280x800 H.264), so it loops on its own.
 */
const VIDEOS: Record<
  BrandMotionKind,
  { src: string; poster: string; width: number; height: number; label: string }
> = {
  mastercard: {
    src: mastercardVideo,
    poster: mastercardPoster,
    width: 1920,
    height: 1080,
    label: 'Mastercard',
  },
  'washu-di2': {
    src: pvsDashboardVideo,
    poster: pvsDashboardPoster,
    width: 1280,
    height: 800,
    label: 'PVS dashboard walkthrough',
  },
  'washu-ta': {
    src: wustlVideo,
    poster: wustlPoster,
    width: 1728,
    height: 1080,
    label: 'WashU',
  },
}

/**
 * Julie's own videos (Mastercard logo, PVS dashboard walkthrough,
 * WashU logo), muted and looping. With reduced motion they play once
 * and hold on the last frame.
 */
export function BrandMotion({ kind }: { kind: BrandMotionKind }) {
  const still = useReducedMotion()
  const { src, poster, width, height, label } = VIDEOS[kind]

  return (
    <video
      className={styles.video}
      src={src}
      poster={poster}
      width={width}
      height={height}
      autoPlay
      muted
      loop={!still}
      playsInline
      aria-label={label}
    />
  )
}
