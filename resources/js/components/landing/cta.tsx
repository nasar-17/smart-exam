import { ArrowRight, Lock, Zap, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA({ data }: { data?: any }) {
    return (
        <section
            id="cta"
            className="relative overflow-hidden py-28"
            style={{ background: '#0d1117' }}
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
                        background:
                            'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
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
                        className="mb-5 text-[38px] leading-tight font-bold tracking-tight text-white md:text-[50px]"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Siap Membawa Ujian di Institusimu
                        <br className="hidden md:inline" /> ke Level Berikutnya?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
                        Bergabunglah bersama 500+ institusi pendidikan yang
                        sudah mempercayakan ujian digital mereka ke Smart Exam.
                    </p>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:brightness-110"
                            style={{
                                background: '#2563EB',
                                boxShadow: '0 4px 14px 0 rgba(37,99,235,0.4)',
                            }}
                        >
                            Mulai Gratis
                            <ArrowRight className="h-[18px] w-[18px]" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-xl border px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white/5"
                            style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                        >
                            Jadwalkan Demo Langsung
                        </a>
                    </div>
                    <div
                        className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t pt-8"
                        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                    >
                        {[
                            { icon: Lock, text: 'Data Aman & Terenkripsi' },
                            { icon: Zap, text: 'Setup 3 Menit' },
                            {
                                icon: CreditCard,
                                text: 'Gratis 14 Hari Tanpa Syarat',
                            },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 text-xs text-gray-400"
                            >
                                <badge.icon className="h-3.5 w-3.5 text-blue-400" />
                                {badge.text}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
