import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const missionImgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          once: true
        }
      });

      tl.fromTo([titleRef.current, descRef.current?.children],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );

      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );

      // Mission section animations
      gsap.fromTo(missionRef.current?.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 85%",
            once: true
          }
        }
      );

      gsap.fromTo(missionImgRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionImgRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] overflow-hidden">
      <section className="bg-[var(--bg-primary)]  md:py-10 pb-8">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 text-start">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-[var(--text-accent)] opacity-30"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono italic">
                  {t.about.whoWeAreLabel}
                </span>
              </div>
              <h1 ref={titleRef} className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--text-primary)]">
                {t.about.title} <br /><span className="italic font-serif font-light text-[var(--text-accent)] opacity-60">{t.about.aboutPart2}</span>
              </h1>
            </div>
            <div ref={descRef} className="space-y-6 sm:space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base md:text-lg font-light max-w-2xl">
              <p>{t.about.description1}</p>
              <div className="relative p-6 sm:p-8 md:p-12 glass-card group transition-colors hover:bg-[var(--glass-hover)]">
                <Quote className="absolute top-4 sm:top-6 left-4 sm:left-6 text-[var(--text-accent)] opacity-[0.05] group-hover:opacity-[0.1] transition-colors" size={32} strokeWidth={1} />
                <p className="font-serif italic text-[var(--text-secondary)] text-lg sm:text-xl md:text-2xl leading-snug relative z-10 pl-4 border-l border-[var(--border-secondary)]">
                  "{t.about.quote}"
                </p>
              </div>
              <p className="text-sm md:text-base">{t.about.description2}</p>
              <p className="text-sm md:text-base">{t.about.description3}</p>
            </div>
          </div>

          <div ref={imageRef} className="lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-2xl border border-[var(--border-primary)] relative aspect-[3/4] bg-[var(--bg-elevated)]">
            <img
              src="images/new-york-streets-high-buildings-cars-cabs-min-2048x1154.jpg"
              alt="About Nawafith"
              className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute top-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap -end-24 font-bold">
              <span className="text-[10px] font-mono uppercase tracking-[1em] text-[var(--text-accent)] opacity-20 italic">
                {t.about.establishedLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-secondary)] py-24 lg:py-32 overflow-hidden relative border-t border-[var(--border-secondary)]">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div ref={missionImgRef} className="lg:col-span-6 relative">
            <div className="absolute -inset-10 bg-[var(--glow-accent)] opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden border border-[var(--border-primary)] shadow-2xl aspect-video bg-[var(--bg-elevated)] group">
              <img
                src="images/home-2.jpg"
                alt="Our Mission"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>

          <div ref={missionRef} className="lg:col-span-6 space-y-10 text-start">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-[var(--text-accent)] opacity-30"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono">{t.about.purposeLabel}</span>
              </div>
              <h2 className="text-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
                {t.about.missionTitle} — <span className="italic font-serif font-light text-[var(--text-accent)] opacity-60">{t.about.missionPart2}</span>
              </h2>
            </div>
            <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed text-base md:text-lg font-light">
              <p>
                {t.about.missionDesc1} <span className="text-[var(--text-accent)] font-medium tracking-tight">{t.about.aboutPart2}</span>, {t.about.missionDesc2}
              </p>
              <p className="text-sm md:text-base opacity-60 leading-relaxed">
                {t.about.missionDesc3}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-10 pt-8 sm:pt-10 border-t border-[var(--border-secondary)]">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] font-display tracking-tighter">100%</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-accent)] font-bold">{t.about.coverageLabel}</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] font-display tracking-tighter">24/7</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-accent)] font-bold">{t.about.brandVisibilityLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
