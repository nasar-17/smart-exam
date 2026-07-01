import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, Lock, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function CTA({ data }: { data?: any }) {
    const title = data?.title ?? 'Siap Membawa Ujian di Institusimu ke Level Berikutnya?';
    const subtitle = data?.subtitle ?? 'Bergabunglah bersama 500+ institusi pendidikan yang sudah mempercayakan ujian digital mereka ke Smart Exam.';
    const badge1 = data?.badge_1 ?? 'Data Aman & Terenkripsi';
    const badge2 = data?.badge_2 ?? 'Setup 3 Menit';
    const badge3 = data?.badge_3 ?? 'Gratis 14 Hari Tanpa Syarat';

    const [modalOpen, setModalOpen] = useState(false);

    const { data: formData, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        whatsapp: '',
        institution: '',
        scheduled_at: '',
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/appointments', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Jadwal demo berhasil diajukan. Kami akan segera menghubungi Anda.');
                reset();
                setModalOpen(false);
            },
            onError: () => {
                toast.error('Mohon periksa kembali form pengajuan Anda.');
            }
        });
    };

    const handleAutofill = () => {
        const randomNames = ['Ahmad', 'Siti', 'Budi', 'Rina', 'Andi', 'Dewi', 'Joko', 'Lia', 'Rian', 'Eka'];
        const randomLastNames = ['Pratama', 'Wulandari', 'Hidayat', 'Lestari', 'Saputra', 'Sari', 'Kurniawan', 'Fitriani', 'Setiawan', 'Utami'];
        const randomInstitutions = ['SMA Negeri 1 Jakarta', 'SMP Nusantara', 'Universitas Indonesia', 'SD Mentari', 'SMA Harapan Bangsa', 'Institut Teknologi Bandung', 'SMK Binakarya', 'Global School'];
        
        const name = `${randomNames[Math.floor(Math.random() * randomNames.length)]} ${randomLastNames[Math.floor(Math.random() * randomLastNames.length)]}`;
        const email = `${name.toLowerCase().replace(/\s+/g, '')}${Math.floor(Math.random() * 100)}@example.com`;
        const whatsapp = '08' + Math.floor(100000000 + Math.random() * 900000000).toString();
        const institution = randomInstitutions[Math.floor(Math.random() * randomInstitutions.length)];
        
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 14) + 1);
        futureDate.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);
        
        const scheduled_at = futureDate.toISOString().slice(0, 16);
        
        setData({
            name,
            email,
            whatsapp,
            institution,
            scheduled_at,
        });
    };

    return (
        <section
            id="cta"
            className="relative overflow-hidden py-28"
            style={{ background: 'var(--lp-bg-primary)' }}
        >
            {/* Ambient background glows */}
            <div
                className="absolute top-1/2 left-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
                style={{
                    background:
                        'radial-gradient(circle, #2563EB 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1000px] px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl p-10 text-center md:p-16"
                    style={{
                        background: 'var(--lp-step-card-bg)',
                        border: '1px solid var(--lp-border-card)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    {/* Inner glowing accent */}
                    <div
                        className="absolute -top-32 -left-32 h-64 w-64 rounded-full opacity-10"
                        style={{
                            background:
                                'radial-gradient(circle, #60a5fa, transparent 70%)',
                        }}
                    />
                    <div
                        className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full opacity-10"
                        style={{
                            background:
                                'radial-gradient(circle, #2563EB, transparent 70%)',
                        }}
                    />

                    <h2
                        className="mb-5 text-[38px] leading-tight font-bold tracking-tight md:text-[50px]"
                        data-preview-field="title"
                        style={{ color: 'var(--lp-text-primary)', fontFamily: "'Sora', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <p className="mx-auto mb-10 max-w-2xl text-lg" data-preview-field="subtitle" style={{ color: 'var(--lp-text-secondary)' }}>
                        {subtitle}
                    </p>
                    <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:brightness-110 shadow-lg"
                            style={{
                                background: '#2563EB',
                                boxShadow: '0 4px 14px 0 rgba(37,99,235,0.4)',
                            }}
                        >
                            <Calendar className="h-[18px] w-[18px]" />
                            Jadwalkan Demo
                        </button>
                    </div>
                    <div
                        className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t pt-8"
                        style={{ borderColor: 'var(--lp-border-subtle)' }}
                    >
                        {[
                            { icon: Lock, text: badge1, field: 'badge_1' },
                            { icon: Zap, text: badge2, field: 'badge_2' },
                            {
                                icon: CreditCard,
                                text: badge3,
                                field: 'badge_3',
                            },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                data-preview-field={badge.field}
                                className="flex items-center gap-2 text-xs" style={{ color: 'var(--lp-text-muted)' }}
                            >
                                <badge.icon className="h-3.5 w-3.5" style={{ color: 'var(--lp-blue-icon)' }} />
                                {badge.text}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <Dialog open={modalOpen} onOpenChange={(open) => {
                if (!open) {
                    setModalOpen(false);
                }
            }}>
                <DialogContent className="max-w-[640px] rounded-[1.65rem] border border-slate-200 bg-white p-7 text-slate-800 shadow-[0_28px_90px_-32px_rgba(15,23,42,0.45)] dark:border-slate-800 dark:bg-[#151d2a] dark:text-slate-100 sm:p-8">
                    <DialogHeader className="space-y-1.5">
                        <DialogTitle className="text-[1.65rem] font-extrabold tracking-tight text-slate-800 dark:text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                            Jadwalkan Demo Aplikasi
                        </DialogTitle>
                        <p className="max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Isi data singkat di bawah ini. Tim kami akan menghubungi Anda untuk mengatur sesi demo.
                        </p>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                                Nama lengkap
                            </label>
                            <Input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-base text-slate-800 ring-1 ring-slate-200/70 transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:bg-[#1e293b] dark:text-slate-100 dark:ring-slate-700/60"
                                placeholder="Contoh: Budi Santoso"
                            />
                            {errors.name && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                                Email
                            </label>
                            <Input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-base text-slate-800 ring-1 ring-slate-200/70 transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:bg-[#1e293b] dark:text-slate-100 dark:ring-slate-700/60"
                                placeholder="budi@sekolah.sch.id"
                            />
                            {errors.email && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                                WhatsApp
                            </label>
                            <Input
                                type="text"
                                required
                                value={formData.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                className="h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-base text-slate-800 ring-1 ring-slate-200/70 transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:bg-[#1e293b] dark:text-slate-100 dark:ring-slate-700/60"
                                placeholder="08123456789"
                            />
                            {errors.whatsapp && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.whatsapp}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                                Nama institusi / sekolah / perusahaan
                            </label>
                            <Input
                                type="text"
                                required
                                value={formData.institution}
                                onChange={(e) => setData('institution', e.target.value)}
                                className="h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-base text-slate-800 ring-1 ring-slate-200/70 transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:bg-[#1e293b] dark:text-slate-100 dark:ring-slate-700/60"
                                placeholder="Contoh: SMA Negeri 1 Makassar"
                            />
                            {errors.institution && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.institution}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                                Rencana tanggal & waktu uji coba
                            </label>
                            <Input
                                type="datetime-local"
                                required
                                value={formData.scheduled_at}
                                onChange={(e) => setData('scheduled_at', e.target.value)}
                                className="h-12 w-full rounded-2xl border-0 bg-slate-50 px-4 text-base text-slate-700 ring-1 ring-slate-200/70 transition focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:bg-[#1e293b] dark:text-slate-100 dark:ring-slate-700/60"
                            />
                            {errors.scheduled_at && <p className="mt-1.5 text-xs font-semibold text-rose-500">{errors.scheduled_at}</p>}
                        </div>

                        <DialogFooter className="mt-6 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800/80 sm:justify-end">
                            <Button
                                type="button"
                                onClick={handleAutofill}
                                className="h-11 rounded-2xl bg-emerald-600 px-6 font-bold text-white shadow-[0_12px_24px_-16px_rgba(5,150,105,0.9)] transition hover:bg-emerald-700 active:scale-[0.98]"
                            >
                                Isi otomatis
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-11 rounded-2xl bg-blue-600 px-6 font-bold text-white shadow-[0_12px_24px_-16px_rgba(37,99,235,0.9)] transition hover:bg-blue-700 active:scale-[0.98]"
                            >
                                Kirim pengajuan
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setModalOpen(false)}
                                className="h-11 rounded-2xl px-5 font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98] dark:hover:bg-slate-800"
                            >
                                Batal
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
