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
        <div className="space-y-1.5">
            <label 
                className="block text-[13px] font-medium text-slate-500 dark:text-slate-400 truncate whitespace-nowrap" 
                title={label}
            >
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-y"
                />
            ) : (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
            )}
        </div>
    );
}

