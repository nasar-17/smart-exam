import { Head } from '@inertiajs/react';
import { useScrollReveal, useStatsCounter } from '@/hooks/use-scroll-reveal';

import Navbar from '@/components/landing/navbar';
import Hero from '@/components/landing/hero';
import Stats from '@/components/landing/stats';
import About from '@/components/landing/about';
import Features from '@/components/landing/features';
import HowItWorks from '@/components/landing/how-it-works';
import Pricing from '@/components/landing/pricing';
import Testimonials from '@/components/landing/testimonials';
import CTA from '@/components/landing/cta';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

type ContentMap = Record<string, any>;

export default function Welcome({ content = {} }: { content?: ContentMap }) {
    useScrollReveal();
    useStatsCounter();

    return (
        <>
            <Head title="Smart Exam — Platform Ujian Digital untuk Institusi Modern" />
            <div
                className="min-h-screen bg-[#0d1117] text-white"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
            >
                <Navbar data={content.navbar} />
                <Hero data={content.hero} />
                <Stats data={content.stats} />
                <About data={content.about} />
                <Features data={content.features} />
                <HowItWorks data={content.howitworks} />
                <Pricing data={content.pricing} />
                <Testimonials data={content.testimonials} />
                <CTA data={content.cta} />
                <Contact data={content.contact} />
                <Footer data={content.footer} />
            </div>
        </>
    );
}
