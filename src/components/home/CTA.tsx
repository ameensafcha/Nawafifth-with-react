import React, { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function CTA({
  title,
  subtitle,
  buttonText
}: CTAProps) {
  const { isRTL } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

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

      tl.fromTo(buttonContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
        0.4
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden flex items-center justify-center min-h-[40vh] bg-[var(--bg-primary)] cursor-default border-y border-[var(--border-secondary)] transition-colors duration-300"
    >
      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[60px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>

      {/* --- BACKGROUND IMAGE & MAGIC OVERLAY --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Main Image */}
        <img
          src="images/home-2.jpg"
          alt="Overlay"
          className="w-full h-full object-cover transition-transform duration-[3s] scale-105"
          loading="lazy"
        />

        {/* Magic Overlay:
          - Light Mode: Subtle white tint with high blur for soft look.
          - Dark Mode: Deep black tint with low blur for high-tech look.
        */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-[8px] dark:backdrop-blur-[4px] transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-80"></div>

      </div>

      {/* Content */}
      <div className="max-w-[1440px] w-full relative z-10 text-center space-y-10 px-6">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold max-w-5xl mx-auto leading-[1] tracking-tighter font-display text-[var(--text-primary)] transition-colors duration-300"
        >
          {title}
        </h2>

        <p
          ref={descRef}
          className="text-sm sm:text-base md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto font-light leading-relaxed transition-colors duration-300"
        >
          {subtitle}
        </p>

        <div ref={buttonContainerRef} className="flex justify-center py-6">
          <MagneticButton
            strength={0.5}
            className="relative group p-1"
          >
            <div className="absolute inset-0 bg-white dark:bg-[var(--text-primary)] text-black rounded-full transition-all duration-300 group-hover:scale-105" />

            <div className="relative flex items-center gap-4 px-8 py-3.5 font-bold text-black dark:text-[var(--bg-primary)] z-10 text-sm md:text-base">
              <Phone size={18} />
              <span>{buttonText}</span>
              <div className="w-6 h-6 bg-black/5 dark:bg-white/20 rounded-full flex items-center justify-center">
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                />
              </div>
            </div>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}