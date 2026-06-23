import { UserPlus, Library, Rocket, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const steps: { num: string; icon: LucideIcon; title: string; desc: string }[] =
    [
        {
            num: '01',
            icon: UserPlus,
            title: 'Daftarkan Institusi',
            desc: 'Buat akun institusi Anda dalam 2 menit. Tidak perlu kartu kredit untuk memulai.',
        },
        {
            num: '02',
            icon: Library,
            title: 'Buat Bank Soal',
            desc: 'Tambahkan soal secara manual, import dari Word/Excel, atau gunakan template kami.',
        },
        {
            num: '03',
            icon: Rocket,
            title: 'Jadwalkan Ujian',
            desc: 'Atur sesi ujian: pilih peserta, tentukan waktu, aktifkan fitur pengamanan.',
        },
        {
            num: '04',
            icon: BarChart3,
            title: 'Analisis Hasil',
            desc: 'Laporan lengkap otomatis tersedia — bisa diunduh sebagai PDF atau Excel.',
        },
    ];

export default function HowItWorks({ data }: { data?: any }) {
    return (
        <section
            id="howitworks"
            className="py-24"
            style={{ background: '#0d1117' }}
        >
            <div className="mx-auto max-w-[1000px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="reveal mb-20 text-center"
                >
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"
                        style={{
                            background: 'rgba(96, 165, 250, 0.1)',
                            color: '#60a5fa',
                            border: '1px solid rgba(96, 165, 250, 0.2)',
                        }}
                    >
                        Cara Kerja
                    </div>
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Mulai Ujian Digital dalam{' '}
                        <span className="gradient-text">4 Langkah Mudah</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-base text-gray-400">
                        Proses integrasi yang cepat dan sederhana untuk
                        mentransformasi sistem ujian di institusi Anda.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Center Line */}
                    <div className="absolute top-0 bottom-0 left-[20px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent md:left-1/2" />

                    <div className="space-y-16 md:space-y-24">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isEven = i % 2 === 0;

                            return (
                                <div
                                    key={step.num}
                                    className={`relative flex flex-col items-start md:flex-row md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Content Card */}
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x: isEven ? 40 : -40,
                                        }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ duration: 0.6 }}
                                        className="flex w-full justify-start pl-12 md:w-1/2 md:justify-end md:px-12 md:pl-0"
                                    >
                                        <div
                                            className="group relative w-full max-w-[420px] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-8"
                                            style={{
                                                background:
                                                    'rgba(255, 255, 255, 0.02)',
                                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                                backdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            {/* Number watermark inside card */}
                                            <div
                                                className="absolute top-4 right-6 text-4xl font-black transition-colors duration-300 select-none group-hover:text-blue-500/20"
                                                style={{
                                                    color: 'rgba(255,255,255,0.03)',
                                                    fontFamily:
                                                        "'Sora', sans-serif",
                                                }}
                                            >
                                                {step.num}
                                            </div>

                                            <div className="relative mb-5">
                                                <div
                                                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                                    style={{
                                                        background:
                                                            'rgba(37, 99, 235, 0.15)',
                                                        border: '1px solid rgba(96, 165, 250, 0.2)',
                                                    }}
                                                >
                                                    <Icon
                                                        className="h-5 w-5"
                                                        style={{
                                                            color: '#60a5fa',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <h3
                                                className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#60a5fa]"
                                                style={{
                                                    fontFamily:
                                                        "'Sora', sans-serif",
                                                }}
                                            >
                                                {step.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-gray-400">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Timeline Dot/Bullet */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.2,
                                        }}
                                        className="absolute top-8 left-[20px] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 md:top-1/2 md:left-1/2"
                                        style={{
                                            background: '#0d1117',
                                            border: '2px solid rgba(96, 165, 250, 0.4)',
                                            boxShadow:
                                                '0 0 10px rgba(37,99,235,0.1)',
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
