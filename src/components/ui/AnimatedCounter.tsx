import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export default function AnimatedCounter({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    className = ''
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const el = counterRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(el,
                { innerHTML: 0 },
                {
                    innerHTML: end,
                    duration: duration,
                    ease: "power3.out",
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        once: true
                    },
                    onUpdate: function () {
                        if (el) {
                            const val = Math.round(Number(this.targets()[0].innerHTML));
                            // Format number with leading zero if less than 10
                            const formattedVal = val < 10 ? `0${val}` : val;
                            el.innerText = `${prefix}${formattedVal}${suffix}`;
                        }
                    }
                }
            );
        }, el);

        return () => ctx.revert();
    }, [end, duration, prefix, suffix]);

    return (
        <span ref={counterRef} className={className}>
            {prefix}00{suffix}
        </span>
    );
}
