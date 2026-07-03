import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CursorGlow from '@/components/cursor-glow';
import About from '@/components/landing/about';
import Contact from '@/components/landing/contact';
import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';
import Footer from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import Navbar from '@/components/landing/navbar';
import Pricing from '@/components/landing/pricing';
import Stats from '@/components/landing/stats';
import Testimonials from '@/components/landing/testimonials';
import { Toaster } from '@/components/ui/sonner';
import { useScrollReveal, useStatsCounter } from '@/hooks/use-scroll-reveal';
import { usePreviewListener } from '@/hooks/usePreviewListener';

type ContentMap = Record<string, any>;

type SectionItem = {
    key: string;
    label: string;
    is_visible: boolean;
};

export default function Welcome({ content = {}, sections = [] }: { content?: ContentMap; sections?: SectionItem[] }) {
    const [previewContent, setPreviewContent] = useState<ContentMap>(content);
    const [previewSection, setPreviewSection] = useState<string | null>(null);

    // Read URL query param to check if we are in section preview mode
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sectionParam = urlParams.get('preview_section');

        if (sectionParam) {
            setPreviewSection(sectionParam);
        }
    }, []);

    const handlePreviewData = useCallback(
        (data: ContentMap) => {
            setPreviewContent((prev) => ({
                ...prev,
                ...data,
            }));
        },
        [],
    );

    usePreviewListener({
        onPreviewData: handlePreviewData,
    });

    useScrollReveal();
    useStatsCounter();

    // Map keys to their React components
    const componentMap: Record<string, React.ComponentType<{ data: any }>> = useMemo(() => ({
        navbar: Navbar,
        hero: Hero,
        stats: Stats,
        about: About,
        features: Features,
        howitworks: HowItWorks,
        pricing: Pricing,
        testimonials: Testimonials,
        cta: CTA,
        contact: Contact,
        footer: Footer,
    }), []);

    // If previewSection is set, we want to isolate the preview of that section
    if (previewSection) {
        const Component = componentMap[previewSection];

        if (!Component) {
            return <div className="p-6 text-center text-slate-500">Preview tidak tersedia untuk bagian {previewSection}</div>;
        }

        return (
            <div
                className="dark w-full h-auto min-h-screen flex flex-col justify-start"
                style={{ background: '#0d1117', color: '#f1f5f9', fontFamily: "'Satoshi', sans-serif" }}
            >
                <style dangerouslySetInnerHTML={{__html: `
                    [data-preview-field] {
                        outline: 3px solid transparent;
                        outline-offset: 3px;
                        transition: outline-color 0.2s ease, box-shadow 0.2s ease;
                    }
                    .preview-highlight-active {
                        outline: 3px solid rgba(59,130,246,1) !important;
                        outline-offset: 3px;
                        box-shadow: 0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3) !important;
                        animation: preview-glow-pulse 1.2s ease-in-out infinite;
                    }
                    [data-preview-field="hero_bg_image"].preview-highlight-active {
                        outline: 5px solid rgba(255,255,255,1) !important;
                        outline-offset: -15px !important;
                        box-shadow: inset 0 0 80px rgba(255,255,255,0.95), inset 0 0 150px rgba(255,255,255,0.85) !important;
                        animation: preview-glow-pulse-inset-white 1.2s ease-in-out infinite;
                    }
                    [data-preview-field="btn_text"].preview-highlight-active {
                        outline: 3px solid rgba(255,255,255,1) !important;
                        outline-offset: 3px;
                        box-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4) !important;
                        animation: preview-glow-pulse-white 1.2s ease-in-out infinite;
                    }
                    @keyframes preview-glow-pulse {
                        0%, 100% { 
                            outline-color: transparent; 
                            box-shadow: 0 0 0 rgba(59,130,246,0) !important;
                        }
                        50% { 
                            outline-color: rgba(59,130,246,1); 
                            box-shadow: 0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3) !important;
                        }
                    }
                    @keyframes preview-glow-pulse-inset-white {
                        0%, 100% { 
                            outline-color: transparent; 
                            box-shadow: inset 0 0 0 rgba(255,255,255,0) !important;
                        }
                        50% { 
                            outline-color: rgba(255,255,255,1); 
                            box-shadow: inset 0 0 80px rgba(255,255,255,0.95), inset 0 0 150px rgba(255,255,255,0.85) !important;
                        }
                    }
                    @keyframes preview-glow-pulse-white {
                        0%, 100% { 
                            outline-color: transparent; 
                            box-shadow: 0 0 0 rgba(255,255,255,0) !important;
                        }
                        50% { 
                            outline-color: rgba(255,255,255,1); 
                            box-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4) !important;
                        }
                    }
                `}} />
                <Component data={previewContent[previewSection]} />
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Smart Exam — Platform Ujian Digital untuk Institusi Modern</title>
                <meta name="description" content="Platform ujian digital modern untuk sekolah dan institusi. Ujian online yang aman, anti-curang, hemat kertas, dan koreksi otomatis instan." />
            </Head>
            <div
                className="min-h-screen"
                style={{ background: 'var(--lp-bg-primary)', color: 'var(--lp-text-primary)', fontFamily: "'Satoshi', sans-serif" }}
            >
                {/* Navbar is pinned at the top */}
                <Navbar data={previewContent.navbar} />

                {/* Render sections dynamically according to their database sort order */}
                {sections.map((sec) => {
                    // Skip navbar and footer since they are pinned
                    if (sec.key === 'navbar' || sec.key === 'footer') {
                        return null;
                    }

                    // Skip if visibility is turned off
                    if (sec.is_visible === false) {
                        return null;
                    }

                    const Component = componentMap[sec.key];

                    if (!Component) {
                        return null;
                    }

                    return <Component key={sec.key} data={previewContent[sec.key]} />;
                })}

                {/* Footer is pinned at the bottom */}
                <Footer data={previewContent.footer} />
            </div>
            <Toaster />
            <CursorGlow />
        </>
    );
}
