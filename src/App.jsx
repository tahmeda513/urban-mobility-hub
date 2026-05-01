import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import JourneyPlanner from './pages/JourneyPlanner/JourneyPlanner'
import Accessibility from './pages/Accessibility/Accessibility'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/NotFound'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Layout>
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/services"      element={<Services />} />
            <Route path="/planner"       element={<JourneyPlanner />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/news"          element={<News />} />
            <Route path="/contact"       element={<Contact />} />
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  )
}
