import { useEffect, useRef } from 'react';

export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isVisible = false;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) {
                glow.style.opacity = '1';
                isVisible = true;
            }
        };

        const onMouseLeave = () => {
            glow.style.opacity = '0';
            isVisible = false;
        };

        // Smooth trailing effect
        const updatePosition = () => {
            // Adjust speed factor (0.1 = slower/smoother tail, 1.0 = instant)
            const speed = 0.15;
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;

            if (glow) {
                glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(updatePosition);
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        const animationId = requestAnimationFrame(updatePosition);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed inset-0 z-[99999] h-[350px] w-[350px] rounded-full opacity-0 transition-opacity duration-300 ease-out"
            style={{
                background:
                    'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)',
                mixBlendMode: 'screen',
                willChange: 'transform',
            }}
        />
    );
}
