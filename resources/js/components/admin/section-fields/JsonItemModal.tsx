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
    activeModalIndex,
    modalData,
    setModalData,
    onSave,
    onCancel,
}: JsonItemModalProps) {
    const [iconPickerOpen, setIconPickerOpen] = useState(false);
    const [activeIconField, setActiveIconField] = useState<string | null>(null);

    const visibleKeys = filterUserKeys(modalData);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => {
 if (!open) {
onCancel();
} 
}}>
                <DialogContent className="max-w-2xl bg-white dark:bg-[#151d2a] border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-slate-800 dark:text-slate-100">
                            {activeModalIndex === -1 ? 'Tambah Item Baru' : 'Edit Item'}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 my-2 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                        {modalData._is_primitive_string ? (
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
