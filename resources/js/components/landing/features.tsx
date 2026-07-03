import { motion } from 'framer-motion';
import DynamicLucideIcon from '@/components/dynamic-lucide-icon';

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
        title: 'Manajemen Kelas',
        description:
            'Atur dan kelompokkan peserta ujian ke dalam berbagai kelas atau rombel dengan mudah.',
    },
    {
        icon: 'lucide:monitor-smartphone',
        title: 'Akses Multi-Device',
        description:
            'Peserta dapat mengikuti ujian dengan nyaman menggunakan smartphone, tablet, laptop, maupun PC desktop.',
    },
    {
        icon: 'lucide:upload',
        title: 'Import Soal Cepat',
        description:
            'Upload ratusan soal sekaligus menggunakan file template Microsoft Word atau Excel yang sudah disediakan.',
    },
    {
        icon: 'lucide:bell-ring',
        title: 'Notifikasi Real-time',
        description:
            'Dapatkan pemberitahuan langsung saat ujian dimulai, selesai, atau ketika ada aktivitas mencurigakan.',
    },
    {
        icon: 'lucide:library',
        title: 'Bank Soal Terpusat',
        description:
            'Kelola semua aset soal Anda dalam satu dashboard terintegrasi untuk digunakan kembali kapan saja.',
    },
    {
        icon: 'lucide:database',
        title: 'Backup Data Otomatis',
        description:
            'Seluruh data jawaban dan hasil ujian tersimpan aman di cloud dengan sistem backup berkala otomatis.',
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

                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight"
                        style={{
                            fontFamily: "'Sora', sans-serif",
                            color: 'var(--lp-text-primary)',
                        }}
                    >
                        <span data-preview-field="header_title">{title}</span>{' '}
                        <span className="gradient-text" data-preview-field="header_title_highlight">{titleHighlight}</span>
                    </h2>
                    <p
                        className="mx-auto max-w-lg text-base"
                        data-preview-field="header_subtitle"
                        style={{ color: 'var(--lp-text-secondary)' }}
                    >
                        {subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {items.map((f: any, i: number) => {
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
                                    <DynamicLucideIcon
                                        name={f.icon}
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
