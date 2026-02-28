import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function RevealText({ text, className = '', delay = 0 }: RevealTextProps) {
    const textRef = useRef<HTMLDivElement>(null);
    const { isRTL } = useLanguage();

    useLayoutEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            // Split text into words manually
            const words = el.querySelectorAll('.reveal-word');

            gsap.fromTo(words,
                {
                    y: '100%',
                    opacity: 0,
                    rotateZ: isRTL ? -5 : 5
                },
                {
                    y: '0%',
                    opacity: 1,
                    rotateZ: 0,
                    duration: 0.8,
                    stagger: 0.03,
                    ease: "power3.out",
                    delay: delay,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        once: true
                    }
                }
            );
        }, el);

        return () => ctx.revert();
    }, [text, delay, isRTL]);

    return (
        <div ref={textRef} className={`inline-flex flex-wrap gap-[0.2em] overflow-hidden ${className}`}>
            {text.split(' ').map((word, i) => (
                <span key={i} className="reveal-word inline-block will-change-transform leading-normal py-1">
                    {word}
                </span>
            ))}
        </div>
    );
}
