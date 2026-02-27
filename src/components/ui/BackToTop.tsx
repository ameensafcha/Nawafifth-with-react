import { ChevronDown } from 'lucide-react';

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center shadow-xl z-40 hover:scale-110 transition-transform"
    >
      <ChevronDown className="rotate-180" />
    </button>
  );
}
