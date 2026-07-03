import {
    AlignJustify,
    BarChart2,
    CreditCard,
    Image as ImageIcon,
    Info,
    Layout,
    ListOrdered,
    MessageSquare,
    Phone,
    Star,
    Zap,
} from 'lucide-react';
import type { ElementType } from 'react';

export type Section = {
    key: string;
    label: string;
    icon: string;
    desc: string;
    is_visible: boolean;
};

export const iconMap: Record<string, ElementType> = {
    layout: Layout,
    image: ImageIcon,
    'bar-chart-2': BarChart2,
    info: Info,
    star: Star,
    'list-ordered': ListOrdered,
    'credit-card': CreditCard,
    'message-square': MessageSquare,
    zap: Zap,
    phone: Phone,
    'align-justify': AlignJustify,
};
