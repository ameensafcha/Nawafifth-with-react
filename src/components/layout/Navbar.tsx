import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setPage }: NavbarProps) {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 lg:px-20 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div
          className={`mx-auto max-w-[1600px] flex items-center justify-between transition-all duration-500 ${isScrolled
            ? 'bg-brand-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 md:px-10 py-3 shadow-2xl'
            : 'bg-transparent px-0'
            }`}
        >
          <div className="flex items-center cursor-pointer group" onClick={() => setPage('home')}>
            <img
              src="/images/NAWAFITH-LOGO.png"
              alt="Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>

          <div ref={navItemsRef} className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/5 relative">
            <div
              ref={pillRef}
              className="absolute inset-y-0.5 left-0 bg-white/10 rounded-full border border-white/10 opacity-0 pointer-events-none"
            />
            {navItems.map((item) => (
              <button
                key={item.id}
                data-id={item.id}
                onClick={() => setPage(item.id)}
                className={`px-8 py-2.5 text-[12px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative z-10 ${currentPage === item.id ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4 text-[12px] font-bold text-white/30">
              <button
                onClick={() => setLanguage('ar')}
                className={`cursor-pointer hover:text-white transition-colors ${language === 'ar' ? 'text-white' : ''}`}
              >
                AR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`cursor-pointer hover:text-white transition-colors ${language === 'en' ? 'text-white' : ''}`}
              >
                EN
              </button>
            </div>
            <button
              className="bg-white text-black px-8 py-2.5 rounded-full text-[13px] font-bold transition-all hover:bg-gray-200 active:scale-95 shadow-lg"
            >
              {t.nav.callNow}
            </button>
          </div>

          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Simple CSS transition for performance */}
      <div
        className={`fixed inset-0 z-[55] bg-brand-black/98 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center transition-all duration-500 ease-expo ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'
          }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-4xl font-bold tracking-tighter font-display transition-colors ${currentPage === item.id ? 'text-white' : 'text-white/20 hover:text-white/40'
                }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-12 flex flex-col items-center gap-6">
            <button className="bg-white text-black px-10 py-4 rounded-full text-sm font-bold">
              {t.nav.callNow}
            </button>
            <div className="flex gap-4 text-[10px] font-bold text-white/30">
              <button onClick={() => setLanguage('ar')}>ARABIC</button>
              <button onClick={() => setLanguage('en')}>ENGLISH</button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white/40 hover:text-white"
        >
          <X size={32} />
        </button>
      </div>
    </>
  );
}
