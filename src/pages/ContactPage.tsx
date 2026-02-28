import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const faqs = t.contact.faqs;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-intro > *",
        { opacity: 0, x: isRTL ? 30 : -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".contact-intro", start: "top 80%", once: true } }
      );

      gsap.fromTo(".contact-form",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".contact-form", start: "top 80%", once: true } }
      );

      gsap.fromTo(".faq-section > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".faq-section", start: "top 85%", once: true } }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <div ref={mainRef} className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] overflow-hidden">
      <section className="bg-[var(--bg-primary)]  md:py-10 pb-8">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className="contact-intro space-y-12 lg:text-start">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-[var(--text-accent)] opacity-30"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono italic">
                  {t.contact.contactTitle}
                </span>
              </div>
              <h1 className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--text-primary)] leading-[0.9]">
                {t.contact.title.split(' ').slice(0, -1).join(' ')} <br />
                <span className="italic font-serif font-light text-[var(--text-accent)] opacity-60">
                  {t.contact.title.split(' ').slice(-1)}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed font-light max-w-xl">{t.contact.desc}</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 text-[var(--text-tertiary)] group transition-colors hover:text-[var(--text-primary)]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-secondary)] flex items-center justify-center group-hover:bg-[var(--gradient-accent)] group-hover:text-black transition-all">
                  <Phone size={20} className="text-[var(--text-accent)] group-hover:text-black" />
                </div>
                <span className="text-lg font-light tracking-tight">{t.contact.phoneValue}</span>
              </div>
              <div className="flex items-center gap-6 text-[var(--text-tertiary)] group transition-colors hover:text-[var(--text-primary)]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-secondary)] flex items-center justify-center group-hover:bg-[var(--gradient-accent)] group-hover:text-black transition-all">
                  <MapPin size={20} className="text-[var(--text-accent)] group-hover:text-black" />
                </div>
                <span className="text-lg font-light tracking-tight">{t.contact.addressValue}</span>
              </div>
              <div className="flex items-center gap-6 text-[var(--text-tertiary)] group transition-colors hover:text-[var(--text-primary)]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-secondary)] flex items-center justify-center group-hover:bg-[var(--gradient-accent)] group-hover:text-black transition-all">
                  <Mail size={20} className="text-[var(--text-accent)] group-hover:text-black" />
                </div>
                <span className="text-lg font-light tracking-tight">{t.contact.emailValue}</span>
              </div>
            </div>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-primary)] flex items-center justify-center hover:bg-[var(--gradient-accent)] hover:text-black hover:-translate-y-1 transition-all">
                  <Icon size={22} className="text-[var(--text-accent)] hover:text-black" />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form glass-card p-6 sm:p-10 md:p-14 space-y-8 md:space-y-10 bg-[var(--bg-elevated)] relative">
            <div className="absolute top-0 end-0 p-6 md:p-8">
              <div className="w-3 h-3 bg-[var(--color-emerald-500)] rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">{t.contact.contactTitle}</h2>
            <form className="space-y-4 md:space-y-6">
              <input type="text" placeholder={t.contact.name} className="w-full bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] text-[var(--text-primary)] transition-all font-light" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input type="email" placeholder={t.contact.email} className="w-full bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] text-[var(--text-primary)] transition-all font-light" />
                <input type="tel" placeholder={t.contact.phone} className="w-full bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] text-[var(--text-primary)] transition-all font-light" />
              </div>
              <textarea placeholder={t.contact.message} rows={5} className="w-full bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] text-[var(--text-primary)] transition-all font-light resize-none"></textarea>
              <button className="btn-primary w-full py-4 md:py-5 text-sm">
                <span className="relative z-10">{t.contact.submit}</span>
              </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-[var(--border-secondary)]">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-accent)] font-bold">{t.contact.phone}</p>
                <p className="text-[var(--text-secondary)] font-medium">{t.contact.phoneValue}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-accent)] font-bold">{t.nav.contact}</p>
                <p className="text-[var(--text-secondary)] font-medium">{t.contact.addressValue}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-accent)]"></span>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[var(--text-accent)] font-mono">
                    {t.contact.knowledgeBaseLabel}
                  </h3>
                </div>
                <p className="text-[var(--text-tertiary)] text-sm leading-relaxed font-light">
                  {t.contact.emailValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section bg-[var(--bg-secondary)] py-24 md:py-32 border-t border-[var(--border-secondary)]">
        <div className="section-container space-y-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[var(--border-secondary)]"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono">{t.contact.knowledgeBaseLabel}</span>
              <span className="w-12 h-px bg-[var(--border-secondary)]"></span>
            </div>
            <h2 className="text-display text-5xl md:text-7xl text-center text-[var(--text-primary)]">{t.contact.faqTitle}</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden bg-[var(--glass-bg)] border border-[var(--border-primary)] rounded-2xl sm:rounded-3xl transition-all hover:border-[var(--border-accent)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between p-6 sm:p-8 font-bold text-base sm:text-lg transition-colors text-start ${openFaq === i ? 'text-[var(--text-accent)]' : 'text-[var(--text-secondary)]'}`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] italic">0{i + 1}</span>
                    <span className="flex-1">{faq.q}</span>
                  </div>
                  <ChevronRight size={20} className={`shrink-0 transition-transform duration-500 ${openFaq === i ? 'rotate-90' : isRTL ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`px-6 sm:px-8 transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[500px] pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <p className="text-[var(--text-tertiary)] text-sm md:text-base leading-relaxed font-light text-start">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
