import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, Languages, Sun, Moon, Monitor } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Page } from '../../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setPage }: NavbarProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Throttled scroll listener
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const scrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolled]);

  const navItems: { label: string; id: Page }[] = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.formats, id: 'formats' },
    { label: t.nav.contact, id: 'contact' },
  ];

  // GSAP Pill Animation
  useEffect(() => {
    if (!pillRef.current || !navItemsRef.current) return;

    // Use requestAnimationFrame to ensure the DOM has updated (especially after language toggle)
    const updatePill = () => {
      const activeBtn = navItemsRef.current?.querySelector(`[data-id="${currentPage}"]`);
      if (activeBtn && pillRef.current) {
        const { offsetLeft, offsetWidth } = activeBtn as HTMLElement;
        gsap.to(pillRef.current, {
          x: offsetLeft,
          width: offsetWidth,
          duration: 0.4,
          ease: "power2.out",
          opacity: 1
        });
      }
    };

    const timer = setTimeout(updatePill, 10);
    return () => clearTimeout(timer);
  }, [currentPage, language]); // Added language to trigger recalculation on toggle

  // Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen && mobileLinksRef.current) {
      const links = mobileLinksRef.current.children;
      gsap.fromTo(links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 lg:px-20 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div
          className={`mx-auto max-w-[1600px] flex items-center justify-between transition-all duration-500 ${isScrolled
            ? 'bg-[var(--bg-primary)]/60 backdrop-blur-xl border border-[var(--border-primary)] rounded-2xl px-6 md:px-10 py-3 shadow-2xl'
            : 'bg-transparent px-0'
            }`}
        >
          <div className="flex items-center cursor-pointer group" onClick={() => setPage('home')}>
            <img
              src="images/NAWAFITH-LOGO.png"
              alt="Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              style={{ filter: 'var(--logo-filter)' }}
            />
          </div>

          <div ref={navItemsRef} className="hidden lg:flex items-center gap-1 p-1 bg-[var(--glass-bg)] backdrop-blur-md rounded-full border border-[var(--glass-border)] relative">
            <div
              ref={pillRef}
              className="absolute inset-y-0.5 left-0 bg-[var(--glass-hover)] rounded-full border border-[var(--glass-border)] opacity-0 pointer-events-none"
            />
            {navItems.map((item) => (
              <button
                key={item.id}
                data-id={item.id}
                onClick={() => setPage(item.id)}
                className={`px-8 py-2.5 text-[12px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative z-10 ${currentPage === item.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>


          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <div className="flex items-center gap-2 xl:gap-4 text-[12px] font-bold text-[var(--text-tertiary)]">
              <button
                onClick={() => setLanguage('ar')}
                aria-label="Switch to Arabic"
                className={`cursor-pointer hover:text-[var(--text-primary)] transition-colors ${language === 'ar' ? 'text-[var(--text-primary)]' : ''}`}
              >
                AR
              </button>
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch to English"
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle - Single Button */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-all"
            >
              {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 xl:px-8 py-2 xl:py-2.5 rounded-full text-xs xl:text-[13px] font-bold transition-all hover:opacity-80 active:scale-95 shadow-lg"
            >
              {t.nav.callNow}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-4">
            {/* Mobile Theme Toggle - Single Button */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              aria-label={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-9 h-9 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              {resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`w-6 h-0.5 bg-[var(--text-primary)] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-[var(--text-primary)] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-[var(--text-primary)] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-[55] bg-[var(--bg-primary)]/98 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center transition-all duration-500 ease-expo ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
          }`}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center gap-6">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-4xl font-bold tracking-tighter font-display transition-colors ${currentPage === item.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-12 flex flex-col items-center gap-6">
            <button className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-10 py-4 rounded-full text-sm font-bold">
              {t.nav.callNow}
            </button>
            <div className="flex gap-4 text-[10px] font-bold text-[var(--text-tertiary)]">
              <button onClick={() => setLanguage('ar')} aria-label="Switch to Arabic">ARABIC</button>
              <button onClick={() => setLanguage('en')} aria-label="Switch to English">ENGLISH</button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          aria-label="Close menu"
        >
          <X size={32} />
        </button>
      </div>
    </>
  );
}
