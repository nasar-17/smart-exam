import React, { useState } from 'react';
import { toast } from 'sonner';
import DynamicLucideIcon from '@/components/dynamic-lucide-icon';
import LucideIconPicker from '@/components/lucide-icon-picker';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { isBooleanValue } from '@/lib/utils';

interface JsonItemModalProps {
    isOpen: boolean;
    fieldKey?: string | null;
    activeModalIndex: number;
    modalData: Record<string, any>;
    setModalData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    onSave: () => void;
    onCancel: () => void;
}

// Filter out internal and system properties like 'id' from user editing
const filterUserKeys = (item: Record<string, unknown>): string[] => {
    return Object.keys(item).filter(
        (k) => !k.startsWith('_') && k.toLowerCase() !== 'id'
    );
};

export default function JsonItemModal({
    isOpen,
    fieldKey,
    activeModalIndex,
    modalData,
    setModalData,
    onSave,
    onCancel,
}: JsonItemModalProps) {
    const [iconPickerOpen, setIconPickerOpen] = useState(false);
    const [activeIconField, setActiveIconField] = useState<string | null>(null);

    const visibleKeys = filterUserKeys(modalData);

    const handleFileUpload = async (file: File, onDone: (url: string) => void) => {
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
                onDone(data.url);
            } else {
                toast.error('Gagal mengupload gambar');
            }
        } catch (err) {
            toast.error('Gagal mengupload gambar');
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => {
 if (!open) {
onCancel();
} 
}}>
                <DialogContent
                    className="max-w-2xl bg-white dark:bg-[#151d2a] border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl"
                    onPointerDownOutside={(e) => {
                        if (iconPickerOpen) {
                            e.preventDefault();
                        }
                    }}
                    onEscapeKeyDown={(e) => {
                        if (iconPickerOpen) {
                            e.preventDefault();
                        }
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="text-slate-800 dark:text-slate-100">
                            {activeModalIndex === -1 ? 'Tambah Item Baru' : 'Edit Item'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 my-2 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                        {modalData._is_primitive_string ? (
                            fieldKey === 'institutions' ? (() => {
                                const valueStr = String(modalData.value ?? '');
                                const parts = valueStr.split('|');
                                const initials = parts[0] || '';
                                const name = parts[1] || '';
                                const logoUrl = parts[2] || '';

                                return (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                Singkatan / Inisial (contoh: UH)
                                            </label>
                                            <Input
                                                value={initials}
                                                onChange={(e) => {
                                                    const newAbbr = e.target.value;
                                                    setModalData((prev) => ({
                                                        ...prev,
                                                        value: `${newAbbr}|${name}${logoUrl ? '|' + logoUrl : ''}`
                                                    }));
                                                }}
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                                placeholder="Contoh: UH"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                Nama Institusi
                                            </label>
                                            <Input
                                                value={name}
                                                onChange={(e) => {
                                                    const newName = e.target.value;
                                                    setModalData((prev) => ({
                                                        ...prev,
                                                        value: `${initials}|${newName}${logoUrl ? '|' + logoUrl : ''}`
                                                    }));
                                                }}
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                                placeholder="Contoh: Universitas Hasanuddin"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                Logo / Gambar (opsional)
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex-1 min-w-0">
                                                    <Input
                                                        value={logoUrl}
                                                        onChange={(e) => {
                                                            const newLogo = e.target.value;
                                                            setModalData((prev) => ({
                                                                ...prev,
                                                                value: `${initials}|${name}|${newLogo}`
                                                            }));
                                                        }}
                                                        placeholder="URL Gambar / Logo"
                                                        className="w-full h-11 rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] pl-3.5 pr-20 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                                                    />
                                                    <label className="absolute right-1.5 top-1.5 bottom-1.5 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-2.5 text-[11px] font-semibold transition border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 shadow-sm">
                                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        Upload
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    await handleFileUpload(file, (url) => {
                                                                        setModalData((prev) => ({
                                                                            ...prev,
                                                                            value: `${initials}|${name}|${url}`
                                                                        }));
                                                                        toast.success('Logo berhasil diupload');
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                {logoUrl && (
                                                    <div className="h-11 w-11 shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center shadow-sm">
                                                        <img
                                                            src={logoUrl}
                                                            alt="Preview Logo"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })() : (
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
                            )
                        ) : (
                            visibleKeys.map((itemKey) => {
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

                                const isIconField = itemKey.toLowerCase() === 'icon';
                                const isLongText = typeof itemVal === 'string' && itemVal.length > 80;

                                // Detect boolean option fields
                                const isBooleanOpt = isBooleanValue(itemVal, itemKey);

                                return (
                                    <div key={itemKey}>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            {itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}
                                        </label>

                                        {isBooleanOpt ? (
                                            <select
                                                value={String(itemVal ?? 'false')}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    const typedVal = typeof itemVal === 'boolean'
                                                        ? (val === 'true')
                                                        : val;
                                                    setModalData((prev) => ({ ...prev, [itemKey]: typedVal }));
                                                }}
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60 transition-all"
                                            >
                                                <option value="true">True (Aktif)</option>
                                                <option value="false">False (Non-aktif)</option>
                                            </select>
                                        ) : isLongText ? (
                                            <textarea
                                                value={String(itemVal ?? '')}
                                                onChange={(e) => setModalData((prev) => ({ ...prev, [itemKey]: e.target.value }))}
                                                rows={3}
                                                className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60 resize-y"
                                            />
                                        ) : (
                                            <div className="flex items-end gap-2">
                                                <Input
                                                    value={isIconField ? String(itemVal ?? '').replace(/^lucide:/, '') : String(itemVal ?? '')}
                                                    onChange={(e) => {
                                                        let val = e.target.value;
                                                        if (isIconField) {
                                                            val = val.trim();
                                                            const cleanName = val.replace(/^lucide:/, '');
                                                            val = cleanName ? `lucide:${cleanName}` : '';
                                                        }
                                                        setModalData((prev) => ({ ...prev, [itemKey]: val }));
                                                    }}
                                                    placeholder={isIconField ? 'Contoh: user-plus' : ''}
                                                    className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none ring-1 ring-slate-200/60 dark:ring-slate-700/60 h-auto"
                                                />
                                                {isIconField && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setActiveIconField(itemKey);
                                                                setIconPickerOpen(true);
                                                            }}
                                                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
                                                            title="Pilih Icon"
                                                        >
                                                            <span className="text-[10px] font-bold">
                                                                +
                                                            </span>
                                                        </button>
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-1 ring-slate-200/60 dark:ring-slate-700/60">
                                                            <DynamicLucideIcon name={String(itemVal ?? '')} className="h-5 w-5" />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0 border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2">
                        <Button
                            type="button"
                            onClick={onSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-5"
                        >
                            Terapkan
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onCancel}
                            className="rounded-xl font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Batal
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
                <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto rounded-2xl p-6">
                    <DialogHeader className="space-y-1 pb-2">
                        <DialogTitle className="text-lg font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
                            Pilih Icon
                        </DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Pilih icon untuk field ini atau salin nama dari lucide.dev
                        </p>
                    </DialogHeader>
                    {iconPickerOpen && (
                        <LucideIconPicker
                            onSelect={(icon) => {
                                if (activeIconField) {
                                    setModalData((prev) => ({ ...prev, [activeIconField]: icon }));
                                    toast.success('Icon berhasil dipilih');
                                    // Delay closing to prevent parent dialog's click-outside handler from triggering on unmounted element
                                    setTimeout(() => {
                                        setIconPickerOpen(false);
                                        setActiveIconField(null);
                                    }, 100);
                                }
                            }}
                            onClose={() => {
                                setIconPickerOpen(false);
                                setActiveIconField(null);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
