import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../context/LanguageContext';

export default function MarqueeBar() {
    const { t, isRTL } = useLanguage();
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Items array (t.hero.marquee se data le rahe hain)
    const items = t.hero.marquee || [];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!marqueeRef.current) return;

            // Step 1: Ek set ki width nikalo (Total width / 2 kyunki humne 2 sets render kiye hain)
            const totalWidth = marqueeRef.current.scrollWidth;
            const loopWidth = totalWidth / 2;

            // Step 2: Animation setup
            const marqueeTween = gsap.to(marqueeRef.current, {
                x: isRTL ? loopWidth : -loopWidth,
                duration: 30, // Speed control: jitna bada number utna slow
                ease: "none",
                repeat: -1,
                // Ye modifiers ensure karte hain ki jump na dikhe
                modifiers: {
                    x: gsap.utils.unitize((x) => {
                        const val = parseFloat(x);
                        return isRTL ? val % loopWidth : val % loopWidth;
                    })
                }
            });

            // Hover Pause Logic
            const container = containerRef.current;
            if (container) {
                const onEnter = () => marqueeTween.pause();
                const onLeave = () => marqueeTween.play();
                container.addEventListener('mouseenter', onEnter);
                container.addEventListener('mouseleave', onLeave);
                
                return () => {
                    container.removeEventListener('mouseenter', onEnter);
                    container.removeEventListener('mouseleave', onLeave);
                };
            }
        }, containerRef);

        return () => ctx.revert();
    }, [isRTL, items]);

    return (
        <div
            ref={containerRef}
            className="marquee-bar w-full py-6 md:py-8 border-y border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-lg z-30 overflow-hidden relative"
        >
            {/* Hum items ko sirf 2 baar map karenge loop banane ke liye */}
            <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform w-max">
                {[...items, ...items].map((item, index) => (
                    <div key={index} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
                        <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors cursor-default">
                            {item}
                        </span>
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[var(--text-accent)] opacity-20" />
                    </div>
                ))}
            </div>
        </div>
    );
}