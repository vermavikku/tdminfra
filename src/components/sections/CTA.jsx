import { Link } from 'react-router-dom'

const eyebrow = 'inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase'

const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-blue-600/[0.06] via-sky-500/[0.08] to-white shadow-xl shadow-slate-900/8 animate-fade-up">
          <div className="flex-1">
            <span className={eyebrow}>
              Quick Quote
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Request a quick free quote now!
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-md">
              Tell us what you need, where the site is, and when the machine must be ready. We&apos;ll take it from there.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            style={{ color: '#fff' }}
            >
              Get Quick Quote
            </Link>
            <Link
              to="/equipments"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white hover:border-slate-900 transition-all"
              >
              See our Equipments
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
