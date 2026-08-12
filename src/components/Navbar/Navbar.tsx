import { useEffect, useState } from 'react'
import logo from '../../assets/logo-nav.png'
import styles from './Navbar.module.css'

interface NavLink {
  label: string
  targetId: string
  /** If true, hidden on very narrow screens to keep the bar uncluttered. */
  secondary?: boolean
}

const links: NavLink[] = [
  { label: 'About', targetId: 'about' },
  { label: 'Work', targetId: 'projects' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'Skills', targetId: 'skills', secondary: true },
  { label: 'Beyond', targetId: 'gallery', secondary: true },
  { label: 'Contact', targetId: 'footer' },
]

/**
 * Floating top navbar. Stays transparent at the top of the page; once the
 * user scrolls past 24px, it gains a blurred translucent background so
 * content behind it stays legible.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <a
        href="#hero"
        className={styles.brand}
        aria-label="Julie Baguio — back to top"
        onClick={(e) => {
          e.preventDefault()
          scrollTo('hero')
        }}
      >
        <img src={logo} alt="Julie Baguio" className={styles.brandLogo} />
      </a>
      <div className={styles.links}>
        {links.map((link) => (
          <button
            key={link.targetId}
            type="button"
            className={`${styles.link} ${link.secondary ? styles.secondary : ''}`}
            onClick={() => scrollTo(link.targetId)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
