import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlignJustify,
    BarChart2,
    CreditCard,
    Eye,
    EyeOff,
    GripVertical,
    Image as ImageIcon,
    Info,
    Layout,
    ListOrdered,
    Lock,
    MessageSquare,
    Phone,
    Star,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
import type { DragEvent, ElementType } from 'react';
import { toast } from 'sonner';

type Section = {
    key: string;
    label: string;
    icon: string;
    desc: string;
    is_visible: boolean;
};

const iconMap: Record<string, ElementType> = {
    layout: Layout,
    image: ImageIcon,
    'bar-chart-2': BarChart2,
    info: Info,
    star: Star,
    'list-ordered': ListOrdered,
    'credit-card': CreditCard,
    'message-square': MessageSquare,
    zap: Zap,
    phone: Phone,
    'align-justify': AlignJustify,
};

export default function Settings() {
    const { adminSections } = usePage().props as unknown as { adminSections: Section[] };
    const [sections, setSections] = useState<Section[]>(adminSections);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleToggleVisibility = (sectionKey: string, currentVisible: boolean) => {
        const nextVisible = !currentVisible;

        setSections((prev) => prev.map((section) => (section.key === sectionKey ? { ...section, is_visible: nextVisible } : section)));

        router.post(
            '/admin/sections-toggle-visibility',
            { section: sectionKey, is_visible: nextVisible },
            {
                preserveScroll: true,
                onSuccess: () => toast.success(`Section ${sectionKey} ${nextVisible ? 'ditampilkan' : 'disembunyikan'}`),
                onError: () => {
                    toast.error('Gagal memperbarui visibilitas');
                    setSections(adminSections);
                },
            },
        );
    };

    const handleDragStart = (e: DragEvent, index: number) => {
        const item = sections[index];

        if (item.key === 'navbar' || item.key === 'footer') {
            e.preventDefault();

            return;
        }

        setDraggedIndex(index);

        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: DragEvent, hoverIndex: number) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === hoverIndex) {
            return;
        }

        const targetItem = sections[hoverIndex];

        if (targetItem.key === 'navbar' || targetItem.key === 'footer') {
            return;
        }

        const updatedSections = [...sections];
        const draggedItem = updatedSections[draggedIndex];

        updatedSections.splice(draggedIndex, 1);
        updatedSections.splice(hoverIndex, 0, draggedItem);

        setDraggedIndex(hoverIndex);
        setSections(updatedSections);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);

        router.post(
            '/admin/sections-reorder',
            { order: sections.map((section) => section.key) },
            {
                preserveScroll: true,
                onSuccess: () => toast.success('Urutan section berhasil disimpan'),
                onError: () => {
                    toast.error('Gagal menyimpan urutan');
                    setSections(adminSections);
                },
            },
        );
    };

    return (
        <div className="p-6">
            <Head title="Admin Setting" />

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Susunan Section Landing Page</h2>
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
                            className={`flex items-center justify-between rounded-2xl border bg-white p-4 transition-all dark:bg-[#151d2a] ${
                                draggedIndex === idx
                                    ? 'scale-[0.98] border-blue-500 opacity-50 ring-2 ring-blue-500/10'
                                    : section.is_visible
                                      ? 'border-slate-100 shadow-sm hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700'
                                      : 'border-slate-100/60 bg-slate-50/50 opacity-70 dark:border-slate-900/60 dark:bg-slate-900/20'
                            }`}
                        >
                            <div className="flex min-w-0 flex-1 items-center gap-4">
                                {isPinned ? (
                                    <div className="flex h-8 w-8 items-center justify-center text-slate-300 dark:text-slate-700">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                ) : (
                                    <div className="flex h-8 w-8 cursor-grab items-center justify-center text-slate-400 hover:text-slate-600 active:cursor-grabbing dark:text-slate-600">
                                        <GripVertical className="h-4 w-4" />
                                    </div>
                                )}

                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${
                                        section.is_visible
                                            ? 'bg-blue-50/60 text-blue-600 ring-blue-100/50 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-900/30'
                                            : 'bg-slate-100 text-slate-400 ring-slate-200/50 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700/30'
                                    }`}
                                >
                                    <IconComponent className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{section.label}</h3>
                                        {isPinned && (
                                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-slate-400 uppercase dark:bg-slate-800 dark:text-slate-500">
                                                Pinned
                                            </span>
                                        )}
                                    </div>
                                    <p className="truncate text-xs leading-relaxed text-slate-400 dark:text-slate-500">{section.desc}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {!isPinned && (
                                    <button
                                        type="button"
                                        onClick={() => handleToggleVisibility(section.key, section.is_visible)}
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                                            section.is_visible
                                                ? 'border-slate-100 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-[#121824] dark:text-slate-300 dark:hover:bg-[#1a2235]'
                                                : 'border-rose-100 bg-rose-50/40 text-rose-500 hover:bg-rose-50 dark:border-rose-950/20 dark:bg-rose-950/10 dark:text-rose-400 dark:hover:bg-rose-950/20'
                                        }`}
                                        title={section.is_visible ? 'Sembunyikan' : 'Tampilkan'}
                                    >
                                        {section.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </button>
                                )}

                                <Link
                                    href={`/admin/sections/${section.key}`}
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-100 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-[#121824] dark:text-slate-300 dark:hover:bg-[#1a2235]"
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
