import { useLayoutEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import TextType from '../ui/TextType';
import SplitText from '../ui/SplitText';
import MagneticButton from '../ui/MagneticButton';

const marqueeData = [
  "Dynamic Displays", "Real-time Analytics", "Geo-Targeting",
  "Audience Measurement", "Programmatic DOOH", "Smart Bidding"
];

const displayItems = [...marqueeData, ...marqueeData];

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const scope = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.2 }
      });

      // Reset & Initial States
      gsap.set(".hero-content > *", { x: isRTL ? 30 : -30, opacity: 0 });
      gsap.set(".video-container", { scale: 0.95, opacity: 0 });

      // Timeline Sequence
      tl.to(".hero-content > *", {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power4.out"
      })
        .to(".video-container", {
          scale: 1,
          opacity: 1,
          duration: 1.2
        }, "-=0.8")
        .to(".video-container", {
          scale: 1,
          opacity: 1,
          duration: 1.2
        }, "-=0.8");

    }, scope);

    return () => ctx.revert();
  }, [isRTL, t.hero.marquee]);

  return (
    <section ref={scope} className="relative min-h-[100dvh] lg:flex lg:items-center overflow-x-hidden lg:py-6">

      {/* Background with subtle grain/noise */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--glow-accent)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--glow-secondary)] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="section-container relative z-10 pt-32 pb-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="hero-content text-start">
            {/* Badge: liveCampaigns + liveSubtitle */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--border-secondary)] mb-8 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-[var(--color-emerald-500)] animate-pulse"></span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                {t.hero.liveCampaigns}
              </span>
              <span className="text-[9px] md:text-[10px] text-[var(--text-tertiary)] border-l border-[var(--border-primary)] pl-3">
                {t.hero.liveSubtitle}
              </span>
            </div>

            {/* welcomeTo + TextType animation */}
            <div className="flex gap-2 text-base sm:text-lg md:text-xl text-[var(--text-tertiary)] mb-4 uppercase tracking-[0.3em] font-light">
              <span>{t.hero.welcomeTo}</span>
              <span className="text-[var(--text-accent)] font-bold italic">
                <TextType
                  text={t.hero.words}
                  loop={true}
                  typingSpeed={60}
                  deletingSpeed={40}
                  pauseDuration={1}
                  initialDelay={0.5}
                  cursorClassName="text-[var(--text-accent)]"
                />
              </span>
            </div>

            {/* nawafithAdvertising as main heading split into two lines */}
            <h1 className="text-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-8 md:mb-12 text-[var(--text-primary)] max-w-[100vw] leading-[0.8] tracking-tight">
              <span className="block">
                <SplitText
                  text={t.hero.title.split('\n')[0]}
                  animation="slide"
                  stagger={0.05}
                />
              </span>
              <span className="block italic font-serif text-[var(--text-accent)] opacity-60 mt-2">
                <SplitText
                  text={t.hero.title.split('\n')[1] || ''}
                  animation="slide"
                  stagger={0.05}
                />
              </span>
            </h1>

            {/* subtitle + onCar + description */}
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-10 max-w-xl leading-relaxed">
              {t.hero.subtitle}{' '}
              <span className="font-semibold text-[var(--text-accent)]">{t.hero.onCar}</span>{' '}
              {t.hero.description}
            </p>

            {/* Buttons: scheduleCall + explore */}
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                className="btn-primary group shadow-[0_0_40px_var(--glow-accent)] hover:shadow-[0_8px_30px_var(--glow-accent)]"
                strength={0.4}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t.hero.scheduleCall}
                  <ChevronRight className="w-5 h-5 rtl:rotate-180 rtl:group-hover:-translate-x-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
              <MagneticButton
                className="btn-outline group"
                strength={0.3}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t.hero.explore}
                  <ChevronRight className="w-5 h-5 rtl:rotate-180 rtl:group-hover:-translate-x-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* VIDEO CONTAINER - Optimized loading */}
          <div className="video-container w-full">
            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-elevated)] shadow-2xl">
              <div className="aspect-video relative">
                <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
                  <source src="video/1.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}