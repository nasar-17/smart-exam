import { Lock, Zap, CreditCard, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
                toast.success('Jadwal demo berhasil diajukan! Kami akan segera menghubungi Anda.');
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
                        style={{ color: 'var(--lp-text-primary)', fontFamily: "'Sora', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <p className="mx-auto mb-10 max-w-2xl text-lg" style={{ color: 'var(--lp-text-secondary)' }}>
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
                            { icon: Lock, text: badge1 },
                            { icon: Zap, text: badge2 },
                            {
                                icon: CreditCard,
                                text: badge3,
                            },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 text-xs" style={{ color: 'var(--lp-text-muted)' }}
                            >
                                <badge.icon className="h-3.5 w-3.5" style={{ color: 'var(--lp-blue-icon)' }} />
                                {badge.text}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Appointment Submission Overlay Dialog */}
            <Dialog open={modalOpen} onOpenChange={(open) => { if (!open) setModalOpen(false); }}>
                <DialogContent className="max-w-md rounded-2xl bg-white dark:bg-[#151d2a] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 p-6 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
                            Jadwalkan Demo Aplikasi
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} className="space-y-4 my-2">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Nama Lengkap
                            </label>
                            <Input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-xl border-0 bg-slate-50 dark:bg-[#1e293b] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/40 ring-1 ring-slate-200/50 dark:ring-slate-700/50 h-auto"
                                placeholder="Contoh: Budi Santoso"
                            />
                            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Email
                            </label>
                            <Input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-xl border-0 bg-slate-50 dark:bg-[#1e293b] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/40 ring-1 ring-slate-200/50 dark:ring-slate-700/50 h-auto"
                                placeholder="budi@sekolah.sch.id"
                            />
                            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                WhatsApp
                            </label>
                            <Input
                                type="text"
                                required
                                value={formData.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                className="w-full rounded-xl border-0 bg-slate-50 dark:bg-[#1e293b] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/40 ring-1 ring-slate-200/50 dark:ring-slate-700/50 h-auto"
                                placeholder="08123456789"
                            />
                            {errors.whatsapp && <p className="text-xs text-rose-500 mt-1">{errors.whatsapp}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Nama Institusi / Sekolah / Perusahaan
                            </label>
                            <Input
                                type="text"
                                required
                                value={formData.institution}
                                onChange={(e) => setData('institution', e.target.value)}
                                className="w-full rounded-xl border-0 bg-slate-50 dark:bg-[#1e293b] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/40 ring-1 ring-slate-200/50 dark:ring-slate-700/50 h-auto"
                                placeholder="Contoh: SMA Negeri 1 Makassar"
                            />
                            {errors.institution && <p className="text-xs text-rose-500 mt-1">{errors.institution}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Rencana Tanggal & Waktu Uji Coba
                            </label>
                            <Input
                                type="datetime-local"
                                required
                                value={formData.scheduled_at}
                                onChange={(e) => setData('scheduled_at', e.target.value)}
                                className="w-full rounded-xl border-0 bg-slate-50 dark:bg-[#1e293b] px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/40 ring-1 ring-slate-200/50 dark:ring-slate-700/50 h-auto text-slate-700 dark:text-slate-200"
                            />
                            {errors.scheduled_at && <p className="text-xs text-rose-500 mt-1">{errors.scheduled_at}</p>}
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                            <Button
                                type="button"
                                onClick={handleAutofill}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold px-5"
                            >
                                Isi Otomatis
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-5"
                            >
                                Kirim Pengajuan
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setModalOpen(false)}
                                className="rounded-xl font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
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
