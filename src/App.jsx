import { useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Focus from './components/Focus'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

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
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
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
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Nav dark={dark} onToggleDark={() => setDark(d => !d)} />
        <main>
          <Hero />
          <hr className="section-divider" />
          <About />
          <hr className="section-divider" />
          <Work />
          <hr className="section-divider" />
          <Experience />
          <hr className="section-divider" />
          <Focus />
          <hr className="section-divider" />
          <Footer />
        </main>
      </div>
    </>
  )
}
