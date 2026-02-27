import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  variant?: 'boost' | 'elevate';
}

export default function CTA({ variant = 'boost' }: CTAProps) {
  const { t, isRTL } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const btnContentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const title = variant === 'boost' ? t.cta.boostTitle : t.cta.elevateTitle;
  const subtitle = variant === 'boost' ? t.cta.boostSubtitle : t.cta.elevateSubtitle;
  const buttonText = variant === 'boost' ? t.cta.boostButton : t.cta.exploreButton;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        }
      });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out" },
        0
      );

      tl.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.2
      );

      tl.fromTo(buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
        0.4
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Spotlight Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current || !spotlightRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(spotlightRef.current, {
        x, y,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMagneticMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !btnContentRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });

    gsap.to(btnContentRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMagneticLeave = () => {
    gsap.to([buttonRef.current, btnContentRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden flex items-center justify-center min-h-[40vh] bg-brand-black cursor-default border-y border-white/[0.03]"
    >
      {/* Optimized radial gradient spotlight instead of heavy blur div if possible, 
          but keeping the div for dynamic movement with less blur radius */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen opacity-5">
        <img
          src="/images/home-2.jpg"
          alt="Overlay"
          className="w-full h-full object-cover grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black"></div>
      </div>

      <div className="max-w-[1440px] w-full relative z-10 text-center space-y-10 px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-7xl lg:text-8xl font-bold max-w-5xl mx-auto leading-[1] tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
        >
          {title}
        </h2>

        <p
          ref={descRef}
          className="text-base md:text-xl text-white/30 max-w-xl mx-auto font-light leading-relaxed"
        >
          {subtitle}
        </p>

        <div className="flex justify-center">
          <button
            ref={buttonRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="relative group p-1"
          >
            <div className="absolute inset-0 bg-white text-black rounded-full transition-all duration-300 group-hover:scale-105" />

            <div
              ref={btnContentRef}
              className="relative flex items-center gap-4 px-8 py-3.5 font-bold text-black z-10 text-sm md:text-base"
            >
              <Phone size={18} />
              <span>{buttonText}</span>
              <div className="w-6 h-6 bg-black/5 rounded-full flex items-center justify-center">
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                />
              </div>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}