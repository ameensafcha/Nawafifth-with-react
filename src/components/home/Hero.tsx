import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// REUSABLE DATA
const marqueeData = [
  "Dynamic Displays",
  "Real-time Analytics",
  "Geo-Targeting",
  "Audience Measurement",
  "Programmatic DOOH",
  "Smart Bidding"
];

// Screen bhari rahe isliye array ko duplicate kiya hai
const displayItems = [...marqueeData, ...marqueeData, ...marqueeData, ...marqueeData];

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <>
      {/* Custom CSS - RTL Logic Added Here */}
      <style>
        {`
          /* LTR ke liye (Left ki taraf jayega) */
          @keyframes infinite-scroll-seamless-ltr {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          /* RTL ke liye (Right ki taraf jayega) */
          @keyframes infinite-scroll-seamless-rtl {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
          }
          
          .scrolling-wrapper {
            display: flex;
            width: max-content;
            /* isRTL true hone par RTL wali animation chalegi */
            animation: ${isRTL ? 'infinite-scroll-seamless-rtl' : 'infinite-scroll-seamless-ltr'} 60s linear infinite;
          }
          
          .marquee-container:hover .scrolling-wrapper {
            animation-play-state: paused;
          }
        `}
      </style>

      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-black pt-20 lg:pt-24">
        {/* Background Section */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/40 to-brand-black z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/20 to-transparent z-10"></div>
          <img 
            src="https://picsum.photos/seed/city-night/1920/1080?blur=4" 
            alt="City Night" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 md:px-12 lg:px-20 pt-8 pb-32 lg:pt-12 lg:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* TEXT SECTION */}
            <div className={`w-full lg:col-span-5 xl:col-span-5 space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-12 h-px bg-white/20"></span>
                  <span className="text-xs uppercase tracking-[0.6em] font-bold text-white/40" dir={isRTL ? 'rtl' : 'ltr'}>
                    {t.hero.welcomeTo}
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] md:leading-[1] tracking-tighter text-white font-display break-words"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {t.hero.title}
                </motion.h1>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-6"
              >
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light" dir={isRTL ? 'rtl' : 'ltr'} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  {t.hero.subtitle} <span className="text-white font-medium">{t.hero.onCar}</span>. 
                  {t.hero.description}
                </p>
                
                <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center gap-2 group px-8 py-4 text-sm"
                  >
                    {t.hero.scheduleCall}
                    <ChevronRight size={18} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* VIDEO SECTION */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-full lg:col-span-7 xl:col-span-7 mt-8 lg:mt-0"
            >
              <div className="relative z-10 rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl border-[4px] border-white/20 bg-brand-gray w-full max-w-full mx-auto">
                <div className="aspect-[16/9]">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/video/1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>

                <div className="absolute -top-10 -right-10 w-32 h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
              </div>
            </motion.div>
            
          </div>
        </div>

        {/* POORI BAR PAR CLASS "marquee-container" ADD KI HAI (Yahan bhi dynamic dir laga diya hai) */}
        <div 
          className="marquee-container absolute bottom-0 left-0 w-full overflow-hidden py-3 sm:py-4 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm z-30"
          dir={isRTL ? 'rtl' : 'ltr'} 
        >
          <div className="scrolling-wrapper">
            
            {/* Endless loop blocks */}
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex">
                {displayItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-6 sm:gap-8 px-6 sm:px-10 cursor-default">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] font-bold text-white/20 transition-colors duration-300 hover:text-white/60">
                      {item}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-white/20"></div>
                  </div>
                ))}
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}