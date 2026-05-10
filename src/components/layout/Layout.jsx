import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="relative z-10 antialiased text-slate-900">
      <Header />
      <main className="min-h-screen">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
