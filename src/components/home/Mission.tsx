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
          start: "top 75%",
          once: true,
        }
      });

      // 1. Cinematic Clip-Path Reveal for the Image Container
      // RTL me right se left open hoga, LTR me left se right
      const startClip = isRTL 
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" 
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
      
      tl.fromTo(imageWrapperRef.current,
        { clipPath: startClip },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.inOut" },
        0
      );

      // 2. Inner Image Zoom-out on reveal
      tl.fromTo(imgRef.current,
        { scale: 1.4, filter: "grayscale(100%) blur(10px)" },
        { scale: 1, filter: "grayscale(30%) blur(0px)", duration: 1.5, ease: "power4.inOut" },
        0
      );

      // 3. Text block slides in
      tl.fromTo(textWrapperRef.current,
        { opacity: 0, x: isRTL ? -50 : 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
        0.2
      );

      // 4. Stagger text children
      const textChildren = textWrapperRef.current?.children;
      if (textChildren) {
        tl.fromTo(textChildren,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
          0.4
        );
      }

      // 5. Quote Pop effect
      tl.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.95, x: isRTL ? 20 : -20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.6"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  // Interactive Mouse Tracking Effect (The "Kuch Alag" part)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageWrapperRef.current || !imgRef.current || !dataOverlayRef.current) return;
    
    const { left, top, width, height } = imageWrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // Range: -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;

    // Move image slightly in mouse direction
    gsap.to(imgRef.current, {
      x: x * 30,
      y: y * 30,
      duration: 1,
      ease: "power2.out",
    });

    // Move data overlay in opposite direction for 3D depth
    gsap.to(dataOverlayRef.current, {
      x: -x * 40,
      y: -y * 40,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // Reset everything smoothly on mouse leave
    gsap.to([imgRef.current, dataOverlayRef.current], {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)", // Bouncy snap back
    });
    // Restore slight grayscale
    gsap.to(imgRef.current, { filter: "grayscale(30%)", duration: 0.5 });
  };

  const handleMouseEnter = () => {
    // Full color on hover
    gsap.to(imgRef.current, { filter: "grayscale(0%)", duration: 0.5 });
  };

  return (
    <section 
      ref={sectionRef}
      className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden py-20"
    >
      {/* Image Section */}
      <div 
        className={`order-2 lg:order-1 relative ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-white/[0.02] rounded-[2.5rem] blur-2xl transition-all duration-700"></div>
        
        {/* Main interactive container */}
        <div 
          ref={imageWrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 will-change-transform cursor-crosshair"
          style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }} // Initial hidden state
        >
          <img 
            ref={imgRef}
            src="/images/nawafifth-1.jpg" 
            alt="Our Mission" 
            className="w-full h-auto scale-110 will-change-transform"
            referrerPolicy="no-referrer"
          />
          
          {/* Floating Data Overlay */}
          <div 
            ref={dataOverlayRef}
            className="absolute bottom-8 left-8 flex flex-col gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] pointer-events-none will-change-transform bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10"
          >
            <span className="text-white/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              SYSTEM STATUS: OPTIMIZED
            </span>
            <span className="text-white/50">COORDINATES: 26.2859° N, 50.2084° E</span>
            <span className="text-white/40">EST. 2024</span>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div 
        ref={textWrapperRef}
        className={`space-y-10 order-1 lg:order-2 ${isRTL ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'}`}
      >
        <div className="space-y-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Mission</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">
            Pioneering the Future of <span className="italic font-serif font-light text-white/60">Mobile Advertising</span>
          </h2>
        </div>

        <div className="space-y-8 text-white/40 leading-relaxed text-lg font-light">
          <p>
            At <span className="text-white font-medium">{t.mission.nawafith}</span>, we are revolutionizing outdoor advertising with dynamic, innovative <span className="text-white font-medium">{t.mission.onCar}</span>. Our mission is to help businesses connect with their target audiences meaningfully, maximizing visibility and impact on the go.
          </p>
          <p 
            ref={quoteRef}
            className="font-serif italic text-xl text-white/60 border-l-2 border-white/10 pl-6"
          >
            "We believe outdoor advertising should be both {t.mission.impactful} and {t.mission.measurable}."
          </p>
          <p>
            Through our cutting-edge digital screens, we provide tools for tracking performance and making informed decisions. Our goal is to bring brands closer to people in <span className="text-white font-medium">real-time</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 pt-6 border-t border-white/5">
          <div className="space-y-2">
            <span className="text-4xl font-bold font-display">100%</span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Coverage Efficiency</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl font-bold font-display">24/7</span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Active Monitoring</p>
          </div>
        </div>

        <button 
          className="btn-outline group flex items-center gap-4 hover:bg-white hover:text-black transition-all duration-500 ease-out px-8 py-4 rounded-full border border-white/20"
        >
          {t.mission.learnMore}
          <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </section>
  );
}