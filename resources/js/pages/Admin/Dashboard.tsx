import { Head, Link } from '@inertiajs/react';
import { CalendarClock, CalendarDays, Clock3, Mail, School, TrendingUp, UserCheck, UsersRound } from 'lucide-react';
import { formatDateShort } from '@/lib/formatters';

type Stats = {
    totalAppointments: number;
    unreadAppointments: number;
    todayAppointments: number;
    scheduledAppointments: number;
};

type ChartItem = {
    label: string;
    total: number;
};

type Appointment = {
    id: number;
    name: string;
    email: string;
    institution: string;
    scheduled_at: string;
    created_at: string;
};

type Props = {
    stats: Stats;
    chartData: ChartItem[];
    latestAppointments: Appointment[];
};

export default function Dashboard({ stats, chartData, latestAppointments }: Props) {
    const maxValue = Math.max(...chartData.map((item) => item.total), 1);

    const cards = [
        {
            label: 'Total Pendaftar',
            value: stats.totalAppointments,
            icon: UsersRound,
            iconClass: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
            desc: 'Semua data appointment demo',
        },
        {
            label: 'Pendaftar Hari Ini',
            value: stats.todayAppointments,
            icon: UserCheck,
            iconClass: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
            desc: 'Masuk dalam 24 jam terakhir',
        },
        {
            label: 'Belum Dibaca',
            value: stats.unreadAppointments,
            icon: Mail,
            iconClass: 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400',
            desc: 'Perlu ditindaklanjuti admin',
        },
        {
            label: 'Jadwal Mendatang',
            value: stats.scheduledAppointments,
            icon: CalendarClock,
            iconClass: 'bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400',
            desc: 'Appointment yang belum lewat',
        },
    ];

    return (
        <div className="p-6">
            <Head title="Admin Dashboard" />

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <span className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wide text-blue-600 uppercase dark:bg-blue-950/30 dark:text-blue-400">
                        Analytics Overview
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Dashboard Appointment</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Ringkasan pendaftar demo aplikasi dan tren appointment Smart Exam.
                    </p>
                </div>

                <Link
                    href="/admin/appointments"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.8)] transition hover:bg-blue-700"
                >
                    <CalendarDays className="h-4 w-4" />
                    Lihat Appointment
                </Link>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-[#151d2a]"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.iconClass}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <TrendingUp className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                            </div>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{card.label}</p>
                            <div className="mt-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{card.value}</div>
                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{card.desc}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#151d2a]">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Tren Pendaftar 7 Hari</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Jumlah appointment berdasarkan tanggal daftar.</p>
                        </div>
                    </div>

                    <div className="flex h-72 items-end gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/35">
                        {chartData.map((item) => {
                            const height = Math.max((item.total / maxValue) * 100, item.total > 0 ? 12 : 4);

                            return (
                                <div key={item.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.total}</div>
                                    <div className="flex h-full w-full items-end justify-center">
                                        <div
                                            className="w-full max-w-12 rounded-t-2xl bg-gradient-to-t from-blue-600 to-sky-400 shadow-[0_12px_24px_-14px_rgba(37,99,235,0.9)] transition-all hover:from-blue-700 hover:to-sky-500"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{item.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#151d2a]">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">Appointment Terbaru</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">5 pendaftar terakhir.</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {latestAppointments.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
                                <CalendarDays className="mx-auto mb-3 h-8 w-8 text-slate-300 dark:text-slate-700" />
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Belum ada appointment</p>
                            </div>
                        ) : (
                            latestAppointments.map((appointment) => (
                                <div key={appointment.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800/80">
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                                            <School className="h-4.5 w-4.5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">{appointment.institution}</p>
                                            <p className="truncate text-xs text-slate-400 dark:text-slate-500">{appointment.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <Clock3 className="h-3.5 w-3.5" />
                                        {formatDateShort(appointment.scheduled_at)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
