import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormatsPage from './pages/FormatsPage';
import ContactPage from './pages/ContactPage';
import { Page } from './types';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const { isRTL } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar currentPage={page} setPage={setPage} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage key="home" />}
          {page === 'about' && <AboutPage key="about" />}
          {page === 'formats' && <FormatsPage key="formats" />}
          {page === 'contact' && <ContactPage key="contact" />}
        </AnimatePresence>
      </main>
      <Footer setPage={setPage} />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
