import { ArrowRight, Lock, Zap, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA({ data }: { data?: any }) {
    const title = data?.title ?? 'Siap Membawa Ujian di Institusimu ke Level Berikutnya?';
    const subtitle = data?.subtitle ?? 'Bergabunglah bersama 500+ institusi pendidikan yang sudah mempercayakan ujian digital mereka ke Smart Exam.';
    const primaryCtaText = data?.primary_cta_text ?? 'Mulai Gratis';
    const primaryCtaLink = data?.primary_cta_link ?? '#pricing';
    const secondaryCtaText = data?.secondary_cta_text ?? 'Jadwalkan Demo';
    const secondaryCtaLink = data?.secondary_cta_link ?? '#contact';
    const badge1 = data?.badge_1 ?? 'Data Aman & Terenkripsi';
    const badge2 = data?.badge_2 ?? 'Setup 3 Menit';
    const badge3 = data?.badge_3 ?? 'Gratis 14 Hari Tanpa Syarat';

    return (
        <section
            id="cta"
            className="relative overflow-hidden py-28"
            style={{ background: 'var(--lp-bg-primary)' }}
        >
            {/* Ambient background glows */}
            <div
                className="absolute top-1/2 left-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
                style={{
                    background:
                        'radial-gradient(circle, #2563EB 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1000px] px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl p-10 text-center md:p-16"
                    style={{
                        background: 'var(--lp-step-card-bg)',
                        border: '1px solid var(--lp-border-card)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    {/* Inner glowing accent */}
                    <div
                        className="absolute -top-32 -left-32 h-64 w-64 rounded-full opacity-10"
                        style={{
                            background:
                                'radial-gradient(circle, #60a5fa, transparent 70%)',
                        }}
                    />
                    <div
                        className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full opacity-10"
                        style={{
                            background:
                                'radial-gradient(circle, #2563EB, transparent 70%)',
                        }}
                    />

                    <h2
                        className="mb-5 text-[38px] leading-tight font-bold tracking-tight md:text-[50px]"
                        style={{ color: 'var(--lp-text-primary)', fontFamily: "'Sora', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <p className="mx-auto mb-10 max-w-2xl text-lg" style={{ color: 'var(--lp-text-secondary)' }}>
                        {subtitle}
                    </p>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={primaryCtaLink}
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:brightness-110"
                            style={{
                                background: '#2563EB',
                                boxShadow: '0 4px 14px 0 rgba(37,99,235,0.4)',
                            }}
                        >
                            {primaryCtaText}
                            <ArrowRight className="h-[18px] w-[18px]" />
                        </a>
                        <a
                            href={secondaryCtaLink}
                            className="inline-flex items-center gap-2 rounded-xl border px-8 py-4 text-base font-semibold transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5"
                            style={{
                                color: 'var(--lp-text-primary)',
                                borderColor: 'var(--lp-border)',
                            }}
                        >
                            {secondaryCtaText}
                        </a>
                    </div>
                    <div
                        className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t pt-8"
                        style={{ borderColor: 'var(--lp-border-subtle)' }}
                    >
                        {[
                            { icon: Lock, text: badge1 },
                            { icon: Zap, text: badge2 },
                            {
                                icon: CreditCard,
                                text: badge3,
                            },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 text-xs" style={{ color: 'var(--lp-text-muted)' }}
                            >
                                <badge.icon className="h-3.5 w-3.5" style={{ color: 'var(--lp-blue-icon)' }} />
                                {badge.text}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
