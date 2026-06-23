import { useForm } from '@inertiajs/react';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact({ data }: { data?: any }) {
    const {
        data: formData,
        setData,
        post,
        processing,
    } = useForm({
        name: '',
        email: '',
        institution: '',
        whatsapp: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <section
            id="contact"
            className="py-24"
            style={{ background: '#0d1117' }}
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
                            background: 'rgba(96, 165, 250, 0.1)',
                            color: '#60a5fa',
                            border: '1px solid rgba(96, 165, 250, 0.2)',
                        }}
                    >
                        Hubungi Kami
                    </div>
                    <h2
                        className="mb-4 text-[40px] font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                        Ada Pertanyaan?{' '}
                        <span className="gradient-text">
                            Kami Siap Membantu
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-base text-gray-400">
                        Punya pertanyaan mengenai fitur, integrasi, atau
                        kustomisasi? Hubungi tim kami untuk solusi terbaik.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-5">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl p-8 transition-all duration-300 md:col-span-3"
                        style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Masukkan nama Anda"
                                        className="w-full rounded-xl border px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background:
                                                'rgba(255, 255, 255, 0.03)',
                                            borderColor:
                                                'rgba(255, 255, 255, 0.1)',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="nama@institusi.ac.id"
                                        className="w-full rounded-xl border px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background:
                                                'rgba(255, 255, 255, 0.03)',
                                            borderColor:
                                                'rgba(255, 255, 255, 0.1)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                                        Nama Institusi
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.institution}
                                        onChange={(e) =>
                                            setData(
                                                'institution',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="SMA / Universitas / Lembaga"
                                        className="w-full rounded-xl border px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background:
                                                'rgba(255, 255, 255, 0.03)',
                                            borderColor:
                                                'rgba(255, 255, 255, 0.1)',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                                        Nomor WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.whatsapp}
                                        onChange={(e) =>
                                            setData('whatsapp', e.target.value)
                                        }
                                        placeholder="0812-xxxx-xxxx"
                                        className="w-full rounded-xl border px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background:
                                                'rgba(255, 255, 255, 0.03)',
                                            borderColor:
                                                'rgba(255, 255, 255, 0.1)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    Pesan / Pertanyaan
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    placeholder="Ceritakan kebutuhan Anda..."
                                    className="w-full resize-none rounded-xl border px-4 py-3 text-sm text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderColor: 'rgba(255, 255, 255, 0.1)',
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50"
                                style={{
                                    background: '#2563EB',
                                    boxShadow:
                                        '0 4px 14px 0 rgba(37,99,235,0.4)',
                                }}
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Column: Info blocks */}
                    <div className="space-y-6 md:col-span-2 md:pl-6">
                        {[
                            {
                                icon: Mail,
                                label: 'Email',
                                value: 'hello@smartexam.id',
                                href: 'mailto:hello@smartexam.id',
                            },
                            {
                                icon: MessageCircle,
                                label: 'WhatsApp',
                                value: '+62 812-xxxx-xxxx',
                                href: '#',
                            },
                            {
                                icon: MapPin,
                                label: 'Alamat',
                                value: 'Jl. A.P. Pettarani, Makassar,\nSulawesi Selatan',
                            },
                            {
                                icon: Clock,
                                label: 'Jam Operasional',
                                value: 'Senin\u2013Jumat, 08.00\u201317.00 WITA',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex items-start gap-4 rounded-xl p-4 transition-all duration-300"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                }}
                            >
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: 'rgba(37, 99, 235, 0.15)',
                                    }}
                                >
                                    <item.icon
                                        className="h-[18px] w-[18px]"
                                        style={{ color: '#60a5fa' }}
                                    />
                                </div>
                                <div>
                                    <div className="mb-1 text-sm font-semibold text-white">
                                        {item.label}
                                    </div>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-sm font-medium hover:underline"
                                            style={{ color: '#60a5fa' }}
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm whitespace-pre-line text-gray-400">
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
