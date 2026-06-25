import { motion } from 'framer-motion';

export default function Stats({ data }: { data?: any }) {
    const defaults = [
        { target: '500', suffix: '+', label: 'Sekolah & Institusi' },
        { target: '1', suffix: ' Juta+', label: 'Ujian Diselenggarakan' },
        { target: '98', suffix: '%', label: 'Tingkat Kepuasan' },
        { target: '3', suffix: ' Menit', label: 'Setup Pertama' },
    ];
    const stats = data
        ? [1, 2, 3, 4].map((i) => ({
              target: data[`stat_${i}_value`] || defaults[i - 1].target,
              suffix: data[`stat_${i}_suffix`] || defaults[i - 1].suffix,
              label: data[`stat_${i}_label`] || defaults[i - 1].label,
          }))
        : defaults;

    return (
        <section id="stats" className="relative py-12 overflow-hidden" style={{ background: 'var(--lp-bg-secondary)' }}>
            {/* Subtle blue glow */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)',
                }}
            />
            <div className="relative z-10 mx-auto max-w-[1200px] px-6">
                <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-0">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`flex flex-col items-center py-4 text-center md:border-r md:last:border-r-0`}
                            style={{ borderColor: 'var(--lp-border-subtle)' }}
                        >
                            <div
                                className="stat-num mb-1 text-4xl font-bold tracking-tight"
                                data-target={stat.target}
                                data-suffix={stat.suffix}
                                style={{ fontFamily: "'Sora', sans-serif", color: 'var(--lp-blue-text)' }}
                            >
                                0{stat.suffix}
                            </div>
                            <div className="text-sm px-4" style={{ color: 'var(--lp-text-muted)' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
