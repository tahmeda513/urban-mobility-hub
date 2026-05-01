import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  )
}
