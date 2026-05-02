import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { newsItems } from '../../data/news'
import { services } from '../../data/services'
import { useApp } from '../../context/AppContext'
import './Home.css'

function LiveClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="home-clock" aria-live="off" aria-label="Current time">
      <span className="home-clock__time">
        {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
      <span className="home-clock__date">
        {time.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </span>
    </div>
  )
}

const stats = [
  { value: '6',   label: 'Transport Modes' },
  { value: '20+', label: 'Bus Routes' },
  { value: '12',  label: 'Nearby Stations' },
  { value: 'Live',label: 'Alert Updates' },
]

const quickActions = [
  { icon: '🗺️', label: 'Plan a Journey',  to: '/planner',       desc: 'Find the best route' },
  { icon: '⚠️', label: 'Service Alerts',  to: '/news',          desc: 'Check disruptions' },
  { icon: '♿', label: 'Accessibility',   to: '/accessibility', desc: 'Step-free info' },
  { icon: '📞', label: 'Contact Us',      to: '/contact',       desc: 'Speak to Mobility Office' },
]

export default function Home() {
  const urgentAlerts = newsItems.filter(n => n.urgent)
  const featuredServices = services.slice(0, 3)
  const { favourites, journeyHistory } = useApp()
  const favouriteServices = services.filter(s => favourites.includes(s.id))
  const hasDashboardContent = favouriteServices.length > 0 || journeyHistory.length > 0

  return (
    <div className="home">

      {/* Hero */}
      <section className="home-hero" aria-label="Welcome">
        <div className="home-hero__bg" aria-hidden="true">
          <div className="home-hero__stripe home-hero__stripe--1" />
          <div className="home-hero__stripe home-hero__stripe--2" />
          <div className="home-hero__circle" />
        </div>
        <div className="container home-hero__content">
          <div className="home-hero__eyebrow animate-fadeUp">
            <span className="home-hero__dot" aria-hidden="true" />
            Twickenham Campus Transport
          </div>
          <LiveClock />
          <h1 className="home-hero__title animate-fadeUp-1">
            St Mary's<br />
            <em>Urban Mobility Hub</em>
          </h1>
          <p className="home-hero__sub animate-fadeUp-2">
            Your single destination for transport planning, live service updates,
            and accessibility support at St Mary's University, Twickenham.
          </p>
          <div className="home-hero__actions animate-fadeUp-3">
            <Link to="/planner" className="btn btn--primary">Plan a Journey →</Link>
            <Link to="/services" className="btn btn--secondary">Browse Services</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="home-stats" aria-label="Network statistics">
        <div className="container home-stats__grid">
          {stats.map((s, i) => (
            <div key={s.label} className={`home-stats__item animate-fadeUp-${i + 1}`}>
              <span className="home-stats__value">{s.value}</span>
              <span className="home-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Active Alerts Strip */}
      {urgentAlerts.length > 0 && (
        <section className="home-alerts" aria-label="Active service alerts">
          <div className="container">
            <div className="home-alerts__inner">
              <span className="home-alerts__badge" aria-hidden="true">⚠ Live Alerts</span>
              <div className="home-alerts__list">
                {urgentAlerts.map(alert => (
                  <span key={alert.id} className="home-alerts__item">
                    <strong>{alert.line}:</strong> {alert.title}
                  </span>
                ))}
              </div>
              <Link to="/news" className="home-alerts__link">View all →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Personalised Dashboard */}
      {hasDashboardContent && (
        <section className="home-section home-section--dashboard" aria-labelledby="dashboard-heading">
          <div className="container">
            <div className="home-section__header">
              <h2 id="dashboard-heading" className="home-section__title">Your Dashboard</h2>
              <div className="home-section__rule" aria-hidden="true" />
            </div>
            <div className="home-dashboard__grid">
              {favouriteServices.length > 0 && (
                <div className="home-dashboard__panel card">
                  <h3 className="home-dashboard__panel-title">
                    <span aria-hidden="true">★</span> Saved Services
                  </h3>
                  <ul role="list" className="home-dashboard__list">
                    {favouriteServices.map(svc => (
                      <li key={svc.id} className="home-dashboard__item">
                        <span aria-hidden="true">{svc.icon}</span>
                        <span className="home-dashboard__item-name">{svc.title}</span>
                        <span className={`badge badge--${svc.status}`}>
                          <span className={`status-dot status-dot--${svc.status}`} aria-hidden="true" />
                          {svc.statusLabel}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="home-dashboard__link">Manage services →</Link>
                </div>
              )}
              {journeyHistory.length > 0 && (
                <div className="home-dashboard__panel card">
                  <h3 className="home-dashboard__panel-title">
                    <span aria-hidden="true">🕐</span> Recent Journeys
                  </h3>
                  <ul role="list" className="home-dashboard__list">
                    {journeyHistory.map((j, i) => (
                      <li key={`journey-${i}`} className="home-dashboard__item">
                        <span className="home-dashboard__journey">
                          <span>{j.from}</span>
                          <span className="home-dashboard__arrow" aria-hidden="true">→</span>
                          <span>{j.to}</span>
                        </span>
                        <span className="home-dashboard__dur">{j.duration}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/planner" className="home-dashboard__link">Plan a journey →</Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="home-section" aria-labelledby="quickactions-heading">
        <div className="container">
          <div className="home-section__header">
            <h2 id="quickactions-heading" className="home-section__title">Quick Actions</h2>
            <div className="home-section__rule" aria-hidden="true" />
          </div>
          <div className="home-quick__grid">
            {quickActions.map((a, i) => (
              <Link key={a.label} to={a.to} className={`home-quick__card animate-fadeUp-${i + 1}`}>
                <span className="home-quick__icon" aria-hidden="true">{a.icon}</span>
                <span className="home-quick__label">{a.label}</span>
                <span className="home-quick__desc">{a.desc}</span>
                <span className="home-quick__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="home-section home-section--alt" aria-labelledby="featured-heading">
        <div className="container">
          <div className="home-section__header">
            <h2 id="featured-heading" className="home-section__title">Featured Services</h2>
            <Link to="/services" className="home-section__link">View all services →</Link>
          </div>
          <div className="home-services__grid">
            {featuredServices.map((svc, i) => (
              <div key={svc.id} className={`home-service-card card animate-fadeUp-${i + 1}`}>
                <div className="home-service-card__top">
                  <span className="home-service-card__icon" aria-hidden="true">{svc.icon}</span>
                  <span className={`badge badge--${svc.status}`}>
                    <span className={`status-dot status-dot--${svc.status}`} aria-hidden="true" />
                    {svc.statusLabel}
                  </span>
                </div>
                <h3 className="home-service-card__title">{svc.title}</h3>
                <p className="home-service-card__desc">{svc.description}</p>
                <div className="home-service-card__meta">
                  <span>🕐 {svc.frequency}</span>
                  <span>📍 {svc.coverage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
