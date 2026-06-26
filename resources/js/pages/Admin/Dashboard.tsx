import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    Layout,
    Image as ImageIcon,
    BarChart2,
    Info,
    Star,
    ListOrdered,
    CreditCard,
    MessageSquare,
    Zap,
    Phone,
    AlignJustify,
    GripVertical,
    Eye,
    EyeOff,
    Lock,
} from 'lucide-react';

type Section = {
    key: string;
    label: string;
    icon: string;
    desc: string;
    is_visible: boolean;
};

const iconMap: Record<string, React.ElementType> = {
    'layout': Layout,
    'image': ImageIcon,
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

export default function Dashboard() {
    const { adminSections } = usePage().props as any as { adminSections: Section[] };
    const [sections, setSections] = useState<Section[]>(adminSections);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    // Sync sections if props change (e.g. after a router refresh/reload)
    useEffect(() => {
        setSections(adminSections);
    }, [adminSections]);

    // Handle show/hide visibility toggle
    const handleToggleVisibility = (sectionKey: string, currentVisible: boolean) => {
        const nextVisible = !currentVisible;
        
        // Optimistic UI update
        setSections((prev) =>
            prev.map((s) => (s.key === sectionKey ? { ...s, is_visible: nextVisible } : s))
        );

        router.post(
            '/admin/sections-toggle-visibility',
            { section: sectionKey, is_visible: nextVisible },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Section ${sectionKey} ${nextVisible ? 'ditampilkan' : 'disembunyikan'}`);
                },
                onError: () => {
                    toast.error('Gagal memperbarui visibilitas');
                    // Revert
                    setSections(adminSections);
                },
            }
        );
    };

    // Drag-and-Drop Handlers (HTML5 DnD API)
    const handleDragStart = (e: React.DragEvent, index: number) => {
        const item = sections[index];
        // Pinned navbar and footer cannot be dragged
        if (item.key === 'navbar' || item.key === 'footer') {
            e.preventDefault();
            return;
        }
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, hoverIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === hoverIndex) return;

        const targetItem = sections[hoverIndex];
        // Cannot swap with pinned navbar or footer
        if (targetItem.key === 'navbar' || targetItem.key === 'footer') return;

        const updatedSections = [...sections];
        const draggedItem = updatedSections[draggedIndex];

        // Perform visual swap in local state
        updatedSections.splice(draggedIndex, 1);
        updatedSections.splice(hoverIndex, 0, draggedItem);

        setDraggedIndex(hoverIndex);
        setSections(updatedSections);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);

        // Save order to DB
        const orderedKeys = sections.map((s) => s.key);
        router.post(
            '/admin/sections-reorder',
            { order: orderedKeys },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Urutan section berhasil disimpan');
                },
                onError: () => {
                    toast.error('Gagal menyimpan urutan');
                    setSections(adminSections);
                },
            }
        );
    };

    return (
        <div className="p-6">
            <Head title="Admin Dashboard" />
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
                    Susunan Section Landing Page
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                    Geser/drag untuk mengubah susunan section di landing page secara vertikal. Gunakan ikon mata untuk menampilkan/menyembunyikan section.
                </p>
            </div>

            <div className="max-w-3xl space-y-3">
                {sections.map((section, idx) => {
                    const IconComponent = iconMap[section.icon] ?? Layout;
                    const isPinned = section.key === 'navbar' || section.key === 'footer';

                    return (
                        <div
                            key={section.key}
                            draggable={!isPinned}
                            onDragStart={(e) => handleDragStart(e, idx)}
                            onDragOver={(e) => handleDragOver(e, idx)}
                            onDragEnd={handleDragEnd}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all bg-white dark:bg-[#151d2a] ${
                                draggedIndex === idx
                                    ? 'border-blue-500 ring-2 ring-blue-500/10 opacity-50 scale-[0.98]'
                                    : section.is_visible
                                      ? 'border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200 dark:hover:border-slate-750'
                                      : 'border-slate-100/60 dark:border-slate-900/60 bg-slate-50/50 dark:bg-slate-900/20 opacity-70'
                            }`}
                        >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                {/* Grip/Lock Icon */}
                                {isPinned ? (
                                    <div className="flex h-8 w-8 items-center justify-center text-slate-300 dark:text-slate-700">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center text-slate-400 dark:text-slate-650 cursor-grab hover:text-slate-600 active:cursor-grabbing">
                                        <GripVertical className="h-4 w-4" />
                                    </div>
                                )}

                                {/* Icon Indicator */}
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${
                                    section.is_visible
                                        ? 'bg-blue-50/60 text-blue-600 ring-blue-100/50 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-900/30'
                                        : 'bg-slate-100 text-slate-400 ring-slate-200/50 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-750/30'
                                }`}>
                                    <IconComponent className="h-5 w-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                                            {section.label}
                                        </h3>
                                        {isPinned && (
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-1.5 py-0.5 rounded">
                                                Pinned
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate leading-relaxed">
                                        {section.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {/* Show/Hide Toggle Button */}
                                {!isPinned && (
                                    <button
                                        type="button"
                                        onClick={() => handleToggleVisibility(section.key, section.is_visible)}
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                                            section.is_visible
                                                ? 'border-slate-100 bg-white hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-[#121824] dark:hover:bg-[#1a2235] dark:text-slate-350'
                                                : 'border-rose-100 bg-rose-50/40 text-rose-500 hover:bg-rose-50 dark:border-rose-950/20 dark:bg-rose-950/10 dark:text-rose-450 dark:hover:bg-rose-950/20'
                                        }`}
                                        title={section.is_visible ? 'Sembunyikan' : 'Tampilkan'}
                                    >
                                        {section.is_visible ? (
                                            <Eye className="h-4 w-4" />
                                        ) : (
                                            <EyeOff className="h-4 w-4" />
                                        )}
                                    </button>
                                )}

                                {/* Link to Edit Section */}
                                <Link
                                    href={`/admin/sections/${section.key}`}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-[#121824] dark:hover:bg-[#1a2235] px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
                                >
                                    Edit Konten
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
