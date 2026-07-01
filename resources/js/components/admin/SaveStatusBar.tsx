import { Link } from '@inertiajs/react';
import type { SaveStatus } from '@/hooks/useSectionEditor';

type SaveStatusBarProps = {
    section: string;
    saveStatus: SaveStatus;
    onSave: () => void;
};

export default function SaveStatusBar({ section, saveStatus, onSave }: SaveStatusBarProps) {
    return (
        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-[#151d2a]/80 backdrop-blur-md px-6 py-4 mt-auto">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin"
                    className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                >
                    Kembali
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onSave}
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
                                Tersimpan
                            </span>
                        )}
                        {saveStatus === 'dirty' && (
                            <span className="flex items-center gap-1.5 text-amber-500 animate-pulse">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                Ada perubahan
                            </span>
                        )}
                        {saveStatus === 'error' && (
                            <span className="flex items-center gap-1.5 text-rose-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                Gagal
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
