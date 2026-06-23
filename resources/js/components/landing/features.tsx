import {
    BookOpen,
    Users,
    Database,
    ShieldCheck,
    BarChart3,
    Infinity,
    Link,
    Headphones,
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
        icon: BookOpen,
        title: 'Ujian Dasar',
        description:
            'Pelaksanaan ujian dengan format standar dasar yang praktis dan efisien untuk kebutuhan evaluasi harian.',
    },
    {
        icon: Users,
        title: 'Kapasitas Peserta Fleksibel',
        description:
            'Mendukung batas maksimal pengerjaan mulai dari 100 peserta hingga 500 peserta per sesi ujian.',
    },
    {
        icon: ShieldCheck,
        title: 'Keamanan Anti-Cheat',
        description:
            'Sistem proteksi canggih untuk meminimalisir kecurangan dengan mendeteksi tab switching dan aktivitas mencurigakan.',
        highlight: true,
    },
    {
        icon: BarChart3,
        title: 'Laporan Detail',
        description:
            'Analisis instan pasca ujian dengan rekapitulasi nilai dan laporan performa detail per peserta.',
    },
    {
        icon: Users,
        title: 'Unlimited Peserta',
        description:
            'Selenggarakan ujian massal tanpa batasan jumlah peserta pada tier Premium.',
    },
    {
        icon: Database,
        title: 'Question Bank & Unlimited Soal',
        description:
            'Buat dan simpan soal tanpa batasan kuota serta kelola bank soal terstruktur dengan mudah.',
    },
    {
        icon: Link,
        title: 'Integrasi LMS',
        description:
            'Konektivitas praktis untuk menghubungkan platform ujian dengan Learning Management System (LMS) pilihan Anda.',
    },
    {
        icon: Headphones,
        title: 'Dedicated Support & Analytics',
        description:
            'Dashboard analisis tingkat lanjut disertai bantuan prioritas langsung dari tim teknis pendukung kami.',
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
