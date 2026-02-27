import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
  const { t, isRTL } = useLanguage();
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const smallCardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        }
      });

      // 1. Header fade & slide up
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        tl.fromTo(headerElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          0
        );
      }

      // 2. Main Large Card Reveal
      tl.fromTo(mainCardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      // 3. Small Cards Stagger Reveal (from side)
      const smallCards = smallCardsRef.current?.children;
      if (smallCards) {
        tl.fromTo(smallCards,
          { opacity: 0, x: isRTL ? -30 : 30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const solutionsData = [
    { icon: MapPin, title: t.solutions.dataTracked, desc: t.solutions.dataDesc },
    { icon: Globe, title: t.solutions.scalable, desc: t.solutions.scalableDesc }
  ];

  return (
    <section ref={sectionRef} className="bg-brand-gray py-8 md:py-4 overflow-hidden">
      <div className="section-container space-y-10 md:space-y-12">
        
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Solutions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-display leading-[0.9]">
              Precision Engineered <br />
              <span className="italic font-serif font-light text-white/60">Advertising</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm md:text-base font-light leading-relaxed">
            We combine cutting-edge hardware with sophisticated software to deliver your message exactly where it matters most.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          
          {/* Main Large Card */}
          <div 
            ref={mainCardRef}
            className="lg:col-span-8 glass-card overflow-hidden group relative flex flex-col"
          >
            {/* Top Text Content (REF text removed from here) */}
            <div className="p-6 md:p-10 space-y-6 relative z-10 flex-grow">
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{t.solutions.digitalTops}</h3>
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-white group-hover:rotate-180 transition-all duration-500 cursor-pointer flex-shrink-0">
                  <span className="text-lg md:text-xl font-serif italic">N</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                {t.solutions.digitalDesc}
              </p>
              
              <div className={`pt-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors cursor-pointer w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>Explore Technology</span>
                <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
              </div>
            </div>

            {/* Bottom Image - Always colorful */}
            <div className="relative h-[220px] md:h-[300px] overflow-hidden mt-auto">
              <img 
                src="/images/home-2.jpg"
                alt="Digital Top" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Small Cards */}
          <div ref={smallCardsRef} className="lg:col-span-4 flex flex-col gap-5 md:gap-6">
            {solutionsData.map((item, i) => (
              <div 
                key={i}
                className="flex-1 glass-card p-6 md:p-8 flex flex-col justify-center space-y-5 md:space-y-6 group relative overflow-hidden"
              >
                {/* Background Hover Glow */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500"></div>
                
                {/* Icon Container */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <item.icon size={22} className="md:w-6 md:h-6" />
                </div>
                
                {/* Text */}
                <div className="space-y-2 md:space-y-3 relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}