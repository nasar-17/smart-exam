import { Head, router } from '@inertiajs/react';
import { Trash2, Calendar as CalendarIcon, Clock, Mail, PhoneCall, School, User } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';

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

export default function Appointments({ appointments }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal pendaftaran demo ini?')) {
            router.delete(`/admin/appointments/${id}`, {
                onSuccess: () => {
                    toast.success('Jadwal demo berhasil dihapus');
                },
                onError: () => {
                    toast.error('Gagal menghapus jadwal demo');
                }
            });
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);

        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);

        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }) + ' WITA';
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

            {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#151d2a] rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm text-center">
                    <CalendarIcon className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Belum ada pengajuan demo</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Data akan otomatis bertambah saat pengguna mendaftar melalui landing page.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-white dark:bg-[#151d2a] border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
                        >
                            <div>
                                {/* Header / Institution */}
                                <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-slate-100/80 dark:border-slate-800/60 pr-8">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100/50 dark:ring-blue-900/30">
                                        <School className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                                            {appointment.institution}
                                        </h3>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                            Nama Institusi
                                        </span>
                                    </div>
                                </div>

                                {/* Body / User Data */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2.5 text-xs text-slate-650 dark:text-slate-350">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="font-medium truncate">{appointment.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2.5 text-xs text-slate-650 dark:text-slate-350">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        <a href={`mailto:${appointment.email}`} className="hover:text-blue-600 dark:hover:text-blue-450 transition-colors truncate">
                                            {appointment.email}
                                        </a>
                                    </div>
                                    
                                    <div className="flex items-center gap-2.5 text-xs text-slate-650 dark:text-slate-350">
                                        <PhoneCall className="h-4 w-4 text-slate-400" />
                                        <a 
                                            href={`https://wa.me/${appointment.whatsapp.replace(/[^0-9]/g, '')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="hover:text-blue-600 dark:hover:text-blue-450 transition-colors truncate"
                                        >
                                            {appointment.whatsapp}
                                        </a>
                                    </div>

                                    {/* Scheduled Date */}
                                    <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100/50 dark:border-slate-800/40 space-y-1.5">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-450" />
                                            <span>{formatDate(appointment.scheduled_at)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-450">
                                            <Clock className="h-4 w-4 text-blue-600/70" />
                                            <span>{formatTime(appointment.scheduled_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action overlay top right */}
                            <button
                                type="button"
                                onClick={() => handleDelete(appointment.id)}
                                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 transition-all border border-rose-100/50 dark:border-rose-950/20"
                                title="Hapus Pengajuan"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Appointments.layout = (page: React.ReactNode) => (
    <AdminLayout title="Appointment Demo">{page}</AdminLayout>
);
