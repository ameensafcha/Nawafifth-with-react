import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const faqs = t.contact.faqs;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data: typeof formData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = 'Name is required';
    if (!data.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Enter a valid email';
    }
    if (!data.phone.trim()) {
      errs.phone = 'Phone is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(data.phone)) {
      errs.phone = 'Enter a valid phone number';
    }
    if (!data.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    let sanitized = value;
    if (field === 'phone') sanitized = value.replace(/[^0-9\s\-+()\+]/g, '');
    const updated = { ...formData, [field]: sanitized };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  // Ensure this is your latest deployment URL
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbnMJk6dE1qC0SOV3I7MjKfxyfAwi1xdw2yc1-TVCVJiRzt4L0Insaf3xliSdil5ttHQ/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      const loadingToast = toast.loading(t.contact.submitting || 'Sending...');
      
      try {
        // FormData ka use karein POST request ke liye (Most reliable for Apps Script)
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('phone', formData.phone);
        submitData.append('message', formData.message);

        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Bypass CORS 
          body: submitData
        });

        // no-cors mode mein response read nahi hota, isliye assume success if no crash
        toast.success(t.contact.successMessage || 'Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTouched({});
        setErrors({});
      } catch (err) {
        console.error('Submission error:', err);
        toast.error(t.contact.errorMessage || 'Failed to send. Please try again.');
      } finally {
        toast.dismiss(loadingToast);
        setIsSubmitting(false);
      }
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-[var(--glass-bg)] border rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 focus:outline-none focus:ring-1 text-[var(--text-primary)] transition-all font-light ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:ring-red-500'
        : 'border-[var(--border-primary)] focus:ring-[var(--border-accent)]'
    }`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });
      tl.fromTo(".contact-intro > *",
        { opacity: 0, x: isRTL ? 100 : -100, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.1 },
        0.2
      );
      tl.fromTo(".contact-form",
        { opacity: 0, scale: 1.05, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power4.inOut" },
        0
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
      <section className="bg-[var(--bg-primary)] pt-22 md:py-10 pb-8">
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-6">
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder={t.contact.name}
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={inputClass('name')}
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs px-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder={t.contact.email}
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={inputClass('email')}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs px-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    placeholder={t.contact.phone}
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={inputClass('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs px-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <textarea
                  placeholder={t.contact.message}
                  rows={5}
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={inputClass('message')}
                ></textarea>
                {touched.message && errors.message && (
                  <p className="text-red-500 text-xs px-1">{errors.message}</p>
                )}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 md:py-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="relative z-10">{isSubmitting ? (t.contact.submitting || 'Sending...') : t.contact.submit}</span>
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
                <div className={`px-6 sm:px-8 transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[500px] pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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