import { motion, useReducedMotion } from 'framer-motion'
import mastercardGif from '../../assets/motion/mastercard.gif'
import styles from './BrandMotion.module.css'

/**
 * Looping motion graphics used as the "picture" for experience tiles
 * that don't have a good photo. Each one is an SVG drawn on a 160x100
 * canvas (the tile's 16:10 shape) and scaled to fill its container.
 */

export type BrandMotionKind = 'mastercard' | 'washu-di2' | 'washu-ta'

export function BrandMotion({ kind }: { kind: BrandMotionKind }) {
  if (kind === 'mastercard') return <MastercardMotion />
  return <WashUMotion variant={kind === 'washu-di2' ? 'di2' : 'ta'} />
}

const EASE = [0.2, 0.8, 0.2, 1] as const

/** Mastercard: Julie's own animated GIF of the logo. */
function MastercardMotion() {
  return <img className={styles.gif} src={mastercardGif} alt="Mastercard" />
}

/**
 * WashU: the wordmark on WashU red, with a small animated motif under it.
 *   di2 — a bar chart that keeps re-rising (the PVS data dashboard)
 *   ta  — a line of C++ typing itself out (Object-Oriented Programming)
 */
function WashUMotion({ variant }: { variant: 'di2' | 'ta' }) {
  const still = useReducedMotion()

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={variant === 'di2' ? 'WashU Di2' : 'WashU'}
      style={{ background: '#A51417' }}
    >
      <motion.text
        x={80}
        y={variant === 'di2' ? 40 : 44}
        textAnchor="middle"
        className={styles.wordmark}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: still ? 0 : 0.8, ease: EASE }}
      >
        WashU
      </motion.text>

      {variant === 'di2' ? <Di2Bars still={!!still} /> : <TypedCode still={!!still} />}
    </svg>
  )
}

const BARS = [0.45, 0.8, 0.6, 1, 0.7, 0.9, 0.5]

function Di2Bars({ still }: { still: boolean }) {
  const baseY = 82
  const maxH = 22
  const w = 6
  const gap = 4
  const total = BARS.length * w + (BARS.length - 1) * gap
  const x0 = 80 - total / 2

  return (
    <g>
      <text x={80} y={52} textAnchor="middle" className={styles.caption}>
        Di2 · DATA DASHBOARD
      </text>
      <line x1={x0 - 4} x2={x0 + total + 4} y1={baseY} y2={baseY} className={styles.axis} />
      {BARS.map((h, i) => (
        <motion.rect
          key={i}
          x={x0 + i * (w + gap)}
          width={w}
          rx={1}
          className={styles.bar}
          initial={{ height: 0, y: baseY }}
          animate={
            still
              ? { height: h * maxH, y: baseY - h * maxH }
              : {
                  height: [0, h * maxH, h * maxH * 0.6, h * maxH],
                  y: [baseY, baseY - h * maxH, baseY - h * maxH * 0.6, baseY - h * maxH],
                }
          }
          transition={
            still
              ? { duration: 0 }
              : {
                  duration: 3.6,
                  delay: 0.6 + i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  ease: 'easeInOut',
                  times: [0, 0.3, 0.65, 1],
                }
          }
        />
      ))}
    </g>
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
