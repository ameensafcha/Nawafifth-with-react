import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from '../components/ui/MagneticButton';
import CTA from '../components/home/CTA';
import { Page } from '../types';


gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  setPage: (page: Page) => void;
  key?: React.Key;
}

export default function AboutPage({ setPage }: AboutPageProps) {
  const { t, isRTL } = useLanguage();

  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const missionImgRef = useRef<HTMLDivElement>(null);
  const offeringsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.5 },
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
          once: true
        }
      });

      tl.fromTo([titleRef.current, descRef.current?.children],
        { opacity: 0, x: isRTL ? 100 : -100, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.1 },
        0.2
      );

      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 1.1, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power4.inOut" },
        0
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

      gsap.fromTo(offeringsRef.current?.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: offeringsRef.current,
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
      <section className="bg-[var(--bg-primary)] pt-22  md:py-10 pb-8">
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

      <section className="bg-[var(--bg-primary)] py-20 lg:py-28 relative border-t border-[var(--border-secondary)]">
        <div ref={offeringsRef} className="section-container flex flex-col items-center justify-center text-center space-y-12">

          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-display text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              {t.offerings.title}
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg font-light max-w-3xl mx-auto">
              {t.offerings.desc}
            </p>
          </div>

          <div className="flex justify-center w-full mt-8">
            <div className="glass-card group p-8 sm:p-10 rounded-xl max-w-lg w-full text-start flex flex-col gap-6 relative overflow-hidden transition-colors hover:bg-[var(--glass-hover)] shadow-2xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)]">
              <div className="absolute -inset-20 bg-[var(--text-primary)] opacity-[0.02] blur-[40px] pointer-events-none group-hover:opacity-[0.05] transition-opacity"></div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-[var(--border-secondary)] pb-6 relative z-10">
                <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-sm">
                  <div className="text-[10px] font-bold border-2 border-[var(--text-primary)] rounded px-1 mb-0.5 leading-none py-0.5">AD</div>
                  <Car className="w-7 h-7 text-[var(--text-primary)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
                  {t.offerings.card1Title}
                </h3>
              </div>

              <p className="text-[var(--text-secondary)] font-light leading-relaxed text-base relative z-10">
                {t.offerings.card1Desc}
              </p>
            </div>
          </div>

          <div className="pt-8 w-full flex justify-center">
            <MagneticButton>
              <button onClick={() => setPage('contact')} className="inline-flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-primary)] px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase border border-[var(--border-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 gap-3 group shadow-sm w-full sm:w-auto">
                <span>{t.offerings.getInTouch}</span>
                <span className="rtl:rotate-180 transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 font-bold text-lg">›</span>
              </button>
            </MagneticButton>
          </div>

        </div>
      </section>
      <section>
        <CTA
          title={t.cta.elevateTitle}
          subtitle={t.cta.elevateSubtitle}
          buttonText={t.cta.exploreButton}
          setPage={setPage}
        />
      </section>
    </div>
  );
}
