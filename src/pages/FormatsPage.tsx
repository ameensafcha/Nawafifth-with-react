import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * PAGE IMAGES - Change these URLs to update the page visuals easily
 */
const IMAGES = {
  // Main Hero background image
  HERO: '/images/ASSET-7-min-2048x1365.jpg',

  // Gallery Section Images
  LIVE_FORMAT: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
  STATIC_FORMAT: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200',
  GEO_FORMAT: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200',

  // Feature Showcase Images
  FEATURE_IMPACT: '/images/advertising-1of4.png',  // Feature 1
  FEATURE_RESOLUTION: '/images/advertising-format-20f4.png', // Feature 2
  FEATURE_WEATHERPROOF: '/images/advertising-4of4.png', // Feature 3
};

export default function FormatsPage() {
  const { t, isRTL } = useLanguage();
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  const formats = [
    {
      title: t.formats.live,
      desc: t.formats.liveDesc,
      img: IMAGES.LIVE_FORMAT,
      size: 'large',
      tag: t.formats.tagDynamic,
      icon: Zap
    },
    {
      title: t.formats.static,
      desc: t.formats.staticDesc,
      img: IMAGES.STATIC_FORMAT,
      size: 'small',
      tag: t.formats.tagFixed,
      icon: Box
    },
    {
      title: t.formats.geo,
      desc: t.formats.geoDesc,
      img: IMAGES.GEO_FORMAT,
      size: 'small',
      tag: t.formats.tagTargeted,
      icon: Cpu
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Hero Entrance
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

      heroTl.fromTo(heroTextRef.current?.children || [],
        { opacity: 0, x: isRTL ? 100 : -100, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.1 },
        0.2
      );

      heroTl.fromTo(heroImgRef.current,
        { opacity: 0, scale: 1.1, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power4.inOut" },
        0
      );

      // 2. Bento Grid Stagger
      gsap.fromTo(".format-bento-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".formats-section",
            start: "top 75%",
            once: true
          }
        }
      );

      // 3. Feature Sections Reveal
      gsap.utils.toArray(".feature-reveal").forEach((elem: any) => {
        gsap.fromTo(elem,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              once: true
            }
          }
        );
      });

    }, mainRef);

    return () => ctx.revert();
  }, [isRTL]);

  return (
    <div ref={mainRef} className={`text-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative flex items-center pt-6 pb-4 bg-[#050505]">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div ref={heroTextRef} className="lg:col-span-6 space-y-10 z-10">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-[10px] font-mono tracking-[0.5em] text-emerald-500 font-bold uppercase">{t.formats.heroSubtitle}</span>
              <div className="h-[1px] w-20 bg-white/10"></div>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] font-display">
              {t.formats.title.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/40 to-white italic font-serif">{t.formats.title.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="text-xl text-white/40 max-w-xl font-light leading-relaxed">
              {t.formats.desc}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl transition-colors hover:bg-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 text-white">{t.formats.badge1}</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl transition-colors hover:bg-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
                <span className="text-xs font-bold tracking-widest uppercase opacity-80 text-white">{t.formats.badge2}</span>
              </div>
            </div>
          </div>

          <div ref={heroImgRef} className="lg:col-span-6 relative aspect-[4/5] lg:aspect-square group overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl">
            <img
              src={IMAGES.HERO}
              alt="Technology"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-12 left-12 right-12 p-8 glass-card border border-white/10 rounded-3xl translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-2 block">{t.formats.cardLabel}</span>
              <p className="text-sm text-white/80 font-light">{t.formats.cardDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO STYLE FORMATS GALLERY */}
      <section className="formats-section py-4 md:py-8 relative bg-[#0a0a0a]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="section-container relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{t.formats.featTitle}</h2>
            <p className="text-white/30 text-lg md:text-xl font-light max-w-2xl mx-auto uppercase tracking-widest">{t.formats.featSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[450px]">
            {formats.map((f, i) => (
              <div
                key={i}
                className={`format-bento-item group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a] transition-all duration-700 hover:border-white/20 shadow-2xl ${f.size === 'large' ? 'md:col-span-8' : 'md:col-span-4'
                  }`}
              >
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover transition-all duration-1000 scale-[1.02] group-hover:scale-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between">
                  <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <f.icon size={28} />
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-white/20 py-2 px-4 border border-white/10 rounded-full">{f.tag}</span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white">{f.title}</h3>
                    <p className="text-white/60 transition-colors text-lg font-light leading-relaxed max-w-lg">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE SHOWCASE - Alternating Sections & Zigzag */}
      <div className="flex flex-col">
        {[
          { title: t.formats.feat1, desc: t.formats.feat1Desc, img: IMAGES.FEATURE_IMPACT },
          { title: t.formats.feat2, desc: t.formats.feat2Desc, img: IMAGES.FEATURE_RESOLUTION, reverse: true },
          { title: t.formats.feat3, desc: t.formats.feat3Desc, img: IMAGES.FEATURE_WEATHERPROOF },
        ].map((feat, i) => (
          <section
            key={i}
            className={`py-6 md:py-10 relative ${i % 2 === 0 ? 'bg-[#050505]' : 'bg-[#0a0a0a]'}`}
          >
            <div className="section-container relative z-10">
              <div
                className={`feature-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center`}
              >
                <div
                  className={`space-y-6 order-1 ${feat.reverse ? (isRTL ? 'lg:order-1 text-right' : 'lg:order-2 text-left') : (isRTL ? 'lg:order-2 text-right' : 'lg:order-1 text-left')}`}
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[12px] font-mono text-emerald-500 font-black">0{i + 1}</span>
                    <div className="h-[1px] w-10 bg-emerald-500/20"></div>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white">{feat.title}</h3>
                  <p className="text-lg text-white/40 leading-relaxed font-light">{feat.desc}</p>
                  <button className={`btn-outline group relative inline-flex items-center gap-4 bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{t.formats.exploreBtn}</span>
                    <ArrowRight size={16} className={`transition-transform duration-500 group-hover:translate-x-2 ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                  </button>
                </div>

                <div className={`relative rounded-[2.5rem] md:rounded-[3rem] group overflow-hidden border border-white/10 shadow-2xl aspect-[16/9] bg-zinc-900 order-2 ${feat.reverse ? (isRTL ? 'lg:order-2' : 'lg:order-1') : (isRTL ? 'lg:order-1' : 'lg:order-2')}`}>
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}
