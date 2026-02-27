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
    // Page transition animation
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [page]);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navbar currentPage={page} setPage={setPage} />
        <main ref={mainRef} className="flex-1">
          {page === 'home' && <HomePage key="home" />}
          {page === 'about' && <AboutPage key="about" />}
          {page === 'formats' && <FormatsPage key="formats" />}
          {page === 'contact' && <ContactPage key="contact" />}
        </main>
        <Footer setPage={setPage} />
        <BackToTop />
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
