import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import flowerUrl from '../../assets/newwalingcursor-opt.png'
import styles from './CustomCursor.module.css'

/**
 * Two-layer cursor:
 *   1. A precise pointer dot that tracks the cursor exactly (so click
 *      targets still feel responsive).
 *   2. A waling-waling orchid that lags behind with a soft spring and
 *      gently rotates forever, like a petal trailing the hand. Scales
 *      up over interactive elements.
 *
 * Hidden on touch devices via media query — no phantom flower floating
 * in the corner of someone's phone.
 */
export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Dot tracks the pointer almost-instantly.
  const dotX = useSpring(x, { stiffness: 1500, damping: 100, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 1500, damping: 100, mass: 0.2 })
  // Flower trails with a softer spring for a "drifting" feel.
  const flowerX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.7 })
  const flowerY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.7 })

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    /*
     * Pointerover delegation: any element with [data-cursor="hover"], <a>,
     * <button>, or [role="button"] triggers the flower scale-up. Cheap
     * and declarative — components don't need to wire anything up.
     */
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"]',
      )
      if (interactive) setIsHovering(true)
    }
    const out = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"]',
      )
      if (interactive) setIsHovering(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerout', out)
    }
  }, [x, y])

  return (
    <>
      <motion.img
        src={flowerUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`${styles.cursor} ${styles.flower} ${isHovering ? styles.flowerHover : ''}`}
        style={{ x: flowerX, y: flowerY }}
        animate={{ rotate: [0, 6, -4, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={`${styles.cursor} ${styles.dot}`}
        style={{ x: dotX, y: dotY }}
      />
    </>
  )
}
