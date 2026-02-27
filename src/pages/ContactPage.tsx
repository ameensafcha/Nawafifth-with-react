import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const faqs = t.contact.faqs;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 space-y-32"
    >
      <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className={`space-y-12 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">{t.contact.title}</h1>
            <p className="text-lg text-gray-400 leading-relaxed">{t.contact.desc}</p>
          </div>

          <div className="space-y-6">
            <div className={`flex items-center gap-4 text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Phone className="text-white" />
              <span>+123-456-7890</span>
            </div>
            <div className={`flex items-center gap-4 text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin className="text-white" />
              <span>Khobar, Saudi Arabia</span>
            </div>
            <div className={`flex items-center gap-4 text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Mail className="text-white" />
              <span>Nawafithadvsa@gmail.com</span>
            </div>
          </div>

          <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-white hover:text-black transition-all flip-rtl">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="glass-card p-10 space-y-8">
          <h2 className="text-3xl font-bold">{t.contact.contactTitle}</h2>
          <form className="space-y-6">
            <input type="text" placeholder={t.contact.name} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="email" placeholder={t.contact.email} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <input type="tel" placeholder={t.contact.phone} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20" />
            </div>
            <textarea placeholder={t.contact.message} rows={5} className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"></textarea>
            <button className="w-full bg-white/20 text-white font-bold py-4 rounded-md hover:bg-white/30 transition-all">{t.contact.submit}</button>
          </form>
        </div>
      </section>

      <section className="section-container space-y-16">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center tracking-tight">{t.contact.faqTitle}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {faqs.slice(0, 3).map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={`w-full flex items-center justify-between p-6 font-bold ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                  <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {openFaq === i ? <X size={18} /> : <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />}
                    {faq.q}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`px-6 pb-6 text-gray-400 text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {faqs.slice(3).map((faq, i) => {
              const idx = i + 3;
              return (
                <div key={idx} className="glass-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className={`w-full flex items-center justify-between p-6 font-bold ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}>
                    <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {openFaq === idx ? <X size={18} /> : <ChevronRight size={18} className={isRTL ? 'rotate-180' : ''} />}
                      {faq.q}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`px-6 pb-6 text-gray-400 text-sm leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
