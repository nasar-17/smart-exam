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
        <div className="space-y-1.5 w-full">
            <label className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 truncate whitespace-nowrap" title={label}>
                {label}
            </label>
            <div className="flex items-center gap-2 w-full">
                <div className="relative flex-1 min-w-0">
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="URL Gambar"
                        className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 pl-3.5 pr-20 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    />
                    <label className="absolute right-1.5 top-1.5 bottom-1.5 inline-flex cursor-pointer items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2.5 text-[11px] font-semibold transition border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 shadow-sm">
                        <Upload className="h-3 w-3" />
                        Upload
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
                </div>
                {previewUrl && (
                    <div className="h-11 w-11 shrink-0 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center shadow-sm">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

