import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Projects } from './components/Projects/Projects'
import { Experience } from './components/Experience/Experience'
import { Skills } from './components/Skills/Skills'
import { CreativeGallery } from './components/CreativeGallery/CreativeGallery'
import { Footer } from './components/Footer/Footer'

function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero onScrollTo={scrollTo} />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <CreativeGallery />
      </main>
      <Footer />
    </>
  )
}

export default App
