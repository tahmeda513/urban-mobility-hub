import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      {/* Data disclaimer banner */}
      <div className="footer__disclaimer" role="note" aria-label="Data accuracy notice">
        <span className="footer__disclaimer-icon" aria-hidden="true">ℹ️</span>
        <p>
          <strong>Data Notice:</strong> Transport data shown in this application is representative
          and based on publicly available TfL information. It is <em>not</em> retrieved from a
          live API and does not reflect real-time service status. Always check{' '}
          <a href="https://tfl.gov.uk" target="_blank" rel="noopener noreferrer">tfl.gov.uk</a>{' '}
          for live updates before travelling.
        </p>
      </div>

      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="footer__brand-icon" aria-hidden="true">🚇</span>
          <p className="footer__brand-title">St Mary's Urban Mobility Hub</p>
          <p className="footer__brand-desc">Centralised transport information for St Mary's University, Twickenham.</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Transport</h3>
          <ul>
            <li><Link to="/services">Underground</Link></li>
            <li><Link to="/services">Bus Routes</Link></li>
            <li><Link to="/services">National Rail</Link></li>
            <li><Link to="/services">Cycling</Link></li>
            <li><Link to="/services">River Bus</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Support</h3>
          <ul>
            <li><Link to="/accessibility">Accessibility</Link></li>
            <li><Link to="/planner">Journey Planner</Link></li>
            <li><Link to="/news">Service Alerts</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <ul>
            <li><a href="tel:+442089400000">+44 (0)20 8940 0000</a></li>
            <li><a href="mailto:mobility@stmarys.ac.uk">mobility@stmarys.ac.uk</a></li>
            <li className="footer__address">Waldegrave Road, Twickenham, TW1 4SX</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} St Mary's University Twickenham. Educational prototype — not affiliated with TfL.</p>
        <p>Built for CPS4006 Web Design and Development.</p>
      </div>
    </footer>
  )
}
