import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: true,
        });

        // Refresh ScrollTrigger on page changes (handled by Lenis)
        const refreshScrollTrigger = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', refreshScrollTrigger);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(rafCallback);
            window.removeEventListener('resize', refreshScrollTrigger);
        };
    }, []);

    return <>{children}</>;
}
