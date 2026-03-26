import { useLayoutEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';
import TextType from '../ui/TextType';
import SplitText from '../ui/SplitText';
import MagneticButton from '../ui/MagneticButton';
import { Page } from '../../types';

interface HeroProps {
  setPage: (page: Page) => void;
}

export default function Hero({ setPage }: HeroProps) {
  const { t, isRTL } = useLanguage();
  const scope = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", duration: 1.5 }
      });

      tl.fromTo(".hero-content > *",
        { opacity: 0, x: isRTL ? 100 : -100, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.1 },
        0.2
      );

      tl.fromTo(".video-container",
        { opacity: 0, scale: 1.1, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power4.inOut" },
        0
      );

      if (isRTL) {
        tl.fromTo("h1 .ar-title-line",
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.15 },
          0.2
        );
      }

      // Taglines animation
      tl.fromTo(".tagline-item",
        { opacity: 0, x: 40, filter: "blur(6px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", stagger: 0.15, duration: 1, ease: "expo.out" },
        1.2
      );

      tl.fromTo(".tagline-line",
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.15, duration: 0.8, ease: "expo.out" },
        1.2
      );

    }, scope);

    return () => ctx.revert();
  }, [isRTL, t.hero.marquee]);

  return (
    <section ref={scope} className="relative min-h-[100dvh] lg:flex lg:items-center overflow-x-hidden lg:py-6">

      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--glow-accent)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--glow-secondary)] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="section-container relative z-10 pt-32 pb-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column */}
          <div className="hero-content text-start">

            {/* welcomeTo + TextType */}
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

            {/* Title */}
            <h1 className="text-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-8 md:mb-12 text-[var(--text-primary)] max-w-[100vw] leading-[0.8] tracking-tight">
              <span className="block">
                {isRTL ? (
                  <span className="ar-title-line inline-block">
                    {t.hero.title.split('\n')[0]}
                  </span>
                ) : (
                  <SplitText
                    text={t.hero.title.split('\n')[0]}
                    animation="slide"
                    stagger={0.05}
                  />
                )}
              </span>
              <span className="block italic font-serif text-[var(--text-accent)] opacity-60 mt-2">
                {isRTL ? (
                  <span className="ar-title-line inline-block">
                    {t.hero.title.split('\n')[1] || ''}
                  </span>
                ) : (
                  <SplitText
                    text={t.hero.title.split('\n')[1] || ''}
                    animation="slide"
                    stagger={0.05}
                  />
                )}
              </span>
            </h1>

            {/* subtitle + onCar + description */}
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-10 max-w-xl leading-relaxed">
              {t.hero.subtitle}{' '}
              <span className="font-semibold text-[var(--text-accent)]">{t.hero.onCar}</span>{' '}
              {t.hero.description}
            </p>

            {/* Button */}
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                className="btn-primary group shadow-[0_0_40px_var(--glow-accent)] hover:shadow-[0_8px_30px_var(--glow-accent)]"
                strength={0.4}
                onClick={() => setPage('contact')}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t.hero.scheduleCall}
                  <ChevronRight className="w-5 h-5 rtl:rotate-180 rtl:group-hover:-translate-x-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column - VIDEO + TAGLINES */}
          <div className="flex flex-col gap-8">

            {/* VIDEO */}
            <div className="video-container w-full">
              <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-elevated)] shadow-2xl">
                <div className="aspect-video relative">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://res.cloudinary.com/dpgaxuazo/video/upload/q_auto,f_auto,so_0/v1772366932/1_1_esy6bv.jpg"
                    className="w-full h-full object-cover bg-[var(--bg-primary)]"
                  >
                    <source src="https://res.cloudinary.com/dpgaxuazo/video/upload/q_auto,f_auto/v1772366932/1_1_esy6bv.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* TAGLINES - video ke neeche */}
            <div className="flex flex-col">
              {t.hero.taglines.map((item, i) => (
                <div
                  key={i}
                  className="tagline-item group relative flex items-center gap-4 py-3 cursor-default"
                >
                  {/* top border */}
                  <div className="tagline-line absolute top-0 left-0 h-[1px] w-full bg-[var(--border-primary)] origin-left" />

                  {/* number */}
                  <span className="text-xs font-mono text-[var(--text-accent)] opacity-50 group-hover:opacity-100 transition-opacity duration-300 min-w-[2rem]">
                    {item.number}
                  </span>

                  {/* divider */}
                  <span className="w-px h-4 bg-[var(--border-secondary)]" />

                  {/* text */}
                  <span className="text-sm sm:text-base text-[var(--text-secondary)] group-hover:text-[var(--text-accent)] transition-colors duration-300 tracking-wide flex-1">
                    {item.text}
                  </span>

                  {/* arrow */}
                  <ChevronRight className="w-4 h-4 text-[var(--text-accent)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}