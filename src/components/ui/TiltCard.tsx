import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
    key?: string | number;
}

export default function TiltCard({ children, className = '', maxTilt = 15, ...props }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(card, {
                rotateY: x * maxTilt * 2,
                rotateX: -y * maxTilt * 2,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.8,
                ease: "power2.out",
                overwrite: "auto"
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [maxTilt]);

    return (
        <div
            ref={cardRef}
            className={`will-change-transform ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
            {...props}
        >
            {children}
        </div>
    );
}
