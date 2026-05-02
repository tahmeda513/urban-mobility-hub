import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/',              label: 'Home',            end: true },
  { to: '/services',      label: 'Services' },
  { to: '/planner',       label: 'Journey Planner' },
  { to: '/accessibility', label: 'Accessibility' },
  { to: '/news',          label: 'News' },
  { to: '/contact',       label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function closeMenu() { setMenuOpen(false) }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" onClick={closeMenu} aria-label="St Mary's Urban Mobility Hub — Home">
          <div className="navbar__brand-mark" aria-hidden="true">🚇</div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-title">Urban Mobility Hub</span>
            <span className="navbar__brand-sub">St Mary's University</span>
          </div>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span /><span /><span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
