# St Mary's Urban Mobility Hub

A front-end React application built for **CPS4006 Web Design and Development** (Assessment 2) at St Mary's University, Twickenham.

## Project Overview

The Urban Mobility Hub is a centralised transport information and planning platform for students, staff, and visitors at St Mary's University. It aggregates transport information across six modes — Underground, Bus, National Rail, Cycling, River Bus, and Emirates Cable Car — through a clean, accessible, and responsive interface.

## Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI component framework |
| React Router | v7.1.1 | Client-side SPA routing |
| Context API | (built-in) | Global state management |
| Vite | 6.x | Build tool and dev server |
| CSS Custom Properties | (native) | Hand-authored design system |

## Getting Started

### Prerequisites
- Node.js v18 or above
- npm v9 or above

```bash
node -v   # should print v18+
npm -v    # should print v9+
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3074](http://localhost:3074) in your browser.

### Production build

```bash
npm run build
npm run preview   # preview the built output at http://localhost:4173
```

## Folder Structure

```
urban-mobility-hub/
├── index.html              Entry point HTML shell
├── package.json            Dependencies and npm scripts
├── vite.config.js          Vite bundler configuration
├── public/
│   └── _redirects          Netlify SPA redirect rule
└── src/
    ├── main.jsx            React DOM root render
    ├── App.jsx             Router tree and provider composition
    ├── App.css             Skip link styles
    ├── index.css           Global design system and CSS variables
    ├── context/
    │   └── AppContext.jsx  Global state — favourites, journey history
    ├── data/
    │   ├── services.js     Transport services data (6 modes)
    │   ├── news.js         Service alerts and news items
    │   └── routes.js       Popular routes and TfL line data
    ├── components/
    │   ├── Navbar/         Fixed header with responsive navigation
    │   ├── Footer/         Site footer with link columns
    │   └── Layout/         Page wrapper — Navbar + main + Footer
    └── pages/
        ├── Home/           Landing page with live clock and dashboard
        ├── Services/       Transport options browser with filter/search
        ├── JourneyPlanner/ Route planning interface
        ├── Accessibility/  Accessibility features and WCAG compliance
        ├── News/           Service alerts and updates
        ├── Contact/        Contact form and FAQ accordion
        └── NotFound/       404 fallback page
```

## Architecture Decisions

### Single-Page Application (SPA)
All routing is handled client-side via React Router v7. The server serves a single `index.html`; navigation between pages does not trigger full page reloads.

### Feature-based folder structure
Pages and components are co-located with their CSS files. This keeps concerns together and avoids fragmentation from global stylesheet folders.

### Context API for shared state
Global state (user favourites and journey history) is managed with React Context and `useState`. This avoids prop drilling across the component tree without introducing a third-party state library like Redux or Zustand.

### Static data layer
Transport data is defined in plain JavaScript modules under `src/data/`. This decouples the UI from data sourcing. In a production version, these modules would be replaced with API calls to TfL's Open Data endpoints.

### No CSS framework
The application uses a hand-authored design system built on CSS Custom Properties (variables). This gives full control over every visual detail and avoids the bundle overhead of utility-first frameworks. The design system uses a warm editorial palette (cream backgrounds, coral red accent, deep indigo, forest green) paired with Playfair Display for headings, Lato for body text, and JetBrains Mono for time/data values.

## Pages and Features

| Page | Route | Key Features |
|---|---|---|
| Home | `/` | Live clock, stats bar, urgent alerts strip, personalised dashboard, quick actions |
| Services | `/services` | Category filter tabs, full-text search, favourite toggle, status badges |
| Journey Planner | `/planner` | Controlled form, swap button, simulated async search, TfL line status, saved history |
| Accessibility | `/accessibility` | Feature cards, Passenger Assist panel, WCAG 2.1 compliance table |
| News | `/news` | Filter bar with counts, colour + text coded articles, urgent flagging |
| Contact | `/contact` | Validated form with ARIA error binding, success state, FAQ accordion |
| Not Found | `/*` | 404 catch-all with navigation links |

## Accessibility

Built to **WCAG 2.1 Level AA**:
- Skip navigation link targeting `#main-content`
- Semantic HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, logical heading hierarchy
- ARIA roles, states, and properties on all custom interactive elements
- `aria-live="polite"` on dynamic result regions
- All form inputs have associated `<label>` elements
- `aria-invalid` and `aria-describedby` on form fields with validation errors
- Focus styles using `:focus-visible` with a 2px coral outline
- Colour contrast exceeding 7:1 for primary text on light background
- Status indicators use both colour and text simultaneously

## Version Control

This project is managed with **Git**. Recommended commit message conventions:

```
feat: add journey planner search results
fix: correct aria-selected on service filter tabs
style: update navbar scrolled background opacity
refactor: extract ResultCard into separate component
a11y: add aria-live region to news filter list
docs: update README with deployment instructions
```

### Recommended branching strategy
- `main` — production-ready code only
- `develop` — integration branch for features
- `feature/[name]` — individual feature branches (e.g. `feature/journey-planner`)

## Ethical and Professional Considerations

- **Data accuracy**: All transport data is representative, based on publicly available TfL information. It is not retrieved from a live API. The footer and data disclaimer make this clear.
- **Privacy**: The contact form collects name, email, and message only. Data is not transmitted or stored — the app is front-end only. A privacy notice is displayed above the form submit button.
- **Accessibility**: WCAG 2.1 AA compliance is implemented at the structural level, not as an afterthought.
- **No dark patterns**: Navigation is predictable and consistent. Forms do not auto-submit. No pop-ups, infinite scroll, or attention-capturing mechanisms are present.

## Deployment

The `dist/` folder produced by `npm run build` is a static site deployable to any static host:

| Provider | Method |
|---|---|
| Netlify | Drag and drop `dist/` or connect Git repo |
| Vercel | `vercel --prod` or connect via GitHub |
| GitHub Pages | Push `dist/` contents to `gh-pages` branch |

> **Important:** Because this is a client-side SPA, the server must redirect all requests to `index.html`. The `public/_redirects` file handles this automatically on Netlify.

## Disclaimer

This application is a front-end educational prototype built for academic assessment purposes. It is not affiliated with or endorsed by Transport for London, South Western Railway, or any other transport operator. Transport data shown is representative and not updated in real time.
