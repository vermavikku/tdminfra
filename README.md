# TDM Infra  - Equipment  Website

A modern React + Vite website for TDM Infra, an Indian equipment  company specializing in boom lifts, cranes, scissor lifts, and truck mounted lifts for industrial and commercial projects.

## Project Overview

**Tech Stack:**
- **Frontend Framework:** React 19.2.5
- **Build Tool:** Vite 8.0.10
- **Routing:** React Router DOM 7.14.2
- **Styling:** CSS (with Webflow CSS imported from external source)

## Folder Structure

```
src/
├── main.jsx              # Entry point - renders App component
├── App.jsx              # Main app with routing configuration
├── App.css              # Global app styles
├── index.css            # Root CSS styles
├── assets/              # Local assets (images, icons)
├── components/          # Reusable React components
│   ├── layout/          # Layout components
│   │   ├── Header/       # Navigation header with mobile menu
│   │   ├── Footer.jsx    # Site footer with contact info
│   │   └── Layout.jsx   # Main layout wrapper
│   └── sections/        # Page section components
│       ├── Hero/        # Homepage hero section
│       ├── About/       # About equipment types
│       ├── WhyRM/       # Why choose us section
│       ├── Features/    # Features section
│       ├── EquipmentGrid.jsx  # Equipment listing with filters
│       ├── Gallery.jsx  # Photo gallery
│       ├── Testimonials/  # Customer testimonials
│       ├── CTA.jsx       # Call to action
│       ├── FAQs.jsx      # Frequently asked questions
│       └── Contact/     # Contact form section
├── pages/               # Route pages
│   ├── Home.jsx         # Homepage (composes all sections)
│   ├── Equipments.jsx  # Equipment listing page
│   ├── EquipmentDetails.jsx  # Individual equipment detail page
│   ├── About.jsx        # About page
│   ├── Gallery.jsx     # Gallery page
│   └── Contact.jsx     # Contact page
├── data/
│   └── siteData.js      # All site content (equipment, testimonials, etc.)
├── lib/
│   └── assets.js        # Asset path helper functions
├── config/             # Configuration files (empty)
├── features/           # Feature modules (empty)
├── hooks/              # Custom React hooks (empty)
├── store/              # State management (empty)
└── styles/             # Additional styles (empty)
```

## Code Flow

### 1. Application Entry Point
```
index.html → main.jsx → App.jsx
```

1. **index.html** loads the React app in the `#root` div
2. **main.jsx** imports and renders the `App` component
3. **App.jsx** sets up routing with `BrowserRouter`

### 2. Routing Structure (App.jsx)
```
BrowserRouter
├── ScrollToTop (scrolls to top on route change)
└── Routes
    └── Layout (wraps all routes)
        ├── / → Home
        ├── /equipments → Equipments
        ├── /equipments/:equipmentSlug → EquipmentDetails
        ├── /about → About
        ├── /gallery → Gallery
        ├── /contact → Contact
        └── * → Navigate to / (catch-all)
```

### 3. Layout Components
- **Layout.jsx**: Wraps all pages with Header and Footer
- **Header.jsx**: Navigation with mobile drawer menu
- **Footer.jsx**: Contact info, links, newsletter signup

### 4. Page Flow

**Home Page** (`/`)
- Composes multiple sections: Hero → About → WhyRM → Features → EquipmentGrid (compact) → Gallery → Testimonials → CTA → FAQs

**Equipments Page** (`/equipments`)
- Full EquipmentGrid with category filters (All, Boom lift, Crane, Scissor Lift, Truck Mounted Lift)

**Equipment Details Page** (`/equipments/:slug`)
- Dynamic page showing detailed equipment information
- Uses URL slug to find equipment from siteData
- Shows overview, specifications, and CTA to contact

**About, Gallery, Contact Pages**
- Simple wrappers around corresponding section components

### 5. Data Flow
All content is stored in `src/data/siteData.js`:
- `contactDetails` - Email, phone numbers
- `heroLogos` - Trusted brand logos
- `aboutCards` - Equipment type cards
- `whyCards` - Why choose us items
- `featureCards` - Feature highlights
- `equipmentFilters` - Equipment categories
- `equipmentCards` - Equipment listings with slugs
- `galleryItems` - Gallery images
- `testimonials` - Customer reviews
- `faqs` - Frequently asked questions
- `footerColumns` - Footer navigation links

### 6. Key Components

**EquipmentGrid.jsx**
- Displays equipment cards with category filtering
- Uses `useState` for filter state
- Uses `useMemo` for filtered cards
- Supports `compact` prop for homepage display

**EquipmentDetails.jsx**
- Uses `useParams` to get equipment slug from URL
- Finds matching equipment from `equipmentCards`
- Has special content for "20 ton Small Mini Boom Truck Crane"
- Generates generic content for other equipment based on category

**Header.jsx**
- Uses `useState` for mobile menu toggle
- `NavLink` for active route styling
- Contains equipment dropdown (currently commented out)

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Development Notes

- The project uses external Webflow CSS loaded in index.html
- Images are loaded from external CDN (website-files.com)
- No backend - all data is static in siteData.js
- Responsive design with mobile drawer navigation
- Scroll-to-top behavior on route changes

## Business Context

TDM Infra (formerly RM Manlift) is an Indian equipment  company providing:
- Boom Lifts (30 ft to 200 ft)
- Cranes (20 ton to 400 ton)
- Scissor Lifts (19 ft to 105 ft)
- Truck Mounted Lifts

Target customers: Industrial and commercial construction companies, plant maintenance teams, infrastructure projects.