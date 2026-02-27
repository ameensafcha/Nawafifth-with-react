import { useLanguage } from '../../context/LanguageContext';

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
];

const displayLogos = [...clientLogos, ...clientLogos];

export default function ClientsCarousel() {
  const { t, isRTL } = useLanguage();
  const titleText = t.clients.title;

  return (
    <section
      className="relative py-20 md:py-32 bg-[#050505] overflow-hidden border-y border-white/[0.03]"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Refined Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/[0.015] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 mb-12 md:mb-16 relative z-20">
        <div className="flex items-center gap-6">
          <span className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
          <h2 className="text-[10px] md:text-xs font-display font-medium text-white/40 uppercase tracking-[0.4em] md:tracking-[0.6em]">
            {titleText}
          </h2>
          <span className="flex-grow h-[1px] bg-gradient-to-r from-white/5 to-transparent"></span>
        </div>
      </div>

      <div className="relative w-full z-20 group">
        {/* Edge Fade Overlays */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

        <div
          className="flex items-center will-change-transform py-4"
          style={{ 
            width: 'max-content',
            animation: isRTL ? 'rtl-marquee 30s linear infinite' : 'marquee 30s linear infinite'
          }}
        >
          {displayLogos.map((logo, index) => (
            <div key={index} className="flex-none px-4 md:px-8 group/item">
              <div className="relative w-28 h-16 md:w-44 md:h-24 rounded-xl md:rounded-[2.5rem] border border-white/[0.05] bg-white/[0.01] backdrop-blur-md flex items-center justify-center transition-all duration-700 hover:bg-white/[0.05] hover:border-white/20 active:scale-95">
                <img
                  src={logo}
                  alt="Client Logo"
                  className="max-h-5 md:max-h-9 w-auto object-contain filter grayscale brightness-200 opacity-20 transition-all duration-700 group-hover/item:grayscale-0 group-hover/item:brightness-100 group-hover/item:opacity-70 group-hover/item:scale-105"
                />
                <div className="absolute inset-0 rounded-xl md:rounded-[2.5rem] bg-white/5 opacity-0 group-hover/item:opacity-100 blur-lg transition-opacity duration-700 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Progress Blur Bottom */}
      <div className="mt-12 md:mt-20 w-full h-[1px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_80%)]"></div>
    </section>
  );
}