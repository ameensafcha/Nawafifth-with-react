import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-brand-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          <div className="sm:col-span-2 lg:col-span-2 space-y-8">
            <img
              src="/images/NAWAFITH-LOGO.png"
              alt="Nawafith"
              className="h-12 w-auto object-contain transition-opacity hover:opacity-80 cursor-pointer"
              onClick={() => setPage('home')}
            />
            <p className="text-base text-white/30 leading-relaxed font-light max-w-md">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/10 font-mono">Navigation</h4>
            <ul className="space-y-4">
              {['home', 'about', 'formats', 'contact'].map((pageId) => (
                <li key={pageId}>
                  <button
                    onClick={() => setPage(pageId as Page)}
                    className="text-white/40 hover:text-white transition-colors text-sm font-light uppercase tracking-wider"
                  >
                    {t.nav[pageId as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/10 font-mono">Reach Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-white/30 text-sm font-light group">
                <MapPin size={16} className="text-white/10 group-hover:text-white/40 transition-colors shrink-0 mt-0.5" />
                <span className="leading-relaxed">Saudi Arabia, Al Khobar<br />Golden Belt Dist.</span>
              </li>
              <li className="flex items-center gap-4 text-white/30 text-sm font-light group">
                <Mail size={16} className="text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                <a href="mailto:Nawafithadvsa@gmail.com" className="hover:text-white transition-colors">Nawafithadvsa@gmail.com</a>
              </li>
              <li className="flex items-center gap-4 text-white/30 text-sm font-light group">
                <Phone size={16} className="text-white/10 group-hover:text-white/40 transition-colors shrink-0" />
                <span className="font-mono">+966 --- --- ---</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] font-bold text-white/10 uppercase tracking-[0.3em] font-mono">
          <p className="hover:text-white/20 transition-colors">
            {t.footer.copyright}
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Decorative Text Wrapper */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[18vw] font-black text-white/[0.015] font-display pointer-events-none whitespace-nowrap select-none tracking-tighter">
        NAWAFITH
      </div>
    </footer>
  );
}
