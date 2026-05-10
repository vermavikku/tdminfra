import { Link } from "react-router-dom";
import { asset } from "../../../lib/assets";
import { heroLogos } from "../../../data/siteData";

const Hero = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/80">

      <div
        className="absolute pointer-events-none rounded-full bg-sky-400/25 blur-3xl"
        style={{
          top: '-10%',
          right: '5%',
          width: 'min(420px, 55vw)',
          height: 'min(380px, 45vw)',
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full bg-blue-600/15 blur-3xl"
        style={{
          bottom: '10%',
          left: '-5%',
          width: '280px',
          height: '280px',
          zIndex: 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">

        <div>
          <span className="block text-sm font-semibold tracking-wide text-sky-600 uppercase">
            TDM Infra Rental
          </span>

          <h1 className="mt-3 font-extrabold leading-[1.08] tracking-tight text-slate-900 text-[clamp(1.75rem,7vw,3.25rem)]">
            Hire Quality Boom Lifts,<br />
            Cranes & Scissor Lifts.
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600 max-w-[460px]">
            We provide well-maintained machines with competitive pricing and
            reliable delivery for construction and industrial needs.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-7 font-semibold rounded-xl bg-blue-600 text-white text-[15px] shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:-translate-y-0.5"
            style={{ color: '#fff' }}
            >
              Contact Us
            </Link>
            <Link
              to="/equipments"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white hover:border-slate-900 transition-all"
              >
              See Our Machines
            </Link>
          </div>

          {/* <div className="mt-10 sm:mt-12">
            <span className="block text-sm font-semibold mb-4 text-slate-500 uppercase tracking-wider">
              Trusted by
            </span>
            <div className="flex flex-wrap gap-3 sm:gap-5 items-center">
              {heroLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-7 sm:h-8 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-90 transition-all"
                />
              ))}
            </div>
          </div> */}
        </div>

        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[360px] md:min-h-[420px] mt-2 md:mt-0">
          {/* Animated Side Left Image */}
          <div
            className="
              absolute left-0 top-5 w-[52%] sm:w-[54%]
              rounded-xl sm:rounded-2xl bg-white overflow-hidden z-[1]
              border border-slate-200/80 shadow-xl shadow-slate-900/10
              animate-fade-in-left
            "
            style={{ animationDelay: '120ms', animationDuration: '850ms', animationTimingFunction: 'ease-out' }}
          >
            <img
              src={asset("/assets-global.website-files.com/617f940309b8436c1932ee96/6189e90fe13c3d15e2044abb_hero%20side%20image%202-p-500.png")}
              alt="Equipment listing"
              className="w-full transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Animated Center Main Image */}
          <div
            className="
              relative w-[74%] sm:w-[68%] ml-auto
              rounded-xl sm:rounded-2xl bg-white overflow-hidden z-[2]
              border border-slate-200/80 shadow-2xl shadow-slate-900/15
              animate-fade-in-up
            "
            style={{ animationDelay: '210ms', animationDuration: '950ms', animationTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
          >
            <img
              src={asset("/assets-global.website-files.com/617f940309b8436c1932ee96/6189e8b1c5f911c904e92d52_Hero%20image.png")}
              alt="TDM Infra Equipment"
              className="w-full transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Animated Side Right Image */}
          <div
            className="
              absolute hidden sm:block -right-4 md:-right-6 bottom-6 md:bottom-8 w-[34%] md:w-[38%]
              rounded-xl sm:rounded-2xl bg-white overflow-hidden z-[3]
              border border-slate-200/80 shadow-xl shadow-slate-900/10
              animate-fade-in-right
            "
            style={{ animationDelay: '320ms', animationDuration: '900ms', animationTimingFunction: 'ease-out' }}
          >
            <img
              src={asset("/assets-global.website-files.com/617f940309b8436c1932ee96/6189e8e065063ae4d872ec67_Hero%20Side%20Image.png")}
              alt="Truck"
              className="w-full transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

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

      </div>
    </section>
  );
};

export default Hero;
