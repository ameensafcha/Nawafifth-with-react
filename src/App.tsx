import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormatsPage from './pages/FormatsPage';
import ContactPage from './pages/ContactPage';
import SmoothScroll from './components/ui/SmoothScroll';
import { Page } from './types';
import gsap from 'gsap';

function AppContent() {
  // Initialize page from hash or default to home
  const [page, setPage] = useState<Page>(() => {
    const hash = window.location.hash.replace('#', '') as Page;
    return ['home', 'about', 'formats', 'contact'].includes(hash) ? hash : 'home';
  });

  const { isRTL } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Sync state to URL hash
  useEffect(() => {
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo(0, 0);
  }, [page]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const validPage = (['home', 'about', 'formats', 'contact'].includes(hash) ? hash : 'home') as Page;
      if (validPage !== page) {
        setPage(validPage);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [page]);

  useLayoutEffect(() => {
    // Page transition animation (Wipe Reveal)
    if (mainRef.current && overlayRef.current) {
      const tl = gsap.timeline();

      // Reset overlay to cover screen
      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: 'bottom' });
      gsap.set(mainRef.current, { opacity: 0, y: 30 });

      // Animate overlay shrinking and content appearing
      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 0.5,
        ease: "expo.inOut"
      })
        .to(mainRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        }, "-=0.3");
    }
  }, [page]);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
        <div ref={overlayRef} className="fixed inset-0 bg-[var(--bg-primary)] z-[60] pointer-events-none" />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--text-accent)] focus:text-black focus:rounded-lg">
          Skip to content
        </a>
        <Navbar currentPage={page} setPage={setPage} />
        <main id="main-content" ref={mainRef} className="flex-1 opacity-0">
          {page === 'home' && <HomePage setPage={setPage} />}
          {page === 'about' && <AboutPage key="about" setPage={setPage} />}
          {page === 'formats' && <FormatsPage key="formats" />}
          {page === 'contact' && <ContactPage key="contact" />}
        </main>
        <Footer setPage={setPage} />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
}

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

