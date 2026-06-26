import { Head, Link, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Save,
    Upload,
    Trash2,
    Plus,
    GripVertical,
    Pencil,
    Info,
} from 'lucide-react';

type Field = {
    key: string;
    value: any;
    type: 'text' | 'textarea' | 'image' | 'json';
    label: string;
    order: number;
};

type Props = {
    section: string;
    fields: Field[];
};

export default function SectionEditor({ section, fields }: Props) {
    const [localFields, setLocalFields] = useState<Field[]>(fields);
    const [previewUrls, setPreviewUrls] = useState<Record<string, string>>(
        () => {
            const urls: Record<string, string> = {};
            fields.forEach((f) => {
                if (
                    f.type === 'image' &&
                    typeof f.value === 'string' &&
                    f.value
                ) {
                    urls[f.key] = f.value;
                }
            });
            return urls;
        },
    );

    const [processing, setProcessing] = useState(false);

    // Modal state for editing JSON items
    const [activeModalField, setActiveModalField] = useState<string | null>(null);
    const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
    const [modalData, setModalData] = useState<Record<string, any>>({});

    const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

    const handleChange = useCallback((key: string, value: string) => {
        setLocalFields((prev) =>
            prev.map((f) => (f.key === key ? { ...f, value } : f)),
        );
    }, []);

    const handleImageUpload = useCallback(
        async (key: string, file: File, isJsonField = false, jsonKey = '') => {
            const formData = new window.FormData();
            formData.append('image', file);

            const csrfToken =
                document.cookie
                     .split('; ')
                     .find((c) => c.startsWith('XSRF-TOKEN='))
                     ?.split('=')[1] ?? '';

            try {
                const res = await fetch('/admin/upload-image', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    },
                });
                const data = await res.json();
                if (data.url) {
                    if (isJsonField) {
                        setModalData((prev) => ({ ...prev, [jsonKey]: data.url }));
                    } else {
                        handleChange(key, data.url);
                        setPreviewUrls((prev) => ({ ...prev, [key]: data.url }));
                    }
                    toast.success('Gambar berhasil diupload');
                }
            } catch {
                toast.error('Gagal upload gambar');
            }
        },
        [handleChange],
    );

    // ── JSON field helpers ──────────────────────────────
    const getJsonItems = (field: Field): Record<string, unknown>[] => {
        if (Array.isArray(field.value)) {
            return field.value.map((item) => {
                if (typeof item === 'string') {
                    return { _is_primitive_string: true, value: item };
                }
                return item as Record<string, unknown>;
            });
        }
        return [];
    };

    // Filter out internal and system properties like 'id' from user editing
    const filterUserKeys = (item: Record<string, unknown>): string[] => {
        return Object.keys(item).filter(
            (k) => !k.startsWith('_') && k.toLowerCase() !== 'id'
        );
    };

    const handleOpenEditModal = (fieldKey: string, index: number, item: Record<string, any>) => {
        setActiveModalField(fieldKey);
        setActiveModalIndex(index);
        setModalData({ ...item });
    };

    const handleOpenAddModal = (fieldKey: string, field: Field) => {
        const items = getJsonItems(field);
        let template: Record<string, any> = {};
        if (items.length > 0) {
            const last = items[items.length - 1];
            template = Object.fromEntries(
                Object.entries(last).map(([k, v]) => {
                    // Do not instantiate id in the template
                    if (k.toLowerCase() === 'id') return [k, ''];
                    return [
                        k,
                        Array.isArray(v)
                            ? []
                            : typeof v === 'number'
                              ? 0
                              : '',
                    ];
                })
            );
        } else {
            template = { title: '', description: '', icon: '' };
        }

        setActiveModalField(fieldKey);
        setActiveModalIndex(-1); // -1 signifies adding a new item
        setModalData(template);
    };

    const handleSaveModalData = () => {
        if (!activeModalField || activeModalIndex === null) return;

        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== activeModalField) return f;
                const items = getJsonItems(f);
                let updatedItems = [...items];

                // Remove or clean up internal flags in final output
                const cleanedData = { ...modalData };
                delete cleanedData._is_primitive_string;

                if (activeModalIndex === -1) {
                    // Add Mode
                    updatedItems.push(cleanedData);
                } else {
                    // Edit Mode: preserve original fields like 'id' if they existed but weren't modified
                    const originalItem = items[activeModalIndex];
                    if (originalItem && 'id' in originalItem) {
                        cleanedData.id = originalItem.id;
                    }
                    updatedItems = updatedItems.map((item, i) =>
                        i === activeModalIndex ? cleanedData : item
                    );
                }

                const finalValue = updatedItems.map((item) => {
                    if (item._is_primitive_string) {
                        return item.value;
                    }
                    return item;
                });
                return { ...f, value: finalValue };
            })
        );

        setActiveModalField(null);
        setActiveModalIndex(null);
        setModalData({});
        toast.success('Item berhasil diupdate dalam daftar');
    };

    const removeJsonItem = (key: string, index: number) => {
        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== key) return f;
                const items = getJsonItems(f);
                const filtered = items.filter((_, i) => i !== index);
                const finalValue = filtered.map((item) => {
                    if (item._is_primitive_string) {
                        return item.value;
                    }
                    return item;
                });
                return {
                    ...f,
                    value: finalValue,
                };
            }),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        const formFields = localFields.map((f) => ({
            key: f.key,
            value: f.value,
        }));
        router.post(
            `/admin/sections/${section}`,
            { fields: formFields } as any,
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Section '${sectionLabel}' berhasil disimpan`);
                    setProcessing(false);
                },
                onError: () => {
                    toast.error('Gagal menyimpan perubahan');
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a]">
            <Head title={`Edit ${sectionLabel}`} />

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
                    <div className="max-w-4xl space-y-6">
                        {localFields.map((field) => (
                            <div key={field.key} className="bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm">
                                {/* ── TEXT ─────────────────────────── */}
                                {field.type === 'text' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {field.label}
                                        </label>
                                        <Input
                                            value={String(field.value ?? '')}
                                            onChange={(e) =>
                                                handleChange(field.key, e.target.value)
                                            }
                                            className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-none focus:bg-white dark:focus:bg-[#1e293b] focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all h-auto ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                        />
                                    </div>
                                )}

                                {/* ── TEXTAREA ─────────────────────── */}
                                {field.type === 'textarea' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {field.label}
                                        </label>
                                        <textarea
                                            value={String(field.value ?? '')}
                                            onChange={(e) =>
                                                handleChange(field.key, e.target.value)
                                            }
                                            rows={4}
                                            className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-none focus:bg-white dark:focus:bg-[#1e293b] focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all resize-y ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                        />
                                    </div>
                                )}

                                {/* ── IMAGE ────────────────────────── */}
                                {field.type === 'image' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            {field.label}
                                        </label>
                                        <div className="space-y-3">
                                            <Input
                                                value={String(field.value ?? '')}
                                                onChange={(e) => {
                                                    handleChange(field.key, e.target.value);
                                                    setPreviewUrls((p) => ({
                                                        ...p,
                                                        [field.key]: e.target.value,
                                                    }));
                                                }}
                                                placeholder="URL gambar atau upload di bawah"
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-none focus:bg-white dark:focus:bg-[#1e293b] focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all h-auto ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                            />
                                            <div className="flex items-center gap-4">
                                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white dark:bg-[#1e293b] hover:bg-slate-50 dark:hover:bg-[#334155] px-4 py-2.5 text-sm transition ring-1 ring-slate-200/60 dark:ring-slate-700/60 font-semibold text-slate-600 dark:text-slate-300">
                                                    <Upload className="h-4 w-4" />
                                                    Upload Gambar
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target.files?.[0];
                                                            if (file)
                                                                handleImageUpload(
                                                                    field.key,
                                                                    file,
                                                                );
                                                        }}
                                                    />
                                                </label>
                                                {previewUrls[field.key] && (
                                                    <img
                                                        src={previewUrls[field.key]}
                                                        alt="Preview"
                                                        className="h-16 w-auto rounded-xl ring-1 ring-slate-200/60 dark:ring-slate-700/60 object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── JSON (array of objects) — Clean Preview Cards ──────── */}
                                {field.type === 'json' && (() => {
                                    const items = getJsonItems(field);

                                    return (
                                        <div>
                                            {/* Section Header + Add button */}
                                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                                                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                                    {field.label}
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenAddModal(field.key, field)}
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
                                                                onClick={() => handleOpenEditModal(field.key, idx, item)}
                                                                className="group flex items-start gap-3.5 rounded-xl bg-slate-50/50 dark:bg-[#101725]/40 hover:bg-white dark:hover:bg-[#1e293b] p-4 ring-1 ring-slate-100 dark:ring-slate-800/80 hover:ring-blue-100 dark:hover:ring-blue-900/40 hover:shadow-md cursor-pointer transition-all duration-200 relative"
                                                            >
                                                                <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-600 cursor-grab shrink-0 mt-0.5" onClick={(e) => e.stopPropagation()} />
                                                                
                                                                {iconVal && (
                                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-900/40">
                                                                        <span className="text-[10px] font-bold uppercase truncate px-0.5">
                                                                            {iconVal.replace('lucide:', '').substring(0, 3)}
                                                                        </span>
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
                                                                            removeJsonItem(field.key, idx);
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
                                                    Seret item untuk mengubah urutan
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Sticky Bottom Save Bar ──────────────── */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-[#151d2a]/80 backdrop-blur-md px-6 py-4 mt-auto">
                    <div className="flex items-center gap-4 max-w-4xl">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="gap-2 rounded-xl px-6 py-2.5 font-bold shadow-[0_6px_20px_-4px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_-4px_rgba(37,99,235,0.5)] transition-all bg-blue-600 hover:bg-blue-700 text-white border-0"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                        <Link
                            href="/admin"
                            className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors px-4 py-2"
                        >
                            Batal
                        </Link>
                    </div>
                </div>
            </form>

            {/* ── Overlay Modal Form for JSON Editing ── */}
            <Dialog open={activeModalField !== null} onOpenChange={(open) => { if (!open) { setActiveModalField(null); setActiveModalIndex(null); } }}>
                <DialogContent className="max-w-2xl bg-white dark:bg-[#151d2a] border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-slate-800 dark:text-slate-100">
                            {activeModalIndex === -1 ? 'Tambah Item Baru' : 'Edit Item'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 my-2 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                        {modalData && (() => {
                            if (modalData._is_primitive_string) {
                                return (
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            Nilai/Poin
                                        </label>
                                        <Input
                                            value={String(modalData.value ?? '')}
                                            onChange={(e) => setModalData((prev) => ({ ...prev, value: e.target.value }))}
                                            className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                        />
                                    </div>
                                );
                            }

                            // Filter out 'id' and private keys
                            const visibleKeys = filterUserKeys(modalData);

                            return visibleKeys.map((itemKey) => {
                                const itemVal = modalData[itemKey];

                                // Array value (like bullet list/lines)
                                if (Array.isArray(itemVal)) {
                                    return (
                                        <div key={itemKey}>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                {itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}
                                            </label>
                                            <textarea
                                                value={itemVal.join('\n')}
                                                onChange={(e) => {
                                                    const lines = e.target.value.split('\n');
                                                    setModalData((prev) => ({ ...prev, [itemKey]: lines }));
                                                }}
                                                rows={4}
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60 resize-y"
                                                placeholder="Satu item per baris"
                                            />
                                            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                                                Satu item per baris
                                            </p>
                                        </div>
                                    );
                                }

                                // If the field is an icon list, maybe offer a text field
                                const isIconField = itemKey.toLowerCase() === 'icon';
                                const isLongText = typeof itemVal === 'string' && itemVal.length > 80;

                                return (
                                    <div key={itemKey}>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            {itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}
                                        </label>
                                        
                                        {isLongText ? (
                                            <textarea
                                                value={String(itemVal ?? '')}
                                                onChange={(e) => setModalData((prev) => ({ ...prev, [itemKey]: e.target.value }))}
                                                rows={3}
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60 resize-y"
                                            />
                                        ) : (
                                            <div className="flex gap-2">
                                                <Input
                                                    value={String(itemVal ?? '')}
                                                    onChange={(e) => setModalData((prev) => ({ ...prev, [itemKey]: e.target.value }))}
                                                    placeholder={isIconField ? 'Contoh: lucide:users-2' : ''}
                                                    className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60 h-auto"
                                                />
                                                {isIconField && (
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200/60 dark:ring-slate-700/60 shrink-0">
                                                        <span className="text-[10px] font-mono font-bold truncate max-w-full px-0.5">
                                                            {String(itemVal ?? '').replace('lucide:', '').substring(0, 3)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0 border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2">
                        <Button
                            type="button"
                            onClick={handleSaveModalData}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-5"
                        >
                            Terapkan
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => { setActiveModalField(null); setActiveModalIndex(null); }}
                            className="rounded-xl font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Batal
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
