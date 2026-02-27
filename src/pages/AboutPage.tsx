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
    <div ref={mainRef} className={`text-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      <section className="bg-[#050505] py-8 md:py-12">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className={`lg:col-span-7 space-y-8 ${isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1 lg:text-left'}`}>
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30 font-mono italic">
                  {t.about.whoWeAreLabel}
                </span>
              </div>
              <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.9]">
                {t.about.title} <br /><span className="italic font-serif font-light text-white/50">{t.about.aboutPart2}</span>
              </h1>
            </div>
            <div ref={descRef} className="space-y-8 text-white/30 leading-relaxed text-base md:text-lg font-light max-w-2xl">
              <p>{t.about.description1}</p>
              <div className="relative p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-3xl group transition-colors hover:bg-white/[0.04]">
                <Quote className="absolute top-6 left-6 text-white/5 group-hover:text-white/10 transition-colors" size={40} />
                <p className="font-serif italic text-white/60 text-xl md:text-2xl leading-snug relative z-10 pl-4 border-l border-white/10">
                  "{t.about.quote}"
                </p>
              </div>
              <p className="text-sm md:text-base">{t.about.description2}</p>
            </div>
          </div>

          <div ref={imageRef} className={`lg:col-span-5 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative aspect-[3/4] ${isRTL ? 'lg:order-1' : 'lg:order-2'} bg-zinc-900`}>
            <img
              src="images/new-york-streets-high-buildings-cars-cabs-min-2048x1154.jpg"
              alt="About Nawafith"
              className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className={`absolute top-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap ${isRTL ? '-left-24' : '-right-24'}`}>
              <span className="text-[10px] font-mono uppercase tracking-[1em] font-bold text-white/10 italic">
                {t.about.establishedLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-12 lg:py-20 overflow-hidden relative">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div ref={missionImgRef} className={`lg:col-span-6 relative ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="absolute -inset-10 bg-white/[0.01] rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/5 shadow-2xl aspect-video bg-zinc-900 group">
              <img
                src="images/home-2.jpg"
                alt="Our Mission"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] opacity-70"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          </div>

          <div ref={missionRef} className={`lg:col-span-6 space-y-10 ${isRTL ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'}`}>
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`w-12 h-px bg-white/10 ${isRTL ? 'order-1' : ''}`}></span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 font-mono">{t.about.purposeLabel}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter font-display leading-[0.9]">
                {t.about.missionTitle} — <span className="italic font-serif font-light text-white/40">{t.about.missionPart2}</span>
              </h2>
            </div>
            <div className="space-y-6 text-white/30 leading-relaxed text-base md:text-lg font-light">
              <p>
                {t.about.missionDesc1} <span className="text-white/60 font-medium tracking-tight">Nawafith</span>, {t.about.missionDesc2}
              </p>
              <p className="text-sm md:text-base opacity-60 leading-relaxed">
                {t.about.missionDesc3}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
              <div className="space-y-2">
                <p className="text-4xl font-black text-white/80 font-display tracking-tighter">100%</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">{t.about.coverageLabel}</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-black text-white/80 font-display tracking-tighter">24/7</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-bold">{t.about.brandVisibilityLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
