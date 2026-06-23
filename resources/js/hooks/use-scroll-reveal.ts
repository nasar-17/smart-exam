import { useEffect } from 'react';

export function useScrollReveal() {
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );
        reveals.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}

export function useStatsCounter() {
    useEffect(() => {
        let animated = false;
        const statsSection = document.getElementById('stats');

        if (!statsSection) {
return;
}

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(statsSection);

        return () => observer.disconnect();
    }, []);
}

function animateCounters() {
    const statEls = document.querySelectorAll<HTMLElement>('.stat-num[data-target]');
    statEls.forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0');
        const duration = 1500;
        const start = performance.now();

        function update(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = value.toFixed(decimals) + suffix;

            if (progress < 1) {
requestAnimationFrame(update);
} else {
el.textContent = target.toFixed(decimals) + suffix;
}
        }
        requestAnimationFrame(update);
    });
}
