import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import type { Field } from './useSectionEditor';

export type ModalState = {
    fieldKey: string | null;
    index: number | null;
    data: Record<string, any>;
};

export function useJsonFieldManager(
    localFields: Field[],
    setLocalFields: React.Dispatch<React.SetStateAction<Field[]>>,
) {
    const [modal, setModal] = useState<ModalState>({
        fieldKey: null,
        index: null,
        data: {},
    });

    const getJsonItems = useCallback(
        (field: Field): Record<string, any>[] => {
            if (Array.isArray(field.value)) {
                return field.value.map((item) => {
                    if (typeof item === 'string') {
                        return { _is_primitive_string: true, value: item };
                    }
                    return item as Record<string, any>;
                });
            }
            return [];
        },
        [],
    );

    const openEditModal = useCallback(
        (fieldKey: string, index: number, item: Record<string, any>) => {
            setModal({ fieldKey, index, data: { ...item } });
        },
        [],
    );

    const openAddModal = useCallback(
        (fieldKey: string, field: Field) => {
            const items = getJsonItems(field);
            let template: Record<string, any> = {};

            if (items.length > 0) {
                const last = items[items.length - 1];
                template = Object.fromEntries(
                    Object.entries(last).map(([k, v]) => {
                        if (k.toLowerCase() === 'id') {
                            return [k, ''];
                        }
                        return [
                            k,
                            Array.isArray(v)
                                ? []
                                : typeof v === 'number'
                                    ? 0
                                    : '',
                        ];
                    }),
                );
            } else {
                template = { title: '', description: '', icon: '' };
            }

            setModal({ fieldKey, index: -1, data: template });
        },
        [getJsonItems],
    );

    const closeModal = useCallback(() => {
        setModal({ fieldKey: null, index: null, data: {} });
    }, []);

    const setModalData = useCallback(
        (dataOrFn: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => {
            setModal((prev) => ({
                ...prev,
                data:
                    typeof dataOrFn === 'function'
                        ? (dataOrFn as (prev: Record<string, any>) => Record<string, any>)(prev.data)
                        : dataOrFn,
            }));
        },
        [],
    );

    const saveModalData = useCallback(() => {
        const { fieldKey, index } = modal;
        if (fieldKey === null || index === null) return;

        setLocalFields((prev) =>
            prev.map((f) => {
                if (f.key !== fieldKey) return f;

                const items = getJsonItems(f);
                const updatedItems = [...items];

                const cleanedData = { ...modal.data };

                if (index === -1) {
                    updatedItems.push(cleanedData);
                } else {
                    const originalItem = items[index];
                    if (originalItem && 'id' in originalItem) {
                        cleanedData.id = originalItem.id;
                    }
                    updatedItems[index] = cleanedData;
                }

                const finalValue = updatedItems.map((item) => {
                    if (item._is_primitive_string) return item.value;
                    const c = { ...item };
                    delete c._is_primitive_string;
                    return c;
                });

                return { ...f, value: finalValue };
            }),
        );

        closeModal();
        toast.success('Item berhasil diupdate dalam daftar');
    }, [modal, setLocalFields, getJsonItems, closeModal]);

    const removeItem = useCallback(
        (key: string, index: number) => {
            setLocalFields((prev) =>
                prev.map((f) => {
                    if (f.key !== key) return f;

                    const items = getJsonItems(f);
                    const filtered = items.filter((_, i) => i !== index);
                    const finalValue = filtered.map((item) => {
                        if (item._is_primitive_string) return item.value;
                        return item;
                    });

                    return { ...f, value: finalValue };
                }),
            );
        },
        [setLocalFields, getJsonItems],
    );

    const reorderItems = useCallback(
        (key: string, newItems: Record<string, any>[]) => {
            const unwrappedItems = newItems.map((item) => {
                if (item && typeof item === 'object' && item._is_primitive_string) {
                    return item.value;
                }
                return item;
            });
            setLocalFields((prev) =>
                prev.map((f) => (f.key === key ? { ...f, value: unwrappedItems } : f)),
            );
        },
        [setLocalFields],
    );

    return {
        modal,
        setModalData,
        openEditModal,
        openAddModal,
        closeModal,
        saveModalData,
        removeItem,
        reorderItems,
        getJsonItems,
    };
}
