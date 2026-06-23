import type { ReactNode } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
};

export default function AuthLayout({ children, title, description }: Props) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="/" className="flex items-center gap-2 self-center font-medium">
                    <AppLogoIcon className="size-8" />
                </a>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </div>
        </div>
    );
}
