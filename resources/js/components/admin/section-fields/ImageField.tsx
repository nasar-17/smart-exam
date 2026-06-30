import React from 'react';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ImageFieldProps {
    label: string;
    value: string;
    previewUrl?: string;
    onChange: (val: string) => void;
    onUpload: (file: File) => void;
}

export default function ImageField({
    label,
    value,
    previewUrl,
    onChange,
    onUpload,
}: ImageFieldProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>
            <div className="space-y-3">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
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
                                const file = e.target.files?.[0];
                                if (file) {
                                    onUpload(file);
                                }
                            }}
                        />
                    </label>
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-16 w-auto rounded-xl ring-1 ring-slate-200/60 dark:ring-slate-700/60 object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
