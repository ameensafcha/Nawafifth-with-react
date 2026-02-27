import React from 'react';
import { useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function CTA2() {
  const { t, isRTL } = useLanguage();
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const btnContentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        }
      });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 80, scale: 0.9, filter: "blur(15px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
        0
      );

      tl.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=1"
      );

      tl.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)" },
        "-=0.8"
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
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMagneticMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !btnContentRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.6,
      ease: "power3.out"
    });

    gsap.to(btnContentRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.6,
      ease: "power3.out"
    });
  };

  const handleMagneticLeave = () => {
    gsap.to([buttonRef.current, btnContentRef.current], {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-12 overflow-hidden flex items-center justify-center min-h-[50vh] bg-brand-black cursor-default"
    >
      <div 
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      ></div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen opacity-10">
        <img 
          src="/images/home-2.jpg" 
          alt="CTA Background" 
          className="w-full h-full object-cover grayscale" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black"></div>
      </div>

      <div className="section-container relative z-10 text-center space-y-12 px-6">
        <h2 
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold max-w-6xl mx-auto leading-[0.9] tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
        >
          {t.cta.elevateTitle}
        </h2>
        
        <p 
          ref={descRef}
          className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {t.cta.elevateSubtitle}
        </p>
        
        <div className="pt-8 flex justify-center">
          <button 
            ref={buttonRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="relative group p-1"
          >
            <div className="absolute inset-0 bg-white text-black rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"></div>
            
            <div 
              ref={btnContentRef}
              className="relative flex items-center gap-4 px-8 py-4 font-semibold text-black z-10"
            >
              <Phone size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-lg">{t.cta.exploreButton}</span>
              <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                <ChevronRight 
                  size={18} 
                  className={`group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} 
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
