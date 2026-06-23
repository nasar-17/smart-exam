import { Head, Link, usePage } from '@inertiajs/react';
import {
    Layout,
    Image,
    BarChart2,
    Info,
    Star,
    ListOrdered,
    CreditCard,
    MessageSquare,
    Zap,
    Phone,
    AlignJustify,
} from 'lucide-react';

type Section = {
    key: string;
    label: string;
    icon: string;
    desc: string;
};

const iconMap: Record<string, React.ElementType> = {
    'layout': Layout,
    'image': Image,
    'bar-chart-2': BarChart2,
    'info': Info,
    'star': Star,
    'list-ordered': ListOrdered,
    'credit-card': CreditCard,
    'message-square': MessageSquare,
    'zap': Zap,
    'phone': Phone,
    'align-justify': AlignJustify,
};

export default function Dashboard() {
     
    const { adminSections } = usePage().props as any as { adminSections: Section[] };

    return (
        <div className="p-6">
            <Head title="Admin Dashboard" />
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Kelola Konten Landing Page
                </h2>
                <p className="text-sm text-gray-500">
                    Pilih section di bawah untuk mengedit konten yang ditampilkan di halaman landing page.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {adminSections.map((section) => {
                    const IconComponent = iconMap[section.icon] ?? Layout;

                    return (
                        <Link
                            key={section.key}
                            href={`/admin/sections/${section.key}`}
                            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-indigo-200 hover:shadow-md"
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                                    style={{ background: 'rgba(37, 99, 235, 0.08)' }}
                                >
                                    <IconComponent
                                        className="h-5 w-5"
                                        style={{ color: '#2563EB' }}
                                    />
                                </div>
                                <svg
                                    className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-800">{section.label}</h3>
                            <p className="mt-1 text-sm text-gray-500">{section.desc}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
