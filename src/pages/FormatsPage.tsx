import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FormatsPage() {
  const { t, isRTL } = useLanguage();

  const formats = [
    { title: t.formats.live, desc: t.formats.liveDesc, img: 'https://picsum.photos/seed/format1/800/600', size: 'large' },
    { title: t.formats.static, desc: t.formats.staticDesc, img: 'https://picsum.photos/seed/format2/600/400', size: 'small' },
    { title: t.formats.geo, desc: t.formats.geoDesc, img: 'https://picsum.photos/seed/format3/600/400', size: 'small' },
  ];

  return (
    <motion.div
      key="formats"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 space-y-48"
    >
      <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`space-y-10 ${isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1 lg:text-left'}`}
        >
          <div className="space-y-4">
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`w-12 h-px bg-white/20 ${isRTL ? 'order-1' : ''}`}></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Technology</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter font-display leading-[0.9]">Digital <br /><span className="italic font-serif font-light text-white/60">Tops</span></h1>
          </div>
          <p className="text-xl text-white/40 leading-relaxed font-light max-w-xl">
            {t.formats.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-card px-8 py-5 flex items-center gap-4 border border-white/10"
            >
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase">High Definition</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-card px-8 py-5 flex items-center gap-4 border border-white/10"
            >
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Weatherproof</span>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative group ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5 }}
            src="https://picsum.photos/seed/led-top/1000/1200" 
            alt="LED Top" 
            className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
        </motion.div>
      </section>

      <section className="bg-brand-gray py-48 overflow-hidden">
        <div className="section-container space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-white/20"></span>
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">Variety</span>
              <span className="w-12 h-px bg-white/20"></span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-display leading-[0.9]">On Car Ad <br /><span className="italic font-serif font-light text-white/60">Formats</span></h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formats.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`glass-card overflow-hidden group relative ${f.size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={`${f.size === 'large' ? 'h-[600px]' : 'h-80'} overflow-hidden relative`}>
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5 }}
                    src={f.img} 
                    alt={f.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-10 space-y-4">
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] font-mono text-white/30">0{i + 1}</span>
                    <h3 className="text-3xl font-bold tracking-tight">{f.title}</h3>
                  </div>
                  <p className="text-white/50 font-light">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container space-y-32">
        {[
          { title: t.formats.feat1, desc: t.formats.feat1Desc, img: 'https://picsum.photos/seed/feat1/1200/800' },
          { title: t.formats.feat2, desc: t.formats.feat2Desc, img: 'https://picsum.photos/seed/feat2/1200/800', reverse: true },
          { title: t.formats.feat3, desc: t.formats.feat3Desc, img: 'https://picsum.photos/seed/feat3/1200/800' },
        ].map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center`}
          >
            <motion.div 
              initial={{ opacity: 0, x: feat.reverse ? (isRTL ? -50 : 50) : (isRTL ? 50 : -50) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`space-y-8 ${feat.reverse ? (isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1 lg:text-left') : (isRTL ? 'lg:order-2 lg:text-right' : 'lg:order-1 lg:text-left')}`}
            >
              <h3 className="text-5xl md:text-6xl font-bold tracking-tight">{feat.title}</h3>
              <p className="text-xl text-white/40 leading-relaxed font-light">{feat.desc}</p>
              <button className={`btn-outline group flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                Learn More
                <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl ${feat.reverse ? (isRTL ? 'lg:order-1' : 'lg:order-2') : (isRTL ? 'lg:order-1' : 'lg:order-2')}`}
            >
              <img src={feat.img} alt={feat.title} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </motion.div>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}
