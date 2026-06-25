import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        initials: 'NH',
        name: 'Dra. Hj. Nuraini, M.Pd.',
        role: 'Kepala Sekolah · SMA Negeri 5 Makassar',
        text: 'Smart Exam benar-benar mengubah cara kami menyelenggarakan ujian semester. Tidak ada lagi drama <strong>fotokopi soal tengah malam</strong>!',
        gradient: '135deg,#2563EB,#1d4ed8',
    },
    {
        initials: 'AF',
        name: 'Bpk. Ahmad Fauzi, S.Pd.',
        role: 'Guru Matematika · MTs Al-Ikhlas Bone',
        text: 'Fitur <strong>anti-cheating</strong>-nya sangat membantu. Siswa tidak bisa buka tab lain, dan saya bisa pantau mereka secara real-time.',
        gradient: '135deg,#1d4ed8,#2563EB',
    },
    {
        initials: 'RH',
        name: 'Ir. Rahmat Hidayat',
        role: 'Kepala IT · Universitas Bosowa',
        text: 'Setup awal hanya butuh <strong>15 menit</strong>. Tim Smart Inovasi juga sangat responsif membantu kami saat onboarding.',
        gradient: '135deg,#2563EB,#0EA5E9',
    },
    {
        initials: 'SA',
        name: 'Siti Aisyah, S.Pd., M.Si.',
        role: 'Dosen · Politeknik Negeri Ujung Pandang',
        text: 'Laporan hasilnya <strong>detail banget</strong> — bisa lihat per soal mana yang banyak salah. Sangat membantu evaluasi pengajaran saya.',
        gradient: '135deg,#0EA5E9,#2563EB',
    },
    {
        initials: 'HS',
        name: 'H. Syamsul Bahri, M.M.',
        role: 'Wakasek Kurikulum · SMK Kesehatan Amanah',
        text: 'Kami punya <strong>1.200 siswa</strong> dan Smart Exam menanganinya tanpa masalah. Tidak ada server down, bahkan di hari ujian simulasi.',
        gradient: '135deg,#2563EB,#1d4ed8',
    },
    {
        initials: 'AM',
        name: 'Andi Maulana, S.Kom.',
        role: 'Operator IT · Dinas Pendidikan Kab. Gowa',
        text: 'Harganya sangat <strong>terjangkau</strong> dibanding solusi lain yang pernah kami coba. Worth it sekali untuk fitur yang ditawarkan.',
        gradient: '135deg,#1d4ed8,#0EA5E9',
    },
];


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

    return (
        <section
            id="testimonials"
            className="py-24"
            style={{ background: 'var(--lp-bg-secondary)' }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"
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
                        style={{ fontFamily: "'Sora', sans-serif", color: 'var(--lp-text-primary)' }}
                    >
                        {title}
                    </h2>
                    <div className="mb-8 flex items-center justify-center gap-1">
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

                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {items.map((t: any, i: number) => {
                        const gradient = gradients[i % gradients.length];
                        const initials = t.initial || t.initials || (t.name ? t.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'SE');
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                className="testimonial-card rounded-2xl p-7"
                                style={{
                                    background: 'var(--lp-bg-card)',
                                    border: '1px solid var(--lp-border-card)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <p
                                    className="mb-6 text-base leading-relaxed"
                                    style={{ color: 'var(--lp-text-secondary)' }}
                                    dangerouslySetInnerHTML={{
                                        __html: `&ldquo;${t.quote || t.text}&rdquo;`,
                                    }}
                                />
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                                        style={{
                                            background: `linear-gradient(${gradient})`,
                                        }}
                                    >
                                        {initials}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold" style={{ color: 'var(--lp-text-primary)' }}>
                                            {t.name}
                                        </div>
                                        <div className="text-xs" style={{ color: 'var(--lp-text-muted)' }}>
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
