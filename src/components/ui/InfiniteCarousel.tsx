'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(Draggable);

// Default fallback image agar item me img pass na ki ho
const CUSTOM_DEFAULT_GIF = "https://media.giphy.com/media/your-gif-id/giphy.gif";

export interface CarouselItem {
    title: string;
    desc: string;
    img: string;
    tag?: string;
}

interface InfiniteCarouselProps {
    items: CarouselItem[];
}

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
    const { isRTL } = useLanguage();
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Active dot track karne ke liye state
    const [activeIndex, setActiveIndex] = useState(0);

    // Loop ko smooth rakhne ke liye items ki 3 copies banayenge
    const infiniteItems = [...items, ...items, ...items];
    const totalItems = items.length;

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (!sliderRef.current || !sliderRef.current.children.length || totalItems === 0) return;

            const cards = gsap.utils.toArray('.carousel-card') as HTMLElement[];
            const cardWidth = cards[0].offsetWidth; 
            const singleSetWidth = cardWidth * totalItems;
            const dir = isRTL ? 1 : -1;

            // Start position: Array ke middle set se shuru karenge taaki dono taraf drag ho sake
            let currentIndex = totalItems; 
            gsap.set(sliderRef.current, { x: currentIndex * cardWidth * dir });

            Draggable.create(sliderRef.current, {
                type: "x",
                inertia: false,
                onPress: function () {
                    gsap.killTweensOf(sliderRef.current);
                },
                onDrag: function () {
                    let currentX = this.x;
                    // Infinite Seamless Wrap Logic during drag
                    if (isRTL) {
                        if (currentX > singleSetWidth * 2) gsap.set(sliderRef.current, { x: currentX - singleSetWidth });
                        if (currentX < 0) gsap.set(sliderRef.current, { x: currentX + singleSetWidth });
                    } else {
                        if (currentX > 0) gsap.set(sliderRef.current, { x: currentX - singleSetWidth });
                        if (currentX < -singleSetWidth * 2) gsap.set(sliderRef.current, { x: currentX + singleSetWidth });
                    }
                },
                onRelease: function () {
                    let currentX = this.x;

                    // Calculate nearest card to snap
                    currentIndex = Math.round(currentX / (cardWidth * dir));

                    // Seamless Bounds Correction
                    if (currentIndex < totalItems) {
                        currentIndex += totalItems;
                        gsap.set(sliderRef.current, { x: currentX + (singleSetWidth * dir) });
                    } else if (currentIndex >= totalItems * 2) {
                        currentIndex -= totalItems;
                        gsap.set(sliderRef.current, { x: currentX - (singleSetWidth * dir) });
                    }

                    // Active dot ko update karo (Safe modulo math for active index)
                    const realIndex = ((currentIndex % totalItems) + totalItems) % totalItems;
                    setActiveIndex(realIndex);

                    // Smooth snap animation
                    gsap.to(sliderRef.current, {
                        x: currentIndex * cardWidth * dir,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [items, isRTL, totalItems]);

    // Agar array me kuch nahi hai to empty return karo
    if (!items || items.length === 0) return null;

    return (
        <div 
            ref={containerRef} 
            className="w-full overflow-hidden flex flex-col items-center py-10" 
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Carousel Track Container */}
            <div className="w-full cursor-grab active:cursor-grabbing">
                <div
                    ref={sliderRef}
                    className="flex w-max touch-pan-y"
                >
                    {infiniteItems.map((item, index) => (
                        <div
                            key={index}
                            className="carousel-card flex-shrink-0 w-[100vw] sm:w-[50vw] lg:w-[33.333vw] p-3 md:p-5"
                        >
                            <div className="group relative h-full rounded-[2rem] overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-elevated)] transition-all duration-700 hover:border-[var(--border-accent)] shadow-lg">

                                {/* GIF/Image Container */}
                                {/* Yahan halki si padding (p-4) add ki hai taaki edges pe touch na ho */}
                                <div className="h-48 md:h-64 w-full bg-black/5 flex items-center justify-center p-4">
                                    <img
                                        src={item.img || CUSTOM_DEFAULT_GIF}
                                        alt={item.title}
                                        draggable="false"
                                        // Size 50% se badha kar 80% kar diya hai
                                        className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
                                    />
                                </div>

                                {/* Text Content Area */}
                                <div className="p-6 md:p-8 space-y-3 bg-gradient-to-b from-transparent to-[var(--bg-elevated)]">
                                    {item.tag && (
                                        <span className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] font-bold text-[var(--text-accent)] uppercase">
                                            {item.tag}
                                        </span>
                                    )}
                                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-accent)]">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed line-clamp-3">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Pagination Dots (Bindi) --- */}
            <div className="flex items-center gap-3 mt-8">
                {items.map((_, i) => (
                    <div 
                        key={i}
                        className={`transition-all duration-300 rounded-full ${
                            i === activeIndex 
                            ? 'w-8 h-2 bg-[var(--text-accent)]' 
                            : 'w-2 h-2 bg-[var(--border-primary)] opacity-50' 
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}