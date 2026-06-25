import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
    Produk: [
        { label: 'Fitur', href: '#features' },
        { label: 'Harga', href: '#pricing' },
        { label: 'Cara Kerja', href: '#howitworks' },
        { label: 'Update Terbaru', href: '#' },
        { label: 'Status Server', href: '#' },
    ],
    Perusahaan: [
        { label: 'Tentang Smart Inovasi', href: '#about' },
        { label: 'Blog / Artikel', href: '#' },
        { label: 'Karir', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Hubungi Kami', href: '#contact' },
    ],
    Dukungan: [
        { label: 'Pusat Bantuan / FAQ', href: '#' },
        { label: 'Dokumentasi API', href: '#' },
        { label: 'Panduan Penggunaan', href: '#' },
        { label: 'Syarat & Ketentuan', href: '#' },
        { label: 'Kebijakan Privasi', href: '#' },
    ],
};

const socials = [
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Youtube, href: '#' },
];

export default function Footer({ data }: { data?: any }) {
    const tagline = data?.tagline ?? 'Platform ujian digital terpercaya untuk institusi pendidikan modern Indonesia.';
    const copyright = data?.copyright ?? '© 2026 Smart Exam oleh Smart Inovasi. Hak cipta dilindungi.';
    const socialInstagram = data?.social_instagram ?? '#';
    const socialTwitter = data?.social_twitter ?? '#';
    const socialLinkedin = data?.social_linkedin ?? '#';
    const socialYoutube = data?.social_youtube ?? '#';

    const socials = [
        { icon: Twitter, href: socialTwitter },
        { icon: Linkedin, href: socialLinkedin },
        { icon: Instagram, href: socialInstagram },
        { icon: Youtube, href: socialYoutube },
    ];

    return (
        <footer
            className="py-16 border-t"
            style={{
                background: 'var(--lp-bg-secondary)',
                borderColor: 'var(--lp-border-subtle)',
            }}
        >
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <div className="mb-4 flex items-center gap-2.5">
                             <img
                                 src="/Logo smart exam.png"
                                 alt="Smart Exam"
                                 className="h-8 w-auto"
                             />
                            <span
                                className="text-lg font-bold"
                                style={{
                                    color: 'var(--lp-text-primary)',
                                    fontFamily: "'Sora', sans-serif",
                                }}
                            >
                                Smart
                                <span style={{ color: '#60A5FA' }}>Exam</span>
                            </span>
                        </div>
                        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--lp-text-secondary)' }}>
                            {tagline}
                        </p>
                        <div className="flex gap-3">
                            {socials.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#2563EB] group"
                                    style={{
                                        background: 'var(--lp-card-highlight)',
                                        border: '1px solid var(--lp-border-card)',
                                    }}
                                >
                                    <s.icon className="h-4 w-4 transition-colors group-hover:text-white" style={{ color: 'var(--lp-text-secondary)' }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="mb-5 text-sm font-semibold" style={{ color: 'var(--lp-text-primary)' }}>
                                {title}
                            </h4>
                            <div className="space-y-3">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="block text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                                        style={{ color: 'var(--lp-text-secondary)' }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="flex flex-wrap items-center justify-between gap-4 border-t pt-8"
                    style={{ borderColor: 'var(--lp-border-subtle)' }}
                >
                    <p className="text-xs" style={{ color: 'var(--lp-text-muted)' }}>
                        {copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
