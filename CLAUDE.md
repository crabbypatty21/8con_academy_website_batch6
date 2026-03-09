# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

8Con Academy Website — a forex trading & financial literacy academy site (https://8conacademy.com). Full-stack React + Express application.

## Commands

- **Dev server:** `npm run dev` — runs Vite (port 5173) and Express backend (port 3001) concurrently
- **Build:** `npm run build` — Vite production build to `/dist`
- **Lint:** `npm run lint` — ESLint
- **Preview:** `npm run preview` — preview production build
- **Start:** `npm run start` — runs Express server only (serves built static files)

No test framework is configured.

## Architecture

### Frontend (React 19 + Vite)

- **Entry:** `index.html` → `src/main.jsx` → `src/App.jsx`
- **Routing:** React Router DOM v7 with routes defined in `App.jsx`. Routes map to pages like `/sub-brands`, `/aboutus`, `/registration`, and individual brand pages (`/8construct`, `/8conedge`, `/8concise`, etc.)
- **Home page composition:** `src/components/Home.jsx` assembles sections (HeroSection, CoreBrandSection, AboutSection, ContactSection, etc.) and manages shared state (modals, form data, scroll detection) passed down as props
- **State management:** React hooks only (`useState`, `useEffect`), no external state library. State is passed via props from parent components.

### Backend (Express on port 3001)

- **`server.js`** — single file Express server with three POST endpoints:
  - `POST /contact` — contact form, sends email via Nodemailer
  - `POST /apply` — internship application with PDF resume upload (Multer, 10MB max)
  - `POST /registration` — workshop registration, sends confirmation email
- Falls back to serving the React SPA for all unmatched GET routes
- CORS allows localhost dev ports and production domain

### CSS

- Vanilla CSS with no preprocessor or CSS-in-JS
- `src/App.css` — bulk of all styles (large single file)
- `src/ConponentCSS/Header.css` — separated header styles
- Some inline styles in JSX for dynamic/responsive adjustments
- Key colors: `#000000`, `#ffffff`, `#ff1f2c` (red), `#0edb61` (green), `#068c3b` (dark green)
- Fonts: Montserrat, Roboto, Poppins (Google Fonts loaded in `index.html`)
- Responsive breakpoints: 1024px (tablet), 768px (mobile)

## Conventions

- Functional components with hooks; no class components
- Component files are PascalCase (`HeroSection.jsx`, `CoreBrandSection.jsx`)
- CSS classes use kebab-case (`.hero-section`, `.form-input`)
- Event handlers prefixed with `handle` (`handleScroll`, `handleSubmit`)
- Icons from `lucide-react`
- `react-helmet` for document head management
- API base URL switches between `http://localhost:3001` (dev) and `https://8conacademy.com` (prod) based on `NODE_ENV`

## Git Workflow

- **Main branch:** `main`
- Developer branches named `main-<name>` (e.g., `main-assyrah`)
