import { useState } from 'react'
import { X } from 'lucide-react'
import styles from './MobileNotice.module.css'

/**
 * Soft nudge for anyone below the desktop breakpoint — Ginger, the
 * monkey, and the left rail only exist there. Dismissible so it never
 * blocks the rest of the page.
 */
export function MobileNotice() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <aside className={styles.notice} role="status">
      <p className={styles.copy}>best viewed on desktop</p>
      <button
        type="button"
        className={styles.close}
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </aside>
  )
}
