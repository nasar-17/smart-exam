import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import {
    Layout,
    Image,
    BarChart2,
    Info,
    Star,
    ListOrdered,
    CreditCard,
    MessageSquare,
    Zap,
    Phone,
    AlignJustify,
    LayoutDashboard,
    ExternalLink,
    LogOut,
} from 'lucide-react';

interface AdminLayoutProps {
    title?: string;
}

type Section = { key: string; label: string; icon: string; desc: string };

const iconMap: Record<string, React.ElementType> = {
    'layout': Layout,
    'image': Image,
    'bar-chart-2': BarChart2,
    'info': Info,
    'star': Star,
    'list-ordered': ListOrdered,
    'credit-card': CreditCard,
    'message-square': MessageSquare,
    'zap': Zap,
    'phone': Phone,
    'align-justify': AlignJustify,
};

export default function AdminLayout({ children, title = 'Admin Panel' }: PropsWithChildren<AdminLayoutProps>) {
    const { auth, adminSections } = usePage().props as unknown as {
        auth: { user?: { email?: string } };
        adminSections: Section[];
    };
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="flex h-screen overflow-hidden bg-[#F1F5F9] dark:bg-[#0f172a] transition-colors duration-300">

            {/* ── Sidebar ─────────────────────────────── */}
            <aside
                className="flex h-screen w-64 shrink-0 flex-col overflow-y-auto"
                style={{ background: '#2563EB' }}
            >
                {/* Logo */}
                <div className="border-b px-6 py-5 sticky top-0 z-10" style={{ background: '#2563EB', borderColor: 'rgba(255,255,255,0.15)' }}>
                    <Link href="/admin" className="flex items-center gap-2.5">
                        <img src="/Logo smart exam.png" alt="Smart Exam" className="h-8 w-auto" />
                        <span className="text-base font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
                            Smart<span style={{ color: '#bfdbfe' }}>Exam</span>
                            <span className="block text-xs font-normal" style={{ color: 'rgba(255,255,255,0.55)' }}>
                                Admin Panel
                            </span>
                        </span>
                    </Link>
                </div>

                {/* Dashboard link */}
                <div className="px-3 pt-4 pb-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                        style={{
                            background: currentPath === '/admin' ? 'rgba(255,255,255,0.18)' : 'transparent',
                            color: currentPath === '/admin' ? '#fff' : 'rgba(255,255,255,0.8)',
                        }}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>

                {/* Nav sections — dynamically rendered */}
                <nav className="flex-1 px-3 py-2 space-y-0.5">
                    <p className="mb-1 px-3 pt-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Sections
                    </p>
                    {adminSections.map((item) => {
                        const Icon = iconMap[item.icon] ?? Layout;
                        const isActive = currentPath.includes(`/admin/sections/${item.key}`);

                        return (
                            <Link
                                key={item.key}
                                href={`/admin/sections/${item.key}`}
                                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all"
                                style={{
                                    background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                                    fontWeight: isActive ? 600 : 400,
                                }}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User + Logout */}
                <div className="border-t px-4 py-4 sticky bottom-0 z-10" style={{ background: '#2563EB', borderColor: 'rgba(255,255,255,0.15)' }}>
                    <div className="mb-1 flex items-center gap-2">
                        <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
                        >
                            {auth?.user?.email?.[0]?.toUpperCase() ?? 'A'}
                        </div>
                        <span className="truncate text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            {auth?.user?.email ?? 'Admin'}
                        </span>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition"
                        style={{ color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)' }}
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────── */}
            <div className="flex h-screen flex-1 flex-col min-w-0 overflow-hidden">

                {/* Top Bar */}
                <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
                    <h1 className="font-semibold text-gray-800">{title}</h1>
                    <a
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-blue-50"
                        style={{ borderColor: '#2563EB', color: '#2563EB' }}
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Lihat Landing Page
                    </a>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
