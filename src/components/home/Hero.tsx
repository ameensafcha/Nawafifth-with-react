import { useLayoutEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import TextType from '../ui/TextType';
import SplitText from '../ui/SplitText';

const marqueeData = [
  "Dynamic Displays", "Real-time Analytics", "Geo-Targeting",
  "Audience Measurement", "Programmatic DOOH", "Smart Bidding"
];

const displayItems = [...marqueeData, ...marqueeData];

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const scope = useRef(null);
  const marqueeRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 }
      });

      // Reset & Initial States
      gsap.set(".hero-content > *", { x: isRTL ? 30 : -30, opacity: 0 });
      gsap.set(".video-container", { scale: 0.95, opacity: 0 });
      gsap.set(".marquee-bar", { y: 30, opacity: 0 });

      // Timeline Sequence
      tl.to(".hero-content > *", {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power4.out"
      })
        .to(".video-container", {
          scale: 1,
          opacity: 1,
          duration: 1.2
        }, "-=0.8")
        .to(".marquee-bar", {
          y: 0,
          opacity: 1,
          duration: 0.6
        }, "-=0.8");

      // Seamless Marquee Animation
      if (marqueeRef.current) {
        const marqueeWidth = marqueeRef.current.offsetWidth / 2;
        gsap.to(marqueeRef.current, {
          x: isRTL ? marqueeWidth : -marqueeWidth,
          duration: 40,
          repeat: -1,
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % marqueeWidth)
          }
        });
      }
    }, scope);

    return () => ctx.revert();
  }, [isRTL, t.hero.marquee]);

  return (
    <section ref={scope} className="relative min-h-[100dvh] lg:flex lg:items-center overflow-x-hidden bg-[#0a0a0a] pt-32 pb-40 lg:pt-16 lg:pb-0">

      {/* Background Overlay - Optimized with pre-rendered gradient fallback */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000"
          className="w-full h-full object-cover opacity-10"
          alt="bg"
          loading="eager"
        />
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-20 lg:mb-0">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center ${isRTL ? 'direction-rtl' : 'direction-ltr'}`}>

          {/* TEXT CONTENT */}
          <div
            className={`hero-content space-y-6 md:space-y-8 ${isRTL ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}
          >
            <div className="flex items-center gap-4">
              <span className="w-8 md:w-12 h-[1px] bg-white/20" />
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">
                <TextType
                  text={[t.hero.welcomeTo, t.hero.nawafithAdvertising]}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight">
              <SplitText
                text={t.hero.title}
                className="inline-block"
                animation="slide"
                stagger={0.03}
              />
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-xl leading-relaxed">
              {t.hero.subtitle} <span className="text-white font-semibold underline decoration-white/20 underline-offset-8">{t.hero.onCar}</span>.
              <span className="block mt-4 text-xs md:text-sm opacity-50">{t.hero.description}</span>
            </p>

            <div className="flex items-center">
              <button
                ref={buttonRef}
                className="bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-bold flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {t.hero.scheduleCall}
                <ChevronRight size={20} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>
            </div>
          </div>

          {/* VIDEO CONTAINER - Optimized loading */}
          <div className={`video-container w-full ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
              <div className="aspect-video relative">
                <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
                  <source src="/video/1.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MARQUEE BAR */}
      <div className="marquee-bar absolute bottom-0 left-0 w-full py-6 md:py-8 border-t border-white/5 bg-black/60 backdrop-blur-lg z-30">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee, ...t.hero.marquee].map((item, index) => (
            <div key={index} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-white/30 hover:text-white/60 transition-colors cursor-default">
                {item}
              </span>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .direction-rtl { direction: rtl; }
        .direction-ltr { direction: ltr; }
      `}</style>
    </section>
  );
}