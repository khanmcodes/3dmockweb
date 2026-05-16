import { useState } from 'react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const SECTIONS = [
    {
        id: 'about',
        title: 'About',
        content: (
            <div className="space-y-6">
                <p className="font-serif text-[2rem] font-normal italic leading-[1.55] tracking-[-0.01em] text-[#1a1a18] md:text-[2rem] md:leading-[1.5]">
                    Studio Vortessa creates sculptural furniture and objects that exist between art and function.
                </p>
                <p className="max-w-full font-sans text-[0.9375rem] font-light leading-[1.1] tracking-tight text-[#3d3d3a] md:text-[2rem]">
                    The studio approaches furniture as spatial composition — objects that shape atmosphere rather than simply occupy space. Through sculptural forms, refined materials, and quiet geometry, Studio Vortessa explores a new dimension of living where interiors become environments of presence.
                </p>
                {/* <p className="max-w-prose border-l-2 border-accent-gold/45 pl-4 font-sans text-[0.9rem] font-light leading-[1.85] text-[#4a4a47] md:text-[0.95rem]">
                    Guided by the belief that less is more, each piece is reduced to its essential form, conceived as an artifact rather than an object of trend.
                </p> */}
                <ul className="space-y-3 pt-2">
                    <li className="flex gap-3 font-sans text-[0.82rem] font-medium uppercase tracking-[0.14em] text-[#2a2a28]">
                        <span className="mt-2 h-px w-8 shrink-0 bg-black/25" aria-hidden />
                        Forms distilled to their essence.
                    </li>
                    <li className="flex gap-3 font-sans text-[0.82rem] font-medium uppercase tracking-[0.14em] text-[#2a2a28]">
                        <span className="mt-2 h-px w-8 shrink-0 bg-black/25" aria-hidden />
                        Materials chosen for permanence.
                    </li>
                    <li className="flex gap-3 font-sans text-[0.82rem] font-medium uppercase tracking-[0.14em] text-[#2a2a28]">
                        <span className="mt-2 h-px w-8 shrink-0 bg-black/25" aria-hidden />
                        Objects designed to inhabit space with quiet authority.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: 'manifesto',
        title: 'Manifesto',
        content: (
            <div className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
                    <div className="space-y-4">
                        <p className="font-mono text-[1rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                            Affirmation
                        </p>
                        <div className="space-y-3 font-serif text-[1.05rem] font-normal lowercase italic leading-snug text-[#1c1c1a] md:text-[2rem]">
                            <p>art as furniture.</p>
                            <p>objects as artifacts.</p>
                            <p>spaces as sanctuaries.</p>
                        </div>
                    </div>
                    <div className="space-y-4 border-t border-black/10 pt-6 sm:border-t-0 sm:border-l sm:pl-10 sm:pt-0">
                        <p className="font-mono text-[1rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                            Discipline
                        </p>
                        <div className="space-y-3 font-sans text-[0.78rem] font-medium leading-relaxed tracking-tight text-[#2f2f2c] md:text-[2rem]">
                            <p className="border-b border-black/8 pb-3">Silence Over Excess.</p>
                            <p className="border-b border-black/8 pb-3">Form Over Ornament.</p>
                            <p>material over trend.</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'founder',
        title: 'Founder',
        content: (
            <div className="space-y-6 md:space-y-7">
                <p className="max-w-3xl font-sans text-[2rem] font-medium leading-[1.35] tracking-tight text-[#181816]">
                    Çilga Yesilyaprak <span className='text-[#181816a1]'>is a Turkish–American designer based in New York and the founder of Studio Vortessa.</span>
                </p>
                <p className="max-w-3xl font-sans text-[1.05rem] font-light leading-[1.85] text-[#454542] md:text-[1.15rem] md:leading-[1.9]">
                    Çilga Yesilyaprak is a Turkish–American designer based in New York and the founder of Studio Vortessa. Her work explores furniture as collectible sculpture, creating objects that feel like artifacts from a future yet to arrive.
                </p>
                <p className="max-w-2xl font-sans text-[1rem] font-light leading-[1.9] text-[#454542] md:text-[1.05rem]">
                    Influenced by celestial geometry, ancient relics, and modern minimalism, she designs sculptural pieces that exist between art, architecture, and atmosphere — objects intended to transform interiors into environments of presence and quiet ritual.
                </p>
                <p className="max-w-2xl font-sans text-[0.95rem] font-light leading-[1.85] text-[#5c5c58] md:text-[1rem]">
                    Through Studio Vortessa, she develops furniture and objects that explore a new dimension of living, where design moves beyond function to shape the emotional and spatial experience of a room.
                </p>
            </div>
        ),
        image: picPath('founder.png'),
        imageAlt: 'Founder portrait style editorial still life',
    },
    {
        id: 'vision',
        title: 'Vision',
        content: (
            <div className="flex min-h-32 flex-col justify-center py-2 md:min-h-40">
                <p className="font-serif text-[3rem] w-1/2 font-normal italic leading-[1.45] tracking-tighter text-[#181816]">
                    To redefine furniture as sculptural presence, creating a new dimension of living where objects transform space into sanctuary.
                </p>
            </div>
        ),
    },
    {
        id: 'materials',
        title: 'Materials',
        content: (
            <div className="space-y-8">
                <p className="max-w-3xl font-sans text-[1rem] font-light leading-relaxed text-[#5c5c5a] md:text-[1.08rem]">
                    Three surfaces we return to — reflectance, structure, and mass.
                </p>
                <div className="space-y-6 flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                        <div className="relative aspect-square w-full max-w-44 overflow-hidden rounded-full bg-[#f5f5f3] md:w-44 md:max-w-none md:shrink-0">
                            <img
                                src={picPath('(9).webp')}
                                alt="Chrome spheres study"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="space-y-3">
                            <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                                Reflective
                            </p>
                            <p className="font-serif text-[clamp(1.2rem,2.2vw,1.75rem)] font-normal italic leading-[1.2] text-[#1a1a18]">
                                Chrome
                            </p>
                            <p className="max-w-2xl font-sans text-[0.98rem] font-light leading-[1.85] text-[#4a4a47] md:text-[1.02rem]">
                                Mirror-finished profiles and liquid light — depth without noise.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                        <div className="relative aspect-square w-full max-w-44 overflow-hidden rounded-full bg-[#f5f5f3] md:w-44 md:max-w-none md:shrink-0">
                            <img
                                src={picPath('(5).jpg')}
                                alt="Silver chair with metallic frame"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="space-y-3">
                            <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                                Structure
                            </p>
                            <p className="font-serif text-[clamp(1.2rem,2.2vw,1.75rem)] font-normal italic leading-[1.2] text-[#1a1a18]">
                                Stainless steel
                            </p>
                            <p className="max-w-2xl font-sans text-[0.98rem] font-light leading-[1.85] text-[#4a4a47] md:text-[1.02rem]">
                                Surgical lines, softened for rooms that breathe.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                        <div className="relative aspect-square w-full max-w-44 overflow-hidden rounded-full bg-[#f5f5f3] md:w-44 md:max-w-none md:shrink-0">
                            <img
                                src={picPath('(4).jpg')}
                                alt="Marble staircase sculpture"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="space-y-3">
                            <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                                Mass
                            </p>
                            <p className="font-serif text-[clamp(1.2rem,2.2vw,1.75rem)] font-normal italic leading-[1.2] text-[#1a1a18]">
                                Marble
                            </p>
                            <p className="max-w-2xl font-sans text-[0.98rem] font-light leading-[1.85] text-[#4a4a47] md:text-[1.02rem]">
                                Veined mass, weight, and quiet ceremony in the stone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
];

export default function About2() {
    const [activeSection, setActiveSection] = useState('about');
    const prefersReducedMotion = useReducedMotion();

    const currentSection = SECTIONS.find((s) => s.id === activeSection);
    const hasImage = currentSection && currentSection.image;

    return (
        <PageTransition className="about2 page bg-bg">
            <div className="texture-noise texture-noise--footer relative min-h-screen">
                {/* Headings Section */}
                <section
                    className="about2__headings w-screen relative overflow-hidden flex items-center min-h-[60vh] pt-32 px-20"
                    aria-label="About sections navigation"
                >
                    <div className="w-full max-w-fit">
                        <div className="flex flex-col items-start md:gap-4">
                            {SECTIONS.map((section) => (
                                <Motion.button
                                    key={section.id}
                                    onClick={() => {
                                        setActiveSection(section.id);
                                    }}
                                    className="group relative block w-fit text-left transition-colors duration-200 hover:text-[#5c5c58]"
                                    aria-pressed={activeSection === section.id}
                                    aria-label={`Show ${section.title} section`}
                                >
                                    <Motion.span
                                        className="block text-5xl font-normal tracking-tighter text-[#1a1a18]"
                                        initial={prefersReducedMotion ? false : { y: 0 }}
                                        animate={activeSection === section.id ? { y: 0 } : { y: 0 }}
                                    >
                                        {section.title}
                                    </Motion.span>
                                    {/* Underline animation */}
                                    <Motion.div
                                        className="absolute left-0 bottom-1 h-0.5 w-full bg-[#1a1a18]"
                                        initial={{ width: 0 }}
                                        animate={{ width: activeSection === section.id ? '100%' : 0 }}
                                        transition={{
                                            duration: prefersReducedMotion ? 0.2 : 0.4,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    />
                                </Motion.button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                {currentSection && (
                    <section
                        className="about2__content relative overflow-hidden"
                        aria-label={`${currentSection.title} content`}
                    >
                        <div className="relative mx-auto w-full px-20">
                            <div className={`grid gap-12 md:gap-16 lg:gap-20 ${hasImage ? 'md:grid-cols-2' : ''}`}>
                                {/* Text Content */}
                                <Motion.div
                                    key={`content-${currentSection.id}`}
                                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{
                                        duration: prefersReducedMotion ? 0.2 : 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="flex flex-col justify-center"
                                >
                                    {currentSection.content}
                                </Motion.div>

                                {currentSection.image ? (
                                    <Motion.div
                                        key={`image-${currentSection.id}`}
                                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{
                                            duration: prefersReducedMotion ? 0.2 : 0.7,
                                            delay: prefersReducedMotion ? 0 : 0.1,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="relative mx-auto aspect-square w-full max-w-44 overflow-hidden rounded-full bg-[#f5f5f3] md:max-w-52"
                                    >
                                        <img
                                            src={currentSection.image}
                                            alt={currentSection.imageAlt}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </Motion.div>
                                ) : null}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </PageTransition>
    );
}
