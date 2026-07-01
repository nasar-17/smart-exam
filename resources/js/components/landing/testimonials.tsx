import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials({ data }: { data?: any }) {
    const badge = data?.header_badge ?? 'Testimoni';
    const title = data?.header_title ?? 'Apa Kata Mereka yang Sudah Menggunakan Smart Exam?';
    const items = data?.items ?? [];

    const gradients = [
        '135deg,#2563EB,#1d4ed8',
        '135deg,#1d4ed8,#2563EB',
        '135deg,#2563EB,#0EA5E9',
        '135deg,#0EA5E9,#2563EB',
        '135deg,#2563EB,#1d4ed8',
        '135deg,#1d4ed8,#0EA5E9',
    ];

    // Double the items array for infinite loop effect
    const loopItems = [...items, ...items];

    return (
        <section
            id="testimonials"
            className="py-24 overflow-hidden"
            style={{ background: 'var(--lp-bg-secondary)' }}
        >
            <div className="mx-auto max-w-[1200px] px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"
                        data-preview-field="header_badge"
                        style={{
                            background: 'var(--lp-blue-light)',
                            color: 'var(--lp-blue-text)',
                            border: '1px solid var(--lp-border)',
                        }}
                    >
                        {badge}
                    </div>
                    <h2
                        className="mb-2 text-[40px] font-bold tracking-tight"
                        data-preview-field="header_title"
                        style={{ fontFamily: "'Sora', sans-serif", color: 'var(--lp-text-primary)' }}
                    >
                        {title}
                    </h2>
                    <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className="h-[18px] w-[18px] fill-[#f5c518] text-[#f5c518]"
                            />
                        ))}
                        <span className="ml-2 text-sm font-semibold" style={{ color: 'var(--lp-text-muted)' }}>
                            4.9/5 dari 500+ pengguna
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Scrolling track wrapper */}
            <div className="relative flex w-full overflow-x-hidden py-4">
                <motion.div
                    className="flex gap-6 shrink-0 whitespace-nowrap"
                    animate={{
                        x: ['0%', '-50%'],
                    }}
                    transition={{
                        ease: 'linear',
                        duration: 30,
                        repeat: Infinity,
                    }}
                >
                    {loopItems.map((t: any, i: number) => {
                        const gradient = gradients[i % gradients.length];
                        const initials = t.initial || t.initials || (t.name ? t.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'SE');

                        return (
                            <div
                                key={i}
                                className="testimonial-card rounded-2xl p-7 w-[380px] shrink-0 whitespace-normal flex flex-col justify-between"
                                style={{
                                    background: 'var(--lp-bg-card)',
                                    border: '1px solid var(--lp-border-card)',
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: '0 4px 20px -2px rgba(0,0,0,0.05)',
                                }}
                            >
                                <p
                                    className="mb-6 text-sm leading-relaxed"
                                    style={{ color: 'var(--lp-text-secondary)' }}
                                    dangerouslySetInnerHTML={{
                                        __html: `&ldquo;${t.quote || t.text}&rdquo;`,
                                    }}
                                />
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                                        style={{
                                            background: `linear-gradient(${gradient})`,
                                        }}
                                    >
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold truncate" style={{ color: 'var(--lp-text-primary)' }}>
                                            {t.name}
                                        </div>
                                        <div className="text-xs truncate" style={{ color: 'var(--lp-text-muted)' }}>
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
