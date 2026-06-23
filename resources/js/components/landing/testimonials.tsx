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
    return (
        <section
            id="testimonials"
            className="py-24"
            style={{ background: '#0a0e1a' }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2
                        className="mb-2 text-[40px] font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Dipercaya{' '}
                        <span className="gradient-text">500+ Institusi</span>
                    </h2>
                    <div className="mb-8 flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className="h-[18px] w-[18px] fill-[#f5c518] text-[#f5c518]"
                            />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-white/50">
                            4.9/5 dari 500+ pengguna
                        </span>
                    </div>
                </motion.div>

                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                            className="testimonial-card rounded-2xl p-7"
                            style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >

                            <p
                                className="mb-6 text-base leading-relaxed text-gray-300"
                                dangerouslySetInnerHTML={{
                                    __html: `&ldquo;${t.text}&rdquo;`,
                                }}
                            />
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                                    style={{
                                        background: `linear-gradient(${t.gradient})`,
                                    }}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        {t.name}
                                    </div>
                                    <div className="text-xs text-white/40">
                                        {t.role}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
