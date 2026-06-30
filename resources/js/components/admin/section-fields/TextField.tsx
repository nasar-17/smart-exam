import React from 'react';
import { Input } from '@/components/ui/input';

interface TextFieldProps {
    label: string;
    value: string;
    isTextArea?: boolean;
    onChange: (val: string) => void;
}

export default function TextField({
    label,
    value,
    isTextArea = false,
    onChange,
}: TextFieldProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-none focus:bg-white dark:focus:bg-[#1e293b] focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all resize-y ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                />
            ) : (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl border-0 bg-[#f1f5f9] dark:bg-[#1e293b] px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-none focus:bg-white dark:focus:bg-[#1e293b] focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all h-auto ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                />
            )}
        </div>
    );
}
