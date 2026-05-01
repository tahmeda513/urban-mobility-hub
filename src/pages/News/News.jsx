import { useState } from 'react'
import { newsItems } from '../../data/news'
import './News.css'

const filterCategories = [
  { id: 'all',    label: 'All' },
  { id: 'alert',  label: 'Alerts' },
  { id: 'update', label: 'Updates' },
  { id: 'news',   label: 'News' },
]

export default function News() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? newsItems
    : newsItems.filter(n => n.category === activeFilter)

  const urgentCount = newsItems.filter(n => n.urgent).length

  return (
    <div className="news-page">
      <div className="page-hero">
        <div className="container">
          <div className="news-hero-top">
            <h1>Service Alerts &amp; News</h1>
            {urgentCount > 0 && (
              <span className="badge badge--alert" aria-label={`${urgentCount} active urgent alerts`}>
                <span className="status-dot status-dot--alert" aria-hidden="true" />
                {urgentCount} Active Alert{urgentCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p>Stay informed about service disruptions, network updates, and campus transport news.</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Filter Bar */}
          <div className="news-filters" role="group" aria-label="Filter news by category">
            {filterCategories.map(cat => {
              const count = cat.id === 'all' ? newsItems.length : newsItems.filter(n => n.category === cat.id).length
              return (
                <button
                  key={cat.id}
                  className={`news-filter-btn${activeFilter === cat.id ? ' news-filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter(cat.id)}
                  aria-pressed={activeFilter === cat.id}
                >
                  {cat.label}
                  <span className="news-filter-count">{count}</span>
                </button>
              )
            })}
          </div>

          {/* Articles */}
          <div
            className="news-list"
            aria-live="polite"
            aria-atomic="false"
            aria-label="News articles"
          >
            {filtered.map((item, i) => (
              <article
                key={item.id}
                className={`news-card card news-card--${item.category} animate-fadeUp-${Math.min(i + 1, 5)}`}
              >
                <div className="news-card__left-bar" aria-hidden="true" />
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className={`badge badge--${item.category === 'alert' ? 'alert' : item.category === 'update' ? 'info' : 'good'}`}>
                      {item.categoryLabel}
                    </span>
                    {item.urgent && (
                      <span className="news-card__urgent" aria-label="Urgent alert">⚠ Urgent</span>
                    )}
                    {item.line && (
                      <span className="news-card__line">{item.line}</span>
                    )}
                    <time className="news-card__date" dateTime={item.date}>{item.displayDate}</time>
                  </div>
                  <h2 className="news-card__title">{item.title}</h2>
                  <p className="news-card__summary">{item.summary}</p>
                  <button className="btn btn--ghost news-card__read-more" aria-label={`Read more about: ${item.title}`}>
                    Read more →
                  </button>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="news-empty">
                <span aria-hidden="true">📰</span>
                <p>No items in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
