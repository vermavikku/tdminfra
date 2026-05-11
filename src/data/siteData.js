import { asset, slugify } from '../lib/assets'

export const contactDetails = {
  email: 'info@rmmanlift.com',
  phone: '+91 9619763358',
  secondaryPhone: '+91 9619763358',
  whatsapp: '+91 9619763358',
}

export const heroLogos = [
  { name: 'LT', src: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6189ec04cc141f30758debdf_LT%20logo.png') },
  { name: 'Ultratech', src: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6189f226e02dc56d0baa7257_Ultratech%20logo.png') },
  { name: 'FLSMIDTH', src: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6189f23b2280a1c6789a3b36_FLSMIDTH%20Logo.png') },
  { name: 'Vedanta', src: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6189f2693086a54632f4567f_Vedanta%20logo.png') },
]

export const aboutCards = [
  {
    title: 'Boom Lifts',
    summary: '30 ft to 200 ft',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6184d772780ab438afab8bf6_Boomlift%20Icon.png'),
    description: 'Articulating and telescopic boom lifts for access at height with fast delivery.',
  },
  {
    title: 'Cranes',
    summary: '20 ton to 400 ton',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6184dd0fbcfddbfc8a612e6d_crane%20icon.png'),
    description: 'Rough terrain, crawler, and all-terrain cranes for heavy lifting projects.',
  },
  {
    title: 'Scissor Lifts',
    summary: '19 ft to 105 ft',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/638db9ac14dc6e788454c617_Scissor%20Lift%20rental.png'),
    description: 'Electric and diesel scissor lifts for maintenance, installation, and fit-out work.',
  },
  {
    title: 'Truck Mounted Lifts',
    summary: 'Multiple models',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6184deea3f2e026d08e3864f_truck%20mounted%20lift%20icon.png'),
    description: 'Flexible truck mounted access solutions for quick deployment on live sites.',
  },
]

export const whyCards = [
  {
    title: 'Competitive Rental Rates',
    description: 'Clear pricing structures that are designed to keep large jobs and repeat rentals practical.',
    image: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6198611e6e036a287c25745f_goodrate.png'),
  },
  {
    title: 'Well Maintained Machines',
    description: 'Trusted equipment backed by routine servicing and site-ready inspections.',
    image: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/6198613f5cae696bf2418c0f_qualitymachines.png'),
  },
  {
    title: 'Fast Delivery',
    description: 'Mobilization support that helps keep projects moving when schedules are tight.',
    image: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/61986157aa22a54c4a462c0d_FastTransport.png'),
  },
  {
    title: '24/7 Support & Backup',
    description: 'Responsive support for access planning, operator guidance, and machine backup.',
    image: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/61986195daa7546d504303a7_Support.png'),
  },
]

export const featureCards = [
  {
    title: '5 Star Customer Service',
    description: 'A team that stays focused on service quality from enquiry to de-hire.',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/619862dd045c5701db29d1e8_customerservice-p-500.png'),
  },
  {
    title: 'Fully trained Operators & Engineers',
    description: 'Workforces that understand equipment, safety, and site coordination.',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/619862f40a77419cd316968f_Operator-p-500.png'),
  },
  {
    title: 'Quality maintained equipments',
    description: 'A reliable fleet with machine condition and compliance at the center.',
    icon: asset('/cdn.prod.website-files.com/617f940309b8436c1932ee96/61986306045c57c34029d357_Machines-p-500.png'),
  },
]

export const equipmentFilters = ['All', 'Boom lift', 'Crane', 'Scissor Lift', 'Truck Mounted Lift']

export const equipmentCards = [
  {
    title: '300 ton All Terrain Crane',
    slug: slugify('300 ton All Terrain Crane'),
    category: 'Crane',
    image: asset('/cdn.prod.website-files.com/617f940409b84318ac32eeba/618fb535098c65de881cd3da_300TonAllTerrainCrane-p-500.png'),
    detail: 'For heavy industrial lifts, shutdowns, and infrastructure work.',
  },
  {
    title: '180 ft to 185 ft Telescopic Boom Lift',
    slug: slugify('180 ft to 185 ft Telescopic Boom Lift'),
    category: 'Boom lift',
    image: asset('/cdn.prod.website-files.com/617f940409b84318ac32eeba/618e2de1483de407ce89a9a3_180-185-ft-diesel-dual-fuel-telescopic-boom-lift-2-890-p-500.png'),
    detail: 'Reach far and high with dual fuel flexibility and wide platform access.',
  },
  {
    title: '60 ft Telescopic Boom Lift',
    slug: slugify('60 ft Telescopic Boom Lift'),
    category: 'Boom lift',
    image: asset('/cdn.prod.website-files.com/617f940409b84318ac32eeba/618757d2c438f364d0f29018_60-ft-diesel-dual-fuel-telescopic-boom-lift-2-624-p-500.png'),
    detail: 'A versatile mid-height access machine for industrial and commercial projects.',
  },
  {
    title: '20 ton Small Mini Boom Truck Crane',
    slug: slugify('20 ton Small Mini Boom Truck Crane'),
    category: 'Truck Mounted Lift',
    image: asset('/cdn.prod.website-files.com/617f940409b84318ac32eeba/618fa6948e115ccbb07f25cf_5d1c7b2ccc21320190703045348-p-500.png'),
    detail: 'Compact lifting support when maneuverability matters on site.',
  },
  {
    title: '100 ton Crawler Crane',
    slug: slugify('100 ton Crawler Crane'),
    category: 'Crane',
    image: asset('/cdn.prod.website-files.com/617f940409b84318ac32eeba/618fb4213fb9e73c45e1a6f7_100tonCrawlerCrane-p-500.png'),
    detail: 'Stable lifting on challenging terrain and long-duration project sites.',
  },
  {
    title: '150 ft Telescopic Boom Lift',
    slug: slugify('150 ft Telescopic Boom Lift'),
    category: 'Boom lift',
    image: asset('/cdn.prod.website-files.com/617f940409b84318ac32eeba/618e2d06d7eeac567c87aeb1_150-ft-diesel-dual-fuel-telescopic-boom-lift-2-867-p-500.png'),
    detail: 'Ideal for large facilities, plants, and projects needing serious outreach.',
  },
]

export const galleryItems = [
  {
    title: 'On-site coordination',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/625ce3c4bac70495539befa1_0a188c07-2473-4986-9dd0-7b80b3f902a8.JPG'),
  },
  {
    title: 'Heavy lift operations',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/625ce3c4bac7041dbe9befa0_92ce6da6-6247-48cf-8f1d-6766da01a695.JPG'),
  },
  {
    title: 'Fleet readiness',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/625ce3c364cd3d9bcce77201_9beeb269-51b7-46b6-8dae-8f62e010f4c3.JPG'),
  },
  {
    title: 'Machines in action',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/625ce3c32ecbbbfc79bae59b_9c879efb-d195-4070-823a-6bd8366e0fb8.JPG'),
  },
  // {
  //   title: 'Crane close-up',
  //   image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/61923064ae6b84a257555a0b_Crane-p-1080.jpeg'),
  // },
  // {
  //   title: 'Inspection and readiness',
  //   image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/65150aa8aa4ccbb3809eb6e7_06e7e434-0ab6-4278-89db-0617cf3ed919-p-800.jpg'),
  // },

  {
    title: 'Crew support',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/63dc6fc24d722550f8aebeee_2014c330-49dd-4cf2-b211-eed92dcfecc9.JPG'),
  },
    /*
  {
    title: 'High reach machines',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/63dc6f84bd5fd1d720df05a5_678e107c-e201-4d36-95b3-ab000a1eeab6.JPG'),
  },
  {
    title: 'Access equipment lineup',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/63dc6f02ff9123f0b400aaf6_7c105d83-3254-4656-a5e1-54ef0273fad4.JPG'),
  },
  {
    title: 'Site deployment',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/62e4cf024512d6849fbf1cd6_cf312db3-7318-44ab-bab6-9b30f612c368.JPG'),
  },
  */
  // {
  //   title: 'Field service',
  //   image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/625ce50575115fec2480d0a9_PHOTO-2022-04-14-21-07-42.jpg'),
  // },
  // {
  //   title: 'RM fleet branding',
  //   image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/660be8c682e549c13f6cda69_rm3.jpeg'),
  // },
]

export const testimonials = [
  {
    quote: 'Great service and experienced operator',
    author: 'Jagdish Yaadav',
    role: 'Site Manager, L&T',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/617f940409b84327e032ef1f_image-1-testimonials-saaslify-template.png'),
  },
  {
    quote: 'Fast delivery and easy to deal with',
    author: 'Sharad Patel',
    role: 'Construction Manager, Vedanta',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/617f940409b843d28232ef1e_image-3-testimonials-saaslify-template.png'),
  },
  {
    quote: 'New quality equipments and good staff',
    author: 'Kaushik Das',
    role: 'Site Manager, Reliance Industries',
    image: asset('/assets-global.website-files.com/617f940309b8436c1932ee96/617f940409b843ebb532ef1d_image-2-testimonials-saaslify-template.png'),
  },
]

export const faqs = [
  {
    question: 'What is the minimum hire period?',
    answer: 'We support short and long rental durations depending on the machine and project requirement. Our team can help you choose the most practical option.',
  },
  {
    question: 'Is transport included?',
    answer: 'Transport can be arranged as part of the quote, depending on the machine, location, and schedule.',
  },
  {
    question: 'How quickly can I have an equipment delivered?',
    answer: 'For many locations we can mobilize quickly once the scope and machine availability are confirmed.',
  },
  {
    question: 'Do you provide operator?',
    answer: 'Yes, trained operators and engineers can be provided with suitable equipment and project support.',
  },
  {
    question: 'What if the access equipment breaks down or has a fault?',
    answer: 'We offer responsive backup support, troubleshooting, and replacement planning to reduce downtime.',
  },
  {
    question: 'What is your Rental Rates?',
    answer: 'Rates depend on the machine, quality, rental period, and site location. Contact our team for a tailored quote.',
  },
]

export const footerColumns = [
  { label: 'Home', to: '/' },
  { label: 'Equipments', to: '/equipments' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]
