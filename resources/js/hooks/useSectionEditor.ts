import { useCallback, useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';
import type { VisitOptions } from '@inertiajs/core';
import { toast } from 'sonner';

export type Field = {
    key: string;
    value: any;
    type: 'text' | 'textarea' | 'image' | 'json';
    label: string;
    order: number;
};

function normalizeFieldValue(f: Field): Field {
    if (f.type === 'json' && Array.isArray(f.value)) {
        return {
            ...f,
            value: f.value.map((item) => {
                if (item && typeof item === 'object' && item._is_primitive_string) {
                    return item.value;
                }
                return item;
            }),
        };
    }
    return f;
}

export type SaveStatus = 'saved' | 'saving' | 'dirty' | 'error';

export function useSectionEditor(section: string, initialFields: Field[]) {
    const [localFields, setLocalFields] = useState<Field[]>(() =>
        initialFields.map(normalizeFieldValue),
    );
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');

    // Sync with initialFields when props update (e.g. after successful save)
    useEffect(() => {
        setLocalFields(initialFields.map(normalizeFieldValue));
    }, [initialFields]);

    // Track dirty state
    useEffect(() => {
        const normalizedInitial = initialFields.map(normalizeFieldValue);
        const hasChanged =
            JSON.stringify(localFields) !== JSON.stringify(normalizedInitial);
        if (hasChanged) {
            if (saveStatus !== 'saving' && saveStatus !== 'error') {
                setSaveStatus('dirty');
            }
        } else if (saveStatus !== 'saving') {
            setSaveStatus('saved');
        }
    }, [localFields, initialFields, saveStatus]);

    const handleChange = useCallback((key: string, value: string) => {
        setLocalFields((prev) =>
            prev.map((f) => (f.key === key ? { ...f, value } : f)),
        );
    }, []);

    const save = useCallback(
        (fieldsToSave: Field[]) => {
            setSaveStatus('saving');
            const formFields = fieldsToSave.map((f) => {
                let val = f.value;
                if (f.type === 'json' && Array.isArray(val)) {
                    val = val.map((item) => {
                        if (item && typeof item === 'object' && item._is_primitive_string) {
                            return item.value;
                        }
                        return item;
                    });
                }
                return { key: f.key, value: val };
            });

            router.post(
                `/admin/sections/${section}`,
                { fields: formFields },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSaveStatus('saved');
                        toast.success('Perubahan berhasil disimpan');
                    },
                    onError: () => {
                        setSaveStatus('error');
                        toast.error('Gagal menyimpan perubahan');
                    },
                } as VisitOptions,
            );
        },
        [section],
    );

    const setFieldValue = useCallback(
        (key: string, value: any) => {
            setLocalFields((prev) =>
                prev.map((f) => (f.key === key ? { ...f, value } : f)),
            );
        },
        [],
    );

    return {
        localFields,
        setLocalFields,
        saveStatus,
        setSaveStatus,
        handleChange,
        setFieldValue,
        save,
    };
}
