import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Mission() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`order-2 lg:order-1 relative group ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="absolute -inset-4 bg-white/[0.02] rounded-[2.5rem] blur-2xl group-hover:bg-white/[0.05] transition-all duration-700"></div>
        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/mission/1000/800" 
            alt="Our Mission" 
            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-6 flex flex-col gap-1 font-mono text-[9px] text-white/40 uppercase tracking-widest">
            <span>COORDINATES: 26.2859° N, 50.2084° E</span>
            <span>SYSTEM STATUS: OPTIMIZED</span>
            <span className="text-white/60">EST. 2024</span>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`space-y-10 order-1 lg:order-2 ${isRTL ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'}`}
      >
        <div className="space-y-4">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Mission</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">Pioneering the Future of <span className="italic font-serif font-light text-white/60">Mobile Advertising</span></h2>
        </div>
        <div className="space-y-8 text-white/40 leading-relaxed text-lg font-light">
          <p>
            At <span className="text-white font-medium">{t.mission.nawafith}</span>, we are revolutionizing outdoor advertising with dynamic, innovative <span className="text-white font-medium">{t.mission.onCar}</span>. Our mission is to help businesses connect with their target audiences meaningfully, maximizing visibility and impact on the go.
          </p>
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-serif italic text-xl text-white/60 border-l-2 border-white/10 pl-6"
          >
            "We believe outdoor advertising should be both {t.mission.impactful} and {t.mission.measurable}."
          </motion.p>
          <p>
            Through our cutting-edge digital screens, we provide tools for tracking performance and making informed decisions. Our goal is to bring brands closer to people in <span className="text-white font-medium">real-time</span>.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 pt-6 border-t border-white/5">
          <div className="space-y-2">
            <span className="text-4xl font-bold font-display">100%</span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Coverage Efficiency</p>
          </div>
          <div className="space-y-2">
            <span className="text-4xl font-bold font-display">24/7</span>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Active Monitoring</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-outline group flex items-center gap-4"
        >
          {t.mission.learnMore}
          <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
        </motion.button>
      </motion.div>
    </section>
  );
}
