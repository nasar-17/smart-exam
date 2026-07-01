import { Head } from '@inertiajs/react';

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
    useScrollReveal();
    useStatsCounter();

    // Map keys to their React components
    const componentMap: Record<string, React.ComponentType<{ data: any }>> = {
        hero: Hero,
        stats: Stats,
        about: About,
        features: Features,
        howitworks: HowItWorks,
        pricing: Pricing,
        testimonials: Testimonials,
        cta: CTA,
        contact: Contact,
    };

    return (
        <>
            <Head title="Smart Exam — Platform Ujian Digital untuk Institusi Modern" />
            <div
                className="min-h-screen"
                style={{ background: 'var(--lp-bg-primary)', color: 'var(--lp-text-primary)', fontFamily: "'Satoshi', sans-serif" }}
            >
                {/* Navbar is pinned at the top */}
                <Navbar data={content.navbar} />

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

                    return <Component key={sec.key} data={content[sec.key]} />;
                })}

                {/* Footer is pinned at the bottom */}
                <Footer data={content.footer} />
            </div>
            <Toaster />
        </>
    );
}
