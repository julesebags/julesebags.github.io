import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import mastercardVideo from '../../assets/motion/mastercard.webm'
import pvsDashboardVideo from '../../assets/motion/pvs-dashboard.mp4'
import styles from './BrandMotion.module.css'

/**
 * Looping motion graphics used as the "picture" for experience tiles
 * that don't have a good photo. Each one is an SVG drawn on a 160x100
 * canvas (the tile's 16:10 shape) and scaled to fill its container.
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
  return <WashUMotion />
}

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Julie's own videos (Mastercard logo animation, PVS dashboard
 * walkthrough), muted and looping. With reduced motion they play once
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

/**
 * WashU (Head TA): the wordmark on WashU red, with a line of C++
 * typing itself out (Object-Oriented Programming).
 */
function WashUMotion() {
  const still = useReducedMotion()

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="WashU"
      style={{ background: '#A51417' }}
    >
      <motion.text
        x={80}
        y={44}
        textAnchor="middle"
        className={styles.wordmark}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: still ? 0 : 0.8, ease: EASE }}
      >
        WashU
      </motion.text>

      <TypedCode still={!!still} />
    </svg>
  )
}

const CODE = 'class HeadTA : public TA {};'

function TypedCode({ still }: { still: boolean }) {
  return (
    <g>
      <text x={80} y={56} textAnchor="middle" className={styles.caption}>
        HEAD TEACHING ASSISTANT
      </text>
      <text x={80} y={74} textAnchor="middle" className={styles.code}>
        {still
          ? CODE
          : CODE.split('').map((ch, i) => (
              <motion.tspan
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 6,
                  times: [0, 0.02, 0.85, 0.9],
                  delay: 0.8 + i * 0.06,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }}
              >
                {ch}
              </motion.tspan>
            ))}
      </text>
    </g>
  )
}
