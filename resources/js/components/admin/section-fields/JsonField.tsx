import { GripVertical, Info, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import DynamicLucideIcon from '@/components/dynamic-lucide-icon';

interface JsonFieldProps {
    label: string;
    fieldKey: string;
    items: Record<string, any>[];
    onAdd: () => void;
    onEdit: (index: number, item: Record<string, any>) => void;
    onDelete: (index: number) => void;
    onReorder?: (newItems: Record<string, any>[]) => void;
    onHoverItem?: () => void;
    onLeaveItem?: () => void;
}

export default function JsonField({
    label,
    fieldKey,
    items,
    onAdd,
    onEdit,
    onDelete,
    onReorder,
    onHoverItem,
    onLeaveItem,
}: JsonFieldProps) {
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const isNavMenu = fieldKey === 'nav_links';

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIdx(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragEnter = (index: number) => {
        if (draggedIdx !== null && draggedIdx !== index && onReorder) {
            const updated = [...items];
            const draggedItem = updated[draggedIdx];
            updated.splice(draggedIdx, 1);
            updated.splice(index, 0, draggedItem);
            setDraggedIdx(index);
            onReorder(updated);
        }
    };

    const handleDragEnd = () => {
        setDraggedIdx(null);
    };

    return (
        <div>
            {/* Section Header + Add button */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {isNavMenu ? 'Navigation Menu' : label}
                    </h3>
                    {isNavMenu && (
                        <p className="text-[12px] text-slate-500 dark:text-slate-400">
                            Kelola menu landing page.
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 px-4 py-2 text-xs font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm h-10 border border-blue-100/50 dark:border-blue-900/30"
                >
                    <Plus className="h-4 w-4" />
                    Tambah Item
                </button>
            </div>

            {/* Content List/Grid */}
            {items.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">
                    Belum ada item. Klik "Tambah Item" untuk menambahkan.
                </div>
            ) : isNavMenu ? (
                <div className="space-y-2">
                    {items.map((item, idx) => {
                        const isPrimitive = item._is_primitive_string;
                        const displayName = isPrimitive
                            ? String(item.value)
                            : String(item.label || item.title || `Menu ${idx + 1}`);
                        const displaySub = isPrimitive ? '' : String(item.href || '');

                        return (
                            <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter(idx)}
                                onDragEnd={handleDragEnd}
                                className={`group flex h-[52px] items-center justify-between rounded-xl border px-3 transition-all duration-200 ${
                                    draggedIdx === idx
                                        ? 'border-blue-500 bg-blue-50/20 opacity-50 ring-2 ring-blue-500/10'
                                        : 'border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-sm'
                                }`}
                            >
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <div className="flex h-8 w-8 cursor-grab items-center justify-center text-slate-400 hover:text-slate-600 dark:text-slate-600 active:cursor-grabbing">
                                        <GripVertical className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 truncate">
                                                {displayName}
                                            </span>
                                            {displaySub && (
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-mono">
                                                    ({displaySub})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(idx, item)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        title="Edit Item"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(idx);
                                        }}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        title="Hapus Item"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((item, idx) => {
                        const isPrimitive = item._is_primitive_string;
                        const displayName = isPrimitive
                            ? String(item.value)
                            : String(item.name || item.title || item.judul || item.label || item.href || `Item ${idx + 1}`);
                        const displayDesc = isPrimitive
                            ? ''
                            : String(item.description || item.desc || item.deskripsi || item.price_monthly || item.target || '');
                        const iconVal = isPrimitive ? '' : String(item.icon || '');

                        return (
                            <div
                                key={idx}
                                draggable
                                onDragStart={(e) => handleDragStart(e, idx)}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter(idx)}
                                onDragEnd={handleDragEnd}
                                onMouseEnter={() => onHoverItem?.()}
                                onMouseLeave={() => onLeaveItem?.()}
                                className={`group flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 relative ${
                                    draggedIdx === idx
                                        ? 'border-blue-500 bg-blue-50/20 opacity-50 ring-2 ring-blue-500/10'
                                        : 'border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-sm'
                                }`}
                            >
                                <div className="flex h-8 w-8 cursor-grab items-center justify-center text-slate-400 hover:text-slate-600 dark:text-slate-600 active:cursor-grabbing mt-0.5">
                                    <GripVertical className="h-4 w-4" />
                                </div>

                                {iconVal && (
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30">
                                        <DynamicLucideIcon name={iconVal} className="h-5 w-5" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0 pr-12">
                                    <h4 className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {displayName || '(Belum diisi)'}
                                    </h4>
                                    {displayDesc && (
                                        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                                            {displayDesc}
                                        </p>
                                    )}
                                </div>

                                <div className="absolute right-3 top-3 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(idx, item)}
                                        className="p-1 rounded text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400"
                                        title="Edit Item"
                                    >
                                        <Pencil className="h-3 w-3" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(idx);
                                        }}
                                        className="p-1 rounded text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400"
                                        title="Hapus Item"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Info hint */}
            {items.length > 1 && (
                <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400 dark:text-slate-500">
                    <Info className="h-3.5 w-3.5" />
                    Seret item untuk mengubah urutan (atau klik edit untuk mengubah detail)
                </div>
            )}
        </div>
    );
}

