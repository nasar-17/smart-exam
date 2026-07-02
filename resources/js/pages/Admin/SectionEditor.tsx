import { Head, router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import FieldRenderer from '@/components/admin/section-fields/FieldRenderer';
import JsonItemModal from '@/components/admin/section-fields/JsonItemModal';
import PreviewPanel from '@/components/admin/PreviewPanel';
import SaveStatusBar from '@/components/admin/SaveStatusBar';
import { useSectionEditor } from '@/hooks/useSectionEditor';
import type { Field } from '@/hooks/useSectionEditor';
import { useJsonFieldManager } from '@/hooks/useJsonFieldManager';
import { usePreviewCommunication } from '@/hooks/usePreviewCommunication';

type Props = {
    section: string;
    fields: Field[];
};

export default function SectionEditor({ section, fields }: Props) {
    const { localFields, setLocalFields, saveStatus, save, handleChange, setFieldValue } =
        useSectionEditor(section, fields);

    const { iframeRef, sendPreviewData, focusField, blurField } =
        usePreviewCommunication(section, localFields);

    const {
        modal,
        setModalData,
        openEditModal,
        openAddModal,
        closeModal,
        saveModalData,
        removeItem,
        reorderItems,
        getJsonItems,
    } = useJsonFieldManager(localFields, setLocalFields);

    const [previewUrls, setPreviewUrls] = useState<Record<string, string>>(() => {
        const urls: Record<string, string> = {};
        fields.forEach((f) => {
            if (f.type === 'image' && typeof f.value === 'string' && f.value) {
                urls[f.key] = f.value;
            }
        });
        return urls;
    });

    useEffect(() => {
        sendPreviewData();
    }, [sendPreviewData]);

    const handleImageUpload = useCallback(
        async (key: string, file: File) => {
            const formData = new window.FormData();
            formData.append('image', file);

            const csrfToken =
                document.cookie
                    .split('; ')
                    .find((c) => c.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1] ?? '';

            try {
                const res = await fetch('/admin/upload-image', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                    },
                });
                const data = await res.json();

                if (data.url) {
                    handleChange(key, data.url);
                    setPreviewUrls((prev) => ({ ...prev, [key]: data.url }));
                    toast.success('Gambar berhasil diupload');
                }
            } catch {
                toast.error('Gagal upload gambar');
            }
        },
        [handleChange],
    );

    const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);
    const isNavbar = section === 'navbar';
    const jsonFields = localFields.filter((f) => f.type === 'json');
    const nonJsonFields = localFields.filter((f) => f.type !== 'json' && f.key !== 'header_badge');

    const isFullWidthField = (field: Field) => {
        if (field.type === 'textarea') return true;
        const key = field.key.toLowerCase();
        return (
            key === 'brand_name' ||
            key.includes('title') ||
            key.includes('description') ||
            key.includes('subtitle') ||
            key.includes('address')
        );
    };

    const renderCombinedNonJsonFields = (fields: Field[], cols: 2 | 3 = 2) => (
        <div className={`grid grid-cols-1 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-x-6 gap-y-4 items-start`}>
            {fields.map((field) => {
                const fullWidth = isFullWidthField(field);
                return (
                    <div
                        key={field.key}
                        className={
                            fullWidth
                                ? cols === 3
                                    ? 'md:col-span-3'
                                    : 'md:col-span-2'
                                : 'md:col-span-1'
                        }
                    >
                        <FieldRenderer
                            field={field}
                            previewUrl={previewUrls[field.key]}
                            onChange={handleChange}
                            onImageUpload={handleImageUpload}
                            onOpenAddModal={openAddModal}
                            onOpenEditModal={openEditModal}
                            onDeleteItem={removeItem}
                            onReorderItems={reorderItems}
                            onFocus={focusField}
                            onBlur={blurField}
                        />
                    </div>
                );
            })}
        </div>
    );

    const renderJsonFieldCard = (field: Field) => (
        <div
            key={field.key}
            className="bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm"
        >
            <FieldRenderer
                field={field}
                previewUrl={previewUrls[field.key]}
                onChange={handleChange}
                onImageUpload={handleImageUpload}
                onOpenAddModal={openAddModal}
                onOpenEditModal={openEditModal}
                onDeleteItem={removeItem}
                onReorderItems={reorderItems}
                onFocus={focusField}
                onBlur={blurField}
            />
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-[#0f172a]">
            <Head title={`Edit ${sectionLabel}`} />

            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden"
            >
                {/* Left Side: Form Editor */}
                <div className="w-full lg:w-1/2 flex flex-col min-h-0 border-r border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#151d2a]">
                    <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar space-y-6">
                        {jsonFields.length > 0 ? (
                            <div className="space-y-6">
                                {nonJsonFields.length > 0 && (
                                    <div className="bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                {isNavbar ? 'Brand Settings' : `${sectionLabel} Settings`}
                                            </h3>
                                            <p className="text-[12px] text-slate-500 dark:text-slate-400">
                                                {isNavbar
                                                    ? 'Kelola identitas brand dan tombol utama.'
                                                    : `Kelola pengaturan konten untuk section ${sectionLabel}.`}
                                            </p>
                                        </div>
                                        <div className="border-t border-slate-100 dark:border-slate-800/80 my-3" />
                                        {renderCombinedNonJsonFields(nonJsonFields, 2)}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {jsonFields.map(renderJsonFieldCard)}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-[#151d2a] rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                        {`${sectionLabel} Settings`}
                                    </h3>
                                    <p className="text-[12px] text-slate-500 dark:text-slate-400">
                                        {`Kelola pengaturan konten untuk section ${sectionLabel}.`}
                                    </p>
                                </div>
                                <div className="border-t border-slate-100 dark:border-slate-800/80 my-3" />
                                {section === 'stats' ? (
                                    <div className="flex flex-col gap-4">
                                        {[1, 2, 3, 4].map((num) => {
                                            const valField = nonJsonFields.find((f) => f.key === `stat_${num}_value`);
                                            const labelField = nonJsonFields.find((f) => f.key === `stat_${num}_label`);
                                            return (
                                                <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pb-4 border-b border-slate-100/50 dark:border-slate-800/50 last:border-0 last:pb-0">
                                                    {valField && (
                                                        <FieldRenderer
                                                            field={valField}
                                                            previewUrl={previewUrls[valField.key]}
                                                            onChange={handleChange}
                                                            onImageUpload={handleImageUpload}
                                                            onOpenAddModal={openAddModal}
                                                            onOpenEditModal={openEditModal}
                                                            onDeleteItem={removeItem}
                                                            onReorderItems={reorderItems}
                                                            onFocus={focusField}
                                                            onBlur={blurField}
                                                        />
                                                    )}
                                                    {labelField && (
                                                        <FieldRenderer
                                                            field={labelField}
                                                            previewUrl={previewUrls[labelField.key]}
                                                            onChange={handleChange}
                                                            onImageUpload={handleImageUpload}
                                                            onOpenAddModal={openAddModal}
                                                            onOpenEditModal={openEditModal}
                                                            onDeleteItem={removeItem}
                                                            onReorderItems={reorderItems}
                                                            onFocus={focusField}
                                                            onBlur={blurField}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    renderCombinedNonJsonFields(nonJsonFields, 3)
                                )}
                            </div>
                        )}
                    </div>

                    <SaveStatusBar
                        section={section}
                        saveStatus={saveStatus}
                        onSave={() => save(localFields)}
                    />
                </div>

                {/* Right Side: Live Preview */}
                <PreviewPanel
                    section={section}
                    iframeRef={iframeRef}
                    onLoad={sendPreviewData}
                />
            </form>

            {/* JSON Item Modal */}
            <JsonItemModal
                isOpen={modal.fieldKey !== null}
                activeModalIndex={modal.index ?? -1}
                modalData={modal.data}
                setModalData={setModalData}
                onSave={saveModalData}
                onCancel={closeModal}
            />
        </div>
    );
}
