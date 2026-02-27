import Hero from '../components/home/Hero';
import Clients from '../components/home/Clients';
import Mission from '../components/home/Mission';
import CTA from '../components/home/CTA';
import Solutions from '../components/home/Solutions';
import Leverage from '../components/home/Leverage';
import FooterImage from '../components/home/FooterImage';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { isRTL } = useLanguage();

  return (
    <div className={`page-wrapper ${isRTL ? 'rtl' : 'ltr'}`}>
      <Hero />
      <Clients />
      <Mission />
      {/* 
        Consolidated CTA handles multiple variants. 
        Using different titles/subtitles for different sections if needed.
      */}
      <CTA
        variant="boost"
      />
      <Solutions />
      <Leverage />
      <CTA
        variant="elevate"
      />
      <FooterImage />
    </div>
  );
}
