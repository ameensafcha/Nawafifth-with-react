import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg z-40 hover:scale-110 transition-transform"
    >
      <ChevronDown className="rotate-180 w-4 h-4" />
    </button>
  );
}
