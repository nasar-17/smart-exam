import { Monitor, Smartphone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type PreviewPanelProps = {
    section: string;
    iframeRef: React.RefObject<HTMLIFrameElement | null>;
    onLoad: () => void;
};

export default function PreviewPanel({ section, iframeRef, onLoad }: PreviewPanelProps) {
    const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        if (!containerRef.current) {
return;
}

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // Ensure we get non-zero measurements
                setContainerDimensions({
                    width: entry.contentRect.width || 800,
                    height: entry.contentRect.height || 600
                });
            }
        });
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

    return (
        <div className="hidden lg:flex lg:w-1/2 flex-col min-h-0 bg-slate-50 dark:bg-[#0b0f19]">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-[#151d2a]">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Live Preview ({sectionLabel})
                </span>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                    <button
                        type="button"
                        onClick={() => setViewport('desktop')}
                        className={`p-1.5 rounded-lg transition-colors ${
                            viewport === 'desktop'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title="Desktop View"
                    >
                        <Monitor className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewport('mobile')}
                        className={`p-1.5 rounded-lg transition-colors ${
                            viewport === 'mobile'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title="Mobile View"
                    >
                        <Smartphone className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Preview Viewport Frame */}
            <div ref={containerRef} className="flex-1 overflow-hidden p-6 flex justify-center items-center w-full">
                {viewport === 'desktop' ? (
                    <div
                        className="w-full transition-all duration-300 ease-in-out border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden relative"
                        style={{
                            height: `${Math.max(100, containerDimensions.width * (9 / 16))}px`,
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            src={`/?preview_section=${section}`}
                            onLoad={onLoad}
                            tabIndex={-1}
                            style={{
                                width: '1280px',
                                height: '720px',
                                transform: `scale(${Math.max(0.1, containerDimensions.width / 1280)})`,
                                transformOrigin: 'top left',
                                border: '0',
                                outline: '0',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        />
                    </div>
                ) : (() => {
                    const scaleX = (containerDimensions.width * 0.9) / 375;
                    const scaleY = (containerDimensions.height * 0.9) / 667;
                    const scale = Math.max(0.1, Math.min(scaleX, scaleY, 1));

                    return (
                        <div
                            className="transition-all duration-300 ease-in-out border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden relative"
                            style={{
                                width: `${375 * scale}px`,
                                height: `${667 * scale}px`,
                            }}
                        >
                            <iframe
                                ref={iframeRef}
                                src={`/?preview_section=${section}`}
                                onLoad={onLoad}
                                tabIndex={-1}
                                style={{
                                    width: '375px',
                                    height: '667px',
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top left',
                                    border: '0',
                                    outline: '0',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                }}
                                className="animate-fade-in"
                            />
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
