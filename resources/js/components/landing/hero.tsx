import { motion } from 'framer-motion';
import { ArrowRight, Users, Star, CheckCircle, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero({ data }: { data?: any }) {
    const badgeText = data?.badge_text ?? '500+ Institusi Aktif';
    const badgeLink = data?.badge_link ?? '#testimonials';
    const title = data?.title ?? 'Platform Ujian';
    const titleAccent = data?.title_accent ?? 'Digital Modern';
    const subtitle =
        data?.subtitle ??
        'Kelola soal, pantau peserta, dan analisis hasil — semua dalam satu platform yang cerdas, aman, dan efisien.';
    const socialProofText =
        data?.social_proof_text ?? 'Digunakan oleh 10.000+ guru';
    const socialProofSub = data?.social_proof_sub ?? '/ ★ 4.9 Rating';
    const ctaPrimaryText = data?.cta_primary_text ?? 'Mulai Gratis Sekarang';
    const ctaPrimaryLink = data?.cta_primary_link ?? '#pricing';
    const heroBgImage = data?.hero_bg_image || data?.bg_image_url || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80&auto=format&fit=crop';
    const heroImage =
        data?.hero_image && data.hero_image !== ''
            ? data.hero_image
            : '/exam-hero.jpg';
    const statPct = data?.stat_pct ?? '98%';
    const statLabel = data?.stat_label ?? 'Tingkat\nKepuasan';
    const floatQ1 = data?.float_q1 ?? 'Ujian Aman & Anti-Kecurangan?';
    const floatQ2 = data?.float_q2 ?? 'Laporan Otomatis Tersedia?';
    const cardTitle = data?.card_title ?? 'Smart Exam';
    const cardSub = data?.card_sub ?? 'Ujian Digital';
    const cardPrice = data?.card_price ?? 'Gratis Trial';
    const cardRating = data?.card_rating ?? '4.9';

    // Apply background image via inline style on container
    const heroBgStyle = {
        backgroundImage: `url(${heroBgImage})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const words = data?.title_accent
        ? data.title_accent.split(',').map((w: string) => w.trim())
        : ['Digital Modern', 'Aman & Adil', 'Praktis & Akurat'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const currentFullWord = words[currentWordIndex];

        const type = () => {
            if (!isDeleting) {
                // Typing text
                setCurrentText(currentFullWord.substring(0, currentText.length + 1));

                if (currentText === currentFullWord) {
                    timer = setTimeout(() => setIsDeleting(true), 2000);

                    return;
                }
            } else {
                // Deleting text
                setCurrentText(currentFullWord.substring(0, currentText.length - 1));

                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);

                    return;
                }
            }

            const speed = isDeleting ? 40 : 100;
            timer = setTimeout(type, speed);
        };

        timer = setTimeout(type, isDeleting ? 30 : 100);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex]);

    return (
        <section
            id="hero"
            className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black"
        >
            {/* Background image & overlay */}
            <div
                className="hero-bg-image absolute inset-0 z-0"
                style={{ ...heroBgStyle, filter: 'brightness(0.35) saturate(0.7)' }}
            />
            <div className="hero-bg-overlay absolute inset-0 z-[1]" />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 lg:py-28">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* ── LEFT COLUMN ─────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col"
                    >
                        {/* Badge */}
                        <div className="mb-8 flex items-center gap-2" data-preview-field="badge_text">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                <Users className="h-[15px] w-[15px] text-white" />
                            </div>
                            <span className="text-sm font-semibold text-white/90">
                                {badgeText}
                            </span>
                            <a
                                href={badgeLink}
                                className="text-sm font-bold underline underline-offset-2"
                                style={{ color: '#60a5fa' }}
                            >
                                Lihat Testimoni
                            </a>
                        </div>

                        {/* Headline */}
                        <h1
                            className="mb-6 text-white"
                            data-preview-field="title"
                            style={{
                                fontFamily: "'Sora', sans-serif",
                                fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.05,
                                minHeight: '2.15em',
                            }}
                        >
                            {title}
                            <span className="block text-[#60a5fa]" data-preview-field="title_accent">
                                {currentText}
                                <span className="animate-pulse ml-1 text-white">|</span>
                            </span>
                        </h1>

                        {/* Divider line */}
                        <div className="mb-6 h-px w-full bg-white/15" />

                        {/* Subtitle */}
                        <p
                            className="mb-8 max-w-[460px] text-white/70"
                            data-preview-field="subtitle"
                            style={{
                                fontFamily: "'Satoshi', sans-serif",
                                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                                lineHeight: 1.7,
                            }}
                        >
                            {subtitle}
                        </p>

                        {/* Social Proof */}
                        <div className="mb-10 flex items-center gap-4">
                            {/* Avatar stack */}
                            <div className="flex -space-x-2">
                                {[
                                    '#6366f1',
                                    '#2563EB',
                                    '#10b981',
                                    '#f59e0b',
                                ].map((color, i) => (
                                    <div
                                        key={i}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 text-[10px] font-bold text-white"
                                        style={{ background: color }}
                                    >
                                        {['G', 'A', 'S', 'R'][i]}
                                    </div>
                                ))}
                            </div>
                            <div className="h-4 w-px bg-white/20" />
                            <div>
                                <span className="text-sm font-semibold text-white/95" data-preview-field="social_proof_text">
                                    {socialProofText}
                                </span>
                                <span
                                    className="ml-2 text-sm font-bold"
                                    style={{ color: '#60a5fa' }}
                                    data-preview-field="social_proof_sub"
                                >
                                    {socialProofSub}
                                </span>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href={ctaPrimaryLink}
                                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-[0.95rem] font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
                                style={{
                                    background: '#ffffff',
                                    color: '#0a0a0a',
                                    fontFamily: "'Sora', sans-serif",
                                }}
                                data-preview-field="cta_primary_text"
                            >
                                {ctaPrimaryText}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </motion.div>

                    {/* ── RIGHT COLUMN ─────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative flex items-center justify-center lg:justify-end"
                    >
                        {/* Wrapper container allowing elements to overflow */}
                        <div className="relative w-full max-w-[380px] hero-right-wrapper">
                            {/* Main visual card */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    times: [0, 0.5, 1]
                                }}
                                className="relative h-[420px] w-full overflow-hidden rounded-[2rem]"
                                style={{
                                    background: '#E8580A',
                                }}
                            >
                                <img
                                    src={heroImage}
                                    alt="Hero visual"
                                    className="h-full w-full object-cover object-center"
                                />
                            </motion.div>

                            {/* Floating question bubbles (positioned outside visual card so they overflow) */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 'var(--float-q1-x, -50%)' }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="absolute top-7 left-0 z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        delay: 0.9
                                    }}
                                    className="flex items-center gap-2 rounded-2xl px-4 py-2.5 whitespace-nowrap shadow-xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8580A]">
                                        <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-xs font-semibold text-[#1a1a1a]">
                                        {floatQ1}
                                    </span>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 'var(--float-q2-x, -40%)' }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="absolute top-[80px] left-0 z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{
                                        duration: 3.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        delay: 1.0
                                    }}
                                    className="flex items-center gap-2 rounded-2xl px-4 py-2.5 whitespace-nowrap shadow-xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(10px)',
                                    }}
                                >
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB]">
                                        <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-xs font-semibold text-[#1a1a1a]">
                                        {floatQ2}
                                    </span>
                                </motion.div>
                            </motion.div>

                            {/* Bottom product card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="absolute right-4 bottom-4 z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        delay: 1.0
                                    }}
                                    className="flex items-center gap-3 rounded-2xl p-3 shadow-xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(10px)',
                                        minWidth: 160,
                                    }}
                                >
                                    <div
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                                        style={{ background: '#EEF2FF' }}
                                    >
                                        <Award className="h-5 w-5 text-[#2563EB]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#1a1a1a]">
                                            {cardTitle}
                                        </p>
                                        <p className="text-[10px] text-[#666]">
                                            {cardSub}
                                        </p>
                                        <p className="text-sm font-extrabold text-[#0a0a0a]">
                                            {cardPrice}
                                        </p>
                                        <div className="flex items-center gap-0.5">
                                            <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                                            <span className="text-[10px] font-bold text-[#f59e0b]">
                                                {cardRating}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Floating stat card — top right */}
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                whileInView={{ opacity: 1, x: 'var(--stat-x, 0%)', y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute -top-4 -right-4 z-20 lg:-right-6"
                            >
                                <motion.div
                                    animate={{ y: [0, -7, 0] }}
                                    transition={{
                                        duration: 2.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        delay: 1.1
                                    }}
                                    className="rounded-2xl px-5 py-4 shadow-2xl"
                                    style={{
                                        background: 'rgba(255,255,255,0.97)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                    }}
                                >
                                    <p className="text-[10px] font-semibold tracking-widest text-[#888] uppercase">
                                        — UP TO
                                    </p>
                                    <p
                                        className="text-[2.2rem] leading-none font-black text-[#0a0a0a]"
                                        style={{ fontFamily: "'Sora', sans-serif" }}
                                    >
                                        {statPct}
                                    </p>
                                    <p className="mt-0.5 text-xs font-medium whitespace-pre-line text-[#555]">
                                        {statLabel}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
