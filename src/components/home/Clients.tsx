import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// ==========================================
// 1. DATA & CONTROLS
// ==========================================

const PAUSE_TIME_MS = 2000;   // 2 second rukega
const SLIDE_SPEED_MS = 500;   // 0.5 sec slide speed

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
];

const displayLogos = [...clientLogos, ...clientLogos, ...clientLogos];

// ==========================================
// COMPONENT
// ==========================================

export default function ClientsCarousel() {
  const { isRTL } = useLanguage();
  const titleText = isRTL ? 'عملاؤنا' : 'Clients Worked With';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, PAUSE_TIME_MS);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleTransitionEnd = () => {
    if (currentIndex >= clientLogos.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  // NATIVE RTL LOGIC: LTR me left (-1), RTL me right (1) slide karega
  const slideDirection = isRTL ? 1 : -1;
  const transformValue = `translateX(calc(${slideDirection} * ${currentIndex} * 100% / var(--visible-items)))`;

  return (
    <section 
      className="relative py-20 md:py-28 bg-brand-black border-t border-white/5 overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <style>
        {`
          .carousel-track {
            display: flex;
            --visible-items: 2; /* Mobile */
          }
          @media (min-width: 640px) {
            .carousel-track { --visible-items: 3; } /* Tablet */
          }
          @media (min-width: 1024px) {
            .carousel-track { --visible-items: 5; } /* PC */
          }
          .carousel-item {
            flex: 0 0 calc(100% / var(--visible-items));
            min-width: calc(100% / var(--visible-items));
          }
        `}
      </style>

      {/* TITLE SECTION: Flex justify-start naturally pushes to RIGHT in RTL mode */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 lg:px-20 mb-12 md:mb-16 relative z-20">
        <div className="flex items-center justify-start gap-4">
          <span className="w-12 h-px bg-white/20"></span>
          <h2 className="text-xs md:text-sm font-bold text-white/40 uppercase tracking-[0.6em]">
            {titleText}
          </h2>
        </div>
      </div>

      {/* SLIDER SECTION */}
      <div 
        className="relative w-full overflow-hidden z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      > 
        
        {/* Gradients dynamically switch sides based on language */}
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} w-20 md:w-40 from-brand-black to-transparent z-10 pointer-events-none`}></div>
        <div className={`absolute inset-y-0 ${isRTL ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} w-20 md:w-40 from-brand-black to-transparent z-10 pointer-events-none`}></div>

        {/* Moving Track */}
        <div 
          className="carousel-track items-center"
          style={{
            transform: transformValue,
            transition: isTransitioning ? `transform ${SLIDE_SPEED_MS}ms cubic-bezier(0.25, 1, 0.5, 1)` : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayLogos.map((logo, index) => (
            <div key={index} className="carousel-item flex justify-center px-6 md:px-10">
              <img 
                src={logo} 
                alt="Client Logo" 
                className="max-h-8 md:max-h-12 w-auto object-contain filter grayscale opacity-30 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110 cursor-pointer"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}