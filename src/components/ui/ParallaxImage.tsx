import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    speed?: number;
    containerClassName?: string;
    className?: string;
}

export default function ParallaxImage({
    speed = 0.5,
    containerClassName = '',
    className = '',
    ...props
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        const img = imgRef.current;
        const container = containerRef.current;
        if (!img || !container || speed === 0) return;

        // Give it room to parallax by scaling slightly and setting top/bottom margins implicitly
        gsap.set(img, {
            scale: 1 + speed * 1.2
        });

        const ctx = gsap.context(() => {
            gsap.to(img, {
                yPercent: speed * 15, // Smooth up and down parallax
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
            <img
                ref={imgRef}
                className={`w-full h-full object-cover origin-center ${className}`}
                {...props}
            />
        </div>
    );
}
