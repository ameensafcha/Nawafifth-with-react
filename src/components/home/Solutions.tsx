import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TiltCard from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
  const { t, isRTL } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const smallCardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        }
      });

      const headerElements = headerRef.current?.children;
      if (headerElements) {
        tl.fromTo(headerElements,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0
        );
      }

      tl.fromTo(mainCardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.2
      );

      const smallCards = smallCardsRef.current?.children;
      if (smallCards) {
        tl.fromTo(smallCards,
          { opacity: 0, x: isRTL ? -20 : 20 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0.4
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const solutionsData = [
    { icon: MapPin, title: t.solutions.dataTracked, desc: t.solutions.dataDesc },
    { icon: Globe, title: t.solutions.scalable, desc: t.solutions.scalableDesc }
  ];

  return (
    <section ref={sectionRef}
      className="bg-[var(--bg-primary)] py-16 sm:py-20 md:py-28 overflow-hidden border-b border-[var(--border-secondary)]">
      <div className="section-container space-y-8 md:space-y-12">

        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 md:mb-24">
          <div className="space-y-4 lg:text-start">
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-[var(--text-accent)] opacity-30"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono">{t.solutions.label}</span>
            </div>
            <h2 className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.9] text-[var(--text-primary)]">
              {t.solutions.precisionTitle} <br />
              <span className="italic font-serif font-light text-[var(--text-accent)] opacity-40">{t.solutions.advertisingTitle}</span>
            </h2>
          </div>
          <div className="lg:max-w-xs space-y-8 lg:text-start">
            <p className="text-[var(--text-tertiary)] text-sm md:text-base leading-relaxed font-light">
              {t.solutions.synergyDesc}
            </p>
            <button
              onClick={() => document.getElementById('formats')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center group-hover:bg-[var(--gradient-accent)] group-hover:text-black transition-all">
                <ChevronRight size={16} className="rtl:rotate-180" />
              </span>
              {t.solutions.explore}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div
            ref={mainCardRef}
            className="lg:col-span-8 glass-card overflow-hidden group relative flex flex-col"
          >
            <div className="p-6 sm:p-8 md:p-12 space-y-6 relative z-10 flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">{t.solutions.digitalTops}</h3>
                <div className="w-12 h-12 rounded-xl border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--border-accent)] transition-all cursor-pointer">
                  <span className="text-lg font-serif italic text-[var(--text-accent)]">N</span>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-xl">
                {t.solutions.digitalDesc}
              </p>

              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[var(--text-accent)] opacity-40 group-hover:opacity-100 transition-opacity w-fit">
                <span>{t.solutions.explore}</span>
                <ChevronRight size={12} className="rtl:rotate-180" />
              </div>
            </div>

            <div className="relative h-[250px] md:h-[350px] overflow-hidden mt-auto">
              <img
                src="images/home-2.jpg"
                alt="Digital"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>

          <div ref={smallCardsRef} className="lg:col-span-4 flex flex-col gap-6">
            {solutionsData.map((item, i) => (
              <TiltCard key={i} className="flex-1 flex" maxTilt={10}>
                <div
                  className="w-full glass-card p-6 sm:p-8 md:p-10 flex flex-col justify-center space-y-4 sm:space-y-6 group relative overflow-hidden"
                >
                  <div className="w-14 h-14 bg-[var(--glass-bg)] rounded-2xl border border-[var(--border-primary)] flex items-center justify-center group-hover:bg-[var(--gradient-accent)] group-hover:text-black transition-all">
                    <item.icon size={24} className="text-[var(--text-accent)] group-hover:text-black" />
                  </div>

                  <div className="space-y-3 relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                    <p className="text-[var(--text-tertiary)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </div>
    </section>

  );
}