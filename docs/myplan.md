# 🚀 Nawafifth Advertising Company — Comprehensive Improvement Plan

> **Last Updated:** Feb 28, 2026  
> **App:** React + Vite + TypeScript + Tailwind v4 + GSAP + Lenis  
> **Goal:** Transform the website from a flat black-and-white look to a premium, vibrant, and animated advertising company showcase

---

## 📋 Current Issues Summary

| # | Issue | Severity | Where |
|---|-------|----------|-------|
| 1 | No dark/light theme toggle — body hardcoded to `bg-brand-black` | 🔴 Critical | `index.css`, `LanguageContext.tsx` |
| 2 | Pure black/white palette — looks flat, no accent colors or gradients | 🔴 Critical | `index.css` `@theme` block, all components |
| 3 | Padding/margin inconsistencies — sections have varying `py-20`, `py-32`, `py-48` | 🟡 Medium | `Mission.tsx`, `Solutions.tsx`, `Leverage.tsx`, `CTA.tsx` |
| 4 | RTL handled with manual CSS overrides instead of logical properties | 🟡 Medium | `index.css` (50+ lines of RTL overrides) |
| 5 | Hardcoded English strings in Footer ("Navigation", "Reach Us", "Privacy Policy") & Leverage ("How to Leverage", "Nawafith Ads", "Network Live") | 🟡 Medium | `Footer.tsx`, `Leverage.tsx` |
| 6 | No SEO meta tags (title, description, OG tags) | 🟡 Medium | `index.html` |
| 7 | `BackToTop` scroll handler not throttled (causes jank) | 🟡 Medium | `BackToTop.tsx` |
| 8 | Client logos are external Wikipedia URLs (will break if removed) | 🟢 Low | `Clients.tsx` |
| 9 | No page transition animations between routes | 🟢 Low | `App.tsx` |
| 10 | `SmoothScroll` cleanup leaks `gsap.ticker` reference | 🟢 Low | `SmoothScroll.tsx` |
| 11 | Dark mode sections alternate between `#050505` and `#0a0a0a` inconsistently | 🟡 Medium | All components |
| 12 | Glass card opacity too low (0.03) — invisible on dark backgrounds | 🟡 Medium | `index.css` `.glass-card` |
| 13 | No loading/skeleton states for images | 🟢 Low | All image components |
| 14 | Mobile hamburger menu has no GSAP animation | 🟢 Low | `Navbar.tsx` |

---

## 🎯 Phase Overview

```
Phase 1: 🎨 Theme System & Premium Color Palette  (Foundation)
Phase 2: 🧱 Spacing, Layout & RTL Fixes            (Structure)
Phase 3: ✨ GSAP Animations & Micro-interactions    (Polish)
Phase 4: 📱 Responsive Design & Mobile UX           (Reach)
Phase 5: ⚡ Performance & SEO Optimization          (Speed)
Phase 6: 🌐 i18n Fixes & Accessibility              (Quality)
```

---

---

# Phase 1: 🎨 Theme System & Premium Color Palette

> **Goal:** Build a proper dark/light mode system (default = system preference) and redesign the dark mode color palette so it looks premium, not flat black-and-white.

---

## Step 1.1 — Create `ThemeContext.tsx`

**File:** `src/context/ThemeContext.tsx` (NEW)  
**What to do:** Create a new React Context that manages the theme.

```tsx
// src/context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // Actual applied theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Step A: Read from localStorage or default to 'system'
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('app-theme');
    return (saved as Theme) || 'system';
  });

  // Step B: Compute resolved theme
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('app-theme', theme);

    // Listen to system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateResolvedTheme = () => {
      let resolved: 'light' | 'dark';
      if (theme === 'system') {
        resolved = mediaQuery.matches ? 'dark' : 'light';
      } else {
        resolved = theme;
      }
      setResolvedTheme(resolved);

      // Step C: Apply class on <html> element
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(resolved);
    };

    updateResolvedTheme();
    mediaQuery.addEventListener('change', updateResolvedTheme);
    return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
```

**Beginner Explanation:**  
- This file creates a "ThemeProvider" that wraps your entire app  
- It adds a `dark` or `light` class on the `<html>` element  
- If the user picks "system", it reads the operating system preference  
- The choice is saved in `localStorage` so it persists on page reload  

---

## Step 1.2 — Redesign Color Palette in `index.css`

**File:** `src/index.css`  
**What to change:** Replace the `@theme` block with a premium palette using CSS custom properties for both light and dark modes.

### Current (Problem):
```css
@theme {
  --color-brand-black: #050505;
  --color-brand-gray: #0f0f0f;
  --color-brand-light-gray: #f5f5f5;
}
```
Only 3 colors — pure black and white. This is why the site looks flat.

### New Premium Color Palette:
```css
@theme {
  /* Fonts (keep existing) */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-serif: "Playfair Display", serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  /* Accent Colors - Golden Amber (advertising/premium feel) */
  --color-accent-50: #FFF8E1;
  --color-accent-100: #FFECB3;
  --color-accent-200: #FFE082;
  --color-accent-300: #FFD54F;
  --color-accent-400: #FFCA28;
  --color-accent-500: #FFC107;  /* Main Accent */
  --color-accent-600: #FFB300;
  --color-accent-700: #FFA000;

  /* Cool Blue Secondary (tech/digital feel) */
  --color-secondary-400: #60A5FA;
  --color-secondary-500: #3B82F6;
  --color-secondary-600: #2563EB;

  /* Emerald (keep existing for status indicators) */
  --color-emerald-400: #34D399;
  --color-emerald-500: #10B981;
}

/* ============================================ */
/* DARK THEME (default fallback + .dark class)  */
/* ============================================ */
:root, .dark {
  --bg-primary: #0A0A0F;         /* Deep navy-black (NOT pure black) */
  --bg-secondary: #12121A;       /* Slightly lighter background */
  --bg-elevated: #1A1A28;        /* Cards, modals */
  --bg-surface: #22223A;         /* Interactive surfaces */

  --text-primary: #F0F0F5;       /* Near-white (softer than pure white) */
  --text-secondary: #A0A0B8;     /* Muted text */
  --text-tertiary: #6B6B80;      /* Very muted labels */
  --text-accent: #FFD54F;        /* Accent text highlights */

  --border-primary: rgba(255, 255, 255, 0.08);
  --border-secondary: rgba(255, 255, 255, 0.04);
  --border-accent: rgba(255, 193, 7, 0.3);

  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-hover: rgba(255, 255, 255, 0.08);

  --gradient-hero: linear-gradient(135deg, #0A0A0F 0%, #141428 50%, #0A0A0F 100%);
  --gradient-accent: linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #FFB300 100%);
  --gradient-text: linear-gradient(180deg, #F0F0F5 0%, #A0A0B8 100%);

  --glow-accent: rgba(255, 193, 7, 0.15);
  --glow-secondary: rgba(59, 130, 246, 0.1);

  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.4);
  --shadow-elevated: 0 24px 64px rgba(0, 0, 0, 0.6);

  --scrollbar-track: #0A0A0F;
  --scrollbar-thumb: rgba(255, 255, 255, 0.1);
}

/* ============================================ */
/* LIGHT THEME                                  */
/* ============================================ */
.light {
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  --bg-elevated: #FFFFFF;
  --bg-surface: #F5F5F7;

  --text-primary: #1A1A2E;
  --text-secondary: #4A4A60;
  --text-tertiary: #8A8AA0;
  --text-accent: #D4920A;

  --border-primary: rgba(0, 0, 0, 0.08);
  --border-secondary: rgba(0, 0, 0, 0.04);
  --border-accent: rgba(255, 193, 7, 0.4);

  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.06);
  --glass-hover: rgba(0, 0, 0, 0.04);

  --gradient-hero: linear-gradient(135deg, #FAFAFA 0%, #F0F0F5 50%, #FAFAFA 100%);
  --gradient-accent: linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #FFB300 100%);
  --gradient-text: linear-gradient(180deg, #1A1A2E 0%, #4A4A60 100%);

  --glow-accent: rgba(255, 193, 7, 0.2);
  --glow-secondary: rgba(59, 130, 246, 0.15);

  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.06);
  --shadow-elevated: 0 12px 32px rgba(0, 0, 0, 0.1);

  --scrollbar-track: #FAFAFA;
  --scrollbar-thumb: rgba(0, 0, 0, 0.15);
}
```

**Beginner Explanation:**  
- Instead of `#050505` pure black, we use `#0A0A0F` (navy-tinted black) which has a faint blue undertone — this is what makes dark themes look premium  
- Accent color is Golden Amber (`#FFC107`) — perfect for an advertising company (conveys energy, money, premium)  
- Every color has a semantic variable name (`--text-primary`, `--bg-surface`) so changing themes is automatic  
- Pure `#FFFFFF` is replaced with `#F0F0F5` — softer white that's easier on the eyes  

---

## Step 1.3 — Update Body & Base Styles

**File:** `src/index.css`  
**What to change:** Replace the hardcoded `bg-brand-black text-white` with CSS variable based styles.

### Change the `@layer base` body rule:
```css
@layer base {
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

**Why:** If we leave `bg-brand-black text-white`, the light mode will **never** work because body color is hardcoded.

---

## Step 1.4 — Update Component Classes

**File:** `src/index.css`  
**What to change:** Update the reusable component classes to use CSS variables.

### `.glass-card` — Current:
```css
.glass-card {
  @apply bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[2rem]
         transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.12];
}
```

### `.glass-card` — New:
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  border-radius: 2rem;
  transition: all 0.5s ease;
  box-shadow: var(--shadow-card);
}
.glass-card:hover {
  background: var(--glass-hover);
  border-color: var(--border-accent);
  box-shadow: 0 0 30px var(--glow-accent);
}
```

### `.btn-primary` — New:
```css
.btn-primary {
  background: var(--gradient-accent);
  color: #1A1A2E;
  padding: 1.25rem 2.5rem;
  border-radius: 9999px;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.875rem;
  box-shadow: 0 4px 20px var(--glow-accent);
  border: none;
}
.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px var(--glow-accent);
}
.btn-primary:active {
  transform: scale(0.95);
}
```

### `.btn-outline` — New:
```css
.btn-outline {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-primary);
  padding: 1.25rem 2.5rem;
  border-radius: 9999px;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.875rem;
  color: var(--text-primary);
}
.btn-outline:hover {
  background: var(--glass-hover);
  border-color: var(--border-accent);
  box-shadow: 0 0 20px var(--glow-accent);
}
```

### Scrollbar update:
```css
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 193, 7, 0.3);
}
```

---

## Step 1.5 — Add Theme Toggle Button to Navbar

**File:** `src/components/layout/Navbar.tsx`  
**What to change:** Add a theme toggle button (Sun/Moon/Monitor icons) next to the language selector.

### Where to add it (desktop):
After the language toggle buttons (line ~122), add:
```tsx
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Inside the component:
const { theme, setTheme, resolvedTheme } = useTheme();

// In the JSX (after language buttons group):
<div className="flex items-center gap-2 p-1 bg-[var(--glass-bg)] rounded-full border border-[var(--glass-border)]">
  <button
    onClick={() => setTheme('light')}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
      theme === 'light' ? 'bg-[var(--gradient-accent)] text-black' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
    }`}
    title="Light Mode"
  >
    <Sun size={14} />
  </button>
  <button
    onClick={() => setTheme('system')}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
      theme === 'system' ? 'bg-[var(--gradient-accent)] text-black' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
    }`}
    title="System Theme"
  >
    <Monitor size={14} />
  </button>
  <button
    onClick={() => setTheme('dark')}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
      theme === 'dark' ? 'bg-[var(--gradient-accent)] text-black' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
    }`}
    title="Dark Mode"
  >
    <Moon size={14} />
  </button>
</div>
```

---

## Step 1.6 — Wrap App with ThemeProvider

**File:** `src/App.tsx`  
**What to change:**
```tsx
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

---

## Step 1.7 — Update All Components to Use CSS Variables

**What to do:** Go through every component and replace hardcoded Tailwind classes with CSS variable classes.

### Replacement Map (apply to ALL component files):

| Current (Hardcoded) | New (Theme-Aware) |
|---|---|
| `bg-brand-black` | `bg-[var(--bg-primary)]` |
| `bg-[#050505]` | `bg-[var(--bg-primary)]` |
| `bg-[#0a0a0a]` | `bg-[var(--bg-secondary)]` |
| `bg-zinc-900` | `bg-[var(--bg-elevated)]` |
| `text-white` | `text-[var(--text-primary)]` |
| `text-white/40` | `text-[var(--text-secondary)]` |
| `text-white/20` or `text-white/30` | `text-[var(--text-tertiary)]` |
| `text-white/60` | `text-[var(--text-secondary)]` |
| `text-gray-400` | `text-[var(--text-secondary)]` |
| `border-white/5` | `border-[var(--border-secondary)]` |
| `border-white/10` | `border-[var(--border-primary)]` |
| `bg-white/[0.02]` or `bg-white/[0.03]` | `bg-[var(--glass-bg)]` |
| `from-black` | `from-[var(--bg-primary)]` |
| `to-black` | `to-[var(--bg-primary)]` |
| `from-[#050505]` | `from-[var(--bg-primary)]` |
| `bg-white text-black` (buttons) | Use `.btn-primary` class |
| `hover:bg-white hover:text-black` | `hover:bg-[var(--gradient-accent)] hover:text-black` |
| `text-emerald-500` (status) | Keep as is (status indicator color stays consistent) |

### Files to update:
1. `src/components/layout/Navbar.tsx` — Navbar bg, text colors, button styles
2. `src/components/layout/Footer.tsx` — Footer bg, text, social icon styles
3. `src/components/home/Hero.tsx` — Section bg, text colors, overlay gradients
4. `src/components/home/Mission.tsx` — Text colors, card styles
5. `src/components/home/Solutions.tsx` — Section bg, card styles
6. `src/components/home/Leverage.tsx` — Section bg, card styles, badge colors
7. `src/components/home/CTA.tsx` — Section bg, button styles, gradient text
8. `src/components/home/Clients.tsx` — Section bg, edge fades
9. `src/components/home/FooterImage.tsx` — Section bg, overlay gradients
10. `src/components/ui/BackToTop.tsx` — Button colors
11. `src/pages/AboutPage.tsx` — Section bgs, text colors
12. `src/pages/FormatsPage.tsx` — Section bgs, text colors, badge colors
13. `src/pages/ContactPage.tsx` — Section bgs, form input styles, text colors

---

## Step 1.8 — Add Accent Color Highlights

**What to do:** Add strategic pops of the accent color to prevent the "black and white" feel.

### Specific accent color additions:

1. **Hero section** (`Hero.tsx`):
   - Change the subtitle's underline decoration from `decoration-white/20` to `decoration-[var(--text-accent)]`
   - Add a subtle golden glow behind the CTA button: `shadow-[0_0_40px_var(--glow-accent)]`

2. **Section labels** (all components):
   - Change section labels (e.g., "OUR MISSION", "SOLUTIONS") from `text-white/30` to `text-[var(--text-accent)]`
   - This immediately breaks the monochrome feel

3. **Divider lines** (all components):
   - Change decorative lines from `bg-white/20` to `bg-gradient-to-r from-transparent via-[var(--text-accent)]/30 to-transparent`

4. **Glass card hover borders**:
   - On hover, border transitions to `border-[var(--border-accent)]` with a subtle glow

5. **Footer social icons** (`Footer.tsx`):
   - On hover, change from `hover:bg-white` to `hover:bg-[var(--gradient-accent)]`

6. **Navigation pill** (`Navbar.tsx`):
   - Active pill: `bg-[var(--text-accent)]/20 border-[var(--text-accent)]/30`

7. **Stat numbers** (`Mission.tsx`, `AboutPage.tsx`):
   - Change `text-white` to `text-[var(--text-accent)]` for big stat numbers (01, 02, 100%, 24/7)

---

---

# Phase 2: 🧱 Spacing, Layout & RTL Fixes

> **Goal:** Fix inconsistent padding/margins, standardize section spacing, and modernize RTL handling.

---

## Step 2.1 — Standardize Section Spacing

**File:** `src/index.css`  
**What to change:** Create spacing utility classes for consistent vertical rhythm.

```css
/* Standardized Section Spacing */
.section-spacing-sm {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
@media (min-width: 768px) {
  .section-spacing-sm {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.section-spacing-md {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
@media (min-width: 768px) {
  .section-spacing-md {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
}

.section-spacing-lg {
  padding-top: 8rem;
  padding-bottom: 8rem;
}
@media (min-width: 768px) {
  .section-spacing-lg {
    padding-top: 12rem;
    padding-bottom: 12rem;
  }
}
```

### Apply to components:
| Component | Current Spacing | New Class |
|-----------|----------------|-----------|
| `Hero.tsx` | `pt-32 pb-40` | `section-spacing-lg` (hero gets special treatment) |
| `Clients.tsx` | `py-20 md:py-32` | `section-spacing-md` |
| `Mission.tsx` | `py-20` in `section-container` | `section-spacing-md` |
| `CTA.tsx` | `py-16 md:py-24` | `section-spacing-md` |
| `Solutions.tsx` | `py-16 md:py-24` | `section-spacing-md` |
| `Leverage.tsx` | `py-20 md:py-32` | `section-spacing-md` |
| `FooterImage.tsx` | `py-20 lg:py-40` | `section-spacing-lg` |
| `AboutPage.tsx` sections | `py-8 md:py-12` / `py-12 lg:py-20` | `section-spacing-md` |
| `FormatsPage.tsx` sections | `py-4 md:py-8` / `py-6 md:py-10` | `section-spacing-sm` |
| `ContactPage.tsx` | `pt-12 pb-8` / `py-12 md:py-20` | `section-spacing-md` |

---

## Step 2.2 — Fix Internal Padding/Margin Issues

**File:** Multiple component files  
**Specific fixes:**

1. **`Mission.tsx` line 117** — `gap-24` is too large, causing empty space:
   - Change: `gap-24 items-center` → `gap-12 lg:gap-20 items-center`

2. **`Solutions.tsx` line 62** — `section-container` already has py, plus the section has py:
   - Remove the `py-16 md:py-24` from the `<section>` since `section-container` handles it
   - OR remove the py from section-container and use section-spacing classes

3. **`Leverage.tsx` line 117** — `gap-16 lg:gap-24` in the grid is excessive:
   - Change to: `gap-12 lg:gap-16`

4. **`CTA.tsx` line 137** — Horizontal padding `px-6` is too narrow on mobile:
   - Change to: `px-6 md:px-12`

5. **`Footer.tsx` line 17** — `gap-12 lg:gap-20 mb-20` — mb-20 is excessive:
   - Change to: `gap-10 lg:gap-16 mb-12`

6. **`AboutPage.tsx` line 80** — `section-container` + `py-8` double-dips:
   - Remove `py-8 md:py-12` from the `<section>` tag since `section-container` provides padding

7. **`FormatsPage.tsx` sections** — `py-4 md:py-8` is too cramped:
   - Change all to minimum `py-12 md:py-20` or use `section-spacing-sm`

---

## Step 2.3 — Modernize RTL Handling

**File:** `src/index.css`  
**What to change:** Replace manual RTL overrides with Tailwind v4's logical property utilities.

### Remove these RTL overrides (lines 20-121 of current index.css):
The 100+ lines of `[dir="rtl"]` manual overrides.

### Replace with Tailwind v4 logical utilities:
Tailwind v4 has built-in logical property support. Instead of `ml-4`, use `ms-4` (margin-inline-start). Instead of `mr-4`, use `me-4` (margin-inline-end).

### Replacement map for component files:

| Current Class | Logical Replacement |
|---|---|
| `ml-*` → RTL override | `ms-*` (margin-inline-start) |
| `mr-*` → RTL override | `me-*` (margin-inline-end) |
| `pl-*` → RTL override | `ps-*` (padding-inline-start) |
| `pr-*` → RTL override | `pe-*` (padding-inline-end) |
| `text-left` → RTL override | `text-start` |
| `text-right` → RTL override | `text-end` |
| `border-l` → RTL override | `border-s` |
| `border-r` → RTL override | `border-e` |
| `rounded-l-lg` → RTL override | `rounded-s-lg` |
| `rounded-r-lg` → RTL override | `rounded-e-lg` |
| `left-*` → RTL override | `start-*` |
| `right-*` → RTL override | `end-*` |

### Files to update:
Go through every component that uses `isRTL` conditional classes and replace with logical properties where possible:
- `Hero.tsx` — `text-left/text-right` → `text-start/text-end`
- `Mission.tsx` — `lg:text-right/lg:text-left` → `lg:text-end/lg:text-start`
- `Solutions.tsx` — same
- `Leverage.tsx` — same
- `Navbar.tsx` — button alignment, mobile close position
- `Footer.tsx` — layout direction
- `AboutPage.tsx` — text alignment
- `FormatsPage.tsx` — text alignment
- `ContactPage.tsx` — text alignment, icon alignment

> **Note:** Some `isRTL` usages (like `flex-row-reverse` for icon order, `order-1`/`order-2` for grid columns) cannot be replaced with logical properties and must stay.

---

---

# Phase 3: ✨ GSAP Animations & Micro-interactions

> **Goal:** Add premium, lightweight GSAP animations that make the site feel alive. These are subtle — not flashy — and optimized for performance.

---

## Step 3.1 — Navbar Scroll Animation Enhancement

**File:** `src/components/layout/Navbar.tsx`  
**What to add:**

```tsx
// When scrolled, animate the navbar background with GSAP instead of just CSS transition
useLayoutEffect(() => {
  if (!navRef.current) return;
  if (isScrolled) {
    gsap.to(navRef.current, {
      backdropFilter: 'blur(20px)',
      borderColor: 'var(--border-primary)',
      backgroundColor: 'var(--glass-bg)',
      duration: 0.5,
      ease: 'power2.out'
    });
  } else {
    gsap.to(navRef.current, {
      backdropFilter: 'blur(0px)',
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      duration: 0.5,
      ease: 'power2.out'
    });
  }
}, [isScrolled]);
```

---

## Step 3.2 — Mobile Menu GSAP Staggered Animation

**File:** `src/components/layout/Navbar.tsx`  
**What to add:** When mobile menu opens, animate each nav item with a stagger.

```tsx
// After setIsMobileMenuOpen(true):
useLayoutEffect(() => {
  if (isMobileMenuOpen && mobileMenuRef.current) {
    const items = mobileMenuRef.current.querySelectorAll('.mobile-nav-item');
    gsap.fromTo(items,
      { opacity: 0, y: 30, filter: 'blur(4px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }
}, [isMobileMenuOpen]);
```

---

## Step 3.3 — Magnetic Button Effect (upgrade existing CTA)

**File:** `src/components/home/CTA.tsx`  
**Already exists**, but extend to Hero button and all primary CTAs.

**Create a reusable component:** `src/components/ui/MagneticButton.tsx` (NEW)

```tsx
import { useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', strength = 0.3, onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(contentRef.current, { x: x * strength * 0.5, y: y * strength * 0.5, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  };

  const handleLeave = () => {
    gsap.to([buttonRef.current, contentRef.current], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative ${className}`}
    >
      <div ref={contentRef}>{children}</div>
    </button>
  );
}
```

---

## Step 3.4 — Scroll-Triggered Text Reveal Animation

**What to add:** Add a "text reveal from behind a mask" animation for section headings.

**File:** `src/components/ui/RevealText.tsx` (NEW)

```tsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(wrapperRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.5 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  return <div ref={wrapperRef} className={className}>{children}</div>;
}
```

**Use this in:** Section headings in `Mission.tsx`, `Solutions.tsx`, `Leverage.tsx`, `CTA.tsx`, `AboutPage.tsx`

---

## Step 3.5 — Parallax Floating Elements

**What to add:** Subtle parallax movement on decorative elements (the large "NAWAFITH" text in footer, background glows, etc.)

**File:** `src/components/layout/Footer.tsx`  
**What to change:** The large decorative "NAWAFITH" text at the bottom should float with scroll.

```tsx
// Add ref to the decorative text div
const decorativeRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  if (!decorativeRef.current) return;
  const ctx = gsap.context(() => {
    gsap.to(decorativeRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: decorativeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
  return () => ctx.revert();
}, []);
```

---

## Step 3.6 — Page Transition Animation (upgrade existing)

**File:** `src/App.tsx`  
**Current:** Simple opacity + y fade  
**Upgrade to:** Clip-path wipe transition

```tsx
useLayoutEffect(() => {
  if (mainRef.current) {
    gsap.fromTo(mainRef.current,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      { clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.8, ease: 'expo.out' }
    );
  }
}, [page]);
```

---

## Step 3.7 — Card Hover 3D Tilt Effect

**What to add:** Add a subtle 3D perspective tilt effect on glass cards when hovered.

**File:** `src/index.css`  
```css
.glass-card {
  perspective: 1000px;
  transform-style: preserve-3d;
}
```

Then in the card components (Solutions, Leverage), add onMouseMove:
```tsx
const handleCardTilt = (e: React.MouseEvent, ref: HTMLDivElement) => {
  const rect = ref.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(ref, {
    rotateX: -y * 8,
    rotateY: x * 8,
    duration: 0.4,
    ease: 'power2.out',
    overwrite: 'auto'
  });
};
```

---

## Step 3.8 — Counter Animation for Stats

**What to add:** Animate numbers (100%, 24/7, 01, 02) counting up when they scroll into view.

**File:** `src/components/ui/AnimatedCounter.tsx` (NEW)

```tsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, suffix = '', duration = 2, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const counterObj = useRef({ val: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(counterObj.current, {
        val: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(counterObj.current.val) + suffix;
          }
        }
      });
    });
    return () => ctx.revert();
  }, [value, suffix, duration]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
```

---

---

# Phase 4: 📱 Responsive Design & Mobile UX

> **Goal:** Ensure every page and component looks perfect on all screen sizes.

---

## Step 4.1 — Fix Hero Section Mobile Layout

**File:** `src/components/home/Hero.tsx`  

**Issues:**
1. Title font too large on small screens: `text-4xl` is fine, but `xl:text-8xl` jumps too much
2. Video container has no height constraint on mobile
3. Marquee bar text overlaps on mobile

**Fixes:**
- Title: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl` (smoother scaling)
- Add `max-h-[300px] lg:max-h-none` to video container on mobile
- Marquee: hide on screens smaller than `sm` (hidden sm:block)
- CTA button: reduce padding on mobile `px-5 py-2.5 md:px-8 md:py-4`

---

## Step 4.2 — Fix Mission Section Mobile

**File:** `src/components/home/Mission.tsx`  

**Issues:**
1. Grid columns stack without proper spacing
2. Stats at bottom (`01`, `02`) don't wrap well
3. Image too tall on mobile without any height constraint

**Fixes:**
- Add `aspect-[4/3]` to image wrapper on mobile
- Stats grid: `grid grid-cols-2 gap-3 md:gap-4`
- Title: reduce `text-5xl` to `text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl`

---

## Step 4.3 — Fix Solutions Section Mobile

**File:** `src/components/home/Solutions.tsx`

**Issues:**
1. Main card height `h-[250px] md:h-[350px]` is too small on mobile
2. Right-side cards stack without spacing adjustment

**Fixes:**
- Main card image: `h-[200px] sm:h-[250px] md:h-[350px]`
- Heading: smoother scaling as in 4.1

---

## Step 4.4 — Fix Leverage Section Mobile

**File:** `src/components/home/Leverage.tsx`

**Issues:**
1. Left column sticky positioning (`lg:sticky lg:top-32`) doesn't make sense on mobile
2. Cards have excessive padding `p-12 md:p-16` on mobile
3. Image goes full width without constraint

**Fixes:**
- Remove sticky on mobile: `lg:sticky lg:top-32` is already responsive
- Cards: `p-6 sm:p-8 md:p-12 lg:p-16`
- Button: `text-xs sm:text-sm` for download presentation button

---

## Step 4.5 — Fix Contact Page Mobile

**File:** `src/pages/ContactPage.tsx`

**Issues:**
1. Form card `p-10 md:p-14` is too padded on small screens
2. FAQ items padding `p-8` too large on mobile

**Fixes:**
- Form card: `p-5 sm:p-8 md:p-10 lg:p-14`
- FAQ: `p-4 sm:p-6 md:p-8`

---

## Step 4.6 — Fix Formats Page Mobile

**File:** `src/pages/FormatsPage.tsx`

**Issues:**
1. Hero title `text-6xl md:text-8xl lg:text-9xl` too large
2. Bento grid `md:auto-rows-[450px]` too tall on tablets

**Fixes:**
- Hero title: `text-4xl sm:text-5xl md:text-7xl lg:text-8xl`
- Bento grid: `md:auto-rows-[350px] lg:auto-rows-[450px]`

---

## Step 4.7 — Fix Footer Mobile

**File:** `src/components/layout/Footer.tsx`

**Issues:**
1. Bottom bar items `text-[9px]` too small
2. Social icons too large on mobile

**Fixes:**
- Bottom bar: `text-[10px] sm:text-xs`
- Social icons: `w-10 h-10 sm:w-12 sm:h-12`

---

---

# Phase 5: ⚡ Performance & SEO Optimization

> **Goal:** Optimize loading speed, reduce unnecessary re-renders, and add SEO metadata.

---

## Step 5.1 — Throttle BackToTop Scroll Handler

**File:** `src/components/ui/BackToTop.tsx`  
**Current:** Unthrottled scroll handler fires on every pixel scroll.

**Fix:**
```tsx
useEffect(() => {
  let ticking = false;
  const toggleVisible = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 300);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', toggleVisible, { passive: true });
  return () => window.removeEventListener('scroll', toggleVisible);
}, []);
```

---

## Step 5.2 — Fix SmoothScroll Cleanup

**File:** `src/components/ui/SmoothScroll.tsx`  
**Issue:** The cleanup function calls `gsap.ticker.remove(lenis.raf)` but should remove the anonymous function.

**Fix:**
```tsx
const rafCallback = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(rafCallback);

return () => {
  lenis.destroy();
  gsap.ticker.remove(rafCallback);
  window.removeEventListener('resize', refreshScrollTrigger);
};
```

---

## Step 5.3 — Lazy Load Images with Blur Placeholder

**Where:** All `<img>` tags across components.  
**What to do:** Add proper `loading="lazy"` (most already have it) and add a skeleton/blur placeholder.

```css
/* Add to index.css */
.img-skeleton {
  background: linear-gradient(90deg, var(--bg-elevated) 25%, var(--bg-surface) 50%, var(--bg-elevated) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Step 5.4 — Add SEO Meta Tags

**File:** `index.html`  
**What to add:**

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Meta Tags -->
  <title>Nawafith Advertising | Premium Out-of-Home & Digital Advertising in Saudi Arabia</title>
  <meta name="description" content="Nawafith Advertising is Saudi Arabia's leading OOH advertising company. We specialize in digital billboards, car wraps, and geo-targeted advertising campaigns." />
  <meta name="keywords" content="advertising, OOH, digital advertising, Saudi Arabia, billboards, car advertising, out of home, Nawafith" />
  <meta name="author" content="Nawafith Advertising" />
  
  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Nawafith Advertising | Premium OOH Advertising" />
  <meta property="og:description" content="Transform your brand visibility with Saudi Arabia's leading advertising company." />
  <meta property="og:image" content="/images/NAWAFITH-LOGO.png" />
  <meta property="og:url" content="https://nawafith-ooh-adv.com" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Nawafith Advertising" />
  <meta name="twitter:description" content="Premium Out-of-Home Advertising in Saudi Arabia" />
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#0A0A0F" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#FAFAFA" media="(prefers-color-scheme: light)" />
  
  <link rel="icon" type="image/png" href="/images/NAWAFITH-LOGO.png" />
</head>
```

---

## Step 5.5 — Optimize GSAP ScrollTrigger Instances

**Where:** All components that register ScrollTrigger  
**What to do:** Add `fastScrollEnd: true` and `preventOverlaps: true` to reduce layout thrashing.

```tsx
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});
```

Add this once in `SmoothScroll.tsx` after initializing Lenis.

---

---

# Phase 6: 🌐 i18n Fixes & Accessibility

> **Goal:** Fix hardcoded English text and improve keyboard/screen reader accessibility.

---

## Step 6.1 — Fix Hardcoded Strings

### `Footer.tsx` — Replace hardcoded strings:
```
Line 42: "Navigation" → t.footer.navigation (add to translations)
Line 58: "Reach Us" → t.footer.reachUs (add to translations)
Line 62: "Saudi Arabia, Al Khobar\nGolden Belt Dist." → t.footer.address (add to translations)
Line 66: "Nawafithadvsa@gmail.com" → Keep as is (email shouldn't be translated)
Line 81: "Privacy Policy" → t.footer.privacyPolicy (add to translations)
Line 82: "Terms of Service" → t.footer.termsOfService (add to translations)
```

### `Leverage.tsx` — Replace hardcoded strings:
```
Line 144-145: "How to Leverage" & "Nawafith Ads" → t.leverage.title & t.leverage.titlePart2
Line 171: "Network Live" → t.leverage.networkLive (already exists in translations, use it)
```

### `Solutions.tsx` — Replace hardcoded strings:
```
Line 110: "Explore" → t.solutions.explore (already exists)
```

---

## Step 6.2 — Add Missing Translation Keys

**File:** `src/i18n/en.ts` — Add:
```ts
footer: {
  // ... existing keys
  navigation: "Navigation",
  reachUs: "Reach Us",
  address: "Saudi Arabia, Al Khobar\nGolden Belt Dist.",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
}
```

**File:** `src/i18n/ar.ts` — Add:
```ts
footer: {
  // ... existing keys
  navigation: "التنقل",
  reachUs: "تواصل معنا",
  address: "المملكة العربية السعودية، الخبر\nحي الحزام الذهبي",
  privacyPolicy: "سياسة الخصوصية",
  termsOfService: "شروط الخدمة",
}
```

Also update `src/types/index.ts` `FooterTranslations` interface with new keys.

---

## Step 6.3 — Accessibility Improvements

1. **Focus indicators** — Add visible focus styles:
```css
/* index.css */
*:focus-visible {
  outline: 2px solid var(--text-accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

2. **ARIA labels** — Add aria-labels to icon-only buttons:
   - Mobile menu toggle: `aria-label="Toggle menu"` and `aria-expanded={isMobileMenuOpen}`
   - Language buttons: `aria-label="Switch to Arabic"` / `aria-label="Switch to English"`
   - Theme toggle buttons: `aria-label="Switch to dark mode"` etc.
   - Social media links: `aria-label="Facebook"` etc.
   - Back to top: `aria-label="Scroll to top"`

3. **Skip navigation link**:
```tsx
// Add at the top of App.tsx main wrapper:
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--text-accent)] focus:text-black focus:rounded-lg">
  Skip to content
</a>
```

---

---

# 📊 Execution Priority

| Phase | Estimated Time | Impact | Dependency |
|-------|---------------|--------|------------|
| Phase 1 | 2-3 hours | 🔴 Highest | None — must be done first |
| Phase 2 | 1-2 hours | 🟡 High | After Phase 1 |
| Phase 3 | 2-3 hours | 🟡 High | After Phase 1 |
| Phase 4 | 1-2 hours | 🟡 Medium | After Phase 2 |
| Phase 5 | 1 hour | 🟢 Medium | After Phase 1 |
| Phase 6 | 1 hour | 🟢 Medium | After Phase 1 |

---

# ✅ Verification Plan

### Browser Testing
Each phase should be visually verified in the browser:
1. Run `npm run dev` to start the dev server
2. Open the app in the browser
3. Check both dark and light modes by toggling the theme
4. Check RTL by switching to Arabic
5. Resize the browser window to test responsive behavior (mobile, tablet, desktop)
6. Scroll through all pages to verify animations trigger correctly

### Performance Testing
- Open Chrome DevTools → Performance tab → Record a scroll
- Check for layout thrashing, long tasks, or excessive repaints
- Lighthouse score should be 85+ for Performance

### Accessibility Testing
- Tab through the entire page — verify focus indicators are visible
- Use a screen reader (Narrator on Windows) to verify aria-labels
- Check color contrast ratios in light mode
