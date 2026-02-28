import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedCounter from '../ui/AnimatedCounter';
import MagneticButton from '../ui/MagneticButton';

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
        { scale: 1.2, filter: "blur(5px)" },
        { scale: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
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
    gsap.to(imgRef.current, { filter: "brightness(0.9)", duration: 0.4 });
  };

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { filter: "brightness(1)", duration: 0.4 });
  };

  return (
    <section
      ref={sectionRef}

      className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* IMAGE SIDE */}
      <div className="order-2 lg:order-1 relative">
        <div className="absolute -inset-4 bg-[var(--glow-accent)] rounded-[2.5rem] blur-xl opacity-[0.05] transition-all duration-700"></div>

        <div
          ref={imageWrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-[var(--border-primary)] will-change-transform cursor-crosshair bg-[var(--bg-elevated)]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <img
            ref={imgRef}
            src="images/nawafifth-1.jpg"
            alt="Our Mission"
            className="w-full h-auto scale-105 will-change-transform opacity-100 transition-opacity"
            loading="lazy"
          />

          <div
            ref={dataOverlayRef}
            className="absolute bottom-6 left-6 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.1em] pointer-events-none will-change-transform bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10"
          >
            <span className="text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-emerald-500)] animate-pulse"></span>
              {t.mission.statusLabel}: {t.mission.statusValue}
            </span>
            <span className="text-[var(--text-tertiary)]">{t.mission.estLabel} {t.mission.estValue}</span>
          </div>
        </div>
      </div>

      {/* TEXT SIDE */}
      <div
        ref={textWrapperRef}
        className="space-y-8 order-1 lg:order-2 text-start"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-[var(--text-accent)] opacity-40"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono italic">
              {t.mission.missionLabel}
            </span>
          </div>

          <h2 className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter font-display leading-[0.85] text-[var(--text-primary)]">
            {t.mission.pioneeringTitle} <br />
            <span className="italic font-serif font-light text-[var(--text-accent)] opacity-50">{t.mission.mobilePart}</span>
          </h2>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-base md:text-lg lg:text-xl font-light max-w-xl">
            <p>
              {t.mission.description1}{' '}
              <span className="font-semibold text-[var(--text-accent)]">{t.mission.nawafith}</span>
              {t.mission.description2}{' '}
              <span className="font-semibold text-[var(--text-accent)]">{t.mission.onCar}</span>
              {t.mission.description3}{' '}
              <span className="font-semibold">{t.mission.impactful}</span> &amp;{' '}
              <span className="font-semibold">{t.mission.measurable}</span>.
            </p>
            <p ref={quoteRef} className="text-[var(--text-tertiary)]">
              {t.mission.description4}
            </p>
            <p>
              {t.mission.goal}{' '}
              <span className="font-semibold text-[var(--text-accent)]">{t.mission.realTime}</span>{' '}
              {t.mission.description5}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 pt-6">
            <div className="space-y-2">
              <div className="text-5xl font-display font-bold text-[var(--text-accent)]">
                <AnimatedCounter end={1} />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">{t.mission.coverageEfficiency}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-display font-bold text-[var(--text-accent)]">
                <AnimatedCounter end={2} />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">{t.mission.activeMonitoring}</div>
            </div>
          </div>
        </div>

        <MagneticButton
          className="btn-outline group inline-flex items-center gap-3"
          strength={0.2}
        >
          {t.mission.learnMore}
          <ArrowRight size={14} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180" />
        </MagneticButton>
      </div>
    </section >

  );
}