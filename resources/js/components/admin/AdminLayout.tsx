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
import { useEffect, useState  } from 'react';
import type {PropsWithChildren} from 'react';
import { toast } from 'sonner';
import { useAppearance } from '@/hooks/use-appearance';
import { iconMap } from '@/lib/section-icons';

interface AdminLayoutProps {
    title?: string;
}

export default function AdminLayout({ children, title = 'Admin Panel' }: PropsWithChildren<AdminLayoutProps>) {
    const { auth, adminSections, appointmentCount } = usePage().props;
    const { url } = usePage();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [mounted, setMounted] = useState(false);
    
    // Auto-open sections dropdown if currently editing a section
    const currentPath = url.split('?')[0];
    const [isSectionsOpen, setIsSectionsOpen] = useState(() => currentPath.includes('/admin/sections/'));
    
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
            window.Echo.channel('appointments')
                .listen('.appointment.created', (e: any) => {
                    console.log('Realtime Appointment Received:', e);
                    setLocalCount((prev) => prev + 1);
                    toast.success('Ada yang mendaftar demo baru!', {
                        description: `${e.appointment.name} (${e.appointment.institution})`,
                        position: 'bottom-right',
                    });
                });

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
        <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-tr from-[#edf2f8] to-[#f4f7fa] dark:from-[#090d16] dark:to-[#111622] p-5 gap-5 transition-colors duration-300 font-sans">
            <style dangerouslySetInnerHTML={{__html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />

            {/* ── Sidebar ─────────────────────────────── */}
            <aside
                className="flex w-66 shrink-0 flex-col rounded-3xl bg-white/90 dark:bg-[#151d2a]/90 border border-slate-100 dark:border-slate-800/80 shadow-[0_10px_40px_-6px_rgba(0,0,0,0.07)] dark:shadow-[0_10px_40px_-6px_rgba(0,0,0,0.35)] backdrop-blur-lg overflow-y-auto no-scrollbar"
            >
                {/* Logo */}
                <div className="border-b border-slate-100 dark:border-slate-800/80 px-6 py-5 sticky top-0 z-10 bg-white/90 dark:bg-[#151d2a]/90 backdrop-blur-lg">
                    <Link href="/admin" className="flex items-center gap-2.5">
                        <img src="/Logo smart exam.png" alt="Smart Exam" className="h-8 w-auto" />
                        <span className="text-base font-bold text-slate-800 dark:text-slate-100" style={{ fontFamily: "'Sora', sans-serif" }}>
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
                                ? 'bg-white dark:bg-[#1e2736] text-blue-600 dark:text-blue-400 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
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
                                ? 'bg-white dark:bg-[#1e2736] text-blue-600 dark:text-blue-400 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                        }`}
                    >
                        <List className="h-4 w-4" />
                        List Page
                    </Link>
                </div>

                {/* Sections — collapsible dropdown */}
                <nav className="flex-1 px-3 py-1 space-y-1.5">
                    <button
                        type="button"
                        onClick={() => setIsSectionsOpen(!isSectionsOpen)}
                        className="flex w-full items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50 transition-all"
                    >
                        <span className="flex items-center gap-2.5">
                            <Layout className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                            Sections
                        </span>
                        <svg
                            className={`h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                                isSectionsOpen ? 'rotate-90' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div
                        className={`space-y-1 overflow-hidden transition-all duration-300 ${
                            isSectionsOpen ? 'max-h-[500px] opacity-100 mt-1 pl-2' : 'max-h-0 opacity-0'
                        }`}
                    >
                        {adminSections.map((item) => {
                            const Icon = iconMap[item.icon] ?? Layout;
                            const isActive = currentPath.includes(`/admin/sections/${item.key}`) || currentPath === `/admin/sections/${item.key}`;

                            return (
                                <Link
                                    key={item.key}
                                    href={`/admin/sections/${item.key}`}
                                    className={`flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm transition-all ${
                                        isActive
                                            ? 'bg-white dark:bg-[#1e2736] text-blue-600 dark:text-blue-400 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 font-semibold'
                                            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/85 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/40 font-normal'
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
                                ? 'bg-white dark:bg-[#1e2736] text-blue-600 dark:text-blue-400 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
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
                                ? 'bg-white dark:bg-[#1e2736] text-blue-600 dark:text-blue-400 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.22)] dark:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800'
                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'
                        }`}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </div>

                {/* User + Logout */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 px-4 py-4 sticky bottom-0 z-10 bg-white/90 dark:bg-[#151d2a]/90 backdrop-blur-lg">
                    <div className="mb-2.5 flex items-center gap-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-900/60 p-2.5 border border-slate-100/50 dark:border-slate-800/40 shadow-inner">
                        <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                        >
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
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 dark:border-rose-950/30 px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50/50 hover:bg-rose-50 dark:text-rose-400 dark:bg-rose-950/10 dark:hover:bg-rose-950/20 transition"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────── */}
            <div className="flex h-full flex-1 flex-col min-w-0 overflow-hidden">

                {/* Top Bar */}
                <header className={`flex h-14 items-center justify-between border rounded-2xl px-6 shadow-[0_10px_40px_-6px_rgba(0,0,0,0.07)] dark:shadow-[0_10px_40px_-6px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-all duration-300 mb-5 bg-white/90 dark:bg-[#151d2a]/90 border-slate-100 dark:border-slate-800/80`}>
                    <h1 className="font-bold text-slate-800 dark:text-slate-100 text-base">{title}</h1>
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button */}
                        {mounted && (
                            <button
                                onClick={() => updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark')}
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
                <main className="flex-1 overflow-y-auto rounded-3xl bg-white/90 dark:bg-[#151d2a]/90 border border-slate-100 dark:border-slate-800/80 p-8 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] backdrop-blur-lg transition-all duration-300 no-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
