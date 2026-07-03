import { Head, router, usePage } from '@inertiajs/react';
import { Lock, Mail, Save, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    mustVerifyEmail?: boolean;
    status?: string;
};

export default function SettingsAkun({ mustVerifyEmail, status }: Props) {
    const { auth } = usePage().props;
    const [name, setName] = useState(auth?.user?.name ?? '');
    const [email, setEmail] = useState(auth?.user?.email ?? '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [saving, setSaving] = useState<'none' | 'profile' | 'password'>('none');

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving('profile');
        router.patch('/admin/settings-akun/profile', { name, email }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profil berhasil diperbarui');
                setSaving('none');
            },
            onError: () => {
                toast.error('Gagal memperbarui profil');
                setSaving('none');
            },
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving('password');
        router.put('/admin/settings-akun/password', {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: newPasswordConfirmation,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Password berhasil diubah');
                setCurrentPassword('');
                setNewPassword('');
                setNewPasswordConfirmation('');
                setSaving('none');
            },
            onError: () => {
                toast.error('Gagal mengubah password');
                setSaving('none');
            },
        });
    };

    return (
        <>
            <Head title="Settings" />

            <div className="mx-auto max-w-2xl space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100" style={{ fontFamily: "'Sora', sans-serif" }}>
                        Settings
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Kelola informasi akun dan password Anda
                    </p>
                </div>

                {status && (
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        {status}
                    </div>
                )}

                {/* Profile Card */}
                <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#151d2a] shadow-sm">
                    <div className="border-b border-slate-100 dark:border-slate-800/80 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/50">
                                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Informasi Profil</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Nama dan alamat email Anda</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleProfileSubmit} className="space-y-5 px-6 py-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={saving === 'profile'}
                                className="h-11 rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {saving === 'profile' ? 'Menyimpan...' : 'Simpan Profil'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Password Card */}
                <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#151d2a] shadow-sm">
                    <div className="border-b border-slate-100 dark:border-slate-800/80 px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/50">
                                <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Ganti Password</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Minimal 8 karakter dengan huruf dan angka</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handlePasswordSubmit} className="space-y-5 px-6 py-5">
                        <div className="space-y-2">
                            <Label htmlFor="current_password">Password Saat Ini</Label>
                            <Input
                                id="current_password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new_password">Password Baru</Label>
                            <Input
                                id="new_password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new_password_confirmation">Konfirmasi Password Baru</Label>
                            <Input
                                id="new_password_confirmation"
                                type="password"
                                value={newPasswordConfirmation}
                                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                className="h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={saving === 'password'}
                                className="h-11 rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {saving === 'password' ? 'Menyimpan...' : 'Ubah Password'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
