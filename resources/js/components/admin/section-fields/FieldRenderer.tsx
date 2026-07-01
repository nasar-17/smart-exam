import TextField from '@/components/admin/section-fields/TextField';
import ImageField from '@/components/admin/section-fields/ImageField';
import JsonField from '@/components/admin/section-fields/JsonField';
import type { Field } from '@/hooks/useSectionEditor';

type FieldRendererProps = {
    field: Field;
    previewUrl?: string;
    onChange: (key: string, value: string) => void;
    onImageUpload: (key: string, file: File) => void;
    onOpenAddModal: (fieldKey: string, field: Field) => void;
    onOpenEditModal: (fieldKey: string, index: number, item: Record<string, any>) => void;
    onDeleteItem: (key: string, index: number) => void;
    onReorderItems: (key: string, newItems: Record<string, any>[]) => void;
    onFocus: (key: string) => void;
    onBlur: (key: string) => void;
};

export default function FieldRenderer({
    field,
    previewUrl,
    onChange,
    onImageUpload,
    onOpenAddModal,
    onOpenEditModal,
    onDeleteItem,
    onReorderItems,
    onFocus,
    onBlur,
}: FieldRendererProps) {
    const renderFieldContent = () => {
        switch (field.type) {
            case 'text':
                return (
                    <TextField
                        label={field.label}
                        value={String(field.value ?? '')}
                        onChange={(val) => onChange(field.key, val)}
                    />
                );
            case 'textarea':
                return (
                    <TextField
                        label={field.label}
                        value={String(field.value ?? '')}
                        isTextArea
                        onChange={(val) => onChange(field.key, val)}
                    />
                );
            case 'image':
                return (
                    <ImageField
                        label={field.label}
                        value={String(field.value ?? '')}
                        previewUrl={previewUrl}
                        onChange={(val) => onChange(field.key, val)}
                        onUpload={(file) => onImageUpload(field.key, file)}
                    />
                );
            case 'json':
                return (
                    <JsonField
                        label={field.label}
                        fieldKey={field.key}
                        items={getJsonItems(field)}
                        onAdd={() => onOpenAddModal(field.key, field)}
                        onEdit={(idx, item) => onOpenEditModal(field.key, idx, item)}
                        onDelete={(idx) => onDeleteItem(field.key, idx)}
                        onReorder={(newItems) => onReorderItems(field.key, newItems)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            onMouseEnter={() => onFocus(field.key)}
            onMouseLeave={() => onBlur(field.key)}
        >
            {renderFieldContent()}
        </div>
    );
}

function getJsonItems(field: Field): Record<string, any>[] {
    if (Array.isArray(field.value)) {
        return field.value.map((item) => {
            if (typeof item === 'string') {
                return { _is_primitive_string: true, value: item };
            }
            return item as Record<string, any>;
        });
    }
    return [];
}
