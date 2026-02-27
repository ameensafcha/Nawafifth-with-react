import { motion } from 'motion/react';
import { Play, MapPin, ChevronRight, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Leverage() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-container space-y-24 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-6"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-white/20"></span>
          <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Strategy</span>
          <span className="w-12 h-px bg-white/20"></span>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">How to Leverage <br /> <span className="italic font-serif font-light text-white/60">Nawafith's Advertising</span></h2>
        <p className="text-white/40 max-w-3xl mx-auto text-xl font-light leading-relaxed">
          {t.leverage.desc}
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`lg:col-span-7 space-y-10 ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
        >
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src="https://picsum.photos/seed/leverage/1200/800" 
              alt="Leverage" 
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
            
            <div className="absolute top-8 left-8 glass-card px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-widest">Live Network Active</span>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline group flex items-center gap-4"
          >
            <Download size={18} />
            {t.leverage.presentation}
            <ChevronRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
          </motion.button>
        </motion.div>
        <div className="lg:col-span-5 grid grid-cols-1 gap-8">
          {[
            { icon: Play, title: t.leverage.realtime, desc: t.leverage.realtimeDesc },
            { icon: MapPin, title: t.leverage.strategic, desc: t.leverage.strategicDesc }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="glass-card p-12 space-y-6 group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <item.icon size={24} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
