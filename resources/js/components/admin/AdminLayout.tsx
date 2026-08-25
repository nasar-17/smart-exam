import { Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    ExternalLink,
    LayoutDashboard,
    Layout,
    List,
    LogOut,
    Moon,
    Settings,
    Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { iconMap } from '@/lib/section-icons';

interface AdminLayoutProps {
    title?: string;
}

export default function AdminLayout({
    children,
    title = 'Admin Panel',
}: PropsWithChildren<AdminLayoutProps>) {
    const { auth, adminSections, appointmentCount } = usePage().props;
    const { url } = usePage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [mounted, setMounted] = useState(false);

    // Auto-open sections dropdown if currently editing a section
    const currentPath = url.split('?')[0];
    const [isSectionsOpen, setIsSectionsOpen] = useState(() =>
        currentPath.includes('/admin/sections/'),
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    // Strip query parameters or trailing slashes for clean mapping
    const [localCount, setLocalCount] = useState(appointmentCount);

    useEffect(() => {
        setLocalCount(appointmentCount);
    }, [appointmentCount]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Echo) {
            window.Echo.channel('appointments').listen(
                '.appointment.created',
                (e: any) => {
                    console.log('Realtime Appointment Received:', e);
                    setLocalCount((prev) => prev + 1);
                    toast.success('Ada yang mendaftar demo baru!', {
                        description: `${e.appointment.name} (${e.appointment.institution})`,
                        position: 'bottom-right',
                    });
                },
            );

            return () => {
                window.Echo.leaveChannel('appointments');
            };
        }
    }, []);

    // Force clear locally when the user clicks the Appointment sidebar link
    const handleAppointmentClick = () => {
        setLocalCount(0);
    };

    return (
        <div className="flex h-screen w-screen gap-5 overflow-hidden bg-gradient-to-tr from-[#edf2f8] to-[#f4f7fa] p-5 font-sans transition-colors duration-300 dark:from-[#090d16] dark:to-[#111622]">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `,
                }}
            />

            {/* ── Sidebar ─────────────────────────────── */}
            <aside className="no-scrollbar flex w-66 shrink-0 flex-col overflow-y-auto rounded-3xl border border-slate-100 bg-white/90 shadow-[0_10px_40px_-6px_rgba(0,0,0,0.07)] backdrop-blur-lg dark:border-slate-800/80 dark:bg-[#151d2a]/90 dark:shadow-[0_10px_40px_-6px_rgba(0,0,0,0.35)]">
                {/* Logo */}
                <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/90 px-6 py-5 backdrop-blur-lg dark:border-slate-800/80 dark:bg-[#151d2a]/90">
                    <Link href="/admin" className="flex items-center gap-2.5">
                        <img
                            src="/Logo smart exam.png"
                            alt="Smart Exam"
                            className="h-8 w-auto"
                        />
                        <span
                            className="text-base font-bold text-slate-800 dark:text-slate-100"
                            style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                            Smart<span style={{ color: '#2563EB' }}>Exam</span>
                            <span className="block text-xs font-normal text-slate-400 dark:text-slate-500">
                                Admin Panel
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Dashboard */}
                <div className="px-3 pt-4 pb-1">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                            currentPath === '/admin'
                                ? 'border border-slate-100 bg-white text-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:border-slate-800 dark:bg-[#1e2736] dark:text-blue-400 dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)]'
                                : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                        }`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>

                {/* List Page */}
                <div className="px-3 py-1">
                    <Link
                        href="/admin/settings"
                        className={`flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                            currentPath === '/admin/settings'
                                ? 'border border-slate-100 bg-white text-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:border-slate-800 dark:bg-[#1e2736] dark:text-blue-400 dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)]'
                                : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                        }`}
                    >
                        <List className="h-4 w-4" />
                        List Page
                    </Link>
                </div>

                {/* Sections — collapsible dropdown */}
                <nav className="flex-1 space-y-1.5 px-3 py-1">
                    <button
                        type="button"
                        onClick={() => setIsSectionsOpen(!isSectionsOpen)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all hover:bg-slate-50/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                    >
                        <span className="flex items-center gap-2.5">
                            <Layout className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                            Sections
                        </span>
                        <svg
                            className={`h-4 w-4 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
                                isSectionsOpen ? 'rotate-90' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <div
                        className={`space-y-1 overflow-hidden transition-all duration-300 ${
                            isSectionsOpen
                                ? 'mt-1 max-h-[500px] pl-2 opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        {adminSections.map((item) => {
                            const Icon = iconMap[item.icon] ?? Layout;
                            const isActive =
                                currentPath.includes(
                                    `/admin/sections/${item.key}`,
                                ) ||
                                currentPath === `/admin/sections/${item.key}`;

                            return (
                                <Link
                                    key={item.key}
                                    href={`/admin/sections/${item.key}`}
                                    className={`flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm transition-all ${
                                        isActive
                                            ? 'border border-slate-100 bg-white font-semibold text-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:border-slate-800 dark:bg-[#1e2736] dark:text-blue-400 dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)]'
                                            : 'font-normal text-slate-500 hover:bg-slate-50/85 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-200'
                                    }`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Appointment */}
                <div className="px-3 pb-2">
                    <Link
                        href="/admin/appointments"
                        onClick={handleAppointmentClick}
                        className={`flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                            currentPath === '/admin/appointments'
                                ? 'border border-slate-100 bg-white text-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:border-slate-800 dark:bg-[#1e2736] dark:text-blue-400 dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)]'
                                : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                        }`}
                    >
                        <span className="flex items-center gap-2.5">
                            <Calendar className="h-4 w-4" />
                            Appointment
                        </span>
                        {localCount > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)]">
                                {localCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Settings */}
                <div className="px-3 pb-3">
                    <Link
                        href="/admin/settings-akun"
                        className={`flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                            currentPath === '/admin/settings-akun'
                                ? 'border border-slate-100 bg-white text-blue-600 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:border-slate-800 dark:bg-[#1e2736] dark:text-blue-400 dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)]'
                                : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                        }`}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </div>

                {/* User + Logout */}
                <div className="sticky bottom-0 z-10 border-t border-slate-100 bg-white/90 px-4 py-4 backdrop-blur-lg dark:border-slate-800/80 dark:bg-[#151d2a]/90">
                    <div className="mb-2.5 flex items-center gap-2.5 rounded-xl border border-slate-100/50 bg-slate-50/60 p-2.5 shadow-inner dark:border-slate-800/40 dark:bg-slate-900/60">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                            {auth?.user?.email?.[0]?.toUpperCase() ?? 'A'}
                        </div>
                        <span className="truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {auth?.user?.email ?? 'Admin'}
                        </span>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50/50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 dark:border-rose-950/30 dark:bg-rose-950/10 dark:text-rose-400 dark:hover:bg-rose-950/20"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────── */}
            <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
                {/* Top Bar */}
                <header
                    className={`mb-5 flex h-14 items-center justify-between rounded-2xl border border-slate-100 bg-white/90 px-6 shadow-[0_10px_40px_-6px_rgba(0,0,0,0.07)] backdrop-blur-lg transition-all duration-300 dark:border-slate-800/80 dark:bg-[#151d2a]/90 dark:shadow-[0_10px_40px_-6px_rgba(0,0,0,0.35)]`}
                >
                    <h1 className="text-base font-bold text-slate-800 dark:text-slate-100">
                        {title}
                    </h1>
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button */}
                        {mounted && (
                            <button
                                onClick={() =>
                                    updateAppearance(
                                        resolvedAppearance === 'dark'
                                            ? 'light'
                                            : 'dark',
                                    )
                                }
                                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                                    resolvedAppearance === 'dark'
                                        ? 'border-slate-700 text-slate-400 hover:bg-slate-800'
                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                }`}
                                aria-label="Toggle theme"
                            >
                                {resolvedAppearance === 'dark' ? (
                                    <Sun className="h-4 w-4 text-amber-500" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </button>
                        )}
                        <a
                            href="/"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition hover:brightness-115"
                            style={{ borderColor: '#2563EB', color: '#2563EB' }}
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Lihat Landing Page
                        </a>
                    </div>
                </header>

                {/* Page Content */}
                <main className="no-scrollbar flex-1 overflow-y-auto rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] backdrop-blur-lg transition-all duration-300 dark:border-slate-800/80 dark:bg-[#151d2a]/90 dark:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)]">
                    {children}
                </main>
            </div>
        </div>
    );
}
