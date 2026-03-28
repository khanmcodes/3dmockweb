import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const FOUNDER_IMG = encodeURI('/VORTESSAWEB Material/PICTURES.jpg/founder.png');

function SectionBlock({ eyebrow, title, children, className = '' }) {
    return (
        <div className={`about-section-block ${className}`}>
            <header className="mb-10 flex flex-col gap-5 md:mb-14">
                <div className="flex items-end justify-between gap-6">
                    <div className="min-w-0">
                        <span className="label mb-5 block text-dim">{eyebrow}</span>
                        <div className="mb-5 h-px w-[60px] origin-left bg-accent" />
                        <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-text [text-shadow:0_0_60px_rgba(230,194,135,0.12)] md:text-4xl lg:text-[2.35rem]">
                            {title}
                        </h2>
                    </div>
                    <span className="shrink-0 pb-1 font-sans text-lg font-light text-dim/80" aria-hidden>
                        &gt;
                    </span>
                </div>
                <div className="h-px w-full bg-[linear-gradient(90deg,rgba(212,163,115,0.35),transparent_65%)]" />
            </header>
            {children}
        </div>
    );
}

export default function About() {
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const heroLeadRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            if (heroRef.current) {
                gsap.fromTo(
                    heroRef.current.querySelectorAll('.about-hero__reveal'),
                    { y: 36, opacity: 0, filter: 'blur(8px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.05,
                        ease: 'power3.out',
                        stagger: 0.12,
                        delay: 0.15,
                    }
                );
            }
            if (heroLeadRef.current) {
                gsap.fromTo(
                    heroLeadRef.current,
                    { y: 28, opacity: 0, filter: 'blur(6px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.0,
                        ease: 'power3.out',
                        delay: 0.35,
                    }
                );
            }

            const blocks = root.querySelectorAll('.about-animate');
            blocks.forEach((block) => {
                gsap.fromTo(
                    block,
                    { y: 40, opacity: 0, filter: 'blur(6px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.95,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 86%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition className="about page bg-bg">
            <div ref={rootRef} className="texture-noise texture-noise--footer relative min-h-screen">
                {/* Hero — catalog / hero split rhythm */}
                <section className="about__hero relative overflow-hidden border-b border-[rgba(236,238,242,0.06)]">
                    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(212,163,115,0.1),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_10%_100%,rgba(230,194,135,0.05),transparent_50%)]" />
                    </div>
                    <div
                        ref={heroRef}
                        className="relative z-1 mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 px-6 py-20 max-md:gap-12 sm:px-8 md:grid-cols-2 md:gap-16 md:px-12 md:py-28 lg:gap-20 lg:px-16 lg:py-32"
                    >
                        <div className="about-hero__col about-hero__col--primary min-w-0">
                            <span className="about-hero__reveal label mb-6 block text-accent-gold">Studio Vortessa</span>
                            <h1 className="about-hero__reveal font-serif text-5xl font-normal leading-[1.02] tracking-tight text-text [text-shadow:0_0_80px_rgba(212,163,115,0.12)] sm:text-6xl md:text-7xl lg:text-8xl">
                                About
                            </h1>
                            <div className="about-hero__reveal mt-8 h-px w-[60px] bg-[linear-gradient(90deg,var(--color-accent),transparent)]" />
                        </div>
                        <div className="about-hero__col about-hero__col--secondary min-w-0 pb-1 max-md:order-first max-md:pb-0 md:pb-2">
                            <p
                                ref={heroLeadRef}
                                className="about__lead font-serif m-0 max-w-lg text-base font-normal leading-loose text-muted md:text-lg"
                            >
                                Sculptural furniture and objects between art and function — forms distilled to essence,
                                materials chosen for permanence.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16 lg:py-32">
                    <div className="mx-auto max-w-3xl space-y-24 md:space-y-32">
                        <section className="about-animate">
                            <SectionBlock eyebrow="Philosophy" title="About studio">
                                <div className="space-y-6 font-sans text-base font-light leading-loose text-muted md:text-[1.0625rem] md:leading-[1.85]">
                                    <p>
                                        Studio Vortessa creates sculptural furniture and objects that exist between art
                                        and function.
                                    </p>
                                    <p>
                                        The studio approaches furniture as spatial composition — objects that shape
                                        atmosphere rather than simply occupy space. Through sculptural forms, refined
                                        materials, and quiet geometry, Studio Vortessa explores a new dimension of living
                                        where interiors become environments of presence.
                                    </p>
                                    <p>
                                        Guided by the belief that less is more, each piece is reduced to its essential
                                        form, conceived as an artifact rather than an object of trend.
                                    </p>
                                    <p className="text-text/90">
                                        Forms distilled to their essence. Materials chosen for permanence.
                                    </p>
                                    <p className="text-text/90">
                                        Objects designed to inhabit space with quiet authority.
                                    </p>
                                </div>
                            </SectionBlock>
                        </section>

                        <section className="about-animate border-t border-[rgba(236,238,242,0.06)] pt-24 md:pt-32">
                            <SectionBlock eyebrow="Principles" title="Manifesto">
                                <ul className="list-none space-y-4 border-l border-[rgba(212,163,115,0.25)] pl-6 font-sans text-base font-light lowercase leading-relaxed tracking-normal text-muted md:text-[1.0625rem]">
                                    <li>art as furniture.</li>
                                    <li>objects as artifacts.</li>
                                    <li>spaces as sanctuaries.</li>
                                </ul>
                                <ul className="mt-12 list-none space-y-4 border-l border-[rgba(236,238,242,0.12)] pl-6 font-sans text-base font-light lowercase leading-relaxed text-muted md:text-[1.0625rem]">
                                    <li>silence over excess.</li>
                                    <li>form over ornament.</li>
                                    <li>material over trend.</li>
                                </ul>
                            </SectionBlock>
                        </section>

                        <section className="about-animate border-t border-[rgba(236,238,242,0.06)] pt-24 md:pt-32">
                            <SectionBlock eyebrow="Profile" title="Founder">
                                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_min(42%,380px)] lg:items-start lg:gap-16">
                                    <div className="space-y-6 font-sans text-base font-light leading-loose text-muted md:text-[1.0625rem] md:leading-[1.85]">
                                        <p>
                                            Çilga Yesilyaprak is a Turkish–American designer based in New York and the
                                            founder of Studio Vortessa. Her work explores furniture as collectible
                                            sculpture, creating objects that feel like artifacts from a future yet to
                                            arrive.
                                        </p>
                                        <p>
                                            Influenced by celestial geometry, ancient relics, and modern minimalism, she
                                            designs sculptural pieces that exist between art, architecture, and
                                            atmosphere — objects intended to transform interiors into environments of
                                            presence and quiet ritual.
                                        </p>
                                        <p>
                                            Through Studio Vortessa, she develops furniture and objects that explore a new
                                            dimension of living, where design moves beyond function to shape the emotional
                                            and spatial experience of a room.
                                        </p>
                                        {/* Studio address — add when ready */}
                                    </div>
                                    <figure className="about-founder-photo group relative mx-auto w-full max-w-sm overflow-hidden rounded-[2px] bg-surface shadow-[0_24px_90px_rgba(0,0,0,0.55)] ring-1 ring-[rgba(236,238,242,0.06)] lg:mx-0 lg:max-w-none">
                                        <img
                                            src={FOUNDER_IMG}
                                            alt="Çilga Yesilyaprak, founder of Studio Vortessa"
                                            className="aspect-3/4 h-full w-full object-cover transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:brightness-[1.04] md:aspect-4/5"
                                            loading="lazy"
                                        />
                                        <span
                                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,8,0.35)_100%)]"
                                            aria-hidden
                                        />
                                    </figure>
                                </div>
                            </SectionBlock>
                        </section>

                        <section className="about-animate border-t border-[rgba(236,238,242,0.06)] pb-16 pt-24 md:pb-24 md:pt-32">
                            <SectionBlock eyebrow="North star" title="Vision">
                                <p className="max-w-2xl font-serif text-lg font-normal leading-relaxed text-text/95 [text-shadow:0_0_48px_rgba(230,194,135,0.08)] md:text-xl md:leading-relaxed">
                                    To redefine furniture as sculptural presence, creating a new dimension of living where
                                    objects transform space into sanctuary.
                                </p>
                            </SectionBlock>
                            <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-[rgba(236,238,242,0.06)] pt-12">
                                <Link
                                    to="/catalog"
                                    className="label text-dim transition-colors duration-300 hover:text-accent-gold"
                                >
                                    View catalogue
                                </Link>
                                <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
                                <Link
                                    to="/contact"
                                    className="label text-dim transition-colors duration-300 hover:text-accent-gold"
                                >
                                    Contact
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
