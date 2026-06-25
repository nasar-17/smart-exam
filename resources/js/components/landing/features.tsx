import {
    Library,
    ShieldCheck,
    Clock,
    BarChart3,
    Users2,
    MonitorSmartphone,
    Upload,
    BellRing,
    BookOpen,
    Users,
    Database,
    Link,
    Headphones,
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<any>> = {
    'lucide:library': Library,
    'lucide:shield-check': ShieldCheck,
    'lucide:clock': Clock,
    'lucide:bar-chart-3': BarChart3,
    'lucide:users-2': Users2,
    'lucide:monitor-smartphone': MonitorSmartphone,
    'lucide:upload': Upload,
    'lucide:bell-ring': BellRing,
    'lucide:book-open': BookOpen,
    'lucide:users': Users,
    'lucide:database': Database,
    'lucide:link': Link,
    'lucide:headphones': Headphones,
};

const defaultFeatures = [
    {
        icon: 'lucide:book-open',
        title: 'Ujian Dasar',
        description:
            'Pelaksanaan ujian dengan format standar dasar yang praktis dan efisien untuk kebutuhan evaluasi harian.',
    },
    {
        icon: 'lucide:users',
        title: 'Kapasitas Peserta Fleksibel',
        description:
            'Mendukung batas maksimal pengerjaan mulai dari 100 peserta hingga 500 peserta per sesi ujian.',
    },
    {
        icon: 'lucide:shield-check',
        title: 'Keamanan Anti-Cheat',
        description:
            'Sistem proteksi canggih untuk meminimalisir kecurangan dengan mendeteksi tab switching dan aktivitas mencurigakan.',
    },
    {
        icon: 'lucide:bar-chart-3',
        title: 'Laporan Detail',
        description:
            'Analisis instan pasca ujian dengan rekapitulasi nilai dan laporan performa detail per peserta.',
    },
    {
        icon: 'lucide:users',
        title: 'Unlimited Peserta',
        description:
            'Selenggarakan ujian massal tanpa batasan jumlah peserta pada tier Premium.',
    },
    {
        icon: 'lucide:database',
        title: 'Question Bank & Unlimited Soal',
        description:
            'Buat dan simpan soal tanpa batasan kuota serta kelola bank soal terstruktur dengan mudah.',
    },
    {
        icon: 'lucide:link',
        title: 'Integrasi LMS',
        description:
            'Konektivitas praktis untuk menghubungkan platform ujian dengan Learning Management System (LMS) pilihan Anda.',
    },
    {
        icon: 'lucide:headphones',
        title: 'Dedicated Support & Analytics',
        description:
            'Dashboard analisis tingkat lanjut disertai bantuan prioritas langsung dari tim teknis pendukung kami.',
    },
];

export default function Features({ data }: { data?: any }) {
    const badge = data?.header_badge ?? 'Fitur Unggulan';
    const title = data?.header_title ?? 'Semua yang Kamu Butuhkan untuk';
    const titleHighlight = data?.header_title_highlight ?? 'Ujian Digital';
    const subtitle =
        data?.header_subtitle ??
        'Dari pembuatan soal hingga laporan hasil — Smart Exam menangani semuanya.';
    const items = data?.items ?? defaultFeatures;

    return (
        <section
            id="features"
            className="py-24"
            style={{ background: 'var(--lp-bg-primary)' }}
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
                            background: 'var(--lp-blue-light)',
                            color: 'var(--lp-blue-text)',
                        }}
                    >
                        {badge}
                    </div>
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: 'var(--lp-text-primary)',
                        }}
                    >
                        {title}{' '}
                        <span className="gradient-text">{titleHighlight}</span>
                    </h2>
                    <p
                        className="mx-auto max-w-lg text-base"
                        style={{ color: 'var(--lp-text-secondary)' }}
                    >
                        {subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {items.map((f: any, i: number) => {
                        const Icon = iconMap[f.icon] ?? BookOpen;
                        const isHighlight = f.bg === 'gradient' || f.highlight;

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
                                    background: 'var(--lp-card-highlight)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid var(--lp-border-card)',
                                }}
                            >
                                <div
                                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                                    style={{
                                        background: 'var(--lp-card-highlight)',
                                    }}
                                >
                                    <Icon
                                        className="h-[22px] w-[22px]"
                                        style={{ color: 'var(--lp-blue-icon)' }}
                                    />
                                </div>
                                <h3
                                    className="mb-2 text-lg font-bold"
                                    style={{
                                        fontFamily: "'Sora', sans-serif",
                                        color: 'var(--lp-text-primary)',
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{
                                        color: 'var(--lp-text-secondary)',
                                    }}
                                >
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
