import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
};

export default function AuthLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen w-screen items-center justify-center overflow-hidden bg-[#ecf2fb] px-6 py-10 transition-colors duration-300 dark:bg-[#090d16]">
            <div className="relative w-full max-w-[440px]">
                <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-700/20" />
                <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-700/10" />

                <div className="relative rounded-[2rem] bg-[#ecf2fb] px-8 py-10 shadow-[18px_18px_36px_rgba(163,177,198,0.55),-18px_-18px_36px_rgba(255,255,255,0.9)] dark:bg-[#151d2a] dark:shadow-[18px_18px_36px_rgba(0,0,0,0.38),-18px_-18px_36px_rgba(255,255,255,0.03)] sm:px-10">
                    <Link href="/" className="mb-8 flex flex-col items-center gap-3">
                        <img src="/Logo smart exam.png" alt="Smart Exam" className="h-14 w-auto drop-shadow-sm" />
                        <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100" style={{ fontFamily: "'Sora', sans-serif" }}>
                            Smart<span className="text-blue-600">Exam</span>
                        </span>
                    </Link>

                    {children}
                </div>
            </div>
        </div>
    );
}
