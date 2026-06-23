import { Head, Link, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    Save,
    Upload,
    Trash2,
    Plus,
    GripVertical,
} from 'lucide-react';

type Field = {
    key: string;
    value: string | number | boolean | Record<string, unknown>[] | null;
    type: 'text' | 'textarea' | 'image' | 'json';
    label: string;
    order: number;
};

type Props = {
    section: string;
    fields: Field[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormData = { fields: { key: string; value: any }[] };

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

    const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

    const handleChange = useCallback((key: string, value: string) => {
        setLocalFields((prev) =>
            prev.map((f) => (f.key === key ? { ...f, value } : f)),
        );
    }, []);

    const handleImageUpload = useCallback(
        async (key: string, file: File) => {
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
                    handleChange(key, data.url);
                    setPreviewUrls((prev) => ({ ...prev, [key]: data.url }));
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
        if (Array.isArray(field.value)) return field.value;
        return [];
    };

    const updateJsonItem = (
        key: string,
        index: number,
        itemKey: string,
        itemValue: string,
    ) => {
        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== key) return f;
                const items = getJsonItems(f);
                const updated = items.map((item, i) =>
                    i === index ? { ...item, [itemKey]: itemValue } : item,
                );
                return { ...f, value: updated };
            }),
        );
    };

    const addJsonItem = (key: string, template: Record<string, unknown>) => {
        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== key) return f;
                return { ...f, value: [...getJsonItems(f), { ...template }] };
            }),
        );
    };

    const removeJsonItem = (key: string, index: number) => {
        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== key) return f;
                const items = getJsonItems(f);
                return {
                    ...f,
                    value: items.filter((_, i) => i !== index),
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
        <div className="p-6">
            <Head title={`Edit ${sectionLabel}`} />
            <div className="mb-6">
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-blue-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Dashboard
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {localFields.map((field) => (
                    <div
                        key={field.key}
                        className="rounded-xl border border-gray-200 bg-white p-5"
                    >
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            {field.label}
                            <span className="ml-2 text-xs font-normal text-gray-400">
                                ({field.type})
                            </span>
                        </label>

                        {/* ── TEXT ─────────────────────────── */}
                        {field.type === 'text' && (
                            <Input
                                value={String(field.value ?? '')}
                                onChange={(e) =>
                                    handleChange(field.key, e.target.value)
                                }
                                className="max-w-lg"
                            />
                        )}

                        {/* ── TEXTAREA ─────────────────────── */}
                        {field.type === 'textarea' && (
                            <textarea
                                value={String(field.value ?? '')}
                                onChange={(e) =>
                                    handleChange(field.key, e.target.value)
                                }
                                rows={4}
                                className="w-full max-w-2xl rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                            />
                        )}

                        {/* ── IMAGE ────────────────────────── */}
                        {field.type === 'image' && (
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
                                    className="max-w-lg"
                                />
                                <div className="flex items-center gap-4">
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50">
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
                                            className="h-20 w-auto rounded-lg border object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── JSON (array of objects) ──────── */}
                        {field.type === 'json' && (
                            <div className="space-y-4">
                                {getJsonItems(field).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="relative rounded-lg border border-gray-200 bg-gray-50 p-4"
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <GripVertical className="h-4 w-4 text-gray-400" />
                                                <span className="text-xs font-semibold text-gray-500">
                                                    Item {idx + 1}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeJsonItem(
                                                        field.key,
                                                        idx,
                                                    )
                                                }
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {Object.entries(item).map(
                                                ([itemKey, itemVal]) => {
                                                    if (
                                                        Array.isArray(itemVal)
                                                    ) {
                                                        return (
                                                            <div
                                                                key={itemKey}
                                                                className="sm:col-span-2"
                                                            >
                                                                <label className="mb-1 block text-xs font-medium text-gray-500">
                                                                    {itemKey}
                                                                </label>
                                                                <textarea
                                                                    value={itemVal.join(
                                                                        '\n',
                                                                    )}
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        const lines =
                                                                            e.target.value.split(
                                                                                '\n',
                                                                            );
                                                                        setLocalFields(
                                                                            (
                                                                                prev,
                                                                            ) =>
                                                                                prev.map(
                                                                                    (
                                                                                        f,
                                                                                    ) => {
                                                                                        if (
                                                                                            f.key !==
                                                                                            field.key
                                                                                        )
                                                                                            return f;
                                                                                        const items =
                                                                                            getJsonItems(
                                                                                                f,
                                                                                            );
                                                                                        const updated =
                                                                                            items.map(
                                                                                                (
                                                                                                    it,
                                                                                                    i,
                                                                                                ) =>
                                                                                                    i ===
                                                                                                    idx
                                                                                                        ? {
                                                                                                              ...it,
                                                                                                              [itemKey]:
                                                                                                                  lines,
                                                                                                          }
                                                                                                        : it,
                                                                                            );
                                                                                        return {
                                                                                            ...f,
                                                                                            value: updated,
                                                                                        };
                                                                                    },
                                                                                ),
                                                                        );
                                                                    }}
                                                                    rows={Math.max(
                                                                        3,
                                                                        itemVal.length,
                                                                    )}
                                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                                                    placeholder="Satu item per baris"
                                                                />
                                                                <p className="mt-0.5 text-xs text-gray-400">
                                                                    Satu item
                                                                    per baris
                                                                </p>
                                                            </div>
                                                        );
                                                    }

                                                    const isLong =
                                                        typeof itemVal ===
                                                            'string' &&
                                                        itemVal.length > 80;

                                                    return (
                                                        <div
                                                            key={itemKey}
                                                            className={
                                                                isLong
                                                                    ? 'sm:col-span-2'
                                                                    : ''
                                                            }
                                                        >
                                                            <label className="mb-1 block text-xs font-medium text-gray-500">
                                                                {itemKey}
                                                            </label>
                                                            {isLong ? (
                                                                <textarea
                                                                    value={String(
                                                                        itemVal ??
                                                                            '',
                                                                    )}
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateJsonItem(
                                                                            field.key,
                                                                            idx,
                                                                            itemKey,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    rows={3}
                                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                                                />
                                                            ) : (
                                                                <Input
                                                                    value={String(
                                                                        itemVal ??
                                                                            '',
                                                                    )}
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateJsonItem(
                                                                            field.key,
                                                                            idx,
                                                                            itemKey,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {getJsonItems(field).length > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const items = getJsonItems(field);
                                            const last =
                                                items[items.length - 1];
                                            const template = Object.fromEntries(
                                                Object.entries(last ?? {}).map(
                                                    ([k, v]) => [
                                                        k,
                                                        Array.isArray(v)
                                                            ? []
                                                            : typeof v ===
                                                                'number'
                                                              ? 0
                                                              : '',
                                                    ],
                                                ),
                                            );
                                            addJsonItem(field.key, template);
                                        }}
                                        className="gap-1.5"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Tambah Item
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex items-center gap-4 border-t border-gray-200 pt-5">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="gap-2"
                        style={{ background: '#2563EB' }}
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                    <Link
                        href="/admin"
                        className="text-sm text-gray-500 transition hover:text-gray-800"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}
