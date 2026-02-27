import { motion, AnimatePresence } from 'motion/react';
import Hero from '../components/home/Hero';
import Clients from '../components/home/Clients';
import Mission from '../components/home/Mission';
import CTA from '../components/home/CTA';
import Solutions from '../components/home/Solutions';
import CTA2 from '../components/home/CTA2';
import Leverage from '../components/home/Leverage';
import FooterImage from '../components/home/FooterImage';

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
      <FooterImage/>
    </motion.div>
  );
}
