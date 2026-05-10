import { useState } from 'react'
import { Link } from 'react-router-dom'
import { testimonials } from '../../../data/siteData'

const cardBaseClass =
  'flex flex-col items-center text-center bg-white rounded-2xl sm:rounded-3xl px-4 sm:px-7 md:px-10 py-7 sm:py-9 md:py-12 shadow-xl shadow-slate-900/10 border border-slate-200'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = testimonials[activeIndex]
  const next = () => setActiveIndex((v) => (v + 1) % testimonials.length)
  const prev = () => setActiveIndex((v) => (v - 1 + testimonials.length) % testimonials.length)

  const handleScroll = (event) => {
    const { scrollLeft, clientWidth } = event.currentTarget
    const index = Math.round(scrollLeft / clientWidth)
    if (index !== activeIndex && index >= 0 && index < testimonials.length) {
      setActiveIndex(index)
    }
  }

  return (
    <section className="py-14 sm:py-16 md:py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 bg-surface text-muted">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-ink">
            Take a look at our past customers<br className="hidden md:block" /> success stories
          </h2>
        </div>

        {/* Desktop card with arrows */}
        <div className="hidden lg:flex items-center justify-center gap-6 mb-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm text-slate-900 hover:bg-slate-100 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={`${cardBaseClass} max-w-2xl w-full`}>

            <img
              src={active.image}
              alt={active.author}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-blue-100 mb-5 sm:mb-6"
            />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-relaxed mb-5 sm:mb-6 max-w-lg">
              &ldquo;{active.quote}&rdquo;
            </p>

            <div className="text-sm text-slate-500">
              <strong className="text-slate-900 font-bold">{active.author}</strong>
              <span className="mx-2">·</span>
              <span>{active.role}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-900 shadow-sm hover:bg-slate-100 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Mobile + tablet swipe/scroll list */}
        <div
          className="lg:hidden mb-8 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
        >
          {testimonials.map((item) => (
            <article key={item.author} className={`${cardBaseClass} min-w-full snap-start`}>
              <img
                src={item.image}
                alt={item.author}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-blue-100 mb-5 sm:mb-6"
              />
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed mb-5 sm:mb-6 max-w-lg">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="text-sm text-slate-500">
                <strong className="text-slate-900 font-bold">{item.author}</strong>
                <span className="mx-2">·</span>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mb-10">
          {testimonials.map((item, index) => (
            <button
              key={item.author}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial from ${item.author}`}
              className={`h-2 rounded-full border-none cursor-pointer transition-all duration-200 ${
                index === activeIndex
                  ? 'w-6 bg-blue-600'
                  : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
 

        {/* CTA */}
        <div className="flex justify-center animate-fade-up" style={{ animationDelay: '120ms' }}>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            style={{ color: '#fff' }}
          >
            Contact Us
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Testimonials