import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronRight, X } from 'lucide-react';
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
    <div ref={mainRef} className={`text-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      <section className="bg-[#050505] pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className={`contact-intro space-y-12 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-display leading-[0.9]">{t.contact.title}</h1>
              <p className="text-xl text-white/30 leading-relaxed font-light max-w-xl">{t.contact.desc}</p>
            </div>

            <div className="space-y-8">
              <div className={`flex items-center gap-6 text-white/40 group transition-colors hover:text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-lg font-light tracking-tight">{t.contact.phoneValue}</span>
              </div>
              <div className={`flex items-center gap-6 text-white/40 group transition-colors hover:text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin size={20} />
                </div>
                <span className="text-lg font-light tracking-tight">{t.contact.addressValue}</span>
              </div>
              <div className={`flex items-center gap-6 text-white/40 group transition-colors hover:text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-lg font-light tracking-tight">{t.contact.emailValue}</span>
              </div>
            </div>

            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center hover:bg-white hover:text-black hover:-translate-y-1 transition-all">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form glass-card p-10 md:p-14 space-y-10 border border-white/5 bg-[#050505] rounded-[2.5rem] shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.contact.contactTitle}</h2>
            <form className="space-y-6">
              <input type="text" placeholder={t.contact.name} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all font-light" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="email" placeholder={t.contact.email} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all font-light" />
                <input type="tel" placeholder={t.contact.phone} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all font-light" />
              </div>
              <textarea placeholder={t.contact.message} rows={5} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all font-light resize-none"></textarea>
              <button className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98] shadow-xl uppercase tracking-widest text-xs">{t.contact.submit}</button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-white/5">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{t.contact.phone}</p>
                <p className="text-white/60 font-medium">{t.contact.phoneValue}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">{t.nav.contact}</p>
                <p className="text-white/60 font-medium">{t.contact.addressValue}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 font-mono">
                    {t.contact.knowledgeBaseLabel}
                  </h3>
                </div>
                <p className="text-white/30 text-sm leading-relaxed font-light">
                  {t.contact.emailValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section bg-[#0a0a0a] py-12 md:py-20">
        <div className="section-container space-y-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-white/10"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 font-mono">{t.contact.knowledgeBaseLabel}</span>
              <span className="w-12 h-px bg-white/10"></span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-center tracking-tighter font-display leading-[0.9]">{t.contact.faqTitle}</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden border border-white/5 bg-white/[0.01] rounded-2xl transition-all hover:bg-white/[0.03]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between p-8 font-bold text-lg transition-colors ${openFaq === i ? 'text-white' : 'text-white/40'} ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
                >
                  <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-mono text-white/20 italic">0{i + 1}</span>
                    {faq.q}
                  </div>
                  <ChevronRight size={20} className={`transition-transform duration-500 ${openFaq === i ? 'rotate-90' : isRTL ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`px-8 transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[300px] pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <p className={`text-white/30 text-sm md:text-base leading-relaxed font-light ${isRTL ? 'text-right' : 'text-left'}`}>
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
