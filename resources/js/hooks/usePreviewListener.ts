import { useCallback, useEffect, useRef } from 'react';

type ContentMap = Record<string, any>;

type UsePreviewListenerOptions = {
    onPreviewData: (data: ContentMap) => void;
};

export function usePreviewListener({ onPreviewData }: UsePreviewListenerOptions) {
    const onPreviewDataRef = useRef(onPreviewData);
    onPreviewDataRef.current = onPreviewData;

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            switch (event.data?.type) {
                case 'smartexam-preview':
                    onPreviewDataRef.current(event.data.data);
                    break;

                case 'smartexam-focus-field': {
                    const key = event.data.fieldKey;
                    setTimeout(() => {
                        document
                            .querySelectorAll('.preview-highlight-active')
                            .forEach((el) =>
                                el.classList.remove('preview-highlight-active'),
                            );
                        const element = document.querySelector(
                            `[data-preview-field="${key}"]`,
                        );

                        if (element) {
                            element.classList.add('preview-highlight-active');
                        }
                    }, 50);
                    break;
                }

                case 'smartexam-blur-field': {
                    const key = event.data.fieldKey;
                    const element = document.querySelector(
                        `[data-preview-field="${key}"]`,
                    );

                    if (element) {
                        element.classList.remove('preview-highlight-active');
                    }

                    break;
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => window.removeEventListener('message', handleMessage);
    }, []);
}
