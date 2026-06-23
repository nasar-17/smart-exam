import {
    Library,
    ShieldCheck,
    Clock,
    BarChart3,
    Users2,
    MonitorSmartphone,
    Upload,
    BellRing,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCard {
    icon: LucideIcon;
    title: string;
    description: string;
    highlight?: boolean;
}

const features: FeatureCard[] = [
    {
        icon: Library,
        title: 'Bank Soal Cerdas',
        description:
            'Kelola ribuan soal dengan kategori, tag, dan tingkat kesulitan secara terstruktur.',
    },
    {
        icon: ShieldCheck,
        title: 'Anti-Kecurangan',
        description:
            'Deteksi tab switching, fullscreen lock, dan randomisasi soal otomatis setiap peserta.',
    },
    {
        icon: Clock,
        title: 'Timer Otomatis',
        description:
            'Atur durasi ujian per sesi dengan countdown real-time dan auto-submit saat waktu habis.',
    },
    {
        icon: BarChart3,
        title: 'Laporan Instan',
        description:
            'Hasil ujian tersedia segera setelah selesai — lengkap dengan analisis per soal dan per siswa.',
        highlight: true,
    },
    {
        icon: Users2,
        title: 'Manajemen Peserta',
        description:
            'Import peserta via Excel, bagi ke dalam grup kelas, dan pantau status ujian secara live.',
    },
    {
        icon: MonitorSmartphone,
        title: 'Akses Multi-Device',
        description:
            'Ujian bisa diikuti dari laptop, tablet, atau smartphone tanpa install aplikasi tambahan.',
    },
    {
        icon: Upload,
        title: 'Import Soal Mudah',
        description:
            'Upload soal dari file Word atau Excel — konversi otomatis ke format ujian digital.',
    },
    {
        icon: BellRing,
        title: 'Notifikasi Real-Time',
        description:
            'Pengajar mendapat notifikasi live saat peserta mulai, selesai, atau terdeteksi mencurigakan.',
    },
];

export default function Features({ data }: { data?: any }) {
    return (
        <section
            id="features"
            className="py-24"
            style={{ background: '#0d1117' }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="mb-14 text-center"
                >
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"
                        style={{
                            background: 'rgba(37, 99, 235, 0.15)',
                            color: '#60a5fa',
                        }}
                    >
                        Fitur Unggulan
                    </div>
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Semua yang Kamu Butuhkan untuk{' '}
                        <span className="gradient-text">Ujian Digital</span>
                    </h2>
                    <p className="mx-auto max-w-lg text-base text-gray-400">
                        Dari pembuatan soal hingga laporan hasil — Smart Exam
                        menangani semuanya.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {features.map((f, i) => {
                        const Icon = f.icon;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{
                                    duration: 0.5,
                                    delay: (i % 2) * 0.1,
                                }}
                                className="feature-card rounded-2xl p-7"
                                style={{
                                    background: f.highlight
                                        ? 'rgba(37, 99, 235, 0.12)'
                                        : 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <div
                                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                                    style={{
                                        background: f.highlight
                                            ? 'rgba(96, 165, 250, 0.2)'
                                            : 'rgba(255, 255, 255, 0.06)',
                                    }}
                                >
                                    <Icon
                                        className="h-[22px] w-[22px]"
                                        style={{ color: '#60a5fa' }}
                                    />
                                </div>
                                <h3
                                    className="mb-2 text-lg font-bold text-white"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    {f.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    {f.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
