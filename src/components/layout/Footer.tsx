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
    <footer className="bg-brand-black border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src="/images/NAWAFITH-LOGO.png" 
                alt="Nawafith Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-xl text-white/40 leading-relaxed font-light max-w-md">
              {t.footer.desc}
            </p>
          </div>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <motion.a 
                key={i} 
                whileHover={{ y: -5, scale: 1.1 }}
                href="#" 
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/20">Navigation</h4>
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => setPage('home')}
                className={`text-white/40 hover:text-white transition-colors text-lg font-light ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.nav.home}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setPage('about')}
                className={`text-white/40 hover:text-white transition-colors text-lg font-light ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.nav.about}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setPage('formats')}
                className={`text-white/40 hover:text-white transition-colors text-lg font-light ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.nav.formats}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setPage('contact')}
                className={`text-white/40 hover:text-white transition-colors text-lg font-light ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t.nav.contact}
              </button>
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-white/20">Contact</h4>
          <ul className="space-y-6">
            <li className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin size={18} className="text-white/20 mt-1" />
              <span className="text-white/40 text-lg font-light">Khobar, Saudi Arabia</span>
            </li>
            <li className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Mail size={18} className="text-white/20 mt-1" />
              <span className="text-white/40 text-lg font-light">Nawafithadvsa@gmail.com</span>
            </li>
            <li className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Phone size={18} className="text-white/20 mt-1" />
              <span className="text-white/40 text-lg font-light">+966 --- --- ---</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
          {t.footer.copyright}
        </p>
        <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
      
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-[20vw] font-bold text-white/[0.02] font-display pointer-events-none whitespace-nowrap select-none">
        NAWAFITH
      </div>
    </footer>
  );
}
