import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import InfiniteCarousel from '../components/ui/InfiniteCarousel';

gsap.registerPlugin(ScrollTrigger);

/**
 * PAGE IMAGES - Change these URLs to update the page visuals easily
 */
const IMAGES = {
  // Main Hero background image
  // HERO: 'advertize format.gif',
  HERO: 'images/ASSET-7-min-2048x1365.jpg',

  // Gallery Section Images
  LIVE_FORMAT: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
  STATIC_FORMAT: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200',
  GEO_FORMAT: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200',

  // Feature Showcase Images
  FEATURE_IMPACT: 'images/advertising-1of4.png',  // Feature 1
  FEATURE_RESOLUTION: 'images/advertising-format-20f4.png', // Feature 2
  FEATURE_WEATHERPROOF: 'images/advertising-4of4.png', // Feature 3

  // NEW GIF FORMAT
  AD_GIF: 'advertize-format.gif',
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
      img: IMAGES.AD_GIF,
      tag: t.formats.tagDynamic,
    },
    {
      title: t.formats.static,
      desc: t.formats.staticDesc,
      img: IMAGES.AD_GIF,
      tag: t.formats.tagFixed,
    },
    {
      title: t.formats.geo,
      desc: t.formats.geoDesc,
      img: IMAGES.AD_GIF,
      tag: t.formats.tagTargeted,
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

      // 2. Feature Sections Reveal
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
    <div ref={mainRef} className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] overflow-hidden">

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative flex items-center pt-22  md:py-10 pb-8 bg-[var(--bg-primary)]">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div ref={heroTextRef} className="lg:col-span-6 space-y-10 z-10">
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-[var(--text-accent)] opacity-30"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text-accent)] font-mono italic">
                {t.formats.heroSubtitle}
              </span>
            </div>

            <h1 className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--text-primary)]">
              {t.formats.title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="italic font-serif font-light text-[var(--text-accent)] opacity-60">
                {t.formats.title.split(' ').slice(-1)}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl font-light leading-relaxed">
              {t.formats.desc}
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
              <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] px-6 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl transition-colors hover:bg-[var(--glass-hover)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-emerald-500)] animate-pulse"></div>
                <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-primary)] opacity-80">{t.formats.badge1}</span>
              </div>
              <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] px-6 py-4 rounded-2xl flex items-center gap-4 backdrop-blur-xl transition-colors hover:bg-[var(--glass-hover)]">
                <div className="w-2 h-2 rounded-full bg-[var(--color-emerald-500)] animate-pulse delay-75"></div>
                <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-primary)] opacity-80">{t.formats.badge2}</span>
              </div>
            </div>
          </div>

          <div ref={heroImgRef} className="lg:col-span-6 relative aspect-[4/5] lg:aspect-square group overflow-hidden rounded-[3rem] border border-[var(--border-primary)] shadow-2xl bg-[var(--bg-elevated)]">
            <img
              src={IMAGES.HERO}
              alt="Technology"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-12 left-12 right-12 p-8 glass-card translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-accent)] mb-2 block">{t.formats.cardLabel}</span>
              <p className="text-sm text-[var(--text-secondary)] font-light">{t.formats.cardDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE CAROUSEL GALLERY */}
      <section className="formats-section py-16 md:py-24 relative bg-[var(--bg-secondary)] border-y border-[var(--border-secondary)]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[var(--glow-accent)] opacity-[0.03] rounded-full blur-[120px]"></div>
        </div>

        <div className="section-container relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-display text-4xl sm:text-5xl md:text-8xl text-[var(--text-primary)]">{t.formats.featTitle}</h2>
            <p className="text-[var(--text-tertiary)] text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto uppercase tracking-widest">{t.formats.featSubtitle}</p>
          </div>
        </div>

        <div className="mt-12 relative z-10 w-full overflow-hidden">
          <InfiniteCarousel items={formats} />
        </div>
      </section>

      {/* 3. FEATURE SHOWCASE - Alternating Sections & Zigzag */}
      <div className="flex flex-col">
        <div className="section-container pt-20 md:pt-32 pb-8 text-center lg:text-start">
          <h2 className="text-display text-4xl sm:text-5xl md:text-8xl text-[var(--text-primary)] opacity-20">{t.formats.formatsTitle}</h2>
        </div>
        {[
          { title: t.formats.feat1, desc: t.formats.feat1Desc, img: IMAGES.FEATURE_IMPACT },
          { title: t.formats.feat2, desc: t.formats.feat2Desc, img: IMAGES.FEATURE_RESOLUTION, reverse: true },
          { title: t.formats.feat3, desc: t.formats.feat3Desc, img: IMAGES.FEATURE_WEATHERPROOF },
        ].map((feat, i) => (
          <section
            key={i}
            className={`py-16 md:py-24 relative ${i % 2 === 0 ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)]'}`}
          >
            <div className="section-container relative z-10">
              <div
                className={`feature-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center`}
              >
                <div
                  className={`space-y-8 order-1 text-start ${feat.reverse ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-[var(--text-accent)] font-black">0{i + 1}</span>
                    <div className="h-[1px] w-10 bg-[var(--text-accent)] opacity-30"></div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-[var(--text-primary)]">{feat.title}</h3>
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-light">{feat.desc}</p>
                  <button className="btn-outline group inline-flex items-center gap-4 text-sm sm:text-base">
                    <span>{t.formats.exploreBtn}</span>
                    <ArrowRight size={16} className="transition-transform duration-500 rtl:rotate-180 group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
                  </button>
                </div>

                <div className={`relative rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] group overflow-hidden border border-[var(--border-primary)] shadow-2xl aspect-[4/3] sm:aspect-[16/9] bg-[var(--bg-elevated)] order-2 ${feat.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={feat.img}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
