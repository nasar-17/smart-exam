import { Upload } from 'lucide-react';
import React from 'react';
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
        <div className="space-y-1.5">
            <label className="block text-[13px] font-medium text-slate-500 dark:text-slate-400">
                {label}
            </label>
            <div className="space-y-3">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="URL gambar atau upload di bawah"
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
                <div className="flex items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-3.5 py-2 text-xs font-semibold transition border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm h-9">
                        <Upload className="h-3.5 w-3.5" />
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
                            className="h-10 w-auto rounded-lg border border-slate-200 dark:border-slate-800 object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

