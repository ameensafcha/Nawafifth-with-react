import { motion, AnimatePresence } from 'motion/react';
import Hero from '../components/home/Hero';
import Clients from '../components/home/Clients';
import Mission from '../components/home/Mission';
import CTA from '../components/home/CTA';
import Solutions from '../components/home/Solutions';
import CTA2 from '../components/home/CTA2';
import Leverage from '../components/home/Leverage';

export default function HomePage() {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Clients />
      <Mission />
      <CTA />
      <Solutions />
      <Leverage />
      <CTA2 />
      <div className="section-container">
        <img src="https://picsum.photos/seed/footer-taxi/1200/600" alt="Taxis" className="w-full rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
      </div>
    </motion.div>
  );
}
