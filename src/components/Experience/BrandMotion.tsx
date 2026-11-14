import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import mastercardVideo from '../../assets/motion/mastercard.webm'
import pvsDashboardVideo from '../../assets/motion/pvs-dashboard.mp4'
import wustlVideo from '../../assets/motion/wustl.webm'
import styles from './BrandMotion.module.css'

/**
 * Looping videos used as the "picture" for some experience tiles
 * (Mastercard, WashU Di2, Head TA) in place of a photo.
 */

export type BrandMotionKind = 'mastercard' | 'washu-di2' | 'washu-ta'

export function BrandMotion({ kind }: { kind: BrandMotionKind }) {
  if (kind === 'mastercard')
    return <LoopVideo src={mastercardVideo} label="Mastercard" />
  if (kind === 'washu-di2')
    return (
      <LoopVideo
        src={pvsDashboardVideo}
        label="PVS dashboard walkthrough"
        loopEnd={7.5}
      />
    )
  return <LoopVideo src={wustlVideo} label="WashU" />
}

/**
 * Julie's own videos (Mastercard logo, PVS dashboard walkthrough,
 * WashU logo), muted and looping. With reduced motion they play once
 * and hold on the last frame.
 *
 * `loopEnd` (seconds) loops only the start of the video: it jumps back
 * to 0 on reaching that time. Checked every animation frame rather than
 * on `timeupdate` (which only fires ~4x a second) so it doesn't overshoot.
 */
function LoopVideo({
  src,
  label,
  loopEnd,
}: {
  src: string
  label: string
  loopEnd?: number
}) {
  const still = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || loopEnd === undefined) return
    let frame = 0
    const check = () => {
      if (video.currentTime >= loopEnd) {
        if (still) video.pause()
        else video.currentTime = 0
      }
      frame = requestAnimationFrame(check)
    }
    frame = requestAnimationFrame(check)
    return () => cancelAnimationFrame(frame)
  }, [loopEnd, still])

  return (
    <video
      ref={ref}
      className={styles.video}
      src={src}
      autoPlay
      muted
      loop={!still}
      playsInline
      aria-label={label}
    />
  )
}
