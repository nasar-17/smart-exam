import { useCallback, useEffect, useRef } from 'react';
import type { Field } from './useSectionEditor';

export function usePreviewCommunication(section: string, localFields: Field[]) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const sendPreviewData = useCallback(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const previewData = localFields.reduce<Record<string, any>>(
                (acc, f) => {
                    acc[f.key] = f.value;

                    return acc;
                },
                {},
            );

            iframeRef.current.contentWindow.postMessage(
                {
                    type: 'smartexam-preview',
                    data: {
                        [section]: previewData,
                    },
                },
                '*',
            );
        }
    }, [localFields, section]);

    // Send preview data whenever fields change
    useEffect(() => {
        sendPreviewData();
    }, [sendPreviewData]);

    const focusField = useCallback((key: string) => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: 'smartexam-focus-field',
                    fieldKey: key,
                },
                '*',
            );
        }
    }, []);

    const blurField = useCallback((key: string) => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: 'smartexam-blur-field',
                    fieldKey: key,
                },
                '*',
            );
        }
    }, []);

    return { iframeRef, sendPreviewData, focusField, blurField };
}
