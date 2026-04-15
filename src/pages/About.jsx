import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroLiveNoise from '../components/HeroLiveNoise';
import PageTransition from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const ABOUT_CATALOG_HERO_IMG = {
    src: picPath('(3).webp'),
    alt: 'Metallic loveseat — sculptural furniture study',
};

const FOUNDER_IMG = picPath('founder.png');

const STUDIO_IMAGES = [
    picPath('(1).webp'),
    picPath('(3).webp'),
];

/** Materials — editorial rows: large image left, copy right (light “spec sheet” layout) */
const MATERIALS_FEATURED = [
    {
        id: 'chrome',
        tag: 'Reflective',
        title: 'Chrome',
        blurb: 'Mirror-finished profiles and liquid light — depth without noise.',
        src: picPath('(8).webp'),
        alt: 'Chrome spheres study',
    },
    {
        id: 'stainless-steel',
        tag: 'Structure',
        title: 'Stainless steel',
        blurb: 'Surgical lines, softened for rooms that breathe.',
        src: picPath('(2).webp'),
        alt: 'Silver chair with metallic frame',
    },
    {
        id: 'marble',
        tag: 'Mass',
        title: 'Marble',
        blurb: 'Veined mass, weight, and quiet ceremony in the stone.',
        src: picPath('(6).webp'),
        alt: 'Marble staircase sculpture',
    },
];

/** Single full-bleed process band (replaces busy multi-image strip) */
const PROCESS_BAND_IMG = {
    src: picPath('(1).webp'),
    alt: 'Studio process and material study',
};

const MANIFESTO_LINES = [
    { id: 'm1', text: 'art as furniture.', accent: true },
    { id: 'm2', text: 'objects as artifacts.', accent: true },
    { id: 'm3', text: 'spaces as sanctuaries.', accent: true },
    { id: 'm4', text: 'silence over excess.', accent: false },
    { id: 'm5', text: 'form over ornament.', accent: false },
    { id: 'm6', text: 'material over trend.', accent: false },
];

const STATS = [
    { number: '2024', label: 'EST.' },
    { number: 'NYC', label: 'BASED' },
    { number: '∞', label: 'DIMENSIONS' },
];

export default function About() {
    const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const studioSectionRef = useRef(null);
    const studioImageRef = useRef(null);
    const studioImageWrapRef = useRef(null);
    const materialsSectionRef = useRef(null);
    const materialSlideRef = useRef(null);
    const stripSectionRef = useRef(null);
    const stripTrackRef = useRef(null);
    const founderSectionRef = useRef(null);
    const founderImageRef = useRef(null);
    const visionSectionRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            // ─── Zone 1: Catalog-style hero (image + veil + type) ───
            if (heroRef.current) {
                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const sub = heroRef.current.querySelector('.catalog2-hero__sub');
                const headlineLines = heroRef.current.querySelectorAll('.catalog2-hero__headline-line');
                const headline = heroRef.current.querySelector('.catalog2-hero__headline');
                const scrollHint = heroRef.current.querySelector('.catalog2-hero__scroll-hint');
                const heroVeil = heroRef.current.querySelector('.catalog2-hero__veil');
                const heroImg = heroRef.current.querySelector('.catalog2-hero__bg');

                if (heroImg) {
                    gsap.set(heroImg, { scale: 1.12, filter: reduced ? 'none' : 'brightness(0.72) contrast(1.05)' });
                }
                if (heroVeil) {
                    gsap.set(heroVeil, { scaleY: 1, transformOrigin: '50% 0%' });
                }
                if (sub) gsap.set(sub, { y: 28, autoAlpha: 0 });
                headlineLines.forEach((line) => {
                    gsap.set(line, { y: 36, autoAlpha: 0, rotateX: reduced ? 0 : -6, transformPerspective: 900 });
                });
                if (scrollHint) gsap.set(scrollHint, { y: 16, autoAlpha: 0 });

                const intro = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } });

                if (heroImg) {
                    intro.to(
                        heroImg,
                        {
                            scale: 1,
                            filter: reduced ? 'none' : 'brightness(1) contrast(1.02)',
                            duration: reduced ? 0.35 : 1.45,
                            ease: 'power2.out',
                        },
                        0,
                    );
                }
                if (heroVeil && !reduced) {
                    intro.to(heroVeil, { scaleY: 0, duration: 1.25, ease: 'power3.inOut' }, 0.05);
                } else if (heroVeil) {
                    gsap.set(heroVeil, { autoAlpha: 0 });
                }

                if (sub) {
                    intro.to(sub, { y: 0, autoAlpha: 1, duration: reduced ? 0.35 : 0.88 }, reduced ? 0 : 0.35);
                }
                if (headlineLines.length) {
                    intro.to(
                        headlineLines,
                        { y: 0, autoAlpha: 1, rotateX: 0, duration: reduced ? 0.3 : 1.05, stagger: reduced ? 0 : 0.14 },
                        reduced ? 0 : 0.5,
                    );
                }
                if (scrollHint) {
                    intro.to(
                        scrollHint,
                        { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power2.out' },
                        reduced ? 0 : '-=0.45',
                    );
                }

                if (heroImg) {
                    gsap.to(heroImg, {
                        scale: 1.05,
                        yPercent: -5,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: 'top top',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }

                const scrubFade = [headline, sub, scrollHint].filter(Boolean);
                if (scrubFade.length) {
                    gsap.fromTo(
                        scrubFade,
                        { autoAlpha: 1 },
                        {
                            autoAlpha: 0.25,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: heroRef.current,
                                start: 'center top',
                                end: 'bottom top',
                                scrub: 0.65,
                            },
                        },
                    );
                }
            }

            // ─── Zone 2: Stats count-in ───
            if (statsRef.current) {
                const statItems = statsRef.current.querySelectorAll('.about-stat');
                gsap.fromTo(
                    statItems,
                    { y: 30, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // ─── Zone 2: About Studio clip-path image reveal ───
            if (studioImageWrapRef.current && studioImageRef.current && studioSectionRef.current) {
                gsap.set(studioImageWrapRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
                gsap.set(studioImageRef.current, { scale: 1.08, autoAlpha: 0 });
                const studioTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: studioSectionRef.current,
                        start: 'top 78%',
                        toggleActions: 'play none none reverse',
                    },
                });
                studioTl
                    .to(studioImageWrapRef.current, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.1,
                        ease: 'power3.out',
                    })
                    .to(studioImageRef.current, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.9,
                        ease: 'power2.out',
                    }, '-=0.9');

                gsap.to(studioImageRef.current, {
                    yPercent: -10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: studioSectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2,
                    },
                });
            }

            // ─── Process band: single wide image, horizontal drift ───
            if (stripTrackRef.current && stripSectionRef.current) {
                gsap.to(stripTrackRef.current, {
                    xPercent: -10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: stripSectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.75,
                    },
                });
                const bandImg = stripTrackRef.current.querySelector('.about-process-band__img');
                if (bandImg) {
                    gsap.to(bandImg, {
                        scale: 1.06,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: stripSectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }
            }

            // ─── Founder: image parallax + copy panel entrance ───
            if (founderImageRef.current && founderSectionRef.current) {
                gsap.to(founderImageRef.current, {
                    yPercent: -6,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: founderSectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.05,
                    },
                });

                const founderCopy = founderSectionRef.current.querySelector('.about-founder__copy');
                if (founderCopy) {
                    gsap.fromTo(
                        founderCopy,
                        { y: 48, opacity: 0, filter: 'blur(12px)' },
                        {
                            y: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: founderSectionRef.current,
                                start: 'top 70%',
                                toggleActions: 'play none none reverse',
                            },
                        },
                    );
                }
            }

            // ─── Generic scroll reveals ───
            const blocks = root.querySelectorAll('.about-animate');
            blocks.forEach((block) => {
                gsap.fromTo(
                    block,
                    { y: 44, opacity: 0, filter: 'blur(6px)' },
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

            // ─── Vision: typographic monument (no busy BG motion) ───
            if (visionSectionRef.current) {
                const visionStatement = visionSectionRef.current.querySelector('.about-vision__statement');
                if (visionStatement) {
                    gsap.fromTo(
                        visionStatement,
                        { y: 36, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.05,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: visionSectionRef.current,
                                start: 'top 78%',
                                toggleActions: 'play none none reverse',
                            },
                        },
                    );
                }
            }
        }, root);

        return () => {
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveMaterialIndex((current) => (current + 1) % MATERIALS_FEATURED.length);
        }, 5200);

        return () => window.clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!materialSlideRef.current) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        gsap.fromTo(
            materialSlideRef.current,
            { x: reduced ? 0 : 14, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: reduced ? 0.25 : 0.6, ease: 'power3.out' },
        );
    }, [activeMaterialIndex]);

    const activeMaterial = MATERIALS_FEATURED[activeMaterialIndex];
    const goToPreviousMaterial = () =>
        setActiveMaterialIndex((current) => (current - 1 + MATERIALS_FEATURED.length) % MATERIALS_FEATURED.length);
    const goToNextMaterial = () => setActiveMaterialIndex((current) => (current + 1) % MATERIALS_FEATURED.length);

    return (
        <PageTransition cinematic className="about page bg-bg">
            <div ref={rootRef} className="texture-noise texture-noise--footer relative min-h-screen">

                {/* Catalog-style full-bleed hero — centered type over image */}
                <section
                    id="about-home-banner"
                    ref={heroRef}
                    className="catalog2-hero about__hero relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12"
                    aria-labelledby="about-home-banner-heading"
                >
                    <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh] w-full">
                        <img
                            src={ABOUT_CATALOG_HERO_IMG.src}
                            alt={ABOUT_CATALOG_HERO_IMG.alt}
                            className="catalog2-hero__bg absolute inset-0 h-full min-h-[100dvh] w-full object-cover"
                            loading="eager"
                        />
                    </div>
                    <div
                        className="pointer-events-none absolute inset-0 z-[1] min-h-[100dvh] w-full"
                        aria-hidden
                    >
                        <HeroLiveNoise className="h-full min-h-[100dvh] w-full" />
                    </div>
                    <div
                        className="catalog2-hero__veil pointer-events-none absolute inset-0 z-[2] min-h-[100dvh] w-full bg-[linear-gradient(180deg,rgba(219,219,219,0.97)_0%,rgba(165,165,164,0.92)_45%,rgba(130,130,129,0.88)_100%)]"
                        aria-hidden
                    />

                    <div className="relative z-[3] mx-auto flex max-w-3xl flex-col items-center text-center justify-between [perspective:1200px]">
                        <h1
                            id="about-home-banner-heading"
                            className="catalog2-hero__headline mt-6 font-light leading-[1.08] tracking-tight text-white [transform-style:preserve-3d] md:mt-8"
                        >
                            <span className="catalog2-hero__headline-line block font-serif text-[clamp(3.5rem,14vw,7rem)] italic leading-[0.95]">
                                Between art
                            </span>
                            <span className="catalog2-hero__headline-line mt-2 block font-sans text-[clamp(1.5rem,5vw,2.75rem)] font-medium tracking-tight md:mt-1">
                                and function
                            </span>
                        </h1>
                        <div
                            className="catalog2-hero__scroll-hint mt-14 flex flex-col items-center gap-2 md:mt-26"
                            aria-hidden
                        >
                            <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/55">
                                Scroll
                            </span>
                            <div className="h-12 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent)]" />
                        </div>
                    </div>
                </section>

                {/* About Studio — typographic lead + offset image (new rhythm) */}
                <section
                    id="about-studio"
                    ref={studioSectionRef}
                    className="about__studio relative overflow-hidden border-b border-black/[0.07] bg-[#e6e6e4]"
                >
                    <div className="relative mx-auto max-w-[1320px] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:py-32">
                        <div className="about-animate max-w-[min(100%,52rem)]">
                            <h2 className="mt-4 font-serif text-[clamp(2.75rem,9.5vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-[#141414]">
                                <span className="block">About</span>
                                <span className="block text-[0.42em] font-medium tracking-[-0.03em] text-muted">
                                    Studio
                                </span>
                            </h2>
                        </div>

                        <div
                            ref={statsRef}
                            className="about-animate mt-12 flex flex-wrap items-end gap-x-12 gap-y-8 border-b border-black/10 pb-10 md:mt-16 md:gap-x-16"
                        >
                            {STATS.map((stat, i) => (
                                <div key={i} className="about-stat flex flex-col gap-1">
                                    <span className="font-serif text-4xl font-normal tracking-tight text-[#1a1a1a] md:text-6xl">
                                        {stat.number}
                                    </span>
                                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-dim">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-10">
                            <div className="relative lg:col-span-5">
                                <div
                                    ref={studioImageWrapRef}
                                    className="group relative aspect-[4/5] overflow-hidden rounded-[2px] will-change-[clip-path] md:aspect-[3/4] lg:sticky lg:top-28"
                                >
                                    <img
                                        ref={studioImageRef}
                                        src={STUDIO_IMAGES[0]}
                                        alt="Studio interior"
                                        className="about-studio__image h-full w-full object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    <span
                                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,transparent_50%,rgba(46,46,46,0.12)_100%)]"
                                        aria-hidden
                                    />
                                </div>
                            </div>

                            <div className="about-animate min-w-0 space-y-8 lg:col-span-7 lg:pt-4">
                                <div className="space-y-6 font-sans text-[1.02rem] font-light leading-[1.78] text-[#3a3a3a] md:text-[1.08rem] md:leading-[1.82]">
                                    <p className="text-2xl text-[#1c1c1c]">
                                        Studio Vortessa creates sculptural furniture and objects that exist between art
                                        and function.
                                    </p>
                                    <p className="text-base tracking-[0.05em] text-[#1c1c1c]">
                                        Studio Vortessa creates sculptural furniture and objects that exist between art and function.

                                        The studio approaches furniture as spatial composition — objects that shape atmosphere rather than simply occupy space. Through sculptural forms, refined materials, and quiet geometry, Studio Vortessa explores a new dimension of living where interiors become environments of presence.

                                        Guided by the belief that less is more, each piece is reduced to its essential form, conceived as an artifact rather than an object of trend.

                                        Forms distilled to their essence.
                                        Materials chosen for permanence.

                                        Objects designed to inhabit space with quiet authority.
                                    </p>
                                    <p className="text-base tracking-[0.05em] text-[#1c1c1c]">
                                        Guided by the belief that less is more, each piece is reduced to its essential
                                        form, conceived as an artifact rather than an object of trend.
                                    </p>
                                </div>
                                <div className="grid gap-4 border-t border-black/10 pt-10 sm:grid-cols-1">
                                    <p className="font-serif text-xl font-normal italic leading-snug tracking-tight text-[#222] md:text-2xl">
                                        Forms distilled to their essence.
                                    </p>
                                    <p className="font-serif text-xl font-normal italic leading-snug tracking-tight text-[#222] md:text-2xl">
                                        Materials chosen for permanence.
                                    </p>
                                    <p className="font-serif text-xl font-normal italic leading-snug tracking-tight text-[#222] md:text-2xl">
                                        Objects designed to inhabit space with quiet authority.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Materials — light editorial board: wide image left, prose right */}
                <section
                    id="materials"
                    ref={materialsSectionRef}
                    className="about__materials relative overflow-hidden border-b border-black/[0.06] bg-[#ebeae6]"
                    aria-labelledby="about-materials-heading"
                >
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                        <div className="absolute -left-[20%] top-0 h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.65)_0%,transparent_68%)] blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-[45%] w-[50%] bg-[radial-gradient(ellipse_at_70%_80%,rgba(184,146,74,0.09),transparent_60%)]" />
                    </div>
                    <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-24 lg:px-16">
                        <header className="about-animate mb-14 max-w-xl md:mb-20">
                            <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-text/40">
                                Finishes
                            </span>
                            <h2
                                id="about-materials-heading"
                                className="mt-4 font-serif text-[clamp(2rem,5vw,2.75rem)] font-semibold tracking-tight text-[#1a1a1a]"
                            >
                                Materials
                            </h2>
                            <p className="mt-4 font-sans text-[0.9375rem] font-light leading-relaxed text-[#5c5c5a] md:text-base">
                                Three surfaces we return to — reflectance, structure, and mass.
                            </p>
                            <div
                                className="mt-6 h-px w-16 rounded-full bg-[linear-gradient(90deg,rgba(184,146,74,0.55),rgba(184,146,74,0.15))]"
                                aria-hidden
                            />
                        </header>
                        <div className="rounded-[26px] border border-white/45 bg-white/55 p-3 shadow-[0_24px_56px_rgba(90,90,90,0.12)] backdrop-blur-xl md:p-4">
                            <div
                                ref={materialSlideRef}
                                key={activeMaterial.id}
                                className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8"
                            >
                                <div className="group relative md:col-span-6">
                                    <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] border border-white/60 bg-white/60 md:aspect-[4/3]">
                                        <span className="absolute left-4 top-4 z-[1] rounded-full border border-white/65 bg-white/72 px-3 py-1 font-mono text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#2e2e2e] shadow-[0_6px_20px_rgba(110,110,110,0.16)] backdrop-blur-xl">
                                            {String(activeMaterialIndex + 1).padStart(2, '0')}
                                        </span>
                                        <img
                                            src={activeMaterial.src}
                                            alt={activeMaterial.alt}
                                            className="h-full w-full object-cover brightness-[0.97] contrast-[1.04] saturate-[0.96] transition-[transform,filter] duration-[0.65s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:brightness-[1.02]"
                                            loading="lazy"
                                        />
                                        <div
                                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_55%,rgba(46,46,46,0.08)_100%)]"
                                            aria-hidden
                                        />
                                    </div>
                                </div>
                                <div className="flex min-w-0 flex-col justify-center md:col-span-6">
                                    <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#8a8a88]">
                                        {activeMaterial.tag}
                                    </span>
                                    <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-[#141414] md:text-[1.9rem]">
                                        {activeMaterial.title}
                                    </h3>
                                    <p className="mt-4 max-w-md font-sans text-[0.9375rem] font-light leading-[1.75] text-[#4a4a48] md:text-base md:leading-[1.8]">
                                        {activeMaterial.blurb}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/[0.07] px-1 pt-5">
                                <div className="flex items-center gap-2">
                                    {MATERIALS_FEATURED.map((item, idx) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setActiveMaterialIndex(idx)}
                                            aria-label={`View ${item.title}`}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                                idx === activeMaterialIndex
                                                    ? 'w-8 bg-[#2d2d2d]'
                                                    : 'w-2.5 bg-[#81817f]/45 hover:bg-[#6f6f6d]/65'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={goToPreviousMaterial}
                                        aria-label="Previous material"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-lg text-[#2d2d2d] shadow-[0_6px_18px_rgba(110,110,110,0.12)] backdrop-blur-md transition-colors duration-200 hover:bg-white"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToNextMaterial}
                                        aria-label="Next material"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-lg text-[#2d2d2d] shadow-[0_6px_18px_rgba(110,110,110,0.12)] backdrop-blur-md transition-colors duration-200 hover:bg-white"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Single cinematic band — replaces noisy multi-strip */}
                <section
                    ref={stripSectionRef}
                    className="about__process relative overflow-hidden border-b border-black/20 bg-black"
                >
                    <div className="relative aspect-[5/3] w-full min-h-[220px] overflow-hidden md:aspect-[21/8] md:min-h-[280px]">
                        <div
                            ref={stripTrackRef}
                            className="absolute inset-y-0 left-[-8%] flex h-full w-[116%] will-change-transform md:left-[-12%] md:w-[124%]"
                        >
                            <img
                                src={PROCESS_BAND_IMG.src}
                                alt={PROCESS_BAND_IMG.alt}
                                className="about-process-band__img h-full w-full object-cover opacity-[0.92]"
                                loading="lazy"
                            />
                            <div
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,transparent_35%,transparent_65%,rgba(0,0,0,0.45)_100%),linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_40%)]"
                                aria-hidden
                            />
                        </div>
                    </div>
                </section>

                {/* Manifesto — editorial grid on white */}
                <section
                    id="manifesto"
                    className="relative border-b border-black/[0.06] bg-white py-20 md:py-28"
                >
                    <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                        <div className="about-animate mb-14 max-w-2xl md:mb-20">
                            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.32em] text-dim">
                                Principles
                            </p>
                            <h2 className="mt-5 font-sans text-4xl font-medium tracking-tight text-text md:text-5xl">
                                Manifesto
                            </h2>
                            <div
                                className="mt-6 h-px w-24 bg-[linear-gradient(90deg,rgba(184,146,74,0.65),transparent)]"
                                aria-hidden
                            />
                            <Link
                                to="/discuss-project"
                                className="mt-8 inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-2.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-text transition-colors duration-300 hover:border-accent-gold/45 hover:text-accent-gold"
                            >
                                Discuss a project
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-16 lg:gap-x-24">
                            {MANIFESTO_LINES.map((item, i) => (
                                <div key={item.id} className="about-animate">
                                    <div
                                        className={`h-0.5 w-14 rounded-full ${item.accent ? 'bg-accent-gold/80' : 'bg-black/15'}`}
                                        aria-hidden
                                    />
                                    <span className="mt-6 block font-mono text-[0.65rem] uppercase tracking-[0.22em] text-dim">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <p className="mt-4 font-sans text-[clamp(1.35rem,3.8vw,2rem)] font-light lowercase leading-snug tracking-tight text-text md:leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Founder — image left, copy right */}
                <section
                    ref={founderSectionRef}
                    className="about__founder relative overflow-hidden border-b border-black/10 bg-[#ecebe8]"
                >
                    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
                        <div className="grid min-h-0 grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
                            <div className="relative lg:col-span-5">
                                <div className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-[18px] border border-black/10 bg-white/55 shadow-[0_18px_38px_rgba(90,90,90,0.12)]">
                                    <div className="relative aspect-[4/5]">
                                        <img
                                            ref={founderImageRef}
                                            src={FOUNDER_IMG}
                                            alt="Çilga Yesilyaprak, founder of Studio Vortessa"
                                            className="absolute inset-0 h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                        <div
                                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(46,46,46,0.14)_100%)]"
                                            aria-hidden
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="about-founder__copy flex flex-col justify-center lg:col-span-7 lg:pt-2">
                                <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.28em] text-text/40">
                                    Profile
                                </p>
                                <h2 className="mt-4 font-sans text-4xl font-medium tracking-tight text-[#1a1a1a] md:text-5xl">
                                    Founder
                                </h2>
                                <div
                                    className="mt-8 h-px max-w-xs bg-[linear-gradient(90deg,rgba(184,146,74,0.55),transparent)]"
                                    aria-hidden
                                />
                                <div className="mt-10 space-y-6 font-sans text-[1.02rem] font-light leading-[1.78] text-[#454545] md:text-[1.0625rem] md:leading-[1.85]">
                                    <p>
                                        Çilga Yesilyaprak is a Turkish–American designer based in New York and the founder of
                                        Studio Vortessa. Her work explores furniture as collectible sculpture, creating objects
                                        that feel like artifacts from a future yet to arrive.
                                    </p>
                                    <p>
                                        Influenced by celestial geometry, ancient relics, and modern minimalism, she designs
                                        sculptural pieces that exist between art, architecture, and atmosphere — objects
                                        intended to transform interiors into environments of presence and quiet ritual.
                                    </p>
                                    <p>
                                        Through Studio Vortessa, she develops furniture and objects that explore a new
                                        dimension of living, where design moves beyond function to shape the emotional and
                                        spatial experience of a room.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision — typographic monument, calm gradient (no GIF / orbs) */}
                <section
                    ref={visionSectionRef}
                    className="about__vision relative overflow-hidden bg-bg py-28 md:py-36"
                >
                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120vw,720px)] w-[min(120vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,146,74,0.11)_0%,transparent_68%)]"
                        aria-hidden
                    />
                    <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-10 lg:px-16">
                        <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.3em] text-dim">Vision</p>
                        <div
                            className="mx-auto mt-6 h-px w-16 bg-[linear-gradient(90deg,transparent,var(--color-accent-gold),transparent)]"
                            aria-hidden
                        />

                        <p className="about-vision__statement mt-12 font-serif text-[clamp(1.5rem,4.2vw,2.75rem)] font-normal leading-[1.25] tracking-tight text-text md:leading-[1.2]">
                            To redefine furniture as sculptural presence, creating a new dimension of living where objects
                            transform space into sanctuary.
                        </p>

                        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                            <Link
                                to="/catalog"
                                className="inline-flex items-center justify-center rounded-full border border-[rgba(46,46,46,0.14)] bg-white/90 px-7 py-3 font-sans text-sm font-medium tracking-tight text-text shadow-[0_4px_24px_rgba(100,100,99,0.1)] transition-[background-color,box-shadow,color] duration-300 hover:border-accent-gold/30 hover:text-accent-gold"
                            >
                                Catalogue
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-[#2e2e2e] px-7 py-3 font-sans text-sm font-medium tracking-tight text-white shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-[background-color,transform] duration-300 hover:bg-[#3a3a3a]"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
}
