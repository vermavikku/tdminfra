import { Link } from "react-router-dom";
import { aboutCards } from "../../../data/siteData";

const eyebrow =
  "inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase";

const About = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 max-w-2xl animate-fade-up">
          <span className={eyebrow}>About TDM Infra</span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            All your Access & Lifting <br />
            Equipment  needs covered
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutCards.map((card, index) => (
            <article
              key={card.title}
              className="border border-slate-200/80 bg-white rounded-2xl p-5 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:border-blue-200/60 transition-all animate-fade-up"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/15 to-blue-600/10 flex items-center justify-center mb-4 ring-1 ring-slate-100">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>

        <div
          className="flex flex-wrap gap-3 mt-10 animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <Link
            to="/equipments"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            style={{ color: "#fff" }}
          >
            See All Equipments →
          </Link>
          {window.location.pathname !== '/about' && (
            <Link
              to="/about"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white hover:border-slate-900 transition-all"
            >
              Why TDM Infra
            </Link>
          )}
     
        </div>
      </div>
    </section>
  );
};

export default About;
