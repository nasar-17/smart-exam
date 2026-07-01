import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { edit as appearanceEdit } from '@/routes/appearance';
import { edit as profileEdit } from '@/routes/profile';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: profileEdit().url,
    },
    {
        title: 'Password',
        href: '/settings/password',
    },
    {
        title: 'Appearance',
        href: appearanceEdit().url,
    },
];

type Props = {
    children: ReactNode;
};

export default function SettingsLayout({ children }: Props) {
    const currentUrl = usePage().url;

    return (
        <div className="space-y-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />
            <Separator />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.title}
                                variant={currentUrl === item.href ? 'secondary' : 'ghost'}
                                size="sm"
                                className={cn(
                                    'justify-start',
                                    currentUrl === item.href && 'bg-muted font-medium hover:bg-muted',
                                )}
                                asChild
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 md:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}
