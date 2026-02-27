import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 }
      });

      // Reset & Initial States
      gsap.set(".hero-content > *", { x: isRTL ? 50 : -50, opacity: 0 });
      gsap.set(".video-container", { scale: 0.9, opacity: 0 });
      gsap.set(".marquee-bar", { y: 50, opacity: 0 });

      // Timeline Sequence
      tl.to(".hero-content > *", {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power4.out"
      })
        .to(".video-container", {
          scale: 1,
          opacity: 1,
          duration: 1.5
        }, "-=0.8")
        .to(".marquee-bar", {
          y: 0,
          opacity: 1,
          duration: 0.8
        }, "-=1");

      // Seamless Marquee Animation
      const marqueeWidth = marqueeRef.current.offsetWidth / 2;
      gsap.to(marqueeRef.current, {
        x: isRTL ? marqueeWidth : -marqueeWidth,
        duration: 30,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % marqueeWidth)
        }
      });
    }, scope);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <section ref={scope} className="relative min-h-[100dvh] lg:flex lg:items-center overflow-x-hidden bg-[#0a0a0a] pt-32 pb-40 lg:pt-16 lg:pb-0">

      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000"
          className="w-full h-full object-cover opacity-20"
          alt="bg"
        />
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-20 lg:mb-0">
        {/* IsRTL switch for Grid Order */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center ${isRTL ? 'direction-rtl' : 'direction-ltr'}`}>

          {/* TEXT CONTENT */}
          <div
            className={`hero-content space-y-6 md:space-y-8 ${isRTL ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            <div className={`flex items-center gap-4 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <span className="w-8 md:w-12 h-[1px] bg-white/30" />
              <TextType
                text={[t.hero.welcomeTo, "Nawafith Advertising"]}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 font-bold"
              />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight">
              <SplitText
                text={t.hero.title}
                className="inline-block"
                animation="slide"
                stagger={0.05}
              />
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-xl leading-relaxed">
              {t.hero.subtitle} <span className="text-white font-semibold underline decoration-white/20 underline-offset-8">{t.hero.onCar}</span>.
              <span className="block mt-4 text-xs md:text-sm opacity-60">{t.hero.description}</span>
            </p>

            <div className={`flex items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-bold flex items-center gap-3 group transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                {t.hero.scheduleCall}
                <ChevronRight size={20} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          </div>

          {/* VIDEO CONTAINER */}
          <div className={`video-container w-full ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <div className="aspect-video relative">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/video/1.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MARQUEE BAR */}
      <div className="marquee-bar absolute bottom-0 left-0 w-full py-6 md:py-8 border-t border-white/5 bg-black/80 md:bg-black/60 backdrop-blur-xl z-30">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[...displayItems, ...displayItems].map((item, index) => (
            <div key={index} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-white/40 hover:text-white/80 transition-colors">
                {item}
              </span>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/20" />
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