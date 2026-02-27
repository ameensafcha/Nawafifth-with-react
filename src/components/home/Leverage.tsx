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
      
      // 1. Cinematic Image Reveal (Curtain opening effect)
      gsap.fromTo(imageContainerRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { 
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
          duration: 1.5, 
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          }
        }
      );

      // Inner image scale down for depth
      gsap.fromTo(imageRef.current,
        { scale: 1.3 },
        { 
          scale: 1, 
          duration: 1.5, 
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          }
        }
      );

      // 2. Floating Animation for the Live Badge
      gsap.to(badgeRef.current, {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 3. Staggered reveal for the Right-Side Cards
      const cards = cardsBlockRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.3, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsBlockRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const leverageData = [
    { icon: Play, title: t.leverage.realtime, desc: t.leverage.realtimeDesc },
    { icon: MapPin, title: t.leverage.strategic, desc: t.leverage.strategicDesc }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#050505]">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Modern Sticky Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Pinned Content (Sticky on Desktop) */}
          <div 
            ref={leftColRef} 
            className={`lg:col-span-6 lg:sticky lg:top-32 space-y-10 ${isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1 lg:text-left'}`}
          >
            {/* Header Area */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-white/40"></span>
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/60">Strategy</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">
                How to Leverage <br /> 
                <span className="italic font-serif font-light text-white/50 text-4xl md:text-5xl lg:text-7xl block mt-2">Nawafith's Advertising</span>
              </h2>
              
              <p className="text-white/40 max-w-lg text-lg font-light leading-relaxed">
                {t.leverage.desc}
              </p>
            </div>

            {/* Image Box */}
            <div 
              ref={imageContainerRef}
              className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative w-full aspect-[4/3] group"
            >
              <img 
                ref={imageRef}
                src="/images/hero3.jpg" 
                alt="Leverage Strategy" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              
              {/* Floating Badge */}
              <div 
                ref={badgeRef}
                className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 flex items-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
                <span className="text-xs text-white font-mono uppercase tracking-widest font-semibold">Live Network Active</span>
              </div>
            </div>

            {/* Download Button */}
            <button className="group relative flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 w-fit overflow-hidden">
              <Download size={20} className="relative z-10" />
              <span className="relative z-10">{t.leverage.presentation}</span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ChevronRight size={18} className={`${isRTL ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>

          {/* RIGHT COLUMN: Scrolling Feature Cards */}
          <div 
            ref={cardsBlockRef} 
            className={`lg:col-span-6 flex flex-col gap-8 pt-12 lg:pt-32 pb-12 lg:pb-32 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {leverageData.map((item, i) => (
              <div 
                key={i}
                className="relative bg-white/[0.02] border border-white/5 p-10 md:p-14 rounded-[2.5rem] overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
              >
                {/* Giant Faded Number for Premium Look */}
                <div className="absolute -right-4 -top-8 text-[150px] font-black font-display text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none leading-none select-none">
                  0{i + 1}
                </div>
                
                {/* Glow Spotlight */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-all duration-700 pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col gap-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <item.icon size={26} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed text-lg font-light max-w-md">
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