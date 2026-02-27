import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Page }[] = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.formats, id: 'formats' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 lg:px-20 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mx-auto max-w-[1600px] flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? 'bg-brand-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 md:px-10 py-3 shadow-2xl' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center cursor-pointer group" onClick={() => setPage('home')}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4"
            >
              <img 
                src="/images/NAWAFITH-LOGO.png" 
                alt="Nawafith Logo" 
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          </div>

          <div className="hidden lg:flex items-center gap-2 p-1.5 glass-card rounded-full border border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative group ${
                  currentPage === item.id ? 'text-white' : 'text-white/30 hover:text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {currentPage === item.id && (
                  <motion.span 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-4 text-[9px] font-bold text-white/30">
              <button
                onClick={() => setLanguage('ar')}
                className={`cursor-pointer hover:text-white transition-colors ${language === 'ar' ? 'text-white' : ''}`}
              >
                <img src="https://flagcdn.com/w20/sa.png" alt="AR" className="w-4 rounded-sm inline-block mr-1" />
                AR
              </button>
              <span className="w-px h-3 bg-white/10"></span>
              <button
                onClick={() => setLanguage('en')}
                className={`cursor-pointer flex items-center gap-1.5 hover:text-white ${language === 'en' ? 'text-white' : ''}`}
              >
                <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-4 rounded-sm" />
                EN
              </button>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-bold shadow-xl hover:shadow-white/10 transition-all"
            >
              <Phone size={12} fill="currentColor" />
              {t.nav.callNow}
            </motion.button>
          </div>

          <button 
            className="lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span 
              animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span 
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span 
              animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
              className="w-6 h-0.5 bg-white rounded-full"
            />
          </button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-brand-black/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-4xl md:text-6xl font-bold tracking-tighter font-display ${
                    currentPage === item.id ? 'text-white' : 'text-white/20'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-8 mt-12"
              >
                <button className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-sm font-bold shadow-2xl">
                  <Phone size={18} fill="currentColor" />
                  {t.nav.callNow}
                </button>
                <div className="flex items-center gap-6 text-xs font-bold text-white/30">
                  <button 
                    onClick={() => setLanguage('ar')}
                    className={`hover:text-white flex items-center gap-2 ${language === 'ar' ? 'text-white' : ''}`}
                  >
                    <img src="https://flagcdn.com/w20/sa.png" alt="AR" className="w-5 rounded-sm" />
                    ARABIC
                  </button>
                  <span className="w-px h-4 bg-white/10"></span>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`text-white cursor-pointer flex items-center gap-2 ${language === 'en' ? 'text-white' : ''}`}
                  >
                    <img src="https://flagcdn.com/w20/us.png" alt="EN" className="w-5 rounded-sm" />
                    ENGLISH
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
