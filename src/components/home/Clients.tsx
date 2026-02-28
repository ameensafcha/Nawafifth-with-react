import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useLanguage } from '../../context/LanguageContext';

// GSAP ko batana padta hai ki hum Draggable use kar rahe hain
gsap.registerPlugin(Draggable);

// --- YAHAN SE SPEED AUR DELAY SET KAREIN --- //
const ANIMATION_SPEED = 1; // Slide hone me kitna time lagega (seconds me)
const PAUSE_DELAY = 5;     // Ek slide chalne ke baad kitni der rukega (seconds me)
// ------------------------------------------ //

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
];

// Screen pe khali jagah na bache isliye hum isko 3 baar render karenge drag safety ke liye
const infiniteLogos = [...clientLogos, ...clientLogos, ...clientLogos];

export default function ClientsCarousel() {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!sliderRef.current || !sliderRef.current.children.length) return;

      const boxes = gsap.utils.toArray('.carousel-card') as HTMLElement[];
      const boxWidth = boxes[1].offsetLeft - boxes[0].offsetLeft;

      // Ek original set ki total width (Loop banane ke liye)
      const singleSetWidth = boxWidth * clientLogos.length;

      let currentIndex = 0;
      let timer: gsap.core.Tween;

      // 1. Fade Up Entrance
      gsap.fromTo(
        ".fade-up-element",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: "power3.out" }
      );

      // 2. Auto Play Logic
      const startAutoPlay = () => {
        timer = gsap.delayedCall(PAUSE_DELAY, () => {
          currentIndex++;

          gsap.to(sliderRef.current, {
            x: -(currentIndex * boxWidth),
            duration: ANIMATION_SPEED,
            ease: "expo.inOut",
            onComplete: () => {
              // Agar ek set khatam ho gaya, toh seamlessly zero pe le aao
              if (currentIndex >= clientLogos.length) {
                currentIndex = 0;
                gsap.set(sliderRef.current, { x: 0 });
              }
              startAutoPlay(); // Loop continue karo
            }
          });
        });
      };

      // 3. Draggable Logic (Mouse & Touch)
      Draggable.create(sliderRef.current, {
        type: "x",
        inertia: false, // Free version logic
        onPress: function () {
          // Jaise hi user pakde, animation aur timer rok do
          timer?.kill();
          gsap.killTweensOf(sliderRef.current);
        },
        onDrag: function () {
          // Seamless Infinite Scroll manually handle kar rahe hain
          let currentX = this.x;
          if (currentX > 0) {
            currentX -= singleSetWidth;
            gsap.set(sliderRef.current, { x: currentX });
            this.update();
          } else if (currentX < -singleSetWidth) {
            currentX += singleSetWidth;
            gsap.set(sliderRef.current, { x: currentX });
            this.update();
          }
        },
        onRelease: function () {
          // Jaise hi user chhode, nearest card pe snap karo
          let currentX = this.x;

          if (currentX > 0) currentX -= singleSetWidth;
          else if (currentX < -singleSetWidth) currentX += singleSetWidth;

          // Pata lagao nearest card kaunsa hai
          currentIndex = Math.round(Math.abs(currentX) / boxWidth);
          if (currentIndex >= clientLogos.length) currentIndex = 0;

          const snapX = -(currentIndex * boxWidth);

          // Smoothly snap karke auto-play wapas shuru karo
          gsap.to(sliderRef.current, {
            x: snapX,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              startAutoPlay();
            }
          });
        }
      });

      // Initially Auto-play shuru kardo
      startAutoPlay();

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[var(--bg-secondary)] py-20 md:py-28 overflow-hidden border-y border-[var(--border-secondary)]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-primary)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--glow-accent)] rounded-full blur-[120px] animate-pulse pointer-events-none opacity-[0.05]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--glow-secondary)] rounded-full blur-[100px] animate-pulse pointer-events-none opacity-[0.05]" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-20">
        {/* Header Section */}
        <div className="fade-up-element text-center mb-16 px-4">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-[var(--border-secondary)] bg-[var(--glass-bg)] backdrop-blur-sm select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--text-accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--text-accent)]"></span>
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[var(--text-tertiary)]">
              {t?.clients?.title || "OUR CLIENTS"}
            </span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="fade-up-element w-full overflow-hidden cursor-grab active:cursor-grabbing">
          <div
            ref={sliderRef}
            // Pointer events none un drag items pe lagana zaroori hai taki image ghosting na ho
            className="flex gap-8 md:gap-10 w-max items-center px-6 md:px-12 touch-pan-y"
          >
            {/* Array ko 3 baar render kar rahe hain infinite smooth drag ke liye */}
            {infiniteLogos.map((logo, index) => (
              <div
                key={index}
                className="carousel-card group flex-shrink-0"
              >
                <div className="relative w-56 h-32 md:w-[320px] md:h-44 p-6 md:p-8 rounded-[2rem] border border-[var(--border-primary)] bg-white dark:bg-[var(--bg-elevated)] backdrop-blur-md flex items-center justify-center transition-all duration-500 hover:scale-[1.02] hover:bg-white dark:hover:bg-[var(--glass-bg)] hover:border-[var(--border-accent)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] select-none">
                  <img
                    src={logo}
                    alt="Client"
                    draggable="false" // Image drag ghost issue ko rokne ke liye
                    className="max-h-12 md:max-h-16 w-auto object-contain transition-all duration-700 filter drop-shadow-md group-hover:scale-110 pointer-events-none brightness-100 dark:brightness-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent opacity-50"></div>
    </section>
  );
}