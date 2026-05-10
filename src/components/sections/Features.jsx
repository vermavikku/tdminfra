import { Link } from 'react-router-dom'
import { featureCards } from '../../data/siteData'

const eyebrow = 'inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase'

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 max-w-2xl animate-fade-up">
          <span className={eyebrow}>
            Service Standard
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            We aim for 5 Star Service and Exceptional Support
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className="border border-slate-200/80 bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <img src={card.icon} alt="" aria-hidden="true" className="w-14 h-14 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-10 animate-fade-up" style={{ animationDelay: '180ms' }}>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:text-white transition-all"
          >
            View our ISO Certificates
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Features
