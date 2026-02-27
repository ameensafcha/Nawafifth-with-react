import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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
    <section ref={sectionRef} className="bg-[#0a0a0a] py-16 md:py-24 overflow-hidden border-b border-white/[0.03]">
      <div className="section-container space-y-12">

        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 md:mb-24">
          <div className={`space-y-4 ${isRTL ? 'lg:text-right' : ''}`}>
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="w-12 h-px bg-white/10"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 font-mono">{t.solutions.label}</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.9]">
              {t.solutions.precisionTitle} <br />
              <span className="italic font-serif font-light text-white/40">{t.solutions.advertisingTitle}</span>
            </h2>
          </div>
          <div className={`lg:max-w-xs space-y-8 ${isRTL ? 'lg:text-right' : ''}`}>
            <p className="text-white/30 text-sm md:text-base leading-relaxed font-light">
              {t.solutions.synergyDesc}
            </p>
            <button
              onClick={() => document.getElementById('formats')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
              </span>
              {t.solutions.explore}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div
            ref={mainCardRef}
            className="lg:col-span-8 glass-card overflow-hidden group relative flex flex-col border border-white/5"
          >
            <div className="p-8 md:p-12 space-y-6 relative z-10 flex-grow">
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight">{t.solutions.digitalTops}</h3>
                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white transition-all cursor-pointer">
                  <span className="text-lg font-serif italic">N</span>
                </div>
              </div>

              <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xl">
                {t.solutions.digitalDesc}
              </p>

              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors w-fit">
                <span>Explore</span>
                <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
              </div>
            </div>

            <div className="relative h-[250px] md:h-[350px] overflow-hidden mt-auto">
              <img
                src="/images/home-2.jpg"
                alt="Digital"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>

          <div ref={smallCardsRef} className="lg:col-span-4 flex flex-col gap-6">
            {solutionsData.map((item, i) => (
              <div
                key={i}
                className="flex-1 glass-card p-8 md:p-10 flex flex-col justify-center space-y-6 group relative overflow-hidden border border-white/5"
              >
                <div className="w-14 h-14 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <item.icon size={24} />
                </div>

                <div className="space-y-3 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}