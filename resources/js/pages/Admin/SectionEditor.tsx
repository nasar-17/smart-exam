import { Head, Link, router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import ImageField from '@/components/admin/section-fields/ImageField';
import JsonField from '@/components/admin/section-fields/JsonField';
import JsonItemModal from '@/components/admin/section-fields/JsonItemModal';
import TextField from '@/components/admin/section-fields/TextField';

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
                    toast.success('Perubahan berhasil disimpan');
                },
                onError: () => {
                    setSaveStatus('error');
                    toast.error('Gagal menyimpan perubahan');
                },
            }
        );
    }, [section]);

    // Track changes to update dirty state
    useEffect(() => {
        const hasChanged = JSON.stringify(localFields) !== JSON.stringify(fields);

        if (hasChanged) {
            if (saveStatus !== 'saving' && saveStatus !== 'error') {
                setSaveStatus('dirty');
            }
        } else if (saveStatus !== 'saving') {
            setSaveStatus('saved');
        }
    }, [localFields, fields, saveStatus]);


    const isNavbar = section === 'navbar';

    const renderField = (field: Field) => {
        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        key={field.key}
                        label={field.label}
                        value={String(field.value ?? '')}
                        onChange={(val) => handleChange(field.key, val)}
                    />
                );
            case 'textarea':
                return (
                    <TextField
                        key={field.key}
                        label={field.label}
                        value={String(field.value ?? '')}
                        isTextArea
                        onChange={(val) => handleChange(field.key, val)}
                    />
                );
            case 'image':
                return (
                    <ImageField
                        key={field.key}
                        label={field.label}
                        value={String(field.value ?? '')}
                        previewUrl={previewUrls[field.key]}
                        onChange={(val) => {
                            handleChange(field.key, val);
                            setPreviewUrls((p) => ({ ...p, [field.key]: val }));
                        }}
                        onUpload={(file) => handleImageUpload(field.key, file)}
                    />
                );
            case 'json':
                return (
                    <JsonField
                        key={field.key}
                        label={field.label}
                        fieldKey={field.key}
                        items={getJsonItems(field)}
                        onAdd={() => handleOpenAddModal(field.key, field)}
                        onEdit={(idx, item) => handleOpenEditModal(field.key, idx, item)}
                        onDelete={(idx) => removeJsonItem(field.key, idx)}
                        onReorder={(newItems) => {
                            setLocalFields((prev) =>
                                prev.map((f) => (f.key === field.key ? { ...f, value: newItems } : f)),
                            );
                        }}
                    />
                );
            default:
                return null;
        }
    };

    const jsonFields = localFields.filter((f) => f.type === 'json');
    const nonJsonFields = localFields.filter((f) => f.type !== 'json');

    const isFullWidthField = (field: Field) => {
        if (field.type === 'textarea') {
            return true;
        }

        const key = field.key.toLowerCase();

        return (
            key === 'brand_name' ||
            key.includes('title') ||
            key.includes('description') ||
            key.includes('subtitle') ||
            key.includes('address')
        );
    };

    const renderCombinedNonJsonFields = (fields: Field[], cols: 2 | 3 = 2) => {
        return (
            <div className={`grid grid-cols-1 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-x-6 gap-y-4`}>
                {fields.map((field) => {
                    const fullWidth = isFullWidthField(field);

                    return (
                        <div key={field.key} className={fullWidth ? (cols === 3 ? 'md:col-span-3' : 'md:col-span-2') : 'md:col-span-1'}>
                            {renderField(field)}
                        </div>
                    );
                })}
            </div>
        );
    };


    return (
        <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a]">
            <Head title={`Edit ${sectionLabel}`} />

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col flex-1 min-h-0">
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
                    {jsonFields.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-start">
                            {/* Left Column: General Content Settings */}
                            {nonJsonFields.length > 0 && (
                                <div className="lg:col-span-5 bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {isNavbar ? 'Brand Settings' : `${sectionLabel} Settings`}
                                        </h3>
                                        <p className="text-[12px] text-slate-500 dark:text-slate-400">
                                            {isNavbar
                                                ? 'Kelola identitas brand dan tombol utama.'
                                                : `Kelola pengaturan konten untuk section ${sectionLabel}.`}
                                        </p>
                                    </div>
                                    <div className="border-t border-slate-100 dark:border-slate-800/80 my-3" />
                                    {renderCombinedNonJsonFields(nonJsonFields)}
                                </div>
                            )}

                            {/* Right Column: List Settings (JSON Fields) */}
                            <div className={`${nonJsonFields.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
                                {jsonFields.map((field) => (
                                    <div key={field.key} className="bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
                                        {renderField(field)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Single unified card layout if there are no JSON fields */
                        <div className="max-w-5xl mx-auto bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                    {`${sectionLabel} Settings`}
                                </h3>
                                <p className="text-[12px] text-slate-500 dark:text-slate-400">
                                    {`Kelola pengaturan konten untuk section ${sectionLabel}.`}
                                </p>
                            </div>
                            <div className="border-t border-slate-100 dark:border-slate-800/80 my-3" />
                            {renderCombinedNonJsonFields(nonJsonFields, 3)}
                        </div>
                    )}
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
                        
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => performSave(localFields)}
                                disabled={saveStatus === 'saving' || saveStatus === 'saved'}
                                className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm ${
                                    saveStatus === 'saving'
                                        ? 'bg-blue-400 text-white cursor-not-allowed'
                                        : saveStatus === 'saved'
                                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200/50 dark:border-slate-700/50'
                                          : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                                }`}
                            >
                                {saveStatus === 'saving' ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>

                            <div className="flex items-center gap-2 text-xs font-semibold">
                                {saveStatus === 'saved' && (
                                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Semua perubahan telah disimpan
                                    </span>
                                )}
                                {saveStatus === 'dirty' && (
                                    <span className="flex items-center gap-1.5 text-amber-500 animate-pulse">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                        Ada perubahan yang belum disimpan
                                    </span>
                                )}
                                {saveStatus === 'error' && (
                                    <span className="flex items-center gap-1.5 text-rose-500">
                                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                        Gagal menyimpan perubahan
                                    </span>
                                )}
                            </div>
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
