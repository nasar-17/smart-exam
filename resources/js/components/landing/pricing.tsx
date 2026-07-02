import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function Pricing({ data }: { data?: any }) {
    const badge = data?.header_badge ?? 'Harga';
    const title = data?.header_title ?? 'Paket yang Sesuai untuk Setiap Institusi';
    const subtitle = data?.header_subtitle ?? 'Mulai gratis, upgrade kapan saja.';
    const plans = data?.plans ?? [];

    return (
        <section
            id="pricing"
            className="py-24"
            style={{ background: 'var(--lp-bg-primary)' }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >

                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight"
                        data-preview-field="header_title"
                        style={{ fontFamily: "'Sora', sans-serif", color: 'var(--lp-text-primary)' }}
                    >
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-base" data-preview-field="header_subtitle" style={{ color: 'var(--lp-text-secondary)' }}>
                        {subtitle}
                    </p>
                </motion.div>

                <div
                    className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3"
                    id="pricing-cards"
                >
                    {plans.map((plan: any, idx: number) => {
                        const isFeatured = plan.featured === true || plan.featured === 'true';

                        return (
                            <motion.div
                                key={plan.id || idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                whileTap={{ scale: 0.99 }}
                                className={`pricing-card group flex flex-col justify-between rounded-2xl p-8 transition-[box-shadow,border-color,background-color,transform] duration-300 focus-within:ring-2 focus-within:ring-blue-500/30 hover:border-blue-500/70 hover:shadow-[0_24px_60px_-28px_rgba(37,99,235,0.55)] ${isFeatured ? 'relative scale-100 shadow-2xl md:scale-105' : 'bg-white hover:bg-blue-50/40 dark:bg-[#151d2a] dark:hover:bg-[#1e2736]'}`}
                                style={{
                                    background: isFeatured
                                        ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)'
                                        : undefined,
                                    border: isFeatured
                                        ? '2px solid rgba(37, 99, 235, 0.5)'
                                        : '1px solid var(--lp-border-card)',
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                {isFeatured && (
                                    <div
                                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold tracking-wider whitespace-nowrap uppercase"
                                        style={{
                                            background: '#2563EB',
                                            color: '#fff',
                                            boxShadow: '0 0 15px rgba(37, 99, 235, 0.5)',
                                        }}
                                    >
                                        ⭐ PALING POPULER
                                    </div>
                                )}
                                <div>
                                    <div className="mb-6">
                                        <div className="mb-2 text-sm font-semibold" style={{ color: isFeatured ? 'var(--lp-blue-text)' : 'var(--lp-text-secondary)' }}>
                                            {plan.name}
                                        </div>
                                        <div
                                            className="mb-1 text-4xl font-bold"
                                            style={{ fontFamily: "'Sora', sans-serif", color: 'var(--lp-text-primary)' }}
                                        >
                                            {plan.price_monthly}
                                        </div>
                                        <div className="text-sm" style={{ color: 'var(--lp-text-muted)' }}>
                                            per bulan
                                        </div>
                                    </div>

                                    <div className="mb-6 rounded-xl border p-3.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-blue-500/35" style={{ background: isFeatured ? 'var(--lp-blue-light)' : 'var(--lp-card-highlight)', borderColor: isFeatured ? 'var(--lp-border)' : 'var(--lp-border-card)' }}>
                                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--lp-blue-text)' }}>Target Pengguna</div>
                                        <div className="text-sm font-bold mt-0.5" style={{ color: 'var(--lp-text-primary)' }}>{plan.description}</div>
                                    </div>

                                    <FeatureList
                                        items={(plan.features || []).map((f: string) => ({ text: f, included: true }))}
                                    />
                                </div>
                                <div>
                                    <a
                                        href="#contact"
                                        className={`block w-full rounded-xl py-3 text-center text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 active:scale-[0.98] ${isFeatured ? 'text-white hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_14px_30px_-18px_rgba(37,99,235,1)]' : 'border font-semibold text-[var(--lp-text-primary)] hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-300'}`}
                                        style={{
                                            background: isFeatured ? '#2563EB' : 'transparent',
                                            boxShadow: isFeatured ? '0 4px 14px 0 rgba(37,99,235,0.4)' : 'none',
                                            color: isFeatured ? '#fff' : undefined,
                                            borderColor: isFeatured ? 'transparent' : 'var(--lp-border-card)',
                                        }}
                                    >
                                        {plan.cta_text || 'Pilih Paket'}
                                    </a>
                                    {isFeatured && (
                                        <p className="mt-3 text-center text-xs" style={{ color: 'var(--lp-text-muted)' }}>
                                            Free trial &middot; Layanan onboarding dibantu
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <p className="reveal mt-12 text-center text-xs" style={{ color: 'var(--lp-text-muted)' }}>
                    Semua paket sudah termasuk enkripsi data SSL, backup otomatis, dan bebas iklan.
                </p>
            </div>
        </section>
    );
}

function FeatureList({
    items,
}: {
    items: { text: string; included: boolean }[];
}) {
    return (
        <div className="mb-8 space-y-3.5">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{
                        color: item.included
                            ? 'var(--lp-text-secondary)'
                            : 'var(--lp-text-muted)',
                    }}
                >
                    {item.included ? (
                        <Check
                            className="h-4 w-4 shrink-0"
                            style={{ color: 'var(--lp-blue-icon)' }}
                        />
                    ) : (
                        <X className="h-4 w-4 shrink-0" style={{ color: 'var(--lp-text-muted)' }} />
                    )}
                    {item.text}
                </div>
            ))}
        </div>
    );
}
