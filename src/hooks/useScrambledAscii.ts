import { useEffect, useMemo, useState } from 'react'

const DEFAULT_CHARSET = '(){}[]<>=+-*/\\%!?:;.,_$#@&|^~"\'`'

export interface ScrambleOptions {
  /**
   * 'shimmer' (default): randomize a fraction of positions every tick forever.
   * 'settle': start fully scrambled, then progressively freeze each character
   * to its template value (or, if `settleCharset` is provided, to a random
   * pick from that charset). Stops once everything has settled.
   */
  mode?: 'shimmer' | 'settle'
  /** Milliseconds between frames. Lower = more frantic. */
  intervalMs?: number
  /** [shimmer only] Fraction of positions to randomize per frame (0–1). */
  scrambleRate?: number
  /** [settle only] Total time it takes for every character to lock in. */
  settleMs?: number
  /** Characters to randomly pick from while still scrambling. */
  charset?: string
  /**
   * [settle only] If provided, each position picks a random character
   * from this set as its FROZEN value, instead of falling back to the
   * template character at that position. Use this to make the ASCII
   * art settle into terminal/CS characters instead of the literal
   * template (e.g. `×`).
   */
  settleCharset?: string
}

/**
 * Animates ASCII art by replacing non-whitespace characters with random
 * picks from `charset`.
 *
 * Whitespace positions in `template` are always preserved untouched, which
 * keeps the silhouette of the art stable. Honors prefers-reduced-motion:
 * returns the original template (or its settle-mapped variant) unchanged
 * when reduced motion is enabled.
 */
export function useScrambledAscii(
  template: string,
  {
    mode = 'shimmer',
    intervalMs = 120,
    scrambleRate = 0.12,
    settleMs = 2500,
    charset = DEFAULT_CHARSET,
    settleCharset,
  }: ScrambleOptions = {},
): string {
  const positions = useMemo(() => {
    const list: number[] = []
    for (let i = 0; i < template.length; i++) {
      const ch = template[i]
      if (ch !== ' ' && ch !== '\n' && ch !== '\t') list.push(i)
    }
    return list
  }, [template])

  /**
   * Pre-compute the destination character for each non-space position.
   * If `settleCharset` is provided, each position picks a random char
   * from that set; otherwise we fall back to the template character.
   * Memoized on (template, settleCharset) so the same art always
   * settles into the same shape within a session.
   */
  const settleTarget = useMemo(() => {
    if (!settleCharset || settleCharset.length === 0) return template
    const arr = template.split('')
    for (const pos of positions) {
      arr[pos] = settleCharset.charAt(
        Math.floor(Math.random() * settleCharset.length),
      )
    }
    return arr.join('')
  }, [template, positions, settleCharset])

  const [frame, setFrame] = useState(settleTarget)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion || positions.length === 0) {
      setFrame(settleTarget)
      return
    }

    const randomChar = () =>
      charset.charAt(Math.floor(Math.random() * charset.length))

    if (mode === 'settle') {
      const order = positions.slice()
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }
      const lockTimes = new Map<number, number>()
      const denom = Math.max(1, order.length - 1)
      for (let i = 0; i < order.length; i++) {
        lockTimes.set(order[i], (i / denom) * settleMs)
      }

      let stopped = false
      let timeoutId = 0
      const start = performance.now()

      const tick = () => {
        if (stopped) return
        const elapsed = performance.now() - start
        const arr = settleTarget.split('')
        let stillScrambling = false
        for (const pos of positions) {
          const lockAt = lockTimes.get(pos) ?? 0
          if (elapsed < lockAt) {
            arr[pos] = randomChar()
            stillScrambling = true
          }
        }
        setFrame(arr.join(''))
        if (stillScrambling) {
          timeoutId = window.setTimeout(tick, intervalMs)
        }
      }

      tick()

      return () => {
        stopped = true
        window.clearTimeout(timeoutId)
      }
    }

    setFrame(settleTarget)
    const perTick = Math.max(1, Math.floor(positions.length * scrambleRate))
    const id = window.setInterval(() => {
      setFrame((prev) => {
        const arr = prev.split('')
        for (let i = 0; i < perTick; i++) {
          const pos = positions[Math.floor(Math.random() * positions.length)]
          arr[pos] = randomChar()
        }
        return arr.join('')
      })
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [
    template,
    settleTarget,
    positions,
    mode,
    intervalMs,
    scrambleRate,
    settleMs,
    charset,
  ])

  return frame
}
