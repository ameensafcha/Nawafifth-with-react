import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const { t, isRTL } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const dataOverlayRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        }
      });

      const startClip = isRTL
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

      tl.fromTo(imageWrapperRef.current,
        { clipPath: startClip },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.2, ease: "expo.out" },
        0
      );

      tl.fromTo(imgRef.current,
        { scale: 1.2, filter: "grayscale(100%) blur(5px)" },
        { scale: 1, filter: "grayscale(30%) blur(0px)", duration: 1.2, ease: "expo.out" },
        0
      );

      tl.fromTo(textWrapperRef.current,
        { opacity: 0, x: isRTL ? -30 : 30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        0.2
      );

      const textChildren = textWrapperRef.current?.children;
      if (textChildren) {
        tl.fromTo(textChildren,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0.3
        );
      }

      tl.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.98, x: isRTL ? 10 : -10 },
        { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  // Throttled mouse tracking logic
  const mousePos = useRef({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageWrapperRef.current || !imgRef.current || !dataOverlayRef.current) return;

    const { left, top, width, height } = imageWrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Direct GSAP manipulation is efficient, but we can limit the update frequency
    // GSAP's quickSetter is even better for performance
    gsap.to(imgRef.current, {
      x: x * 20,
      y: y * 20,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });

    gsap.to(dataOverlayRef.current, {
      x: -x * 30,
      y: -y * 30,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    gsap.to([imgRef.current, dataOverlayRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
    gsap.to(imgRef.current, { filter: "grayscale(30%)", duration: 0.4 });
  };

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { filter: "grayscale(0%)", duration: 0.4 });
  };

  return (
    <section
      ref={sectionRef}
      className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden py-20"
    >
      <div className={`order-2 lg:order-1 relative ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="absolute -inset-4 bg-white/[0.01] rounded-[2.5rem] blur-xl transition-all duration-700"></div>

        <div
          ref={imageWrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 will-change-transform cursor-crosshair bg-zinc-900"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} // Prevent invisible start if GSAP fails
        >
          <img
            ref={imgRef}
            src="images/nawafifth-1.jpg"
            alt="Our Mission"
            className="w-full h-auto scale-105 will-change-transform opacity-70"
            loading="lazy"
          />

          <div
            ref={dataOverlayRef}
            className="absolute bottom-6 left-6 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.1em] pointer-events-none will-change-transform bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/5"
          >
            <span className="text-white/70 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
              STATUS: OPTIMIZED
            </span>
            <span className="text-white/40">EST. 2024</span>
          </div>
        </div>
      </div>

      <div
        ref={textWrapperRef}
        className={`space-y-8 order-1 lg:order-2 ${isRTL ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'}`}
      >
        <div className="space-y-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30 font-mono italic">
              {t.mission.missionLabel}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.85]">
            {t.mission.pioneeringTitle} <br />
            <span className="italic font-serif font-light text-white/40">{t.mission.mobilePart}</span>
          </h2>

          <div className={`grid grid-cols-2 gap-4 ${isRTL ? 'lg:justify-end' : ''}`}>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2">
              <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold">{t.mission.statusLabel}</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-white font-bold tracking-tight">{t.mission.statusValue}</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-2">
              <p className="text-[9px] uppercase tracking-widest text-white/20 font-bold">{t.mission.estLabel}</p>
              <p className="text-white font-bold tracking-tight">{t.mission.estValue}</p>
            </div>
          </div>

          <div className="space-y-8 text-white/30 leading-relaxed text-base md:text-lg lg:text-xl font-light max-w-xl">
            <p>
              {t.mission.description1} <span className="text-white/60 font-medium tracking-tight">{t.mission.nawafith}</span> {t.mission.description2} <span className="text-white/60 underline decoration-white/10 underline-offset-8">{t.mission.onCar}</span>.
            </p>
            <p className="text-sm md:text-base opacity-60">
              {t.mission.description3}
            </p>
          </div>

          <div className="flex flex-wrap gap-10 pt-6">
            <div className="space-y-1">
              <p className="text-3xl font-black text-white px-2 py-1 bg-white/[0.03] rounded-lg inline-block">01</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">{t.mission.coverageEfficiency}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-white px-2 py-1 bg-white/[0.03] rounded-lg inline-block">02</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">{t.mission.activeMonitoring}</p>
            </div>
          </div>
        </div>

        <button
          className="group flex items-center gap-3 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 rounded-full border border-white/5 text-sm font-bold"
        >
          {t.mission.learnMore}
          <ArrowRight size={14} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </button>
      </div>
    </section>
  );
}