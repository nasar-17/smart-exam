import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

/**
 * Check if a value represents a boolean option.
 * Handles true/false literals, string 'true'/'false', and checks field naming conventions.
 */
export function isBooleanValue(
    val: unknown,
    fieldName?: string,
): boolean {
    if (typeof val === 'boolean') {
return true;
}

    if (val === 'true' || val === 'false') {
return true;
}

    if (fieldName) {
        const name = fieldName.toLowerCase();

        if (name === 'featured' || name === 'active' || name === 'is_visible' || name === 'enabled') {
            return true;
        }
    }

    return false;
}
