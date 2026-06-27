import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Focus from './components/Focus'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Focus />
        <Footer />
      </main>
    </div>
  )
}
