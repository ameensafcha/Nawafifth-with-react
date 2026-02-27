import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, MapPin, ChevronRight, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#050505] border-y border-white/[0.03]">

      {/* Reduced Glow Opacity for Performance */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          <div
            ref={leftColRef}
            className={`lg:col-span-6 lg:sticky lg:top-32 space-y-12 ${isRTL ? 'lg:order-2 lg:text-right text-right' : 'lg:order-1 lg:text-left text-left'}`}
          >
            <div className="leverage-header space-y-8">
              {/* Header */}
              <div className="flex flex-col gap-6">
                <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="w-10 h-px bg-white/20"></span>
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 font-mono">
                    {t.leverage.strategyLabel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                      {t.leverage.networkLive}
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.9]">
                How to Leverage <br />
                <span className="italic font-serif font-light text-white/40">Nawafith Ads</span>
              </h2>

              <p className="text-white/30 max-w-lg text-lg font-light leading-relaxed">
                {t.leverage.desc}
              </p>
            </div>

            <div
              ref={imageContainerRef}
              className="rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative w-full aspect-[4/3] group bg-zinc-900"
            >
              <img
                ref={imageRef}
                src="images/hero3.jpg"
                alt="Leverage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] opacity-70 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <div
                ref={badgeRef}
                className="absolute bottom-10 right-10 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-3 shadow-2xl"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] text-white/80 font-mono uppercase tracking-widest font-bold">Network Live</span>
              </div>
            </div>

            <button className="group relative flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-xl w-fit">
              <Download size={18} />
              <span className="text-sm uppercase tracking-wider">{t.leverage.presentation}</span>
              <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </button>
          </div>

          <div
            ref={cardsBlockRef}
            className={`lg:col-span-6 flex flex-col gap-10 lg:pt-32 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {leverageData.map((item, i) => (
              <div
                key={i}
                className="relative bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[3rem] overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-xl"
              >
                <div className="absolute -right-4 -top-8 text-[120px] font-black font-display text-white/[0.02] pointer-events-none leading-none select-none italic">
                  0{i + 1}
                </div>

                <div className="relative z-10 flex flex-col gap-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all">
                    <item.icon size={26} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-emerald-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/30 leading-relaxed text-lg font-light max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}