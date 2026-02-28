import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FooterImage() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );

      gsap.fromTo(imgRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#050505] py-20 lg:py-40">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={containerRef}
          className="relative w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden rounded-[3rem] shadow-2xl group bg-zinc-900 border border-white/5 opacity-0"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none"></div>

          <img
            ref={imgRef}
            src="images/new-york-streets-high-buildings-cars-cabs-min-2048x1154.jpg"
            alt="City Advertising"
            className="w-full h-full object-cover opacity-100 transition-all duration-1000"
            loading="lazy"
          />

          {/* Subtle Overlay Text */}
          <div className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center gap-8 md:gap-12">
            <div className="flex items-center gap-4 md:gap-8">
              <span className="w-12 md:w-32 h-px bg-white/10"></span>
              <span className="text-xs md:text-sm uppercase tracking-[0.6em] md:tracking-[1em] font-bold text-white/20 text-center">
                {t.footerImage.urbanNetwork}
              </span>
              <span className="w-12 md:w-32 h-px bg-white/10"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
