import { useState } from 'react'
import './Contact.css'

const faqItems = [
  { q: 'How do I get a student Oyster card?', a: 'Apply online through the TfL website with proof of student status. Your card will be posted to you within 5 working days. Bring your student ID to the Mobility Office for assistance.' },
  { q: 'Is there a campus shuttle bus?', a: 'St Mary\'s does not operate a dedicated shuttle. However, Routes 33 and 281 stop within a 5-minute walk of the main campus entrance. The Mobility Office can advise on the best options for your journey.' },
  { q: 'Can the Mobility Office help with accessibility travel planning?', a: 'Yes. Our advisors can help plan step-free routes, book Passenger Assist services, and identify accessible options across all six transport modes we cover.' },
  { q: 'How do I report a service issue or dangerous situation at a stop?', a: 'For immediate safety concerns, call 999. For non-emergency issues, contact the Mobility Office or use the contact form on this page. We will escalate to the relevant transport operator.' },
  { q: 'Are Santander Cycles available year-round?', a: 'Yes, the scheme operates 24/7, 365 days a year. However, availability may be affected by severe weather. Check the app before travelling for live dock availability.' },
]

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${item.q.replace(/\s+/g, '-').toLowerCase().slice(0, 30)}`

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
      >
        <span>{item.q}</span>
        <span className={`faq-chevron${open ? ' faq-chevron--open' : ''}`} aria-hidden="true">▾</span>
      </button>
      <div
        id={id}
        className={`faq-answer${open ? ' faq-answer--open' : ''}`}
        aria-hidden={!open}
      >
        <p>{item.a}</p>
      </div>
    </div>
  )
}

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Your name is required.'
  if (!fields.email.trim()) {
    errors.email = 'Your email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!fields.subject) errors.subject = 'Please select a subject.'
  if (!fields.message.trim()) errors.message = 'Please include a message.'
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(err => ({ ...err, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <div className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with the St Mary's Mobility Office for travel planning help, accessibility support, or general transport enquiries.</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container contact-layout">
          {/* Form */}
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="contact-section-title">Send a Message</h2>

            {submitted ? (
              <div className="contact-success card" role="status" aria-live="polite">
                <span className="contact-success__icon" aria-hidden="true">✓</span>
                <h3>Message Received</h3>
                <p>Thank you, <strong>{fields.name}</strong>. We'll reply to <strong>{fields.email}</strong> within 2 working days.</p>
                <button className="btn btn--secondary" onClick={() => { setSubmitted(false); setFields({ name: '', email: '', subject: '', message: '' }) }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form card" onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <p className="contact-privacy">
                  🔒 Your information is used only to respond to your enquiry. We do not store or share your data.
                </p>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    id="name" name="name" type="text"
                    className="form-input"
                    value={fields.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                  {errors.name && <span id="name-error" className="form-error" role="alert">⚠ {errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    className="form-input"
                    value={fields.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="your@email.ac.uk"
                    autoComplete="email"
                  />
                  {errors.email && <span id="email-error" className="form-error" role="alert">⚠ {errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    id="subject" name="subject"
                    className="form-select"
                    value={fields.subject}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="">Select a subject…</option>
                    <option value="journey-planning">Journey Planning</option>
                    <option value="accessibility">Accessibility Support</option>
                    <option value="service-alert">Service Alert / Disruption</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <span id="subject-error" className="form-error" role="alert">⚠ {errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message" name="message"
                    className="form-textarea"
                    value={fields.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Tell us how we can help…"
                    rows={5}
                  />
                  {errors.message && <span id="message-error" className="form-error" role="alert">⚠ {errors.message}</span>}
                </div>

                <button type="submit" className="btn btn--primary contact-submit">
                  Send Message →
                </button>
              </form>
            )}
          </section>

          {/* Right: Office Details + FAQ */}
          <aside className="contact-aside">
            <div className="contact-details card">
              <h2 className="contact-section-title">Mobility Office</h2>
              <ul className="contact-details__list" role="list">
                <li>
                  <span className="contact-details__icon" aria-hidden="true">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>Waldegrave Road, Twickenham, TW1 4SX</p>
                  </div>
                </li>
                <li>
                  <span className="contact-details__icon" aria-hidden="true">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:+442089400001">+44 (0)20 8940 0001</a>
                  </div>
                </li>
                <li>
                  <span className="contact-details__icon" aria-hidden="true">✉️</span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:mobility@stmarys.ac.uk">mobility@stmarys.ac.uk</a>
                  </div>
                </li>
                <li>
                  <span className="contact-details__icon" aria-hidden="true">🕐</span>
                  <div>
                    <strong>Opening Hours</strong>
                    <p>Mon–Fri: 08:00–18:00</p>
                    <p>Sat–Sun: 10:00–16:00</p>
                  </div>
                </li>
              </ul>
            </div>

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="contact-section-title">Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqItems.map(item => <FaqItem key={item.q} item={item} />)}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
