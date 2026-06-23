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
    return (
        <footer className="py-16" style={{ background: '#090d13' }}>
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
                                className="text-lg font-bold text-white"
                                style={{ fontFamily: "'Sora', sans-serif" }}
                            >
                                Smart
                                <span style={{ color: '#60A5FA' }}>Exam</span>
                            </span>
                        </div>
                        <p className="mb-6 text-sm leading-relaxed text-gray-400">
                            Platform ujian digital terpercaya untuk institusi
                            pendidikan modern Indonesia.
                        </p>
                        <div className="flex gap-3">
                            {socials.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#2563EB]"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <s.icon className="h-4 w-4 text-gray-400 hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="mb-5 text-sm font-semibold text-white">
                                {title}
                            </h4>
                            <div className="space-y-3">
                                {links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="block text-sm text-gray-400 transition-colors hover:text-white"
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
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                    <p className="text-xs text-gray-500">
                        &copy; 2026 Smart Exam oleh Smart Inovasi. Hak cipta
                        dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
