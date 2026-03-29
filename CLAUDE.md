# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 + TypeScript web application for Nawafith (an advertising/marketing company). It's a single-page application (SPA) with multi-page support, bilingual content (English/Arabic with RTL support), and heavy animation features using GSAP and Lenis.

## Development Commands

### Essential Commands
- **Development server**: `npm run dev` — Starts Vite dev server with HMR (disabled via `DISABLE_HMR=true` env var in AI Studio)
- **Build for production**: `npm run build` — Vite build outputs to `dist/`
- **Preview built site**: `npm run preview` — Preview the production build locally
- **Type checking**: `npm run lint` — TypeScript strict mode check (no emit)
- **Cleanup**: `npm run clean` — Remove the `dist/` directory
- **Deploy to gh-pages**: `npm run deploy` — Builds then deploys to GitHub Pages at `/Nawafifth-with-react/`

The `predeploy` hook automatically builds before deployment.

## Architecture & Key Patterns

### Routing (Hash-Based, No React Router)
- Uses `window.location.hash` for navigation, not React Router
- Valid pages: `'home' | 'about' | 'formats' | 'contact'`
- Empty hash defaults to home; hash syncs to state in `App.tsx`
- Browser back/forward buttons handled via `hashchange` event listener
- Page transitions use GSAP timeline animations (wipe reveal with `scaleY`)

### State Management (Context API)
Two context providers wrap the app in `App.tsx`:

1. **ThemeProvider** (`src/context/ThemeContext.tsx`)
   - Manages `'light' | 'dark' | 'system'` theme
   - Stores preference in `localStorage` under `app-theme`
   - System preference detected via `window.matchMedia('(prefers-color-scheme: dark)')`
   - Applied theme class (`'light'` or `'dark'`) added to `<html>`
   - Provides `useTheme()` hook returning `{ theme, setTheme, resolvedTheme }`

2. **LanguageProvider** (`src/context/LanguageContext.tsx`)
   - Manages `'en' | 'ar'` language
   - Stores preference in `localStorage` under `app-language`
   - Sets `document.documentElement.dir` to `'rtl'` for Arabic, `'ltr'` for English
   - Provides `useLanguage()` hook returning `{ language, setLanguage, t: Translations, isRTL }`
   - All components use `t` object for translated strings (e.g., `t.nav.home`, `t.hero.title`)

### Internationalization (i18n)
- Translation objects in `src/i18n/` — separate files for English (`en.ts`) and Arabic (`ar.ts`)
- Translation types defined in `src/types/index.ts` (e.g., `NavTranslations`, `HeroTranslations`, etc.)
- All UI strings are in the `Translations` interface
- Component adds `dir={isRTL ? 'rtl' : 'ltr'}` to main container for proper RTL rendering

### Animations & Effects
- **GSAP**: Used for page transitions, text reveals, and complex animations
  - Page transitions: `gsap.timeline()` with overlay wipe effect on page change
  - Individual components: SplitText, RevealText, TiltCard, ParallaxImage, AnimatedCounter, MagneticButton
- **Lenis**: Smooth scrolling library wraps the app via `<SmoothScroll>` component
- **CSS Classes**: Tailwind utilities with CSS custom properties for theming (e.g., `var(--bg-primary)`, `var(--text-accent)`)

### Styling & Theming
- **Tailwind CSS** with `@tailwindcss/vite` plugin (no separate CSS file needed)
- CSS custom properties for dynamic theming: `--bg-primary`, `--bg-elevated`, `--text-primary`, `--text-accent`, `--border-primary`, etc.
- Global styles in `src/index.css`
- No component-level CSS files; all styling is inline Tailwind classes or CSS variables

### File Structure
```
src/
├── App.tsx                    # Main app, routing logic, page transitions
├── main.tsx                   # Entry point
├── index.css                  # Global styles
├── types/index.ts             # TypeScript types and interfaces
├── context/                   # Context providers
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── i18n/                      # Translation files
│   ├── index.ts              # Exports translations object
│   ├── en.ts                 # English translations
│   └── ar.ts                 # Arabic translations
├── pages/                     # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── FormatsPage.tsx
│   └── ContactPage.tsx
├── components/
│   ├── layout/               # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/                 # Home page sections
│   │   ├── Hero.tsx
│   │   ├── Mission.tsx
│   │   ├── Solutions.tsx
│   │   ├── Leverage.tsx
│   │   ├── CTA.tsx
│   │   ├── Clients.tsx
│   │   ├── MarqueeBar.tsx
│   │   └── FooterImage.tsx
│   └── ui/                   # Reusable animated/interactive components
│       ├── SplitText.tsx
│       ├── RevealText.tsx
│       ├── ParallaxImage.tsx
│       ├── TiltCard.tsx
│       ├── MagneticButton.tsx
│       ├── AnimatedCounter.tsx
│       ├── InfiniteCarousel.tsx
│       ├── TextType.tsx
│       ├── BackToTop.tsx
│       └── SmoothScroll.tsx
```

### Page Components
- Pages are exported as `setPage` prop to allow internal navigation
- Each page rendered conditionally in `App.tsx` main element with unique `key` to force re-mount
- Pages are full-height sections, not wrapped in containers

### External Dependencies
- **@google/genai**: Google Gemini API for dynamic content
- **gsap**: Animation library
- **lenis**: Smooth scrolling
- **lucide-react**: Icon library
- **react-hot-toast**: Toast notifications
- **react-helmet-async**: Meta tag management (imported but may not be used)
- **express**: Included but primarily for dev/build support

### Environment & Config
- `.env` file should contain `GEMINI_API_KEY` (used in `vite.config.ts`)
- Vite base path: `/Nawafifth-with-react/` (set for gh-pages deployment)
- Import alias: `@/` resolves to project root (configured in `vite.config.ts`)

### Accessibility
- Skip-to-content link in `App.tsx` for keyboard navigation
- Main content wrapped in `<main>` with `id="main-content"`
- Toast component uses semantic positioning
- Ensure new components maintain focus management and ARIA labels

## Common Development Tasks

### Adding a New Page
1. Create page component in `src/pages/PageName.tsx`
2. Add page type to `Page` type in `src/types/index.ts`
3. Add translations for page content to `src/i18n/en.ts` and `src/i18n/ar.ts`
4. Update `Translations` interface in `src/types/index.ts` if needed
5. Import page in `App.tsx` and add conditional render in main element
6. Add route option in hash validation logic in `App.tsx` (both useState and handleHashChange)
7. Add nav link in `Navbar.tsx` if needed

### Adding Animations
- Use GSAP for complex animations
- Use Tailwind's animation utilities for simple transitions
- For element reveals/text splitting, use existing components like `RevealText` or `SplitText`
- Always clean up animation instances in useEffect cleanup functions

### Theming Updates
- Update CSS custom properties in `src/index.css`
- Reference via `var(--property-name)` in Tailwind classes
- Test in both light and dark modes using theme context

### Translations
1. Add keys to translation objects in `src/i18n/en.ts` and `src/i18n/ar.ts`
2. Update corresponding interface in `src/types/index.ts`
3. Access via `useLanguage()` hook in components: `const { t } = useLanguage()`
4. Use as `t.section.key` (e.g., `t.hero.title`)

## Important Notes

- No React Router is used; hash-based routing is intentional
- localStorage keys: `app-language`, `app-theme`
- Page transitions trigger on every page change; ensure smooth animations
- RTL support is baked in; always test Arabic text and layouts
- GSAP animations reference DOM nodes; ensure refs are properly managed
- All text content must be translatable; no hardcoded English strings in components
- The app is deployed to GitHub Pages with a sub-path; relative imports and asset paths should use the Vite alias or relative paths carefully
