import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__bg" aria-hidden="true">
        <div className="notfound__glow" />
      </div>
      <div className="notfound__content">
        <span className="notfound__code" aria-hidden="true">404</span>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__desc">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn--primary">← Go to Home</Link>
          <Link to="/planner" className="btn btn--secondary">Plan a Journey</Link>
        </div>
      </div>
    </div>
  )
}
