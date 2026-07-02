import { ExternalLink, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DynamicLucideIcon from '@/components/dynamic-lucide-icon';

const ICONS = [
    'User', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX', 'UserCircle',
    'Users', 'Users2', 'UsersRound',
    'BookOpen', 'BookText', 'BookMarked',
    'ShieldCheck', 'Shield', 'ShieldAlert', 'ShieldLock',
    'BarChart3', 'BarChart2', 'BarChart',
    'Database', 'DatabaseBackup',
    'Link', 'Link2', 'Unlink',
    'Headphones', 'Ear',
    'LayoutDashboard', 'LayoutGrid', 'LayoutTemplate',
    'Settings', 'Cog', 'Wrench',
    'Trash2', 'Trash',
    'Plus', 'PlusCircle',
    'Pencil', 'Edit',
    'Info', 'HelpCircle',
    'Save', 'Upload',
    'CheckCircle', 'Check', 'CheckSquare',
    'XCircle', 'X',
    'ChevronRight', 'ChevronLeft', 'ChevronUp', 'ChevronDown',
    'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown',
    'Menu', 'List', 'ListOrdered',
    'Sun', 'Moon', 'SunMoon',
    'Lock', 'Unlock', 'Key',
    'Mail', 'MailCheck', 'Inbox',
    'Phone', 'PhoneCall',
    'Calendar', 'CalendarDays', 'CalendarCheck',
    'Clock', 'Clock2', 'Clock3',
    'Gift', 'Package', 'Box',
    'Star', 'StarHalf',
    'Heart', 'HeartHandshake',
    'Activity', 'ActivitySquare',
    'AlertTriangle', 'AlertCircle',
    'Badge', 'BadgeCheck',
    'Tag', 'TagPlus',
    'Search', 'SearchCheck',
    'Download', 'DownloadCloud',
    'Copy', 'Clipboard',
    'Share2', 'Share', 'Send',
    'Code', 'Code2', 'CodeXml',
    'Terminal', 'Cpu', 'Chip',
    'HardDrive', 'Disk',
    'Monitor', 'Screen',
    'Smartphone', 'Tablet', 'Laptop',
    'Battery', 'Wifi',
    'Globe', 'Map', 'MapPin',
    'Home', 'Building',
    'Flag', 'Briefcase',
    'Wallet', 'CreditCard',
    'Percent',
    'TrendingUp', 'TrendingDown',
    'Eye', 'EyeOff',
    'Moon', 'Sun', 'Cloud',
    'Wind', 'Droplet', 'Snowflake',
    'Leaf', 'Flower', 'TreePine',
    'Feather',
];

type Props = {
    onSelect: (iconName: string) => void;
    onClose: () => void;
};

export default function LucideIconPicker({ onSelect, onClose }: Props) {
    const [search, setSearch] = useState('');
    const [filteredIcons, setFilteredIcons] = useState<string[]>(ICONS);

    useEffect(() => {
        const filtered = ICONS.filter((icon) =>
            icon.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredIcons(filtered);
    }, [search]);

    const handleSelect = (icon: string) => {
        onSelect(`lucide:${icon}`);
        onClose();
    };

    const openLucideGallery = () => {
        window.open('https://lucide.dev/icons', '_blank', 'noopener,noreferrer');
    };

    return (
        <div 
            className="space-y-4 p-1"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Cari icon..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-11 pl-10 rounded-xl"
                    />
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={openLucideGallery}
                    className="h-11 rounded-xl border-slate-200 px-4 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                >
                    <ExternalLink className="mr-1.5 h-4 w-4" />
                    Buka Lucide
                </Button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
                Salin nama icon dari{' '}
                <a 
                    href="https://lucide.dev/icons" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
                >
                    lucide.dev/icons
                </a>
                , paste di sini, atau pilih dari daftar.
            </p>

            <div className="max-h-[55vh] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-900/40">
                {filteredIcons.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 p-10 text-center">
                        <Search className="h-8 w-8 text-slate-300 dark:text-slate-700" />
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Icon tidak ditemukan
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                            Coba kata kunci lain
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2 p-3 sm:grid-cols-5 md:grid-cols-6">
                        {filteredIcons.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => handleSelect(icon)}
                                className="group flex flex-col items-center gap-2 rounded-lg border border-transparent bg-white p-2.5 transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm dark:bg-slate-800 dark:hover:border-blue-900/50 dark:hover:bg-blue-950/30 active:scale-95"
                                title={`lucide:${icon}`}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 group-hover:bg-blue-100 dark:bg-slate-700 dark:group-hover:bg-blue-950/50">
                                    <DynamicLucideIcon
                                        name={`lucide:${icon}`}
                                        className="h-4.5 w-4.5 text-slate-600 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400"
                                    />
                                </div>
                                <span className="w-full truncate text-center text-[10px] font-medium text-slate-600 group-hover:text-blue-700 dark:text-slate-400 dark:group-hover:text-blue-300">
                                    {icon}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="rounded-xl font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                    Tutup
                </Button>
            </div>
        </div>
    );
}