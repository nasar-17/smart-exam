import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const DEFAULT_LINKS_PRODUCT = [
    { label: 'Fitur', href: '#features' },
    { label: 'Harga', href: '#pricing' },
    { label: 'Cara Kerja', href: '#howitworks' },
    { label: 'Update Terbaru', href: '#' },
    { label: 'Status Server', href: '#' },
];

const DEFAULT_LINKS_COMPANY = [
    { label: 'Tentang Smart Inovasi', href: '#about' },
    { label: 'Blog / Artikel', href: '#' },
    { label: 'Karir', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Hubungi Kami', href: '#contact' },
];

const DEFAULT_LINKS_SUPPORT = [
    { label: 'Pusat Bantuan / FAQ', href: '#' },
    { label: 'Dokumentasi API', href: '#' },
    { label: 'Panduan Penggunaan', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
];

function parseJsonLinks(raw: any, fallback: { label: string; href: string }[]) {
    if (!raw) return fallback;
    try {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_) {}
    return fallback;
}

export default function Footer({ data }: { data?: any }) {
    const tagline = data?.tagline ?? 'Platform ujian digital terpercaya untuk institusi pendidikan modern Indonesia.';
    const copyright = data?.copyright ?? '© 2026 Smart Exam oleh Smart Inovasi. Hak cipta dilindungi.';
    const socialInstagram = data?.social_instagram ?? '#';
    const socialTwitter = data?.social_twitter ?? '#';
    const socialLinkedin = data?.social_linkedin ?? '#';
    const socialYoutube = data?.social_youtube ?? '#';

    const columnTitleProduct = data?.column_title_product ?? 'Produk';
    const columnTitleCompany = data?.column_title_company ?? 'Perusahaan';
    const columnTitleSupport = data?.column_title_support ?? 'Dukungan';

    const linksProduct = parseJsonLinks(data?.links_product, DEFAULT_LINKS_PRODUCT);
    const linksCompany = parseJsonLinks(data?.links_company, DEFAULT_LINKS_COMPANY);
    const linksSupport = parseJsonLinks(data?.links_support, DEFAULT_LINKS_SUPPORT);

    const footerColumns = [
        { title: columnTitleProduct, links: linksProduct },
        { title: columnTitleCompany, links: linksCompany },
        { title: columnTitleSupport, links: linksSupport },
    ];

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
                        <p className="mb-6 text-sm leading-relaxed" data-preview-field="tagline" style={{ color: 'var(--lp-text-secondary)' }}>
                            {tagline}
                        </p>
                        <div className="flex gap-3">
                            {socials.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#2563EB] group"
                                    data-preview-field={['social_twitter', 'social_linkedin', 'social_instagram', 'social_youtube'][i]}
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
                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-5 text-sm font-semibold" style={{ color: 'var(--lp-text-primary)' }}>
                                {col.title}
                            </h4>
                            <div className="space-y-3">
                                {col.links.map((link: { label: string; href: string }) => (
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
                    <p className="text-xs" data-preview-field="copyright" style={{ color: 'var(--lp-text-muted)' }}>
                        {copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
}
