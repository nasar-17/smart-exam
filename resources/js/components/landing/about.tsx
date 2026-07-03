import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const defaultInstitutions = [
    'UH|Universitas Hasanuddin',
    'SM|STMIK Makassar',
    'S5|SMA Negeri 5',
    'LP|LSP Nasional',
    'PU|Politeknik Ujung',
    'AT|Akademi Teknologi',
];

const defaultMisi = [
    'Menyediakan teknologi anti-kecurangan mutakhir demi menjaga kejujuran proses akademik.',
    'Menyederhanakan administrasi ujian guna menekan beban biaya operasional kertas dan cetak.',
    'Menyajikan analisis hasil instan dan detail untuk mempermudah evaluasi performa belajar.',
];

export default function About({ data }: { data?: any }) {
    const title = data?.title ?? 'Kami Percaya Teknologi Bisa Membuat';
    const titleHighlight = data?.title_highlight ?? 'Pendidikan Lebih Adil';
    const paragraph1 =
        data?.paragraph_1 ??
        'Smart Exam dikembangkan oleh tim Smart Inovasi — startup teknologi pendidikan dari Makassar, Indonesia. Kami memahami tantangan nyata yang dihadapi institusi pendidikan dalam menyelenggarakan ujian: kecurangan, biaya cetak soal, dan keterbatasan waktu koreksi.';
    const paragraph2 =
        data?.paragraph_2 ??
        'Dengan Smart Exam, kami menghadirkan platform ujian digital yang tidak hanya mudah digunakan, tapi juga aman, terjangkau, dan bisa diakses dari mana saja.';
    const imageUrl =
        data?.image_url && data.image_url !== ''
            ? data.image_url
            : 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80';

    const visiTitle = data?.visi_title ?? 'Visi Kami';
    const visiText =
        data?.visi_text ??
        'Menjadi platform ujian digital terdepan di Indonesia yang berdedikasi menciptakan akses evaluasi pendidikan yang adil, aman, dan inklusif bagi seluruh lapisan masyarakat.';
    const misiTitle = data?.misi_title ?? 'Misi Kami';
    const misiItems = data?.misi_items ?? defaultMisi;
    const image2Url =
        data?.image_2_url && data.image_2_url !== ''
            ? data.image_2_url
            : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';

    const itemsInstitutions = data?.institutions ?? defaultInstitutions;

    return (
        <section
            id="about"
            className="py-24"
            style={{ background: 'var(--lp-bg-primary)' }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="flex flex-col items-center gap-16 md:flex-row lg:gap-20">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="w-full flex-1"
                        data-preview-field="image_url"
                    >
                        <img
                            src={imageUrl}
                            alt="Students collaborating"
                            className="w-full rounded-2xl object-cover shadow-lg"
                            style={{
                                minHeight: 380,
                                maxHeight: 440,
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="w-full flex-1"
                    >


                        <h2
                            className="mb-6 text-[38px] leading-tight font-bold tracking-tight"
                            style={{
                                fontFamily: "'Sora', sans-serif",
                                color: 'var(--lp-text-primary)',
                            }}
                        >
                            <span className="block" data-preview-field="title">
                                {title}
                            </span>
                            <span className="gradient-text" data-preview-field="title_highlight">
                                {titleHighlight}
                            </span>
                        </h2>
                        <div>
                            <p
                                className="mb-4 text-base leading-relaxed"
                                data-preview-field="paragraph_1"
                                style={{ color: 'var(--lp-text-secondary)' }}
                            >
                                {paragraph1}
                            </p>
                            <p
                                className="mb-8 text-base leading-relaxed"
                                data-preview-field="paragraph_2"
                                style={{ color: 'var(--lp-text-secondary)' }}
                            >
                                {paragraph2}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Visi & Misi Section */}
                <div className="mt-24 flex flex-col items-center gap-16 md:flex-row lg:gap-20">
                    {/* Left: Visi & Misi Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="flex w-full flex-1 flex-col gap-8"
                    >
                        {/* Visi */}
                        <div>
                            <h3
                                className="mb-4 flex items-center gap-3 text-xl font-bold"
                                data-preview-field="visi_title"
                                style={{
                                    fontFamily: "'Sora', sans-serif",
                                    color: 'var(--lp-text-primary)',
                                }}
                            >
                                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                {visiTitle}
                            </h3>
                            <p
                                className="text-base leading-relaxed"
                                data-preview-field="visi_text"
                                style={{ color: 'var(--lp-text-secondary)' }}
                            >
                                {visiText}
                            </p>
                        </div>

                        {/* Misi */}
                        <div>
                            <h3
                                className="mb-4 flex items-center gap-3 text-xl font-bold"
                                data-preview-field="misi_title"
                                style={{
                                    fontFamily: "'Sora', sans-serif",
                                    color: 'var(--lp-text-primary)',
                                }}
                            >
                                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                                {misiTitle}
                            </h3>
                            <ul
                                className="space-y-4 text-base"
                                data-preview-field="misi_items"
                                style={{ color: 'var(--lp-text-secondary)' }}
                            >
                                {misiItems.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-0.5 font-bold text-blue-400">
                                            •
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="w-full flex-1"
                        data-preview-field="image_2_url"
                    >
                        <img
                            src={image2Url}
                            alt="Digital learning collaboration"
                            className="w-full rounded-2xl object-cover shadow-lg"
                            style={{
                                minHeight: 380,
                                maxHeight: 440,
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        />
                    </motion.div>
                </div>

                {/* Institutions */}
                <div
                    className="mt-24 border-t pt-10"
                    style={{ borderColor: 'var(--lp-border-subtle)' }}
                >
                    <p
                        className="mb-8 text-center text-xs font-semibold tracking-widest uppercase"
                        style={{ color: 'var(--lp-text-muted)' }}
                    >
                        Dipercaya oleh institusi terkemuka
                    </p>
                    <div className="relative w-full overflow-hidden">
                        <div
                            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
                            style={{
                                background:
                                    'linear-gradient(to right, var(--lp-bg-primary), transparent)',
                            }}
                        />
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
                            style={{
                                background:
                                    'linear-gradient(to left, var(--lp-bg-primary), transparent)',
                            }}
                        />

                        <motion.div
                            className="flex w-max gap-0 whitespace-nowrap"
                            animate={{ x: [-1000, 0] }}
                            transition={{
                                repeat: Infinity,
                                ease: 'linear',
                                duration: 25,
                            }}
                        >
                            {[
                                ...itemsInstitutions,
                                ...itemsInstitutions,
                                ...itemsInstitutions,
                            ].map((inst, index) => {
                                const instStr = typeof inst === 'string' ? inst : (inst && typeof inst === 'object' && 'value' in inst ? String((inst as any).value) : '');

                                if (!instStr) {
return null;
}

                                const [abbr, name, logo] = instStr.split('|');

                                return (
                                    <div
                                        key={index}
                                        className="inst-logo-card group flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border px-4.5 py-2.5 opacity-60 transition-all hover:opacity-100"
                                        style={{ borderColor: 'transparent' }}
                                    >
                                        {logo ? (
                                            <div className="h-8 w-8 shrink-0 rounded-full border border-slate-200/50 dark:border-slate-800/50 overflow-hidden flex items-center justify-center bg-white">
                                                <img
                                                    src={logo}
                                                    alt={name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="inst-logo-badge flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                                                style={{
                                                    background: '#2563EB',
                                                    color: '#ffffff',
                                                }}
                                            >
                                                {abbr}
                                            </div>
                                        )}
                                        <span
                                            className="inst-logo-text text-sm font-semibold transition-all duration-300"
                                            style={{
                                                color: 'var(--lp-text-secondary)',
                                            }}
                                        >
                                            {name}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
