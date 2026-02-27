import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

export default function CTA2() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative py-48 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="https://picsum.photos/seed/cta-bg2/1920/1080?blur=10" 
          alt="CTA Background" 
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black"></div>
      </div>
      <div className="section-container relative z-10 text-center space-y-12">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold max-w-6xl mx-auto leading-[0.85] tracking-tighter font-display"
        >
          {t.cta.elevateTitle}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {t.cta.elevateSubtitle}
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary mx-auto"
        >
          {t.cta.exploreButton}
        </motion.button>
      </div>
    </section>
  );
}
