import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-secondary)] pt-16 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-[var(--gradient-accent)] opacity-[0.15]"></div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          <div className="sm:col-span-2 lg:col-span-1 space-y-10">
            <img
              src="images/NAWAFITH-LOGO.png"
              alt="Nawafith"
              className="h-10 w-auto object-contain transition-opacity hover:opacity-80 cursor-pointer dark:brightness-100"
              style={{ filter: 'var(--logo-filter)' }}
              onClick={() => setPage('home')}
            />
            <p className="text-base text-[var(--text-tertiary)] leading-relaxed font-light max-w-md">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' }
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-12 h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-accent)] hover:bg-[var(--gradient-accent)] hover:text-black transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-start">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono">{t.footer.navigation}</h4>
            <ul className="space-y-4">
              <li><button onClick={() => setPage('home')} className="text-[var(--text-tertiary)] hover:text-[var(--text-accent)] transition-colors text-sm font-light uppercase tracking-wider">{t.nav.home}</button></li>
              <li><button onClick={() => setPage('about')} className="text-[var(--text-tertiary)] hover:text-[var(--text-accent)] transition-colors text-sm font-light uppercase tracking-wider">{t.footer.about}</button></li>
              <li><button onClick={() => setPage('formats')} className="text-[var(--text-tertiary)] hover:text-[var(--text-accent)] transition-colors text-sm font-light uppercase tracking-wider">{t.footer.formats}</button></li>
              <li><button onClick={() => setPage('contact')} className="text-[var(--text-tertiary)] hover:text-[var(--text-accent)] transition-colors text-sm font-light uppercase tracking-wider">{t.footer.contact}</button></li>
              {/* <li><a href="#" className="text-[var(--text-tertiary)] hover:text-[var(--text-accent)] transition-colors text-sm font-light uppercase tracking-wider">{t.footer.legal}</a></li> */}
            </ul>
          </div>

          <div className="space-y-8 text-start">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono">{t.footer.contactUs}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-[var(--text-tertiary)] text-sm font-light group">
                <MapPin size={16} className="text-[var(--text-accent)] opacity-40 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                <span className="leading-relaxed whitespace-pre-line">{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-4 text-[var(--text-tertiary)] text-sm font-light group">
                <Mail size={16} className="text-[var(--text-accent)] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                <a href="mailto:Nawafith-ooh-adv@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">Nawafith-ooh-adv@gmail.com</a>
              </li>
              <li className="flex items-center gap-4 text-[var(--text-tertiary)] text-sm font-light group">
                <Phone size={16} className="text-[var(--text-accent)] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                <span className="font-mono">+966 --- --- ---</span>
              </li>
            </ul>
          </div>

          {/* Signup/Newsletter Section */}
          <div className="space-y-8 text-start">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono">{t.footer.signupTitle}</h4>
            <p className="text-sm text-[var(--text-tertiary)] font-light leading-relaxed">{t.footer.signupDesc}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t.footer.email}
                className="flex-1 bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] font-light"
              />
              <button className="btn-primary px-6 py-3 text-sm font-bold uppercase tracking-wider">
                {t.footer.send}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-secondary)] flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.3em] font-mono">
          <p className="hover:text-[var(--text-primary)] transition-colors">
            {t.footer.copyright}
          </p>
          {/* <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">{t.footer.privacyPolicy}</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">{t.footer.termsOfService}</a>
          </div> */}
        </div>
      </div>

      {/* Decorative Text Wrapper */}
      <div className="absolute bottom-[-2%] left-1/2 -translate-x-1/2 text-[15vw] sm:text-[18vw] font-black text-[var(--text-accent)] opacity-[0.06] dark:opacity-[0.02] font-display pointer-events-none whitespace-nowrap select-none tracking-tighter transition-all duration-300">
        NAWAFITH
      </div>
    </footer>
  );
}
