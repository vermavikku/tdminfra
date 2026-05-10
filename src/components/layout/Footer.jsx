import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { asset } from '../../lib/assets'
import { fetchJson } from '../../lib/api'
import { contactDetails } from '../../data/profiles'
import { footerColumns } from '../../data/siteData'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'in' },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: '◎' },
  { label: 'Facebook', href: 'https://www.facebook.com', icon: 'f' },
]

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(contactDetails)

  useEffect(() => {
    let cancelled = false

    const loadContactInfo = async () => {
      try {
        const res = await fetchJson('/profiles')
        if (cancelled) return

        const profiles = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : []

        if (!profiles.length) {
          return
        }

        const profile = profiles[0]
        const email = profile.emails?.[0] || contactDetails.email
        const phone = profile.phones?.[0] || contactDetails.phone
        const secondaryPhone = profile.phones?.[1] || profile.phones?.[0] || contactDetails.secondaryPhone
        const whatsapp = profile.phones?.[0] || contactDetails.whatsapp

        setContactInfo({ email, phone, secondaryPhone, whatsapp })
      } catch {
        // Fallback to static contactDetails when API fails.
      }
    }

    loadContactInfo()

    return () => {
      cancelled = true
    }
  }, [])

  const contactItems = [
    { label: contactInfo.email, href: `mailto:${contactInfo.email}`, icon: '✉' },
    { label: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}`, icon: '☎' },
    { label: contactInfo.secondaryPhone, href: `tel:${contactInfo.secondaryPhone.replace(/\s/g, '')}`, icon: '☎' },
    { label: 'WhatsApp', href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`, icon: '◎' },
  ]

  return (
    <footer className="mt-6 pt-14 sm:pt-16 pb-8 text-slate-200 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-9">
        <div className="lg:col-span-1 flex flex-col gap-4 pr-0 lg:pr-6">
          <div className="flex items-center gap-3">
            <img
              className="h-9 sm:h-10 w-auto opacity-95"
              src={asset('/logo/tdm-logo.jpeg')}
              alt="TDM Infra"
            />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-[240px]">
            TDM Infra supplies boom lifts, cranes, scissor lifts, and truck mounted lifts for industrial and commercial projects that need reliable access support.
          </p>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4 pl-0 lg:pl-6 pt-1 md:pt-0 lg:border-l border-white/10">
          <h3 className="text-base font-medium text-white">TDM Infra Rental</h3>
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {footerColumns.map((link) => (
              <Link key={link.label} to={link.to} className="flex items-center gap-2 text-slate-300 text-sm hover:text-sky-400 transition-colors">
                <span className="text-sky-400" aria-hidden="true">›</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4 pl-0 lg:pl-6 pt-1 md:pt-0 lg:border-l border-white/10">
          <h3 className="text-base font-medium text-white">Contact</h3>
          <div className="flex flex-col gap-4">
            {contactItems.map((item) => (
              <a key={item.label} href={item.href} className="flex items-center gap-3 text-slate-300 text-sm hover:text-white">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-sky-400" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="break-all sm:break-normal">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4 pl-0 lg:pl-6 pt-1 md:pt-0 lg:border-l border-white/10">
          <h3 className="text-base font-medium text-white">Social</h3>
          <div className="flex flex-col gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="inline-flex items-center gap-3 min-h-12 px-4 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 hover:text-white transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-sky-400 font-medium">{social.icon}</span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 pt-6 mt-2 border-t border-white/10">
        <p className="text-sm text-slate-500">Copyright (c) TDM Infra. All rights reserved.</p>
        <p className="text-sm text-slate-500">Industrial access equipment, delivered with service.</p>
      </div>
    </footer>
  )
}

export default Footer
