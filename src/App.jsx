import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SkillGraph from './components/SkillGraph'
import About from './components/About'
import Now from './components/Now'
import Work from './components/Work'
import Experience from './components/Experience'
import Focus from './components/Focus'
import Footer from './components/Footer'
import './index.css'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  // Reading progress bar
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    if (!bar) return
    const onScroll = () => {
      const doc = document.documentElement
      const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100
      bar.style.width = `${Math.min(pct, 100)}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll fade-up
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = document.querySelectorAll('main > section')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('fade-up')
        observer.observe(el)
      }
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <div id="progress-bar" />
      <div style={{ minHeight: '100vh' }}>
        <Nav />
        <main>
          <Hero />
          <SkillGraph />
          <About />
          <Now />
          <Work />
          <Experience />
          <Focus />
          <Footer />
        </main>
      </div>
      <Analytics />
    </>
  )
}
