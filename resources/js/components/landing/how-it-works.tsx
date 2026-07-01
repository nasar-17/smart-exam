import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DynamicLucideIcon from '@/components/dynamic-lucide-icon';

const defaultSteps = [
    {
        number: '01',
        icon: 'lucide:user-plus',
        title: 'Daftarkan Institusi',
        description: 'Buat akun institusi Anda dalam 2 menit. Tidak perlu kartu kredit untuk memulai.',
    },
    {
        number: '02',
        icon: 'lucide:library',
        title: 'Buat Bank Soal',
        description: 'Tambahkan soal secara manual, import dari Word/Excel, atau gunakan template kami.',
    },
    {
        number: '03',
        icon: 'lucide:rocket',
        title: 'Jadwalkan Ujian',
        description: 'Atur sesi ujian: pilih peserta, tentukan waktu, aktifkan fitur pengamanan.',
    },
    {
        number: '04',
        icon: 'lucide:bar-chart-3',
        title: 'Analisis Hasil',
        description: 'Laporan lengkap otomatis tersedia — bisa diunduh sebagai PDF atau Excel.',
    },
];

export default function HowItWorks({ data }: { data?: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center'],
    });

    const scaleY = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    const title = data?.header_title ?? 'Langkah Mudah';
    const titleHighlight = data?.header_title_highlight ?? 'Cara Kerja';
    const subtitle =
        data?.header_subtitle ??
        'Smart Exam dirancang untuk memudahkan proses ujian sekolah secara digital. Hanya butuh 4 langkah mudah.';
    const items = data?.items ?? defaultSteps;

    return (
        <section
            id="how-it-works"
            ref={containerRef}
            className="relative py-24 overflow-hidden"
            style={{ background: 'var(--lp-bg-primary)' }}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="mx-auto max-w-[1200px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-10% 0px -20% 0px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight"
                        data-preview-field="header_title"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: 'var(--lp-text-primary)',
                        }}
                    >
                        {title}{' '}
                        <span className="gradient-text">{titleHighlight}</span>
                    </h2>
                    <p
                        className="mx-auto max-w-xl text-base"
                        data-preview-field="header_subtitle"
                        style={{ color: 'var(--lp-text-secondary)' }}
                    >
                        {subtitle}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Center Line for desktop timeline */}
                    <div
                        className="absolute top-0 bottom-0 left-[20px] w-[2px] -translate-x-1/2 md:left-1/2"
                        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    />

                    {/* Animated Growing Center Line */}
                    <motion.div
                        style={{ scaleY, opacity, originY: 0 }}
                        className="absolute top-0 bottom-0 left-[20px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent md:left-1/2"
                    />

                    <div className="space-y-16 md:space-y-24">
                        {items.map((step: any, i: number) => {
                            const isEven = i % 2 === 0;

                            return (
                                <div
                                    key={step.number || step.num}
                                    className={`relative flex flex-col items-start md:flex-row md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x: isMobile ? 40 : (isEven ? 40 : -40),
                                        }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, margin: '-20% 0px -40% 0px' }}
                                        transition={{ duration: 0.6 }}
                                        className={`flex w-full justify-start pl-12 md:w-1/2 ${
                                            isEven
                                                ? 'md:pl-12 md:pr-0 md:justify-start'
                                                : 'md:pl-0 md:pr-12 md:justify-end'
                                        }`}
                                    >
                                        <div
                                            className="group relative flex w-full max-w-[450px] flex-col rounded-2xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
                                            style={{
                                                background: 'var(--lp-card-highlight)',
                                                border: '1px solid var(--lp-border-card)',
                                                backdropFilter: 'blur(12px)',
                                            }}
                                        >
                                            {/* Step number watermark */}
                                            <div
                                                className="absolute top-4 right-6 text-6xl font-black select-none opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]"
                                                style={{
                                                    color: 'var(--lp-card-watermark)',
                                                    fontFamily: "'Sora', sans-serif",
                                                }}
                                            >
                                                {step.number || step.num}
                                            </div>

                                            <div className="relative mb-5">
                                                <div
                                                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                                    style={{
                                                        background: 'var(--lp-blue-light)',
                                                        border: '1px solid var(--lp-border)',
                                                    }}
                                                >
                                                    <DynamicLucideIcon
                                                        name={step.icon}
                                                        className="h-5 w-5"
                                                        style={{
                                                            color: 'var(--lp-blue-icon)',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <h3
                                                className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-[#60a5fa]"
                                                style={{
                                                    fontFamily: "'Sora', sans-serif",
                                                    color: 'var(--lp-text-primary)',
                                                }}
                                            >
                                                {step.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--lp-text-secondary)' }}>
                                                {step.description || step.desc}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Timeline Dot/Bullet */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false, margin: '-20% 0px -40% 0px' }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.2,
                                        }}
                                        className="absolute top-8 left-[20px] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 md:top-1/2 md:left-1/2"
                                        style={{
                                            background: 'var(--lp-timeline-dot-bg)',
                                            border: '2px solid rgba(96, 165, 250, 0.4)',
                                            boxShadow: '0 0 10px rgba(37,99,235,0.1)',
                                        }}
                                    >
                                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#2563eb]" />
                                    </motion.div>

                                    {/* Placeholder column to balance layout on desktop */}
                                    <div className="hidden w-1/2 md:block" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
