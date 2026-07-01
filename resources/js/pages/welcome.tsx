import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

type ContentMap = Record<string, any>;

type SectionItem = {
    key: string;
    label: string;
    is_visible: boolean;
};

export default function Welcome({ content = {}, sections = [] }: { content?: ContentMap; sections?: SectionItem[] }) {
    const [previewContent, setPreviewContent] = useState<ContentMap>(content);
    const [previewSection, setPreviewSection] = useState<string | null>(null);

    useEffect(() => {
        // Read URL query param to check if we are in section preview mode
        const urlParams = new URLSearchParams(window.location.search);
        const sectionParam = urlParams.get('preview_section');
        if (sectionParam) {
            setPreviewSection(sectionParam);
        }

        // Listen for postMessage changes from SectionEditor
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type === 'smartexam-preview') {
                setPreviewContent((prev) => ({
                    ...prev,
                    ...event.data.data
                }));
            } else if (event.data && event.data.type === 'smartexam-focus-field') {
                const key = event.data.fieldKey;
                console.log('[Welcome] Received smartexam-focus-field:', key);
                // Small delay to ensure React has finished rendering the section in the iframe
                setTimeout(() => {
                    const element = document.querySelector(`[data-preview-field="${key}"]`);
                    console.log('[Welcome] querySelector result for', key, ':', element);
                    document.querySelectorAll('.preview-highlight-active').forEach((el) => {
                        el.classList.remove('preview-highlight-active');
                    });
                    if (element) {
                        element.classList.add('preview-highlight-active');
                        console.log('[Welcome] Added preview-highlight-active class to:', element);
                    } else {
                        console.warn('[Welcome] Element NOT FOUND for data-preview-field:', key);
                        console.log('[Welcome] All data-preview-field elements:', document.querySelectorAll('[data-preview-field]'));
                    }
                }, 50);
            } else if (event.data && event.data.type === 'smartexam-blur-field') {
                const key = event.data.fieldKey;
                const element = document.querySelector(`[data-preview-field="${key}"]`);
                if (element) {
                    element.classList.remove('preview-highlight-active');
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    useScrollReveal();
    useStatsCounter();

    // Map keys to their React components
    const componentMap: Record<string, React.ComponentType<{ data: any }>> = {
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
    };

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
                        transition: outline-color 0.25s ease;
                    }
                    .preview-highlight-active {
                        outline-color: rgba(59,130,246,0.9) !important;
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
        </>
    );
}
