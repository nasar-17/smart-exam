import { useEffect, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';

const navLinks = [
    { href: '#hero', label: 'Beranda' },
    { href: '#about', label: 'Tentang' },
    { href: '#features', label: 'Fitur' },
    { href: '#howitworks', label: 'Cara Kerja' },
    { href: '#pricing', label: 'Harga' },
    { href: '#testimonials', label: 'Testimoni' },
    { href: '#contact', label: 'Kontak' },
];

export default function Navbar({ data }: { data?: any }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.is_admin;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                id="navbar"
                className={`navbar-landing fixed top-0 right-0 left-0 z-50 border-b border-transparent ${scrolled ? 'scrolled' : ''}`}
                style={{ background: 'transparent' }}
            >
                <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2.5">
                        <img
                            src="/Logo smart exam.png"
                            alt="Smart Exam"
                            className="h-9 w-auto drop-shadow-md"
                        />
                        <span
                            className="nav-logo-text text-lg font-bold tracking-tight text-white"
                            style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                            {(data?.brand_name || 'Smart Exam').split(' ')[0]}<span style={{ color: '#60A5FA' }}>{(data?.brand_name || 'Smart Exam').split(' ').slice(1).join(' ') || 'Exam'}</span>
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="nav-link-hero text-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden items-center gap-3 md:flex">
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="rounded-full px-5 py-2.5 text-sm font-semibold border border-white/40 text-white hover:bg-white/10 transition-colors"
                            >
                                Admin Panel
                            </Link>
                        )}
                        <a
                            href={data?.cta_link || '#pricing'}
                            className="nav-cta-btn items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold inline-flex"
                            style={{
                                background: '#2563EB',
                                color: '#fff',
                            }}
                        >
                            {data?.cta_text || 'Coba Gratis'}
                        </a>
                    </div>

                    {/* Hamburger */}
                    <button
                        className="flex flex-col gap-1.5 p-2 md:hidden"
                        onClick={() => setMobileOpen(true)}
                    >
                        <span className="hamburger-line h-0.5 w-5 rounded bg-white" />
                        <span className="hamburger-line h-0.5 w-5 rounded bg-white" />
                        <span className="hamburger-line h-0.5 w-3 rounded bg-white" />
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            <div
                className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
                onClick={() => setMobileOpen(false)}
            >
                <div className="flex flex-col items-center gap-7">
                    <button
                        className="absolute top-5 right-6 text-3xl text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        &times;
                    </button>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[1.6rem] font-bold text-white transition-opacity hover:opacity-70"
                            style={{ fontFamily: "'Sora', sans-serif" }}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    {isAdmin && (
                        <Link
                            href="/admin"
                            className="mt-2 inline-block rounded-full px-6 py-3 text-sm font-semibold border border-white/40 text-white"
                            onClick={() => setMobileOpen(false)}
                        >
                            Admin Panel
                        </Link>
                    )}
                    <a
                        href="#pricing"
                        className="mt-2 inline-block rounded-full px-6 py-3 text-sm font-semibold"
                        style={{ background: '#fff', color: '#2563EB' }}
                        onClick={() => setMobileOpen(false)}
                    >
                        {data?.cta_text || 'Coba Gratis'}
                    </a>
                </div>
            </div>
        </>
    );
}
