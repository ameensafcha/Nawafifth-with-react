import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    strength?: number;
    className?: string;
    magneticContent?: boolean;
}

export default function MagneticButton({
    children,
    strength = 0.3,
    className = '',
    magneticContent = true,
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move the button itself
            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 1,
                ease: "power3.out",
                overwrite: "auto"
            });

            // Move content slightly less for a deeper parallax feel
            if (magneticContent && contentRef.current) {
                gsap.to(contentRef.current, {
                    x: x * (strength / 2),
                    y: y * (strength / 2),
                    duration: 1,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power3.out",
                overwrite: "auto"
            });

            if (magneticContent && contentRef.current) {
                gsap.to(contentRef.current, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        };

        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mousemove', handleMouseMove);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength, magneticContent]);

    return (
        <button
            ref={buttonRef}
            className={`relative inline-flex items-center justify-center will-change-transform ${className}`}
            {...props}
        >
            {magneticContent ? (
                <span ref={contentRef} className="relative z-10 flex items-center justify-center pointer-events-none will-change-transform w-full h-full">
                    {children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}
