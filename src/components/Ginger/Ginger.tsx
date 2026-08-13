import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Flower2 } from 'lucide-react'
import happyPet from '../../assets/ginger/happypet.png'
import wantPet from '../../assets/ginger/wantpet.png'
import { GingerChat } from './GingerChat'
import styles from './Ginger.module.css'

/** How long Ginger stays satisfied before she starts angling for more. */
const HAPPY_MS = 3_000
/** How long a line lingers before it fades out. */
const BUBBLE_MS = 4_000
/**
 * Quiet gap between lines while she waits. Randomized within this range
 * so she pipes up on her own schedule rather than like a metronome.
 */
const QUIET_MIN_MS = 5_000
const QUIET_MAX_MS = 11_000

/** Horizontal pointer travel that counts as deliberate movement, not jitter. */
const STROKE_MIN_PX = 6
/** Direction reversals that add up to one pet. */
const STROKES_PER_PET = 3
/** Strokes stop accumulating once the pointer has held still this long. */
const STROKE_RESET_MS = 700
/** Floor between hover-pets so frantic wiggling can't spam her. */
const HOVER_PET_COOLDOWN_MS = 1_200
/** How far she leans at the edges of her frame. */
const SWAY_PX = 7
const SWAY_DEG = 7

const HAPPY_LINES = [
  'aaa thank you',
  'best human',
  'tail is wagging',
  '10/10 would be pet again',
  'ok now ask me about julie',
]

/**
 * A mix of "pet me" and "talk to me" — the second kind is what gets
 * anyone to discover the chat panel, so it carries most of the list.
 */
const WANT_LINES = [
  ':(',
  "let's talk!",
  'more pets?',
  'wanna chat? click me',
  'ask me about julie',
  'i know things about julie',
  'psst... down here',
  'ginger requires attention',
]

type Mood = 'wants' | 'happy'

interface Bubble {
  text: string
  /** Bumped per line so repeating a line still restarts its timer. */
  id: number
}

/**
 * Ginger, at the foot of the nav rail. She starts out wanting attention;
 * clicking squishes her and makes her happy for a while, after which she
 * asks for more. Stroking side to side across her counts as petting too.
 * Both photos stay mounted and crossfade, so the swap never waits on an
 * image load.
 */
export function Ginger() {
  const [mood, setMood] = useState<Mood>('wants')
  const [pets, setPets] = useState(0)
  const [bubble, setBubble] = useState<Bubble | null>(null)
  const [chatOpen, setChatOpen] = useState(false)

  const lastLine = useRef<string | null>(null)
  const bubbleId = useRef(0)

  const reduceMotion = useReducedMotion()
  const squish = useAnimationControls()

  /*
   * Sway is driven by raw motion values rather than state so following
   * the pointer never triggers a React render. The springs let her
   * settle back rather than snapping.
   */
  const swayTarget = useMotionValue(0)
  const tiltTarget = useMotionValue(0)
  const spring = { stiffness: 260, damping: 18, mass: 0.4 }
  const x = useSpring(swayTarget, spring)
  const rotate = useSpring(tiltTarget, spring)

  const lastPointerX = useRef<number | null>(null)
  const lastDirection = useRef(0)
  const strokes = useRef(0)
  const lastHoverPet = useRef(0)
  const stillTimer = useRef(0)

  const say = useCallback((lines: string[]) => {
    const fresh = lines.filter((line) => line !== lastLine.current)
    const text = fresh[Math.floor(Math.random() * fresh.length)]
    lastLine.current = text
    bubbleId.current += 1
    setBubble({ text, id: bubbleId.current })
  }, [])

  const pet = useCallback(() => {
    setMood('happy')
    // Re-petting an already-happy Ginger restarts her contentment timer.
    setPets((count) => count + 1)
    say(HAPPY_LINES)
  }, [say])

  const handleClick = () => {
    setChatOpen((open) => !open)

    pet()
    if (reduceMotion) return
    squish.start({
      scaleX: [1, 1.18, 0.96, 1],
      scaleY: [1, 0.82, 1.04, 1],
      transition: { duration: 0.45, times: [0, 0.28, 0.62, 1], ease: 'easeOut' },
    })
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offset = (event.clientX - rect.left) / rect.width - 0.5

    if (!reduceMotion) {
      swayTarget.set(offset * 2 * SWAY_PX)
      tiltTarget.set(offset * 2 * SWAY_DEG)
    }

    const pointerX = event.clientX
    if (lastPointerX.current === null) {
      lastPointerX.current = pointerX
      return
    }

    const delta = pointerX - lastPointerX.current
    if (Math.abs(delta) < STROKE_MIN_PX) return
    lastPointerX.current = pointerX

    const direction = delta > 0 ? 1 : -1
    if (lastDirection.current !== 0 && direction !== lastDirection.current) {
      strokes.current += 1
      if (strokes.current >= STROKES_PER_PET) {
        strokes.current = 0
        const now = Date.now()
        if (now - lastHoverPet.current > HOVER_PET_COOLDOWN_MS) {
          lastHoverPet.current = now
          pet()
        }
      }
    }
    lastDirection.current = direction

    // Only one continuous back-and-forth counts; a pause starts over.
    window.clearTimeout(stillTimer.current)
    stillTimer.current = window.setTimeout(() => {
      strokes.current = 0
      lastDirection.current = 0
    }, STROKE_RESET_MS)
  }

  const handlePointerLeave = () => {
    swayTarget.set(0)
    tiltTarget.set(0)
    lastPointerX.current = null
    lastDirection.current = 0
    strokes.current = 0
    window.clearTimeout(stillTimer.current)
  }

  useEffect(() => () => window.clearTimeout(stillTimer.current), [])

  useEffect(() => {
    if (mood !== 'happy') return
    const timer = window.setTimeout(() => {
      setMood('wants')
      say(WANT_LINES)
    }, HAPPY_MS)
    return () => window.clearTimeout(timer)
  }, [mood, pets, say])

  /*
   * While she's waiting she keeps piping up: a line shows, fades on the
   * timer below, then she's quiet for a random beat before trying a
   * different one. Runs until she's petted.
   */
  useEffect(() => {
    if (mood !== 'wants') return
    let timer = 0
    const scheduleNext = () => {
      const quiet =
        QUIET_MIN_MS + Math.random() * (QUIET_MAX_MS - QUIET_MIN_MS)
      timer = window.setTimeout(() => {
        say(WANT_LINES)
        scheduleNext()
      }, BUBBLE_MS + quiet)
    }
    scheduleNext()
    return () => window.clearTimeout(timer)
  }, [mood, say])

  useEffect(() => {
    if (!bubble) return
    const timer = window.setTimeout(() => setBubble(null), BUBBLE_MS)
    return () => window.clearTimeout(timer)
  }, [bubble])

  const isHappy = mood === 'happy'

  return (
    <div className={`${styles.ginger} ${isHappy ? '' : styles.wants}`}>
      <AnimatePresence mode="wait">
        {bubble && (
          <motion.p
            key={bubble.id}
            className={styles.bubble}
            aria-hidden="true"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {bubble.text}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={styles.petButton}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-expanded={chatOpen}
        aria-label={
          chatOpen ? 'Close Ginger’s chat' : 'Pet Ginger and ask her about Julie'
        }
      >
        <span className={styles.frame}>
          <motion.span
            className={styles.body}
            style={{ x, rotate }}
            animate={squish}
          >
            <img
              className={`${styles.photo} ${isHappy ? '' : styles.shown}`}
              src={wantPet}
              alt=""
              draggable={false}
            />
            <img
              className={`${styles.photo} ${isHappy ? styles.shown : ''}`}
              src={happyPet}
              alt=""
              draggable={false}
            />
          </motion.span>
        </span>
      </button>

      <button
        type="button"
        className={styles.askPill}
        onClick={() => setChatOpen((open) => !open)}
        aria-expanded={chatOpen}
      >
        <Flower2 className={styles.askIcon} size={11} strokeWidth={2} />
        ask GingerGPT
      </button>

      <AnimatePresence>
        {chatOpen && <GingerChat onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
