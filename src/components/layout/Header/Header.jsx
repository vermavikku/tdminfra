import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { contactDetails } from '../../../data/siteData'
import { asset } from '../../../lib/assets'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Equipments', to: '/equipments' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
]

const equipmentDropdown = [
  { label: 'Boom Lifts', note: '30 ft to 200 ft', to: '/equipments' },
  { label: 'Cranes', note: '20 ton to 400 ton', to: '/equipments' },
  { label: 'Scissor Lifts', note: '19 ft to 105 ft', to: '/equipments' },
  { label: 'Truck Mounted Lifts', note: 'Different models', to: '/equipments' },
]

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinkClass = ({ isActive }) =>
    `px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-100 text-blue-800'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-3 left-3 sm:top-4 sm:left-4 z-50 flex flex-col justify-center gap-1.5 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-900/8"
        aria-expanded={mobileOpen}
        aria-controls="mobile-drawer"
        onClick={() => setMobileOpen(true)}
      >
        <span className="block w-5 h-0.5 mx-auto bg-slate-800 rounded-full" />
        <span className="block w-5 h-0.5 mx-auto bg-slate-800 rounded-full" />
        <span className="block w-5 h-0.5 mx-auto bg-slate-800 rounded-full" />
      </button>

      <header className="sticky top-0 left-0 right-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto pl-16 sm:pl-20 lg:pl-6 pr-4 sm:pr-6 flex items-center min-h-[64px] sm:min-h-[72px]">

          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="TDM Infra home">
              <img
                className="h-10 sm:h-12 w-auto"
                src={asset('/logo/tdm-logo.jpeg')}
                alt="TDM Infra"
              />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1 mx-auto"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full font-semibold text-[15px] bg-blue-600 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5"
              style={{ color: '#fff' }}
            >
              Get Quick Quote
            </Link>
          </div>

        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        id="mobile-drawer"
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[300px] max-w-[88vw] sm:max-w-[85vw] bg-white shadow-2xl shadow-slate-900/15 transition-transform duration-300 ease-out border-r border-slate-200/80 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col">

          <div className="flex items-center justify-between p-4 border-b border-slate-200/80">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="TDM Infra home">
              <img
                className="h-10 sm:h-12 w-auto"
                src={asset('/logo/tdm-logo.jpeg')}
                alt="TDM Infra"
              />
          </Link>
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-700"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center min-h-[48px] px-4 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

            </nav>
          </div>

          <div className="p-4 border-t border-slate-200/80 flex flex-col gap-3">
            <Link
              to="/equipments"
              className="flex items-center justify-center h-12 rounded-xl font-medium bg-white border border-slate-200 text-slate-800 hover:bg-black hover:!text-white"
              onClick={() => setMobileOpen(false)}
            >
              View All Equipments
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center h-12 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => setMobileOpen(false)}
              style={{ color: '#fff' }}
            >
              Get Quick Quote
            </Link>
           
          </div>

        </div>
      </aside>
    </>
  )
}

export default Header
