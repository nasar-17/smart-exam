import * as LucideIcons from 'lucide-react';
import React from 'react';

// Cache for resolved icon names to avoid conversion overhead on every render
const iconCache: Record<string, React.ComponentType<any>> = {};

/**
 * Resolves a string icon name to a Lucide icon component dynamically.
 * Supports prefixes like 'lucide:', kebab-case ('shield-check'), lowercase ('users2'),
 * and exact PascalCase ('ShieldCheck').
 */
export function getLucideIcon(name: string | undefined | null): React.ComponentType<any> {
    if (!name) {
        return LucideIcons.BookOpen;
    }

    const cacheKey = String(name);
    if (iconCache[cacheKey]) {
        return iconCache[cacheKey];
    }

    // 1. Clean the name
    let cleanName = name.trim();
    if (cleanName.toLowerCase().startsWith('lucide:')) {
        cleanName = cleanName.substring(7);
    }

    // 2. Try exact match (e.g. "BookOpen", "Send")
    if (cleanName in LucideIcons) {
        const icon = (LucideIcons as any)[cleanName];
        iconCache[cacheKey] = icon;
        return icon;
    }

    // 3. Try converting kebab-case / snake_case to PascalCase (e.g. "shield-check" -> "ShieldCheck", "users-2" -> "Users2")
    const pascalName = cleanName
        .split(/[-_\s]+/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    if (pascalName in LucideIcons) {
        const icon = (LucideIcons as any)[pascalName];
        iconCache[cacheKey] = icon;
        return icon;
    }

    // 4. Try case-insensitive lookup
    const lowerClean = cleanName.toLowerCase();
    const lowerPascal = pascalName.toLowerCase();
    
    const allKeys = Object.keys(LucideIcons);
    for (const key of allKeys) {
        const lowerKey = key.toLowerCase();
        if (lowerKey === lowerClean || lowerKey === lowerPascal) {
            const icon = (LucideIcons as any)[key];
            iconCache[cacheKey] = icon;
            return icon;
        }
    }

    // Fallback icon
    return LucideIcons.BookOpen;
}

interface DynamicLucideIconProps {
    name: string | undefined | null;
    className?: string;
    size?: number | string;
    strokeWidth?: number;
    [key: string]: any;
}

export default function DynamicLucideIcon({
    name,
    className,
    size,
    strokeWidth,
    ...props
}: DynamicLucideIconProps) {
    const IconComponent = getLucideIcon(name);
    return (
        <IconComponent
            className={className}
            size={size}
            strokeWidth={strokeWidth}
            {...props}
        />
    );
}
