import React from 'react';
import { GripVertical, Info, Pencil, Plus, Trash2 } from 'lucide-react';
import DynamicLucideIcon from '@/components/dynamic-lucide-icon';

interface JsonFieldProps {
    label: string;
    fieldKey: string;
    items: Record<string, any>[];
    onAdd: () => void;
    onEdit: (index: number, item: Record<string, any>) => void;
    onDelete: (index: number) => void;
}

export default function JsonField({
    label,
    fieldKey,
    items,
    onAdd,
    onEdit,
    onDelete,
}: JsonFieldProps) {
    return (
        <div>
            {/* Section Header + Add button */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {label}
                </h3>
                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-[#1e293b] px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 ring-1 ring-blue-200/80 dark:ring-blue-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Tambah Item
                </button>
            </div>

            {/* Simple Card Grid */}
            {items.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">
                    Belum ada item. Klik "Tambah Item" untuk menambahkan.
                </div>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                    {items.map((item, idx) => {
                        const isPrimitive = item._is_primitive_string;
                        const displayName = isPrimitive
                            ? String(item.value)
                            : String(item.name || item.title || item.judul || `Item ${idx + 1}`);
                        const displayDesc = isPrimitive
                            ? ''
                            : String(item.description || item.desc || item.deskripsi || item.price_monthly || item.target || '');
                        const iconVal = isPrimitive ? '' : String(item.icon || '');

                        return (
                            <div
                                key={idx}
                                onClick={() => onEdit(idx, item)}
                                className="group flex items-start gap-3.5 rounded-xl bg-slate-50/50 dark:bg-[#101725]/40 hover:bg-white dark:hover:bg-[#1e293b] p-4 ring-1 ring-slate-100 dark:ring-slate-800/80 hover:ring-blue-100 dark:hover:ring-blue-900/40 hover:shadow-md cursor-pointer transition-all duration-200 relative"
                            >
                                <GripVertical
                                    className="h-4 w-4 text-slate-300 dark:text-slate-600 cursor-grab shrink-0 mt-0.5"
                                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                />
                                
                                {iconVal && (
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-900/40">
                                        <DynamicLucideIcon name={iconVal} className="h-5 w-5" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0 pr-6">
                                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {displayName || '(Belum diisi)'}
                                    </h4>
                                    {displayDesc && (
                                        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed">
                                            {displayDesc}
                                        </p>
                                    )}
                                </div>

                                {/* Hover/Action utilities */}
                                <div className="absolute right-3 top-3 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
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
