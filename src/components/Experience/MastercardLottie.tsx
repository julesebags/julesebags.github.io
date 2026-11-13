import { Lottie } from 'lottie-react'
import { useReducedMotion } from 'framer-motion'
import animation from '../../assets/motion/mastercard.json'
import styles from './BrandMotion.module.css'

/**
 * Julie's Mastercard logo animation (Lottie). Loaded lazily from
 * BrandMotion so the player and animation data only download when the
 * Experience section actually renders the tile.
 *
 * The animation is 16:9 and the tile is 16:10, so it's scaled to cover
 * the box (`slice`) rather than letterboxed. With reduced motion it
 * plays once and holds on the final frame instead of looping.
 */
export default function MastercardLottie() {
  const still = useReducedMotion()
  return (
    <Lottie
      className={styles.lottie}
      src={animation}
      loop={!still}
      autoplay
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      aria-label="Mastercard"
      role="img"
    />
  )
}
