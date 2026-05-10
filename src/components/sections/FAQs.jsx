import { Link } from 'react-router-dom'
import { faqs } from '../../data/siteData'

const eyebrow = 'inline-flex items-center px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold tracking-wide uppercase'

const FAQs = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100/50 to-transparent">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10 animate-fade-up">
          <span className={eyebrow}>
            FAQ
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group border border-slate-200/80 bg-white rounded-xl overflow-hidden shadow-sm animate-fade-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="text-sm font-medium text-slate-900 pr-4">{faq.question}</span>
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="flex justify-center mt-10 animate-fade-up" style={{ animationDelay: '140ms' }}>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white hover:border-slate-900 transition-all"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQs
