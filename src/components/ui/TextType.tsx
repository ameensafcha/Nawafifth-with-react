'use client';

import { useEffect, useRef, createElement } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface TextTypeProps {
  text: string | string[];
  as?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  [key: string]: any;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2, // GSAP uses seconds
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  ...props
}: TextTypeProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textArray = Array.isArray(text) ? text : [text];
    const tl = gsap.timeline({
      repeat: loop ? -1 : 0,
      delay: initialDelay,
    });

    textArray.forEach((phrase) => {
      // Type out
      tl.to(textRef.current, {
        duration: phrase.length * (typingSpeed / 1000),
        text: phrase,
        ease: "none",
      });

      // Pause
      tl.to({}, { duration: pauseDuration });

      // Delete (if looping or not last item)
      if (loop || phrase !== textArray[textArray.length - 1]) {
        tl.to(textRef.current, {
          duration: phrase.length * (deletingSpeed / 1000),
          text: "",
          ease: "none",
        });
      }
    });

    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return () => {
      tl.kill();
    };
  }, [text, typingSpeed, initialDelay, pauseDuration, deletingSpeed, loop, showCursor, cursorBlinkDuration]);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <span ref={textRef} className="inline"></span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
