import { useState } from 'react'
import { services, categories } from '../../data/services'
import { useApp } from '../../context/AppContext'
import './Services.css'

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const { favourites, toggleFavourite } = useApp()

  const filtered = services.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory
    const q = search.toLowerCase()
    const matchSearch = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className="services-page">
      <div className="page-hero">
        <div className="container">
          <h1>Transport Services</h1>
          <p>Explore all transport modes serving St Mary's University and the surrounding Twickenham area.</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Filter + Search */}
          <div className="services-controls">
            <div className="services-tabs" role="tablist" aria-label="Filter by transport category">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`services-tab${activeCategory === cat.id ? ' services-tab--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="services-search">
              <label htmlFor="service-search" className="sr-only">Search services</label>
              <input
                id="service-search"
                type="search"
                className="form-input"
                placeholder="Search services…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search transport services"
              />
            </div>
          </div>

          {/* Result count */}
          <p className="services-count" aria-live="polite" aria-atomic="true">
            {filtered.length === 0
              ? 'No services match your search.'
              : `Showing ${filtered.length} of ${services.length} service${filtered.length !== 1 ? 's' : ''}`}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="services-grid">
              {filtered.map((svc, i) => {
                const isFav = favourites.includes(svc.id)
                return (
                  <article key={svc.id} className={`service-card card animate-fadeUp-${Math.min(i + 1, 5)}`}>
                    <div className="service-card__header">
                      <span className="service-card__icon" aria-hidden="true">{svc.icon}</span>
                      <button
                        className={`service-card__fav${isFav ? ' service-card__fav--active' : ''}`}
                        onClick={() => toggleFavourite(svc.id)}
                        aria-pressed={isFav}
                        aria-label={`${isFav ? 'Remove' : 'Save'} ${svc.title} as favourite`}
                      >
                        {isFav ? '★' : '☆'}
                      </button>
                    </div>

                    <div className="service-card__title-row">
                      <h2 className="service-card__title">{svc.title}</h2>
                      <span className={`badge badge--${svc.status}`}>
                        <span className={`status-dot status-dot--${svc.status}`} aria-hidden="true" />
                        {svc.statusLabel}
                      </span>
                    </div>

                    <p className="service-card__desc">{svc.description}</p>

                    <div className="service-card__lines">
                      {svc.lines.map(line => (
                        <span key={line} className="service-card__line-tag">{line}</span>
                      ))}
                    </div>

                    <div className="service-card__meta">
                      <div className="service-card__meta-item">
                        <span className="service-card__meta-label">Frequency</span>
                        <span className="service-card__meta-value">{svc.frequency}</span>
                      </div>
                      <div className="service-card__meta-item">
                        <span className="service-card__meta-label">Coverage</span>
                        <span className="service-card__meta-value">{svc.coverage}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="services-empty">
              <span aria-hidden="true">🔍</span>
              <p>No services match your current filters.</p>
              <button
                className="btn btn--secondary"
                onClick={() => { setActiveCategory('all'); setSearch('') }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
