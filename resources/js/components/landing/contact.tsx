import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

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

    const title = data?.title ?? 'Ada Pertanyaan? Kami Siap Membantu';
    const subtitle = data?.subtitle ?? 'Isi form di bawah dan kami akan menghubungi Anda dalam 1x24 jam.';

    return (
        <section
            id="contact"
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
                        data-preview-field="title"
                        style={{ fontFamily: "'Sora', sans-serif", color: 'var(--lp-text-primary)' }}
                    >
                        {title}
                    </h2>
                    <p className="mx-auto max-w-2xl text-base" data-preview-field="subtitle" style={{ color: 'var(--lp-text-secondary)' }}>
                        {subtitle}
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
                            background: 'var(--lp-step-card-bg)',
                            border: '1px solid var(--lp-step-card-border)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--lp-text-secondary)' }}>
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
                                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background: 'var(--lp-step-card-bg)',
                                            borderColor: 'var(--lp-border)',
                                            color: 'var(--lp-text-primary)',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--lp-text-secondary)' }}>
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
                                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background: 'var(--lp-step-card-bg)',
                                            borderColor: 'var(--lp-border)',
                                            color: 'var(--lp-text-primary)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--lp-text-secondary)' }}>
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
                                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background: 'var(--lp-step-card-bg)',
                                            borderColor: 'var(--lp-border)',
                                            color: 'var(--lp-text-primary)',
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--lp-text-secondary)' }}>
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
                                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        style={{
                                            background: 'var(--lp-step-card-bg)',
                                            borderColor: 'var(--lp-border)',
                                            color: 'var(--lp-text-primary)',
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--lp-text-secondary)' }}>
                                    Pesan / Pertanyaan
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    placeholder="Ceritakan kebutuhan Anda..."
                                    className="w-full resize-none rounded-xl border px-4 py-3 text-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    style={{
                                        background: 'var(--lp-step-card-bg)',
                                        borderColor: 'var(--lp-border)',
                                        color: 'var(--lp-text-primary)',
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
                                icon: Mail, field: 'email',
                                label: 'Email',
                                value: data?.email ?? 'hello@smartexam.id',
                                href: data?.email ? `mailto:${data.email}` : 'mailto:hello@smartexam.id',
                            },
                            {
                                icon: MessageCircle, field: 'whatsapp',
                                label: 'WhatsApp',
                                value: data?.whatsapp ?? '+62 812-xxxx-xxxx',
                                href: data?.whatsapp ? `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}` : '#',
                            },
                            {
                                icon: MapPin, field: 'address',
                                label: 'Alamat',
                                value: data?.address ?? 'Jl. A.P. Pettarani, Makassar,\nSulawesi Selatan',
                            },
                            {
                                icon: Clock, field: 'hours',
                                label: 'Jam Operasional',
                                value: data?.hours ?? 'Senin\u2013Jumat, 08.00\u201317.00 WITA',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex items-start gap-4 rounded-xl p-4 transition-all duration-300"
                                data-preview-field={item.field}
                                style={{
                                    background: 'var(--lp-step-card-bg)',
                                    border: '1px solid var(--lp-border-subtle)',
                                }}
                            >
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                        background: 'var(--lp-blue-light)',
                                    }}
                                >
                                    <item.icon
                                        className="h-[18px] w-[18px]"
                                        style={{ color: 'var(--lp-blue-icon)' }}
                                    />
                                </div>
                                <div>
                                    <div className="mb-1 text-sm font-semibold" style={{ color: 'var(--lp-text-primary)' }}>
                                        {item.label}
                                    </div>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-sm font-medium hover:underline"
                                            style={{ color: 'var(--lp-blue-text)' }}
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm whitespace-pre-line" style={{ color: 'var(--lp-text-secondary)' }}>
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
