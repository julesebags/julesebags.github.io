import { useMemo, useState } from 'react'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Projects } from './components/Projects/Projects'
import { Experience } from './components/Experience/Experience'
import { Skills } from './components/Skills/Skills'
import { CreativeGallery } from './components/CreativeGallery/CreativeGallery'
import { Footer } from './components/Footer/Footer'
import { Monkey } from './components/Monkey/Monkey'
import { MonkeyContext } from './components/Monkey/monkeyContext'

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <MonkeyContext.Provider value={monkey}>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero onScrollTo={scrollTo} />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <CreativeGallery />
        <Monkey />
      </main>
      <Footer />
    </MonkeyContext.Provider>
  )
}

export default App
