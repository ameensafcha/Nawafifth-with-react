import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16">
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">
            <img 
              src="/images/NAWAFITH-LOGO.png" 
              alt="Nawafith Logo" 
              className="h-12 w-auto object-contain"
            />
            <p className="text-base text-white/40 leading-relaxed font-light max-w-md">
              {t.footer.desc}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ y: -3, scale: 1.1 }}
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white/20">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setPage('home')}
                  className="text-white/40 hover:text-white transition-colors text-sm font-light"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage('about')}
                  className="text-white/40 hover:text-white transition-colors text-sm font-light"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage('formats')}
                  className="text-white/40 hover:text-white transition-colors text-sm font-light"
                >
                  {t.nav.formats}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setPage('contact')}
                  className="text-white/40 hover:text-white transition-colors text-sm font-light"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-white/20">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/40 text-sm font-light">
                <MapPin size={14} className="text-white/20 shrink-0" />
                <span>Khobar, Saudi Arabia</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm font-light">
                <Mail size={14} className="text-white/20 shrink-0" />
                <span>Nawafithadvsa@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm font-light">
                <Phone size={14} className="text-white/20 shrink-0" />
                <span>+966 --- --- ---</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-white/20 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-bold text-white/[0.02] font-display pointer-events-none whitespace-nowrap select-none">
        NAWAFITH
      </div>
    </footer>
  );
}
