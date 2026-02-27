import { motion } from 'motion/react';
import { MapPin, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Solutions() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="bg-brand-gray py-32 overflow-hidden">
      <div className="section-container space-y-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-2xl"
          >
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Our Solutions</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter font-display leading-[0.9]">Precision Engineered <br /><span className="italic font-serif font-light text-white/60">Advertising</span></h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 max-w-sm text-lg font-light leading-relaxed"
          >
            We combine cutting-edge hardware with sophisticated software to deliver your message exactly where it matters most.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 glass-card overflow-hidden group relative"
          >
            <div className="p-12 space-y-8 relative z-10">
              <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{t.solutions.digitalTops}</h3>
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-white transition-all duration-500"
                >
                  <span className="text-2xl font-serif italic">N</span>
                </motion.div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                {t.solutions.digitalDesc}
              </p>
              <div className={`pt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>Explore Technology</span>
                <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/digital-top/1200/800" 
                alt="Digital Top" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent"></div>
            </div>
            <div className="absolute top-4 right-4 font-mono text-[8px] text-white/10 uppercase tracking-tighter">
              REF: NWF-101 // V.2.4
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            {[
              { icon: MapPin, title: t.solutions.dataTracked, desc: t.solutions.dataDesc },
              { icon: Globe, title: t.solutions.scalable, desc: t.solutions.scalableDesc }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
                className="flex-1 glass-card p-10 flex flex-col justify-center space-y-8 group relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <item.icon size={28} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
