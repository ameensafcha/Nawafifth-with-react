'use client';

import { useEffect, useRef } from 'react';
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
  stagger = 0.02,
  delay = 0,
  duration = 0.8,
  from = 'bottom'
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    const getFrom = () => {
      switch (from) {
        case 'top': return { y: -50, opacity: 0 };
        case 'bottom': return { y: 50, opacity: 0 };
        case 'left': return { x: -50, opacity: 0 };
        case 'right': return { x: 50, opacity: 0 };
        default: return { y: 50, opacity: 0 };
      }
    };

    const getAnimation = (index: number) => {
      switch (animation) {
        case 'fade':
          return { opacity: 0, duration };
        case 'slide':
          return { ...getFrom(), duration };
        case 'scale':
          return { scale: 0, opacity: 0, duration };
        case 'wave':
          return { 
            y: index % 2 === 0 ? -30 : 30, 
            opacity: 0, 
            duration,
            ease: 'power2.out'
          };
        default:
          return { opacity: 0, duration };
      }
    };

    gsap.fromTo(chars, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.1,
        stagger: stagger,
        delay: delay,
      }
    );

    gsap.fromTo(chars,
      getFrom(),
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: 'power3.out'
      }
    );

  }, [text, animation, stagger, delay, duration, from]);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => {
      if (char === '\n') {
        return <br key={index} className="char" />;
      }
      return (
        <span 
          key={index} 
          className="char inline-block whitespace-pre"
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
