import { Head, Link, router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import TextField from '@/components/admin/section-fields/TextField';
import ImageField from '@/components/admin/section-fields/ImageField';
import JsonField from '@/components/admin/section-fields/JsonField';
import JsonItemModal from '@/components/admin/section-fields/JsonItemModal';

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
                    if (k.toLowerCase() === 'id') {
                        return [k, ''];
                    }

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
        if (!activeModalField || activeModalIndex === null) {
            return;
        }

        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== activeModalField) {
                    return f;
                }

                const items = getJsonItems(f);
                let updatedItems = [...items];

                const cleanedData = { ...modalData };
                delete cleanedData._is_primitive_string;

                if (activeModalIndex === -1) {
                    updatedItems.push(cleanedData);
                } else {
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
                if (f.key !== key) {
                    return f;
                }

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

    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'dirty' | 'error'>('saved');

    const performSave = useCallback((fieldsToSave: Field[]) => {
        setSaveStatus('saving');
        const formFields = fieldsToSave.map((f) => ({
            key: f.key,
            value: f.value,
        }));
        
        router.post(
            `/admin/sections/${section}`,
            { fields: formFields } as any,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSaveStatus('saved');
                },
                onError: () => {
                    setSaveStatus('error');
                    toast.error('Gagal menyimpan perubahan otomatis');
                },
            }
        );
    }, [section]);

    // Track changes and debounce
    useEffect(() => {
        const hasChanged = JSON.stringify(localFields) !== JSON.stringify(fields);
        
        if (!hasChanged) {
            return;
        }

        setSaveStatus('dirty');

        const timer = setTimeout(() => {
            performSave(localFields);
        }, 3000); // 3 seconds debounce

        return () => clearTimeout(timer);
    }, [localFields, fields, performSave]);

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a]">
            <Head title={`Edit ${sectionLabel}`} />

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
                    <div className="max-w-4xl space-y-6">
                        {localFields.map((field) => (
                            <div key={field.key} className="bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-100 dark:border-slate-800/80 shadow-sm">
                                {/* ── TEXT & TEXTAREA ──────────────── */}
                                {field.type === 'text' && (
                                    <TextField
                                        label={field.label}
                                        value={String(field.value ?? '')}
                                        onChange={(val) => handleChange(field.key, val)}
                                    />
                                )}

                                {field.type === 'textarea' && (
                                    <TextField
                                        label={field.label}
                                        value={String(field.value ?? '')}
                                        isTextArea
                                        onChange={(val) => handleChange(field.key, val)}
                                    />
                                )}

                                {/* ── IMAGE ────────────────────────── */}
                                {field.type === 'image' && (
                                    <ImageField
                                        label={field.label}
                                        value={String(field.value ?? '')}
                                        previewUrl={previewUrls[field.key]}
                                        onChange={(val) => {
                                            handleChange(field.key, val);
                                            setPreviewUrls((p) => ({ ...p, [field.key]: val }));
                                        }}
                                        onUpload={(file) => handleImageUpload(field.key, file)}
                                    />
                                )}

                                {/* ── JSON (array of objects) ──────── */}
                                {field.type === 'json' && (
                                    <JsonField
                                        label={field.label}
                                        fieldKey={field.key}
                                        items={getJsonItems(field)}
                                        onAdd={() => handleOpenAddModal(field.key, field)}
                                        onEdit={(idx, item) => handleOpenEditModal(field.key, idx, item)}
                                        onDelete={(idx) => removeJsonItem(field.key, idx)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Sticky Bottom Status Bar ──────────────── */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-[#151d2a]/80 backdrop-blur-md px-6 py-4 mt-auto">
                    <div className="flex items-center justify-between max-w-4xl">
                        <Link
                            href="/admin"
                            className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                        >
                            Kembali ke Dashboard
                        </Link>
                        
                        <div className="flex items-center gap-2 text-xs font-semibold">
                            {saveStatus === 'saved' && (
                                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Semua perubahan disimpan otomatis
                                </span>
                            )}
                            {saveStatus === 'saving' && (
                                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 animate-pulse">
                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                    Menyimpan...
                                </span>
                            )}
                            {saveStatus === 'dirty' && (
                                <span className="flex items-center gap-1.5 text-amber-500 animate-pulse">
                                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                                    Sedang mengetik (menyimpan dalam 3 detik...)
                                </span>
                            )}
                            {saveStatus === 'error' && (
                                <span className="flex items-center gap-1.5 text-rose-500">
                                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                                    Gagal menyimpan otomatis
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            {/* ── Overlay Modal Form for JSON Editing ── */}
            <JsonItemModal
                isOpen={activeModalField !== null}
                activeModalIndex={activeModalIndex ?? -1}
                modalData={modalData}
                setModalData={setModalData}
                onSave={handleSaveModalData}
                onCancel={() => {
                    setActiveModalField(null);
                    setActiveModalIndex(null);
                    setModalData({});
                }}
            />
        </div>
    );
}
