import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing({ data }: { data?: any }) {
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
                        Harga Paket
                    </div>
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Pilihan Investasi{' '}
                        <span className="gradient-text">
                            Sesuai Skala Ujian
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-base text-gray-400">
                        Investasi transparan per sesi ujian untuk institusi Anda. Tanpa biaya langganan bulanan tersembunyi.
                    </p>
                </motion.div>

                <div
                    className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3"
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
                                    Rp 400.000
                                </div>
                                <div className="text-sm text-gray-500">
                                    per sesi ujian
                                </div>
                            </div>

                            {/* Target User */}
                            <div className="mb-6 rounded-xl bg-white/5 p-3.5 border border-white/10">
                                <div className="text-[10px] font-bold text-[#60a5fa] uppercase tracking-wider">Target Pengguna</div>
                                <div className="text-sm font-bold text-white/90 mt-0.5">Lembaga kursus, Organisasi</div>
                            </div>

                            <FeatureList
                                items={[
                                    {
                                        text: 'Maks. 100 peserta',
                                        included: true,
                                    },
                                    {
                                        text: 'Hingga 5.000 soal',
                                        included: true,
                                    },
                                    {
                                        text: 'Ujian dasar',
                                        included: true,
                                    },
                                    {
                                        text: 'Fitur anti-cheat',
                                        included: false,
                                    },
                                    {
                                        text: 'Integrasi LMS',
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
                            Pilih Starter
                        </a>
                    </motion.div>

                    {/* Standard */}
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
                                    Standard
                                </div>
                                <div
                                    className="mb-1 text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    Rp 750.000
                                </div>
                                <div className="text-sm text-gray-400">
                                    per sesi ujian
                                </div>
                            </div>

                            {/* Target User */}
                            <div className="mb-6 rounded-xl bg-blue-500/10 p-3.5 border border-blue-500/20">
                                <div className="text-[10px] font-bold text-[#60a5fa] uppercase tracking-wider">Target Pengguna</div>
                                <div className="text-sm font-bold text-blue-300 mt-0.5">Universitas / Lembaga Sertifikasi</div>
                            </div>

                            <FeatureList
                                dark
                                items={[
                                    {
                                        text: 'Maks. 500 peserta',
                                        included: true,
                                    },
                                    {
                                        text: 'Unlimited soal',
                                        included: true,
                                    },
                                    {
                                        text: 'Fitur anti-cheat',
                                        included: true,
                                    },
                                    {
                                        text: 'Laporan detail',
                                        included: true,
                                    },
                                    {
                                        text: 'Integrasi LMS',
                                        included: false,
                                    },
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
                                Pilih Standard
                            </a>
                            <p className="mt-3 text-center text-xs text-gray-500">
                                Free trial &middot; Layanan onboarding dibantu
                            </p>
                        </div>
                    </motion.div>

                    {/* Premium */}
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
                                    Premium
                                </div>
                                <div
                                    className="mb-1 text-4xl font-bold text-white"
                                    style={{ fontFamily: "'Sora', sans-serif" }}
                                >
                                    Rp 1.000.000
                                </div>
                                <div className="text-sm text-gray-500">
                                    per sesi ujian
                                </div>
                            </div>

                            {/* Target User */}
                            <div className="mb-6 rounded-xl bg-white/5 p-3.5 border border-white/10">
                                <div className="text-[10px] font-bold text-[#60a5fa] uppercase tracking-wider">Target Pengguna</div>
                                <div className="text-sm font-bold text-white/90 mt-0.5">Lembaga Pemerintah / Korporat</div>
                            </div>

                            <FeatureList
                                items={[
                                    {
                                        text: 'Unlimited peserta',
                                        included: true,
                                    },
                                    {
                                        text: 'Integrasi LMS',
                                        included: true,
                                    },
                                    {
                                        text: 'Question Bank',
                                        included: true,
                                    },
                                    {
                                        text: 'Analytics dashboard',
                                        included: true,
                                    },
                                    {
                                        text: 'Dedicated support',
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
                    Semua sesi sudah termasuk enkripsi data SSL, backup otomatis, dan bebas iklan.
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
