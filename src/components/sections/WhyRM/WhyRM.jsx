import { useState } from "react";
import { Link } from "react-router-dom";
import { whyCards } from "../../../data/siteData";
import { asset } from "../../../lib/assets";

const eyebrow = 'inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase'

const WhyRM = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100/60 to-slate-50/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 max-w-2xl animate-fade-up">
          <span className={eyebrow}>
            Why TDM Infra
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            With TDM Infra you can expect the best
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* IMAGE CONTAINER LEFT */}
          <div className="relative hidden md:block">
            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-400/20 via-blue-600/10 to-white animate-fade-in-left"
              style={{ transform: 'rotate(-3deg)', animationDelay: '120ms', animationDuration: '850ms', animationTimingFunction: 'ease-out' }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/15 border border-slate-200/80 animate-fade-in-up"
              style={{ animationDelay: '210ms', animationDuration: '950ms', animationTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
            >
              <img
                src={asset("/assets-global.website-files.com/617f940309b8436c1932ee96/6189e8b1c5f911c904e92d52_Hero%20image.png")}
                alt="TDM Infra Equipment"
                className="w-full"
              />
            </div>
            <div className="absolute -left-8 top-1/4 w-28 rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200/80 animate-fade-in-left"
              style={{ animationDelay: '120ms', animationDuration: '850ms', animationTimingFunction: 'ease-out' }}
            >
              <img
                src={asset("/assets-global.website-files.com/617f940309b8436c1932ee96/6189e90fe13c3d15e2044abb_hero%20side%20image%202-p-500.png")}
                alt="Equipment"
                className="w-full"
              />
            </div>
            <div className="absolute -right-6 bottom-1/4 w-28 rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200/80 animate-fade-in-right"
              style={{ animationDelay: '320ms', animationDuration: '900ms', animationTimingFunction: 'ease-out' }}
            >
              <img
                src={asset("/assets-global.website-files.com/617f940309b8436c1932ee96/6189e8e065063ae4d872ec67_Hero%20Side%20Image.png")}
                alt="Truck"
                className="w-full"
              />
            </div>
          </div>
          {/* CONTENT CONTAINER RIGHT */}
          <div className="space-y-3">
            {whyCards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  expandedIndex === index
                    ? 'border-blue-300 bg-white shadow-lg shadow-slate-900/8 ring-1 ring-blue-100'
                    : 'border-slate-200/80 bg-white/80 hover:border-blue-200'
                }`}
                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500/15 to-blue-600/10 flex items-center justify-center flex-shrink-0 ring-1 ring-slate-100">
                    <img src={card.image} alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <h3 className="flex-1 text-base font-semibold text-slate-900">{card.title}</h3>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${expandedIndex === index ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none"
                  >
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {expandedIndex === index && (
                  <p className="mt-3 pt-3 text-sm text-slate-600 border-t border-slate-100">
                    {card.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* BUTTONS at CENTER */}
        <div className="flex flex-wrap gap-3 justify-center animate-fade-up" style={{ animationDelay: '160ms' }}>
          <Link
            to="/equipments"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            style={{ color: '#fff' }}
          >
            See our Equipments
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white hover:border-slate-900 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
      {/* Reuse the keyframes from Hero locally in this section */}
      <style jsx>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-50px) scale(0.97); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-fade-in-left {
          animation-name: fade-in-left;
          animation-fill-mode: both;
        }
        @keyframes fade-in-right {
          0% { opacity: 0; transform: translateX(50px) scale(0.97);}
          100% { opacity: 1; transform: translateX(0) scale(1);}
        }
        .animate-fade-in-right {
          animation-name: fade-in-right;
          animation-fill-mode: both;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(38px) scale(0.97);}
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-fill-mode: both;
        }
      `}</style>
    </section>
  );
};

export default WhyRM;
