import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();

  return (
    <motion.div
      key="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 space-y-48"
    >
      <section className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`lg:col-span-7 space-y-12 ${isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1 lg:text-left'}`}
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Who We Are</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter font-display leading-[0.8]">About <br /><span className="italic font-serif font-light text-white/60">Nawafith</span></h1>
          </div>
          <div className="space-y-8 text-white/40 leading-relaxed text-2xl font-light max-w-3xl">
            <p>
              {t.about.description1}
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative p-12 glass-card border border-white/10"
            >
              <Quote className="absolute top-8 left-8 text-white/10" size={48} />
              <p className="font-serif italic text-white/80 text-3xl leading-snug relative z-10">
                "Committed to fostering economic growth and creativity, we partner with brands to create impactful campaigns that resonate across the Kingdom."
              </p>
            </motion.div>
            <p className="text-xl">
              {t.about.description2}
            </p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`lg:col-span-5 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 relative group aspect-[3/4] ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/about-img/1000/1500" 
            alt="About Nawafith" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent"></div>
          
          <div className={`absolute top-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap ${isRTL ? '-left-32' : '-right-32'}`}>
            <span className="text-[10px] uppercase tracking-[1em] font-bold text-white/20">ESTABLISHED // 2024</span>
          </div>
        </motion.div>
      </section>

      <section className="bg-brand-gray py-48 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`lg:col-span-6 order-2 lg:order-1 relative group ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="absolute -inset-10 bg-white/[0.01] rounded-full blur-[120px]"></div>
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-video">
              <motion.img 
                whileHover={{ scale: 1.02 }}
                src="https://picsum.photos/seed/mission-2/1200/800" 
                alt="Our Mission" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`lg:col-span-6 space-y-10 order-1 lg:order-2 ${isRTL ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'}`}
          >
            <div className="space-y-6">
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Purpose</span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">Our <br /><span className="italic font-serif font-light text-white/60">Mission</span></h2>
            </div>
            <div className="space-y-8 text-white/40 leading-relaxed text-2xl font-light">
              <p>
                At <span className="text-white font-medium">Nawafith Advertising</span>, our mission is to redefine the advertising landscape by leveraging the power of mobile, <span className="text-white font-medium">on-car marketing solutions</span>.
              </p>
              <p className="text-xl">
                {t.about.missionDesc3}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-4xl font-bold text-white font-display">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-2">Coverage</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white font-display">24/7</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mt-2">Visibility</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
