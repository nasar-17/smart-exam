import { Head, router } from '@inertiajs/react';
import { Calendar as CalendarIcon, CalendarDays, Clock, Mail, PhoneCall, School, Search, Trash2, User, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate, formatTime } from '@/lib/formatters';

type Appointment = {
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    institution: string;
    scheduled_at: string;
    created_at: string;
};

type Props = {
    appointments: Appointment[];
};

function getWaNumber(raw: string): string {
    // Hapus semua karakter non-digit
    let num = raw.replace(/[^0-9]/g, '');
    // Jika diawali 0, ganti dengan kode negara Indonesia (62)
    if (num.startsWith('0')) {
        num = '62' + num.slice(1);
    }
    return num;
}

function getWaUrl(appointment: Appointment): string {
    const number = getWaNumber(appointment.whatsapp);
    const message = encodeURIComponent(
        `halo kak ${appointment.name} dari ${appointment.institution} kami lihat kakak mendaftar untuk aplikasi smart exam kami, ada yang bisa dibantu?`
    );
    return `https://wa.me/${number}?text=${message}`;
}

export default function Appointments({ appointments }: Props) {
    const [selected, setSelected] = useState<Appointment | null>(null);
    const [search, setSearch] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const filtered = useMemo(() => {
        // Urut dari terbaru ke terlama berdasarkan created_at
        const sorted = [...appointments].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        return sorted.filter((a) => {
            // Filter teks
            if (search.trim()) {
                const q = search.toLowerCase();
                if (
                    !a.name.toLowerCase().includes(q) &&
                    !a.institution.toLowerCase().includes(q) &&
                    !a.email.toLowerCase().includes(q) &&
                    !a.whatsapp.includes(q)
                ) return false;
            }

            // Filter tanggal mulai
            if (dateFrom) {
                const from = new Date(dateFrom);
                from.setHours(0, 0, 0, 0);
                const created = new Date(a.created_at);
                if (created < from) return false;
            }

            // Filter tanggal selesai
            if (dateTo) {
                const to = new Date(dateTo);
                to.setHours(23, 59, 59, 999);
                const created = new Date(a.created_at);
                if (created > to) return false;
            }

            return true;
        });
    }, [appointments, search, dateFrom, dateTo]);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal pendaftaran demo ini?')) {
            router.delete(`/admin/appointments/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Jadwal demo berhasil dihapus');
                    if (selected?.id === id) setSelected(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus jadwal demo');
                },
            });
        }
    };

    return (
        <div className="p-6">
            <Head title="Daftar Pengajuan Demo" />

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
                    Daftar Pengajuan Demo Aplikasi
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                    Berikut adalah daftar institusi yang telah menjadwalkan demo aplikasi Smart Exam.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama, institusi, email, atau WA..."
                        className="h-11 w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 pl-10 text-sm"
                    />
                </div>
                <div className="flex items-end gap-3">
                    <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">Dari</Label>
                        <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 pl-10 pr-3 text-sm text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">Sampai</Label>
                        <div className="relative">
                            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 pl-10 pr-3 text-sm text-slate-700 dark:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    {(dateFrom || dateTo || search) && (
                        <button
                            type="button"
                            onClick={() => { setSearch(''); setDateFrom(''); setDateTo(''); }}
                            className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-4 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-all"
                        >
                            Reset
                        </button>
                    )}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#151d2a] rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center">
                    <CalendarIcon className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {appointments.length === 0 ? 'Belum ada pengajuan demo' : 'Tidak ditemukan'}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {appointments.length === 0
                            ? 'Data akan otomatis bertambah saat pengguna mendaftar melalui landing page.'
                            : 'Coba gunakan kata kunci lain untuk mencari.'}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((appointment) => (
                        <button
                            type="button"
                            key={appointment.id}
                            onClick={() => setSelected(appointment)}
                            className="bg-white dark:bg-[#151d2a] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/60 transition-all text-left w-full relative group"
                        >
                            {/* Delete button */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(appointment.id);
                                }}
                                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-rose-400 hover:text-rose-600 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-all opacity-0 group-hover:opacity-100 border border-rose-100/50 dark:border-rose-950/20"
                                title="Hapus"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100/50 dark:ring-blue-900/30">
                                    <School className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                                        {appointment.institution}
                                    </h3>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate block">
                                        {appointment.name}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                                <span>{formatDate(appointment.scheduled_at)}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-[#151d2a] border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
                    {selected && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                        <School className="h-5 w-5" />
                                    </div>
                                    {selected.institution}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 py-2">
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{selected.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Nama Pendaftar</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                                    <div>
                                        <a href={`mailto:${selected.email}`} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                            {selected.email}
                                        </a>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <PhoneCall className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                                    <div>
                                        <a
                                            href={`https://wa.me/${getWaNumber(selected.whatsapp)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            {selected.whatsapp}
                                        </a>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">WhatsApp</p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100/50 dark:border-slate-800/40 p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span>{formatDate(selected.scheduled_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <Clock className="h-4 w-4 text-blue-600/70" />
                                        <span>{formatTime(selected.scheduled_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex justify-between gap-3 sm:gap-0">
                                <Button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    variant="ghost"
                                    className="rounded-xl font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                >
                                    <X className="h-4 w-4 mr-1.5" />
                                    Tutup
                                </Button>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => handleDelete(selected.id)}
                                        variant="ghost"
                                        className="rounded-xl font-semibold text-rose-500 hover:text-rose-400 hover:bg-rose-950/20"
                                    >
                                        <Trash2 className="h-4 w-4 mr-1.5" />
                                        Hapus
                                    </Button>
                                    <a
                                        href={getWaUrl(selected)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        Hubungi
                                    </a>
                                </div>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

Appointments.layout = (page: React.ReactNode) => (
    <AdminLayout title="Appointment Demo">{page}</AdminLayout>
);
