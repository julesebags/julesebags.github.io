import { useEffect, useMemo, useState } from 'react'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { Projects } from './components/Projects/Projects'
import { Experience } from './components/Experience/Experience'
import { CreativeGallery } from './components/CreativeGallery/CreativeGallery'
import { Monkey } from './components/Monkey/Monkey'
import { MonkeyContext } from './components/Monkey/monkeyContext'
import { MobileNotice } from './components/MobileNotice/MobileNotice'
import { useRoute } from './lib/route'

function App() {
  // Deliberately not persisted: a reload should take the toy back off her.
  const [hasMonkey, setHasMonkey] = useState(false)
  const [dragging, setDragging] = useState(false)
  const monkey = useMemo(
    () => ({
      hasMonkey,
      deliverMonkey: () => setHasMonkey(true),
      dragging,
      setDragging,
    }),
    [hasMonkey, dragging],
  )

  // Home (hero + experience), Projects and Beyond are separate pages,
  // switched by the URL hash (see lib/route.ts).
  const route = useRoute()

  // After switching pages, start at the top, or at the requested section.
  useEffect(() => {
    const el = route.anchor ? document.getElementById(route.anchor) : null
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0 })
  }, [route])

  return (
    <MonkeyContext.Provider value={monkey}>
      <CustomCursor />
      <MobileNotice />
      <Navbar />
      <main>
        {route.page === 'home' && (
          <>
            <Hero />
            <Experience
              id="experience"
              index="001"
              label="Experience"
              categories={['professional']}
            />
          </>
        )}
        {route.page === 'projects' && <Projects />}
        {route.page === 'beyond' && <CreativeGallery />}
        <Monkey />
      </main>
    </MonkeyContext.Provider>
  )
}

export default App
