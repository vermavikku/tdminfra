import { useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryItems } from '../../data/siteData'

const eyebrow = 'inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase'

const Gallery = () => {
  const [selected, setSelected] = useState(null)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 max-w-2xl animate-fade-up">
          <span className={eyebrow}>
            Gallery
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Our Machines & People in Action
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`relative rounded-2xl overflow-hidden shadow-lg bg-slate-100 animate-fade-up ${index % 6 === 0 || index % 6 === 3 ? 'row-span-2' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelected(item)}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
              <span className="absolute left-3 bottom-3 px-2.5 py-1 rounded-full bg-white/95 text-slate-800 text-xs font-medium shadow-sm">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Hide the button if already on the Gallery page */}
        {window.location.pathname !== '/gallery' && (
          <div className="flex justify-center mt-10 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <Link to="/gallery" 
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white hover:border-slate-900 transition-all"
            >
              View our Gallery
            </Link>
          </div>
        )}
      </div>
 

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button type="button" className="absolute inset-0 border-0 bg-transparent cursor-default" onClick={() => setSelected(null)} aria-label="Close gallery preview" />
          <div className="relative z-10 max-w-[92vw] max-h-[70vh] p-3 rounded-2xl bg-white shadow-2xl border border-slate-200">
            <button type="button" className="absolute top-5 right-5 z-10 px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700" onClick={() => setSelected(null)}>
              Close
            </button>
            <img src={selected.image} alt={selected.title} className="w-full max-h-[65vh] object-contain rounded-xl" />
            <p className="mt-2 text-sm text-slate-600 px-1">{selected.title}</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Gallery
