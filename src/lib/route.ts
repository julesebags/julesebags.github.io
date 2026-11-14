import { useEffect, useState } from 'react'

/**
 * Tiny hash router. Hash URLs (`#/projects`) work on static hosting
 * (GitHub Pages, Vercel) with no server rewrites, are shareable, and
 * keep the browser's Back/Forward buttons working.
 *
 *   ''  or '#/'      → home (hero + experience), top of page
 *   '#/experience'   → home, scrolled to the Experience section
 *   '#/projects'     → projects page
 *   '#/beyond'       → beyond (pin board) page
 */
export type Page = 'home' | 'projects' | 'beyond'

export interface Route {
  page: Page
  /** Element id to scroll to after the page renders, if any. */
  anchor?: string
}

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (path === 'projects') return { page: 'projects' }
  if (path === 'beyond') return { page: 'beyond' }
  if (path === 'experience') return { page: 'home', anchor: 'experience' }
  return { page: 'home' }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))
  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

/** Go to a route, e.g. `navigate('/projects')`. */
export function navigate(path: string) {
  const target = `#${path}`
  if (window.location.hash === target) {
    // Same URL: no hashchange fires, so re-dispatch to re-run scrolling.
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = path
  }
}
