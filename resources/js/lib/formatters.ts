/**
 * Format a date string to Indonesian locale long format.
 * Example: "Senin, 1 Januari 2024"
 */
export function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Format a date string to Indonesian short format.
 * Example: "1 Jan 2024"
 */
export function formatDateShort(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Format a date string to time in WITA.
 * Example: "14:30 WITA"
 */
export function formatTime(dateStr: string): string {
    return (
        new Date(dateStr).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }) + ' WITA'
    );
}
