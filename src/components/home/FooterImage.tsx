import { motion } from 'motion/react';

export default function FooterImage() {
  return (
    <section className="bg-[#050505] py-10 md:py-16">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden shadow-2xl group bg-black"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20 pointer-events-none"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent pointer-events-none"></div>

          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            src="/images/new-york-streets-high-buildings-cars-cabs-min-2048x1154.jpg" 
            alt="New York Streets" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </div>
    </section>
  );
}
