import { Form, Head } from '@inertiajs/react';
import { Lock, LogIn, Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Login" />

            <div className="space-y-7">
                <div className="text-center">
                    <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-50" style={{ fontFamily: "'Sora', sans-serif" }}>
                        Login
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Masuk untuk mengelola Smart Exam
                    </p>
                </div>

                {status && (
                    <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700 shadow-[inset_5px_5px_10px_rgba(163,177,198,0.18),inset_-5px_-5px_10px_rgba(255,255,255,0.8)] dark:bg-emerald-950/20 dark:text-emerald-400">
                        {status}
                    </div>
                )}

                <Form {...store.form()} resetOnSuccess={['password']} className="space-y-5">
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="sr-only">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="Email Address"
                                        className="h-14 rounded-2xl border-0 bg-[#ecf2fb] pl-14 pr-5 text-sm font-medium text-slate-800 shadow-[inset_7px_7px_14px_rgba(163,177,198,0.45),inset_-7px_-7px_14px_rgba(255,255,255,0.9)] outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500/35 dark:bg-[#111827] dark:text-white dark:shadow-[inset_7px_7px_14px_rgba(0,0,0,0.3),inset_-7px_-7px_14px_rgba(255,255,255,0.03)]"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="sr-only">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink href={request()} className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400" tabIndex={5}>
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className="h-14 rounded-2xl border-0 bg-[#ecf2fb] pl-14 pr-5 text-sm font-medium text-slate-800 shadow-[inset_7px_7px_14px_rgba(163,177,198,0.45),inset_-7px_-7px_14px_rgba(255,255,255,0.9)] outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500/35 dark:bg-[#111827] dark:text-white dark:shadow-[inset_7px_7px_14px_rgba(0,0,0,0.3),inset_-7px_-7px_14px_rgba(255,255,255,0.03)]"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <Checkbox id="remember" name="remember" tabIndex={3} className="border-slate-300 text-blue-600 focus:ring-blue-600 dark:border-slate-600" />
                                <Label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                    Ingat saya
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                tabIndex={4}
                                disabled={processing}
                                className="h-14 w-full rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-[0_16px_28px_-14px_rgba(37,99,235,0.9)] transition hover:bg-blue-700 hover:shadow-[0_18px_32px_-14px_rgba(37,99,235,1)] disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <Spinner />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Sign In
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Login.layout = {
    title: '',
    description: '',
};
