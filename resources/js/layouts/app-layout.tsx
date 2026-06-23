import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

type Props = {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
};

export default function AppLayout({ children, breadcrumbs }: Props) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
