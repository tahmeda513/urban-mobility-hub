import './Accessibility.css'

const features = [
  { icon: '🛗', title: 'Step-Free Access', desc: 'All major stations on routes serving campus have step-free access from street to platform, including Twickenham, Richmond, and London Waterloo.' },
  { icon: '🔊', title: 'Audio Announcements', desc: 'All buses and trains serving the campus have audio and visual next-stop announcements on-board.' },
  { icon: '👁️', title: 'Visual Impairment Support', desc: 'Large print timetables, tactile paving guidance, and Braille resources are available. Contact the Mobility Office to request materials.' },
  { icon: '📻', title: 'Hearing Loops', desc: 'Hearing induction loops are available at Twickenham Station ticket offices and on all National Rail services.' },
  { icon: '🦽', title: 'Wheelchair Assistance', desc: 'Passenger Assist service available on all National Rail routes. Book in advance via the train operating company or at any staffed station.' },
  { icon: '🅿️', title: 'Accessible Parking', desc: 'Blue Badge parking bays are located adjacent to the main campus entrance on Waldegrave Road. Permit required — contact Campus Services.' },
]

const wcagItems = [
  { criterion: '1.1.1 Non-text Content', level: 'A', status: 'Pass', note: 'All images have descriptive alt attributes; decorative images use alt="".' },
  { criterion: '1.3.1 Info and Relationships', level: 'A', status: 'Pass', note: 'Semantic HTML used throughout: <nav>, <main>, <header>, <footer>, heading hierarchy.' },
  { criterion: '1.4.3 Contrast (Minimum)', level: 'AA', status: 'Pass', note: 'Primary text on dark background exceeds 7:1 contrast ratio.' },
  { criterion: '2.1.1 Keyboard', level: 'A', status: 'Pass', note: 'All interactive elements reachable and operable by keyboard. Skip link provided.' },
  { criterion: '2.4.3 Focus Order', level: 'A', status: 'Pass', note: 'Tab order follows logical reading order throughout.' },
  { criterion: '4.1.2 Name, Role, Value', level: 'A', status: 'Pass', note: 'ARIA labels, roles, and states applied to all custom interactive components.' },
]

const badges = [
  { label: 'WCAG 2.1 AA', desc: 'Web accessibility standard' },
  { label: 'TfL Accessibility', desc: 'Transport for London standards' },
  { label: 'Passenger Assist', desc: 'Rail assistance partner' },
]

export default function Accessibility() {
  return (
    <div className="a11y-page">
      <div className="page-hero">
        <div className="container">
          <h1>Accessibility</h1>
          <p>We are committed to ensuring every student, staff member, and visitor can travel to and from St Mary's with confidence and independence.</p>
          <div className="a11y-badges">
            {badges.map(b => (
              <div key={b.label} className="a11y-badge">
                <span className="a11y-badge__label">{b.label}</span>
                <span className="a11y-badge__desc">{b.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Feature Cards */}
          <section aria-labelledby="features-heading">
            <h2 id="features-heading" className="a11y-section-title">Accessibility Features</h2>
            <div className="a11y-grid">
              {features.map((f, i) => (
                <article key={f.title} className={`a11y-feature-card card animate-fadeUp-${Math.min(i + 1, 5)}`}>
                  <span className="a11y-feature-icon" aria-hidden="true">{f.icon}</span>
                  <h3 className="a11y-feature-title">{f.title}</h3>
                  <p className="a11y-feature-desc">{f.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Passenger Assist */}
          <section className="a11y-assist card" aria-labelledby="assist-heading">
            <div className="a11y-assist__content">
              <h2 id="assist-heading" className="a11y-section-title">Passenger Assist</h2>
              <p>Passenger Assist is a free service that helps disabled passengers and those with reduced mobility travel by rail. It can arrange help boarding, alighting, and making connections.</p>
              <ul className="a11y-assist__steps" role="list">
                <li><strong>Step 1:</strong> Book at least 2 hours before travel via the Passenger Assist app or by calling your train operator.</li>
                <li><strong>Step 2:</strong> Arrive at the station at least 20 minutes before departure.</li>
                <li><strong>Step 3:</strong> A member of staff will meet you at the agreed meeting point.</li>
              </ul>
            </div>
            <div className="a11y-assist__emergency">
              <h3>Emergency Contact</h3>
              <p>Mobility Office:</p>
              <a href="tel:+442089400001" className="a11y-assist__tel">+44 (0)20 8940 0001</a>
              <p className="a11y-assist__hours">Mon–Fri 08:00–18:00 · Sat–Sun 10:00–16:00</p>
            </div>
          </section>

          {/* WCAG Table */}
          <section aria-labelledby="wcag-heading">
            <h2 id="wcag-heading" className="a11y-section-title">WCAG 2.1 Compliance</h2>
            <p className="a11y-wcag-intro">This application is built to WCAG 2.1 Level AA. The following table summarises key success criteria and how they are met.</p>
            <div className="a11y-wcag-table" role="grid" aria-label="WCAG 2.1 compliance table">
              <div className="a11y-wcag-header" role="row">
                <span role="columnheader">Criterion</span>
                <span role="columnheader">Level</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Implementation</span>
              </div>
              {wcagItems.map(item => (
                <div key={item.criterion} className="a11y-wcag-row" role="row">
                  <span className="a11y-wcag-criterion" role="gridcell">{item.criterion}</span>
                  <span className="a11y-wcag-level" role="gridcell">
                    <span className="badge badge--info">{item.level}</span>
                  </span>
                  <span className="a11y-wcag-status" role="gridcell">
                    <span className="badge badge--good">✓ {item.status}</span>
                  </span>
                  <span className="a11y-wcag-note" role="gridcell">{item.note}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
