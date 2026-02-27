'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale' | 'wave';
  stagger?: number;
  delay?: number;
  duration?: number;
  from?: 'top' | 'bottom' | 'left' | 'right';
}

const SplitText = ({
  text,
  className = '',
  animation = 'fade',
  stagger = 0.03,
  delay = 0,
  duration = 0.8,
  from = 'bottom'
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    // Define the 'from' properties
    const getFromProps = () => {
      switch (from) {
        case 'top': return { y: -30, opacity: 0 };
        case 'bottom': return { y: 30, opacity: 0 };
        case 'left': return { x: -30, opacity: 0 };
        case 'right': return { x: 30, opacity: 0 };
        default: return { y: 20, opacity: 0 };
      }
    };

    const getAnimProps = () => {
      switch (animation) {
        case 'fade': return { opacity: 0 };
        case 'slide': return getFromProps();
        case 'scale': return { scale: 0.5, opacity: 0 };
        case 'wave': return { y: 20, opacity: 0 };
        default: return { opacity: 0 };
      }
    };

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(chars);

    // Single unified animation for better performance
    gsap.fromTo(chars,
      getAnimProps(),
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: animation === 'wave' ? 'back.out(1.7)' : 'power3.out',
        overwrite: 'auto'
      }
    );

  }, [text, animation, stagger, delay, duration, from]);

  const splitText = (input: string) => {
    return input.split('').map((char, index) => {
      if (char === '\n') {
        return <br key={index} />;
      }
      return (
        <span
          key={index}
          className="char inline-block whitespace-pre will-change-transform"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {splitText(text)}
    </div>
  );
};

export default SplitText;
