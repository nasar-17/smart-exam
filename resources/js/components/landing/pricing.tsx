import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing({ data }: { data?: any }) {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section
            id="pricing"
            className="py-24"
            style={{ background: '#0d1117' }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"
                        style={{
                            background: 'rgba(96, 165, 250, 0.1)',
                            color: '#60a5fa',
                            border: '1px solid rgba(96, 165, 250, 0.2)',
                        }}
                    >
                        Harga
                    </div>
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Transparan,{' '}
                        <span className="gradient-text">
                            Tanpa Biaya Tersembunyi
                        </span>
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-base text-gray-400">
                        Pilih paket terbaik yang sesuai dengan skala institusi
                        Anda. Mulai secara gratis dan tingkatkan kapan saja.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <span className="text-sm font-medium text-gray-400">
                            Bulanan
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative h-6 w-12 rounded-full transition-all duration-300"
                            style={{ background: '#2563EB' }}
                        >
                            <div
                                className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-250"
                                style={{
                                    transform: isYearly
                                        ? 'translateX(24px)'
                                        : 'translateX(0)',
                                }}
                            />
                        </button>
                        <span className="text-sm font-medium text-gray-400">
                            Tahunan
                            <span
                                className="ml-1.5 rounded-full px-2 py-0.5 text-xs font-bold"
                                style={{
                                    background: 'rgba(16, 185, 129, 0.15)',
                                    color: '#34d399',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                }}
                            >
                                Hemat 20%
                            </span>
                        </span>
                    </div>
                </motion.div>

                <div
                    className={`grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 ${isYearly ? 'show-yearly' : ''}`}
                    id="pricing-cards"
                >
                    {/* Starter */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="pricing-card flex flex-col justify-between rounded-2xl p-8 transition-all duration-300"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <div>
                            <div className="mb-6">
                                <div className="mb-2 text-sm font-semibold text-gray-400">
                                    Starter
                                </div>
                                <div
                                    className="mb-1 text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    <span className="monthly-price">Rp 0</span>
                                    <span className="yearly-price">Rp 0</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    per bulan, gratis selamanya
                                </div>
                            </div>
                            <FeatureList
                                items={[
                                    {
                                        text: 'Hingga 50 peserta',
                                        included: true,
                                    },
                                    {
                                        text: 'Maks. 5 ujian/bulan',
                                        included: true,
                                    },
                                    {
                                        text: 'Bank soal 100 soal',
                                        included: true,
                                    },
                                    { text: 'Laporan dasar', included: true },
                                    {
                                        text: 'Priority support',
                                        included: false,
                                    },
                                    {
                                        text: 'Custom branding',
                                        included: false,
                                    },
                                ]}
                            />
                        </div>
                        <a
                            href="#contact"
                            className="btn-outline-landing block w-full rounded-xl border py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            Mulai Gratis
                        </a>
                    </motion.div>

                    {/* Professional */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="pricing-card relative flex scale-100 flex-col justify-between rounded-2xl p-8 shadow-2xl transition-all duration-300 md:scale-105"
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)',
                            border: '2px solid rgba(37, 99, 235, 0.5)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
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
                        <div>
                            <div className="mb-6">
                                <div className="mb-2 text-sm font-semibold text-blue-400">
                                    Profesional
                                </div>
                                <div
                                    className="mb-1 text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    {isYearly ? (
                                        <span className="yearly-price">
                                            Rp 239K
                                        </span>
                                    ) : (
                                        <span className="monthly-price">
                                            Rp 299K
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {isYearly ? (
                                        <span className="yearly-price">
                                            per bulan, tagih tahunan
                                        </span>
                                    ) : (
                                        <span className="monthly-price">
                                            per bulan
                                        </span>
                                    )}
                                </div>
                            </div>
                            <FeatureList
                                dark
                                items={[
                                    {
                                        text: 'Peserta tak terbatas',
                                        included: true,
                                    },
                                    {
                                        text: 'Ujian tak terbatas',
                                        included: true,
                                    },
                                    {
                                        text: 'Bank soal unlimited',
                                        included: true,
                                    },
                                    {
                                        text: 'Laporan lanjutan + export',
                                        included: true,
                                    },
                                    {
                                        text: 'Priority support 24/7',
                                        included: true,
                                    },
                                    { text: 'Custom branding', included: true },
                                ]}
                            />
                        </div>
                        <div>
                            <a
                                href="#contact"
                                className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-all duration-300 hover:brightness-110"
                                style={{
                                    background: '#2563EB',
                                    boxShadow:
                                        '0 4px 14px 0 rgba(37,99,235,0.4)',
                                }}
                            >
                                Pilih Profesional
                            </a>
                            <p className="mt-3 text-center text-xs text-gray-500">
                                Free trial 14 hari &middot; Tanpa kartu kredit
                            </p>
                        </div>
                    </motion.div>

                    {/* Enterprise */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="pricing-card flex flex-col justify-between rounded-2xl p-8 transition-all duration-300"
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <div>
                            <div className="mb-6">
                                <div className="mb-2 text-sm font-semibold text-gray-400">
                                    Enterprise
                                </div>
                                <div
                                    className="mb-1 text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    Custom
                                </div>
                                <div className="text-sm text-gray-500">
                                    harga sesuai kebutuhan
                                </div>
                            </div>
                            <FeatureList
                                items={[
                                    { text: 'Semua fitur Pro', included: true },
                                    {
                                        text: 'Dedicated server',
                                        included: true,
                                    },
                                    {
                                        text: 'SLA 99.9% uptime',
                                        included: true,
                                    },
                                    {
                                        text: 'Integrasi SSO/LDAP',
                                        included: true,
                                    },
                                    {
                                        text: 'Onboarding & training',
                                        included: true,
                                    },
                                    {
                                        text: 'Account manager khusus',
                                        included: true,
                                    },
                                ]}
                                checkColor="#60a5fa"
                            />
                        </div>
                        <a
                            href="#contact"
                            className="block w-full rounded-xl border py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            Hubungi Kami
                        </a>
                    </motion.div>
                </div>

                <p className="reveal mt-12 text-center text-xs text-gray-500">
                    Semua paket termasuk enkripsi data SSL, backup otomatis
                    harian, dan bebas iklan. Harga belum termasuk PPN 11%.
                </p>
            </div>
        </section>
    );
}

function FeatureList({
    items,
    dark,
    checkColor,
}: {
    items: { text: string; included: boolean }[];
    dark?: boolean;
    checkColor?: string;
}) {
    return (
        <div className="mb-8 space-y-3.5">
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`flex items-center gap-3 text-sm ${dark ? 'text-white/95' : 'text-gray-300'}`}
                    style={!item.included ? { color: '#6b7280' } : undefined}
                >
                    {item.included ? (
                        <Check
                            className="h-4 w-4 shrink-0"
                            style={{
                                color: dark
                                    ? '#60a5fa'
                                    : checkColor || '#60a5fa',
                            }}
                        />
                    ) : (
                        <X className="h-4 w-4 shrink-0 text-gray-600" />
                    )}
                    {item.text}
                </div>
            ))}
        </div>
    );
}
