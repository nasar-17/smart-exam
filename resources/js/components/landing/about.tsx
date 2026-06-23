import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const institutions = [
    'UH|Universitas Hasanuddin',
    'SM|STMIK Makassar',
    'S5|SMA Negeri 5',
    'LP|LSP Nasional',
    'PU|Politeknik Ujung',
    'AT|Akademi Teknologi',
];

export default function About({ data }: { data?: any }) {
    return (
        <section id="about" className="py-24" style={{ background: '#0d1117' }}>
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="flex flex-col items-center gap-16 md:flex-row lg:gap-20">
                    {/* Left: Image (returned to original place with loop slide-left animation) */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                        className="w-full flex-1"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop"
                            alt="Students collaborating"
                            className="w-full rounded-2xl object-cover shadow-lg"
                            style={{
                                minHeight: 380,
                                maxHeight: 440,
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="w-full flex-1"
                    >
                        <div
                            className="mb-6 inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-400"
                            style={{
                                fontFamily: "'Sora', sans-serif",
                                color: '#60a5fa',
                            }}
                        >
                            Tentang Kami
                        </div>

                        <h2
                            className="mb-6 text-[38px] leading-tight font-bold tracking-tight text-white"
                            style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                            Kami Percaya Teknologi Bisa Membuat
                            <br />
                            <span className="gradient-text">
                                Pendidikan Lebih Adil
                            </span>
                        </h2>
                        <p className="mb-4 text-base leading-relaxed text-gray-400">
                            Smart Exam dikembangkan oleh tim Pallaka Techno —
                            startup teknologi pendidikan dari Makassar,
                            Indonesia. Kami memahami tantangan nyata yang
                            dihadapi institusi pendidikan dalam menyelenggarakan
                            ujian: kecurangan, biaya cetak soal, dan
                            keterbatasan waktu koreksi.
                        </p>
                        <p className="mb-8 text-base leading-relaxed text-gray-400">
                            Dengan Smart Exam, kami menghadirkan platform ujian
                            digital yang tidak hanya mudah digunakan, tapi juga
                            aman, terjangkau, dan bisa diakses dari mana saja.
                        </p>
                        <div
                            className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                            style={{ color: '#60a5fa' }}
                        >
                            Pelajari lebih lanjut tentang kami
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </motion.div>
                </div>

                {/* Dipercaya oleh institusi terkemuka (Moving/sliding loop from left to right) */}
                <div className="mt-24 border-t pt-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <p className="mb-8 text-center text-xs font-semibold tracking-widest text-white/20 uppercase">
                        Dipercaya oleh institusi terkemuka
                    </p>
                    <div className="relative w-full overflow-hidden">
                        {/* Gradient mask for fade edges */}
                        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none" />
                        
                        <motion.div 
                            className="flex gap-16 whitespace-nowrap w-max"
                            animate={{ x: [-1000, 0] }} // Loop from left to right
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 25
                            }}
                        >
                            {/* Render duplicated list for seamless looping */}
                            {[...institutions, ...institutions, ...institutions].map((inst, index) => {
                                const [abbr, name] = inst.split('|');
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 opacity-30 transition-opacity hover:opacity-60 shrink-0"
                                    >
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                                            style={{
                                                background: 'rgba(37, 99, 235, 0.15)',
                                                color: '#60a5fa',
                                            }}
                                        >
                                            {abbr}
                                        </div>
                                        <span className="text-sm font-semibold text-white/50">
                                            {name}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
