import { useState } from 'react'
import { popularRoutes, tflLines, commonStops } from '../../data/routes'
import { useApp } from '../../context/AppContext'
import './JourneyPlanner.css'

function ResultCard({ route, onSave, saved }) {
  return (
    <div className="result-card card">
      <div className="result-card__header">
        <div>
          <div className="result-card__route">
            <span className="result-card__place">{route.from}</span>
            <span className="result-card__arrow" aria-hidden="true">→</span>
            <span className="result-card__place">{route.to}</span>
          </div>
          <div className="result-card__tags">
            <span className="badge badge--info">{route.transportLabel}</span>
            {route.accessibility && (
              <span className="badge badge--good" aria-label="Step-free accessible">♿ Accessible</span>
            )}
          </div>
        </div>
        <div className="result-card__time">
          <span className="result-card__duration">{route.duration}</span>
          <span className="result-card__cost">{route.cost}</span>
        </div>
      </div>
      <div className="result-card__meta">
        <span>{route.changes === 0 ? 'Direct' : `${route.changes} change${route.changes > 1 ? 's' : ''}`}</span>
      </div>
      <button
        className={`btn ${saved ? 'btn--ghost' : 'btn--secondary'} result-card__save`}
        onClick={() => onSave(route)}
        aria-pressed={saved}
      >
        {saved ? '✓ Saved' : '+ Save Route'}
      </button>
    </div>
  )
}

export default function JourneyPlanner() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departType, setDepartType] = useState('depart') // 'depart' | 'arrive'
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const { journeyHistory, addJourneyToHistory } = useApp()
  const [savedIds, setSavedIds] = useState([])
  const [formError, setFormError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function handleSearch(e) {
    e.preventDefault()
    if (!from.trim() || !to.trim()) {
      setFormError('Please enter both an origin and a destination to search.')
      return
    }
    setFormError('')
    setLoading(true)
    setResults(null)
    setTimeout(() => {
      setLoading(false)
      setResults(popularRoutes.map(r => ({
        ...r,
        from: from || r.from,
        to: to || r.to,
      })))
    }, 1400)
  }

  function handleSave(route) {
    if (!savedIds.includes(route.id)) {
      setSavedIds(p => [...p, route.id])
      addJourneyToHistory(route)
    }
  }

  return (
    <div className="planner-page">
      <div className="page-hero">
        <div className="container">
          <h1>Journey Planner</h1>
          <p>Plan your route from St Mary's to anywhere in London. Enter your origin and destination to get started.</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container planner-layout">
          {/* Form */}
          <section className="planner-form-section" aria-labelledby="planner-form-heading">
            <h2 id="planner-form-heading" className="planner-section-title">Plan your journey</h2>
            <form className="planner-form card" onSubmit={handleSearch} noValidate>
              <div className="planner-inputs">
                <div className="form-group">
                  <label htmlFor="from-input" className="form-label">From</label>
                  <input
                    id="from-input"
                    className="form-input"
                    type="text"
                    placeholder="e.g. St Mary's University"
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                    list="stops-list"
                    required
                    aria-required="true"
                  />
                </div>

                <button
                  type="button"
                  className="planner-swap"
                  onClick={swap}
                  aria-label="Swap origin and destination"
                  title="Swap"
                >
                  ⇅
                </button>

                <div className="form-group">
                  <label htmlFor="to-input" className="form-label">To</label>
                  <input
                    id="to-input"
                    className="form-input"
                    type="text"
                    placeholder="e.g. London Waterloo"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    list="stops-list"
                    required
                    aria-required="true"
                  />
                </div>

                <datalist id="stops-list">
                  {commonStops.map(s => <option key={s} value={s} />)}
                </datalist>
              </div>

              {/* Depart / Arrive toggle */}
              <div className="planner-time-row">
                <div className="planner-toggle" role="group" aria-label="Departure or arrival time">
                  {['depart', 'arrive'].map(type => (
                    <button
                      key={type}
                      type="button"
                      role="button"
                      aria-pressed={departType === type}
                      className={`planner-toggle-btn${departType === type ? ' planner-toggle-btn--active' : ''}`}
                      onClick={() => setDepartType(type)}
                    >
                      {type === 'depart' ? 'Depart at' : 'Arrive by'}
                    </button>
                  ))}
                </div>
                <div className="form-group">
                  <label htmlFor="plan-date" className="sr-only">Date</label>
                  <input
                    id="plan-date"
                    type="date"
                    className="form-input"
                    min={today}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    aria-label="Journey date"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="plan-time" className="sr-only">Time</label>
                  <input
                    id="plan-time"
                    type="time"
                    className="form-input"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    aria-label="Journey time"
                  />
                </div>
              </div>

              {formError && (
                <p className="planner-form-error" role="alert" aria-live="polite">⚠ {formError}</p>
              )}
              <button type="submit" className="btn btn--primary planner-submit">
                Search routes →
              </button>
            </form>

            {/* TfL Line Status */}
            <div className="planner-lines card">
              <h3 className="planner-section-title">TfL Line Status</h3>
              <ul className="planner-lines-list" role="list">
                {tflLines.map(line => (
                  <li key={line.id} className="planner-line-item">
                    <span
                      className="planner-line-dot"
                      style={{ background: line.color }}
                      aria-hidden="true"
                    />
                    <span className="planner-line-name">{line.name}</span>
                    <span className={`badge badge--${line.status}`}>
                      <span className={`status-dot status-dot--${line.status}`} aria-hidden="true" />
                      {line.status === 'good' ? 'Good' : 'Delays'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Results */}
          <section className="planner-results-section" aria-labelledby="results-heading" aria-live="polite" aria-atomic="false">
            <h2 id="results-heading" className="planner-section-title">
              {results ? 'Journey Options' : 'Popular Routes'}
            </h2>

            {loading && (
              <div className="planner-loading" aria-live="polite" aria-label="Searching for routes">
                <div className="planner-spinner" aria-hidden="true" />
                <p>Finding the best routes…</p>
              </div>
            )}

            {!loading && !results && (
              <>
                <p className="planner-hint">Showing popular routes from St Mary's. Enter your destination above to search.</p>
                {popularRoutes.map(route => (
                  <ResultCard
                    key={route.id}
                    route={route}
                    onSave={handleSave}
                    saved={savedIds.includes(route.id)}
                  />
                ))}
              </>
            )}

            {!loading && results && (
              <>
                {results.map(route => (
                  <ResultCard
                    key={route.id}
                    route={route}
                    onSave={handleSave}
                    saved={savedIds.includes(route.id)}
                  />
                ))}
              </>
            )}

            {/* Saved History */}
            {journeyHistory.length > 0 && (
              <div className="planner-history">
                <h3 className="planner-section-title">Saved Journeys</h3>
                <ul role="list">
                  {journeyHistory.map((j, i) => (
                    <li key={`${j.from}-${j.to}-${i}`} className="planner-history-item">
                      <span>{j.from}</span>
                      <span aria-hidden="true">→</span>
                      <span>{j.to}</span>
                      <span className="planner-history-dur">{j.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
