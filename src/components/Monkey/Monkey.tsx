import { useState } from 'react'
import { motion } from 'framer-motion'
import monkeyToy from '../../assets/ginger/monkey.png'
import { useMonkey } from './monkeyContext'
import styles from './Monkey.module.css'

/**
 * Where the toy can turn up, as percentages of the main content box, so
 * each spot sits beside a different section on the way down the page.
 * All of them hug an edge — tucked out of the reading path, but never
 * so far that you'd need to hunt for them.
 */
const HIDING_SPOTS = [
  { top: '13%', left: '87%' },
  { top: '28%', left: '3%' },
  { top: '43%', left: '89%' },
  { top: '57%', left: '4%' },
  { top: '70%', left: '85%' },
  { top: '84%', left: '7%' },
]

const SPOT_KEY = 'ginger:monkey-spot'
/** Slack around Ginger's box, so the drop doesn't have to be precise. */
const DROP_PAD_PX = 30

/**
 * Picks a spot for this page load, skipping wherever it was last time so
 * a refresh always moves it. Runs once on import rather than during a
 * render, which keeps the choice stable across re-mounts.
 */
function pickSpot() {
  let previous = -1
  try {
    previous = Number(window.localStorage.getItem(SPOT_KEY))
  } catch {
    // Storage can be blocked; repeating a spot is a harmless fallback.
  }

  const choices = HIDING_SPOTS.map((_, index) => index).filter(
    (index) => index !== previous,
  )
  const spot = choices[Math.floor(Math.random() * choices.length)] ?? 0

  try {
    window.localStorage.setItem(SPOT_KEY, String(spot))
  } catch {
    // Same as above.
  }

  return HIDING_SPOTS[spot] ?? HIDING_SPOTS[0]
}

const SPOT = pickSpot()

function pointerPoint(event: MouseEvent | TouchEvent | PointerEvent) {
  if ('clientX' in event) return { x: event.clientX, y: event.clientY }
  const touch = event.changedTouches[0] ?? event.touches[0]
  return touch ? { x: touch.clientX, y: touch.clientY } : null
}

/** Ginger tags her own photo with `data-ginger-drop` as the target. */
function isOverGinger(event: MouseEvent | TouchEvent | PointerEvent) {
  const point = pointerPoint(event)
  const target = document.querySelector('[data-ginger-drop]')
  if (!point || !target) return false

  const rect = target.getBoundingClientRect()
  return (
    point.x >= rect.left - DROP_PAD_PX &&
    point.x <= rect.right + DROP_PAD_PX &&
    point.y >= rect.top - DROP_PAD_PX &&
    point.y <= rect.bottom + DROP_PAD_PX
  )
}

/**
 * Ginger's monkey, stashed somewhere down the page. Drag it onto her and
 * she keeps it for the rest of the visit; a reload hides it somewhere
 * else and she's back to having nothing.
 */
export function Monkey() {
  // Dragging lives in shared state because Ginger reacts to it too.
  const { hasMonkey, deliverMonkey, dragging, setDragging } = useMonkey()
  const [over, setOver] = useState(false)

  if (hasMonkey) return null

  return (
    <motion.button
      type="button"
      className={`${styles.monkey} ${dragging ? styles.dragging : ''} ${
        over ? styles.over : ''
      }`}
      style={{ top: SPOT.top, left: SPOT.left }}
      drag
      dragMomentum={false}
      // A missed drop drifts back to the hiding place instead of
      // stranding the toy mid-page.
      dragSnapToOrigin
      whileDrag={{ scale: 1.12 }}
      onDragStart={() => setDragging(true)}
      onDrag={(event) => setOver(isOverGinger(event))}
      onDragEnd={(event) => {
        setDragging(false)
        setOver(false)
        if (isOverGinger(event)) deliverMonkey()
      }}
      // Dragging is mouse-only, so keyboard users hand it over directly.
      // Preventing the default also stops this becoming a plain click.
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        deliverMonkey()
      }}
      aria-label="Ginger’s monkey toy — drag it to Ginger, or press enter to give it to her"
      title="drag me to ginger"
    >
      <img className={styles.photo} src={monkeyToy} alt="" draggable={false} />
    </motion.button>
  )
}
