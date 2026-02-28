import Hero from '../components/home/Hero';
import Clients from '../components/home/Clients';
import Mission from '../components/home/Mission';
import MarqueeBar from '../components/home/MarqueeBar';
import CTA from '../components/home/CTA';
import Solutions from '../components/home/Solutions';
import Leverage from '../components/home/Leverage';
import FooterImage from '../components/home/FooterImage';
import { useLanguage } from '../context/LanguageContext';
import { Page } from '../types';

interface HomePageProps {
  setPage: (page: Page) => void;
}

export default function HomePage({ setPage }: HomePageProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`page-wrapper ${isRTL ? 'rtl' : 'ltr'}`}>
      <Hero setPage={setPage} />
      <Clients />
      <Mission />
      <MarqueeBar />
      <CTA
        title={t.cta.boostTitle}
        subtitle={t.cta.boostSubtitle}
        buttonText={t.cta.boostButton}
        setPage={setPage}
      />
      <Solutions />
      <Leverage />
      <CTA
        title={t.cta.elevateTitle}
        subtitle={t.cta.elevateSubtitle}
        buttonText={t.cta.exploreButton}
        setPage={setPage}
      />
      <FooterImage />
    </div>
  );
}
