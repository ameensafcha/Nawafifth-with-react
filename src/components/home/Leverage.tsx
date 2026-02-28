import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, MapPin, ChevronRight, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TiltCard from '../ui/TiltCard';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Leverage() {
  const { t, isRTL } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsBlockRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Cinematic Image Reveal (Optimized Clip-path)
      gsap.fromTo(imageContainerRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        }
      );

      // 2. Floating Animation for the Live Badge
      gsap.to(badgeRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 3. Staggered reveal for the Right-Side Cards
      const cards = cardsBlockRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsBlockRef.current,
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // Left column reveal
      gsap.fromTo(".leverage-header > *",
        { opacity: 0, x: isRTL ? 20 : -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const leverageData = [
    { icon: Play, title: t.leverage.realtime, desc: t.leverage.realtimeDesc },
    { icon: MapPin, title: t.leverage.strategic, desc: t.leverage.strategicDesc }
  ];

  return (
    <section ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 bg-[var(--bg-primary)] border-b border-[var(--border-secondary)]">

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[var(--glow-accent)] rounded-full blur-[120px] opacity-[0.05]"></div>
      </div>

      <div className="section-container relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          <div
            ref={leftColRef}
            className="lg:col-span-6 lg:sticky lg:top-32 space-y-12 text-start"
          >
            <div className="leverage-header space-y-8">
              {/* Header */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-px bg-[var(--text-accent)] opacity-30"></span>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[var(--text-accent)] font-mono">
                    {t.leverage.strategyLabel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--border-secondary)] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald-500)] animate-pulse"></div>
                    <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                      {t.leverage.networkLive}
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--text-primary)] leading-[0.9]">
                {t.leverage.title} <br />
                <span className="italic font-serif font-light text-[var(--text-accent)] opacity-40">{t.leverage.titlePart2}</span>
              </h2>

              <p className="text-[var(--text-secondary)] max-w-lg text-lg font-light leading-relaxed">
                {t.leverage.desc}
              </p>
            </div>

            <div
              ref={imageContainerRef}
              className="rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-[var(--border-primary)] shadow-2xl relative w-full aspect-[4/3] group bg-[var(--bg-elevated)]"
            >
              <img
                ref={imageRef}
                src="images/hero3.jpg"
                alt="Leverage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <div
                ref={badgeRef}
                className="absolute bottom-10 end-10 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-emerald-500)] animate-pulse"></div>
                <span className="text-[10px] text-[var(--text-primary)] font-mono uppercase tracking-widest font-bold">{t.leverage.networkLive}</span>
              </div>
            </div>

            <MagneticButton className="btn-primary group" strength={0.3}>
              <span className="relative z-10 flex items-center gap-4">
                <Download size={18} />
                <span className="text-sm uppercase tracking-wider">{t.leverage.presentation}</span>
                <ChevronRight size={16} className="transition-transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </MagneticButton>
          </div>

          <div
            ref={cardsBlockRef}
            className="lg:col-span-6 flex flex-col gap-10 lg:pt-32"
          >
            {leverageData.map((item, i) => (
              <TiltCard key={i} className="relative w-full" maxTilt={8}>
                <div
                  className="relative glass-card p-8 sm:p-12 md:p-16 overflow-hidden group w-full h-full"
                >
                  <div className="absolute -end-2 sm:-end-4 -top-4 sm:-top-8 text-[80px] sm:text-[120px] font-black font-display text-[var(--text-accent)] opacity-[0.03] pointer-events-none leading-none select-none italic">
                    0{i + 1}
                  </div>

                  <div className="relative z-10 flex flex-col gap-10">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-tertiary)] group-hover:bg-[var(--gradient-accent)] group-hover:text-black transition-all">
                      <item.icon size={26} strokeWidth={1.5} className="text-[var(--text-accent)] group-hover:text-black" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[var(--text-tertiary)] leading-relaxed text-base sm:text-lg font-light max-w-md">
                        {item.desc}
                      </p>
                    </div>
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