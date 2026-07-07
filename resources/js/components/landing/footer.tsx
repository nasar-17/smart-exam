import DynamicLucideIcon from '@/components/dynamic-lucide-icon';

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

    const columnTitleProduct = data?.column_title_product ?? 'Produk';
    const columnTitleCompany = data?.column_title_company ?? 'Perusahaan';
    const columnTitleSupport = data?.column_title_support ?? 'Dukungan';

    const linksProduct = parseJsonLinks(data?.links_product, DEFAULT_LINKS_PRODUCT);
    const linksCompany = parseJsonLinks(data?.links_company, DEFAULT_LINKS_COMPANY);
    const linksSupport = parseJsonLinks(data?.links_support, DEFAULT_LINKS_SUPPORT);
    const linksSocial = data?.links_social ?? [];

    // Fallback ke field legacy jika links_social masih kosong
    const hasNewSocial = Array.isArray(linksSocial) && linksSocial.length > 0;
    const legacyIcons = [
        { icon: 'lucide:youtube', href: data?.social_youtube ?? '#' },
        { icon: 'lucide:twitter', href: data?.social_twitter ?? '#' },
        { icon: 'lucide:instagram', href: data?.social_instagram ?? '#' },
        { icon: 'lucide:linkedin', href: data?.social_linkedin ?? '#' },
    ];
    const socialItems = hasNewSocial ? linksSocial : legacyIcons;

    const footerColumns = [
        { title: columnTitleProduct, links: linksProduct, titleField: 'column_title_product', linksField: 'links_product' },
        { title: columnTitleCompany, links: linksCompany, titleField: 'column_title_company', linksField: 'links_company' },
        { title: columnTitleSupport, links: linksSupport, titleField: 'column_title_support', linksField: 'links_support' },
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
                        <div className="flex gap-3" data-preview-field="links_social">
                            {socialItems.map((s: any, i: number) => (
                                <a
                                    key={i}
                                    href={s.href || '#'}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#2563EB] group"
                                    style={{
                                        background: 'var(--lp-card-highlight)',
                                        border: '1px solid var(--lp-border-card)',
                                    }}
                                >
                                    <DynamicLucideIcon
                                        name={s.icon}
                                        className="h-4 w-4 transition-colors group-hover:text-white"
                                        style={{ color: 'var(--lp-text-secondary)' }}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h4
                                className="mb-5 text-sm font-semibold"
                                style={{ color: 'var(--lp-text-primary)' }}
                                data-preview-field={col.titleField}
                            >
                                {col.title}
                            </h4>
                            <div className="space-y-3" data-preview-field={col.linksField}>
                                {col.links.map((link: any) => (
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
