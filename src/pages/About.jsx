import { createElement, useEffect, useRef, useState } from 'react';
import { animate, motion as Motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import AccordionMotion from '../components/AccordionMotion';
import {
    ArrowUpRight,
    ChevronDown,
    Compass,
    Gem,
    Handshake,
    Landmark,
    Mail,
    MessageSquareText,
    Sparkles,
    UserRound,
} from 'lucide-react';
import HeroLiveNoise from '../components/HeroLiveNoise';
import PageTransition from '../components/PageTransition';

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const ABOUT_CATALOG_HERO_IMG = {
    src: picPath('(3).webp'),
    alt: 'Metallic loveseat — sculptural furniture study',
};

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

const easeView = [0.22, 1, 0.36, 1];

/** Shared chrome only — each panel’s inner copy is hardcoded below for bespoke typography. */
function AccordionRow({
    sectionId,
    expandedIds,
    onToggle,
    title,
    teaser,
    icon,
    imageSrc,
    imageAlt,
    children,
}) {
    const isExpanded = expandedIds.has(sectionId);
    const panelId = `${sectionId}-panel`;

    return (
        <Motion.article
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.5, ease: easeView }}
            className={`overflow-hidden rounded-[24px] border transition-[border-color] duration-200 ${
                isExpanded ? 'border-black/18' : 'border-black/10 hover:border-black/16'
            }`}
        >
            <button
                type="button"
                onClick={() => onToggle(sectionId)}
                className="no-cursor-magnetic group flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 md:px-6 md:py-5"
                aria-expanded={isExpanded}
                aria-controls={panelId}
            >
                <div className="flex min-w-0 items-start gap-3.5">
                    <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-[#2d2d2d] transition-[border-color,background-color] duration-200 ${
                            isExpanded ? 'border-black/15' : 'border-black/10'
                        }`}
                    >
                        {createElement(icon, { size: 17, strokeWidth: 1.8 })}
                    </span>
                    <div className="min-w-0">
                        <h3 className="truncate font-sans text-[1.08rem] font-medium tracking-tight text-[#171717] md:text-[1.22rem]">
                            {title}
                        </h3>
                        {!isExpanded ? (
                            <p className="mt-1.5 line-clamp-1 max-w-2xl font-sans text-[0.84rem] font-normal text-[#666664] md:text-[0.88rem]">
                                {teaser}
                            </p>
                        ) : null}
                    </div>
                </div>
                <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-[#242424] transition-[border-color,background-color] duration-200 ${
                        isExpanded ? 'border-black/15 bg-black/3' : 'border-black/10'
                    }`}
                >
                    <ChevronDown
                        size={18}
                        strokeWidth={1.9}
                        className={`transition-transform duration-200 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </span>
            </button>

            <AccordionMotion open={isExpanded} id={panelId} className="px-5 md:px-6">
                <div className="grid gap-5 border-t border-black/8 py-5 md:grid-cols-12 md:items-start md:gap-8 md:py-6">
                    <div className="group relative md:col-span-5">
                        <div className="relative aspect-4/3 overflow-hidden rounded-[20px] border border-black/8">
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="h-full w-full object-cover brightness-[0.98] contrast-[1.03] saturate-[0.95] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                loading="lazy"
                            />
                            <div
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(25,25,25,0.14))]"
                                aria-hidden
                            />
                        </div>
                    </div>
                    <div className="min-w-0 md:col-span-7">{children}</div>
                </div>
            </AccordionMotion>
        </Motion.article>
    );
}

export default function About() {
    const [activeMaterialIndex, setActiveMaterialIndex] = useState(0);
    const [expandedSectionIds, setExpandedSectionIds] = useState(() => new Set(['about-studio']));
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const heroImgScale = useMotionValue(prefersReducedMotion ? 1 : 1.12);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroImgScrollBoost = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
    const heroImgScaleCombined = useTransform([heroImgScale, heroImgScrollBoost], ([a, b]) => a * b);
    const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '-2.5%']);
    const heroTypeOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.6, 0.3]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const ctrl = animate(heroImgScale, 1, {
            duration: 1.45,
            ease: [0.33, 0.11, 0.02, 1],
            delay: 0.08,
        });
        return () => ctrl.stop();
    }, [heroImgScale, prefersReducedMotion]);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setActiveMaterialIndex((current) => (current + 1) % MATERIALS_FEATURED.length);
        }, 5200);

        return () => window.clearInterval(intervalId);
    }, []);

    const activeMaterial = MATERIALS_FEATURED[activeMaterialIndex];
    const goToPreviousMaterial = () =>
        setActiveMaterialIndex((current) => (current - 1 + MATERIALS_FEATURED.length) % MATERIALS_FEATURED.length);
    const goToNextMaterial = () => setActiveMaterialIndex((current) => (current + 1) % MATERIALS_FEATURED.length);
    const toggleSection = (sectionId) => {
        setExpandedSectionIds((prev) => {
            const next = new Set(prev);
            if (next.has(sectionId)) next.delete(sectionId);
            else next.add(sectionId);
            return next;
        });
    };

    return (
        <PageTransition className="about page bg-bg">
            <div ref={rootRef} className="texture-noise texture-noise--footer relative min-h-screen">

                {/* Catalog-style full-bleed hero — centered type over image */}
                <section
                    id="about-home-banner"
                    ref={heroRef}
                    className="catalog2-hero about__hero relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12"
                    aria-labelledby="about-home-banner-heading"
                >
                    <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh] w-full">
                        <Motion.img
                            src={ABOUT_CATALOG_HERO_IMG.src}
                            alt={ABOUT_CATALOG_HERO_IMG.alt}
                            className="catalog2-hero__bg absolute inset-0 h-full min-h-[100dvh] w-full object-cover"
                            loading="eager"
                            style={{
                                scale: heroImgScaleCombined,
                                y: heroImgY,
                            }}
                        />
                    </div>
                    <div
                        className="pointer-events-none absolute inset-0 z-[1] min-h-[100dvh] w-full"
                        aria-hidden
                    >
                        <HeroLiveNoise className="h-full min-h-[100dvh] w-full" />
                    </div>
                    <Motion.div
                        className="catalog2-hero__veil pointer-events-none absolute inset-0 z-[2] min-h-[100dvh] w-full origin-top bg-[linear-gradient(180deg,rgba(219,219,219,0.97)_0%,rgba(165,165,164,0.92)_45%,rgba(130,130,129,0.88)_100%)]"
                        aria-hidden
                        initial={prefersReducedMotion ? { scaleY: 0, opacity: 0 } : { scaleY: 1 }}
                        animate={prefersReducedMotion ? { scaleY: 0, opacity: 0 } : { scaleY: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.2 : 1.25, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
                    />

                    <Motion.div
                        className="relative z-[3] mx-auto flex max-w-3xl flex-col items-center text-center justify-between [perspective:1200px]"
                        style={{ opacity: heroTypeOpacity }}
                    >
                        <h1
                            id="about-home-banner-heading"
                            className="catalog2-hero__headline mt-6 font-light leading-[1.08] tracking-tight text-white [transform-style:preserve-3d] md:mt-8"
                        >
                            <Motion.span
                                className="catalog2-hero__headline-line block font-serif text-[clamp(3.5rem,14vw,7rem)] italic leading-[0.95]"
                                initial={{ y: 36, opacity: 0, rotateX: prefersReducedMotion ? 0 : -6 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0.3 : 1.05,
                                    delay: prefersReducedMotion ? 0 : 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                Between art
                            </Motion.span>
                            <Motion.span
                                className="catalog2-hero__headline-line mt-2 block font-sans text-[clamp(1.5rem,5vw,2.75rem)] font-medium tracking-tight md:mt-1"
                                initial={{ y: 36, opacity: 0, rotateX: prefersReducedMotion ? 0 : -6 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0.3 : 1.05,
                                    delay: prefersReducedMotion ? 0 : 0.64,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                and function
                            </Motion.span>
                        </h1>
                        <Motion.div
                            className="catalog2-hero__scroll-hint mt-14 flex flex-col items-center gap-2 md:mt-26"
                            aria-hidden
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.75,
                                ease: [0.33, 0.11, 0.02, 1],
                                delay: prefersReducedMotion ? 0 : 0.85,
                            }}
                        >
                            <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/55">
                                Scroll
                            </span>
                            <div className="h-12 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,rgba(255,255,255,0.5),transparent)]" />
                        </Motion.div>
                    </Motion.div>
                </section>

                <section
                    id="about-sections"
                    className="about__accordion relative overflow-hidden border-b border-black/6"
                    aria-label="Studio details and inquiries"
                >

                    <div className="relative mx-auto w-full max-w-[96rem] px-6 py-16 sm:px-10 md:py-20 lg:px-12 xl:px-16">
                        <div className="space-y-3.5 md:space-y-4">
                            <AccordionRow
                                sectionId="about-studio"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="About Studio"
                                teaser="Studio Vortessa creates sculptural furniture and objects that exist between art and function."
                                icon={Sparkles}
                                imageSrc={picPath('(5).webp')}
                                imageAlt="Sculptural metallic seating in a quiet interior"
                            >
                                <div className="space-y-6">
                                    <p className="font-serif text-[1.15rem] font-normal italic leading-[1.55] tracking-[-0.01em] text-[#1a1a18] md:text-[1.28rem] md:leading-[1.5]">
                                        Studio Vortessa creates sculptural furniture and objects that exist between art
                                        and function.
                                    </p>
                                    <p className="max-w-prose font-sans text-[0.9375rem] font-light leading-[1.88] text-[#3d3d3a] md:text-[1.02rem]">
                                        The studio approaches furniture as spatial composition — objects that shape
                                        atmosphere rather than simply occupy space. Through sculptural forms, refined
                                        materials, and quiet geometry, Studio Vortessa explores a new dimension of
                                        living where interiors become environments of presence.
                                    </p>
                                    <p className="max-w-prose border-l-2 border-[#b8924a]/45 pl-4 font-sans text-[0.9rem] font-light leading-[1.85] text-[#4a4a47] md:text-[0.95rem]">
                                        Guided by the belief that less is more, each piece is reduced to its essential
                                        form, conceived as an artifact rather than an object of trend.
                                    </p>
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
                            </AccordionRow>

                            <AccordionRow
                                sectionId="manifesto"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="Manifesto"
                                teaser="art as furniture. objects as artifacts. spaces as sanctuaries."
                                icon={Gem}
                                imageSrc={picPath('(7).webp')}
                                imageAlt="Minimal sculptural forms and reflective surfaces"
                            >
                                <div className="space-y-8">
                                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
                                        <div className="space-y-4">
                                            <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                                                Affirmation
                                            </p>
                                            <div className="space-y-3 font-serif text-[1.05rem] font-normal lowercase italic leading-snug text-[#1c1c1a] md:text-[1.15rem]">
                                                <p>art as furniture.</p>
                                                <p>objects as artifacts.</p>
                                                <p>spaces as sanctuaries.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4 border-t border-black/10 pt-6 sm:border-t-0 sm:border-l sm:pl-10 sm:pt-0">
                                            <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.28em] text-[#8a8a86]">
                                                Discipline
                                            </p>
                                            <div className="space-y-3 font-sans text-[0.78rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#2f2f2c] md:text-[0.82rem]">
                                                <p className="border-b border-black/8 pb-3">silence over excess.</p>
                                                <p className="border-b border-black/8 pb-3">form over ornament.</p>
                                                <p>material over trend.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionRow>

                            <AccordionRow
                                sectionId="founder"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="Founder"
                                teaser="Çilga Yesilyaprak — Turkish–American designer, New York."
                                icon={UserRound}
                                imageSrc={picPath('founder.png')}
                                imageAlt="Founder portrait style editorial still life"
                            >
                                <div className="space-y-5">
                                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-[#7a7a76]">
                                        Çilga Yesilyaprak
                                    </p>
                                    <p className="font-sans text-[1.02rem] font-normal leading-[1.72] text-[#252523] md:text-[1.08rem] md:leading-[1.75]">
                                        Çilga Yesilyaprak is a Turkish–American designer based in New York and the
                                        founder of Studio Vortessa. Her work explores furniture as collectible
                                        sculpture, creating objects that feel like artifacts from a future yet to
                                        arrive.
                                    </p>
                                    <p className="max-w-prose font-sans text-[0.94rem] font-light leading-[1.86] text-[#454542] md:text-[0.98rem]">
                                        Influenced by celestial geometry, ancient relics, and modern minimalism, she
                                        designs sculptural pieces that exist between art, architecture, and atmosphere —
                                        objects intended to transform interiors into environments of presence and quiet
                                        ritual.
                                    </p>
                                    <p className="max-w-prose font-sans text-[0.9rem] font-light leading-[1.82] text-[#5c5c58] md:text-[0.93rem]">
                                        Through Studio Vortessa, she develops furniture and objects that explore a new
                                        dimension of living, where design moves beyond function to shape the emotional
                                        and spatial experience of a room.
                                    </p>
                                </div>
                            </AccordionRow>

                            <AccordionRow
                                sectionId="vision"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="Vision"
                                teaser="Furniture as sculptural presence — space as sanctuary."
                                icon={Compass}
                                imageSrc={picPath('(9).webp')}
                                imageAlt="Architectural interior with a calm modern mood"
                            >
                                <div className="flex min-h-[8rem] flex-col justify-center py-2 md:min-h-[10rem]">
                                    <p className="font-serif text-[clamp(1.25rem,2.8vw,1.75rem)] font-normal italic leading-[1.45] tracking-[-0.02em] text-[#181816]">
                                        To redefine furniture as sculptural presence, creating a new dimension of
                                        living where objects transform space into sanctuary.
                                    </p>
                                </div>
                            </AccordionRow>

                            <AccordionRow
                                sectionId="discuss-project"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="Discuss a project"
                                teaser="Share scope, timeline, and space — we’ll respond with care."
                                icon={MessageSquareText}
                                imageSrc={picPath('(10).webp')}
                                imageAlt="Desk scene with materials and design sketches"
                            >
                                <div className="space-y-5">
                                    <p className="max-w-md font-sans text-[0.88rem] font-light leading-relaxed text-[#5a5a56]">
                                        Tell us what you’re building. Fields are for layout only until a backend is
                                        wired.
                                    </p>
                                    <form
                                        className="grid gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-4 md:grid-cols-2 md:p-5"
                                        onSubmit={(e) => e.preventDefault()}
                                    >
                                        <label className="flex flex-col gap-1.5 md:col-span-1">
                                            <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#6b6b67]">
                                                Name
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                className="h-11 rounded-xl border border-black/12 bg-white/90 px-3.5 font-sans text-sm text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/50"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1.5 md:col-span-1">
                                            <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#6b6b67]">
                                                Email
                                            </span>
                                            <input
                                                type="email"
                                                placeholder="you@studio.com"
                                                className="h-11 rounded-xl border border-black/12 bg-white/90 px-3.5 font-sans text-sm text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/50"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1.5 md:col-span-2">
                                            <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#6b6b67]">
                                                Project details
                                            </span>
                                            <textarea
                                                rows={4}
                                                placeholder="Scope, timeline, intended space, references…"
                                                className="rounded-xl border border-black/12 bg-white/90 px-3.5 py-3 font-sans text-sm text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/50"
                                            />
                                        </label>
                                        <button
                                            type="submit"
                                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1a1a18] px-5 font-sans text-[0.8rem] font-medium tracking-wide text-white transition-transform hover:-translate-y-0.5 md:col-span-2"
                                        >
                                            Send inquiry
                                            <Mail size={14} strokeWidth={2} />
                                        </button>
                                    </form>
                                </div>
                            </AccordionRow>

                            <AccordionRow
                                sectionId="furniture-inquiries"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="Furniture inquiries"
                                teaser="Pricing, materials, availability, and bespoke pieces from the collection."
                                icon={Landmark}
                                imageSrc={picPath('(11).webp')}
                                imageAlt="Sculptural furniture detail with premium materials"
                            >
                                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                    <p className="max-w-md font-sans text-[0.95rem] font-light leading-[1.8] text-[#3f3f3c] md:text-[1rem]">
                                        For pricing, materials, availability, and bespoke variations of pieces from the
                                        Studio Vortessa collection.
                                    </p>
                                    <button
                                        type="button"
                                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-black/15 bg-[#1a1a18] px-6 py-2.5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-black md:self-auto"
                                    >
                                        Click to connect
                                        <ArrowUpRight size={14} strokeWidth={2.2} />
                                    </button>
                                </div>
                            </AccordionRow>

                            <AccordionRow
                                sectionId="commissions-collaborations"
                                expandedIds={expandedSectionIds}
                                onToggle={toggleSection}
                                title="Commissions & Collaborations"
                                teaser="Architecture, hospitality, and custom sculptural installations."
                                icon={Handshake}
                                imageSrc={picPath('(12).webp')}
                                imageAlt="Collaborative design moodboard in neutral tones"
                            >
                                <div className="flex flex-col gap-6 border-l-2 border-[#b8924a]/35 pl-5 md:flex-row md:items-stretch md:justify-between md:pl-6">
                                    <p className="max-w-lg font-sans text-[0.95rem] font-light leading-[1.82] text-[#3f3f3c] md:text-[1rem]">
                                        For architectural projects, hospitality environments, and custom sculptural
                                        installations developed in collaboration with the studio.
                                    </p>
                                    <button
                                        type="button"
                                        className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl border-2 border-[#1a1a18] bg-transparent px-6 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#1a1a18] transition-all hover:-translate-y-0.5 hover:bg-[#1a1a18] hover:text-white md:self-center"
                                    >
                                        Click to connect
                                        <ArrowUpRight size={14} strokeWidth={2.2} />
                                    </button>
                                </div>
                            </AccordionRow>
                        </div>
                    </div>
                </section>

                {/* Materials — light editorial board: wide image left, prose right */}
                <section
                    id="materials"
                    className="about__materials relative overflow-hidden border-b border-black/[0.06] bg-[#ebeae6]"
                    aria-labelledby="about-materials-heading"
                >
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                        <div className="absolute -left-[20%] top-0 h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.65)_0%,transparent_68%)] blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-[45%] w-[50%] bg-[radial-gradient(ellipse_at_70%_80%,rgba(184,146,74,0.09),transparent_60%)]" />
                    </div>
                    <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-24 lg:px-16">
                        <Motion.header
                            className="mb-14 max-w-xl md:mb-20"
                            initial={{ y: 18, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
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
                        </Motion.header>
                        <div className="rounded-[26px] border border-white/45 bg-white/55 p-3 shadow-[0_24px_56px_rgba(90,90,90,0.12)] backdrop-blur-xl md:p-4">
                            <Motion.div
                                key={activeMaterial.id}
                                className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8"
                                initial={
                                    prefersReducedMotion ? { x: 0, opacity: 1 } : { x: 14, opacity: 0 }
                                }
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0.2 : 0.6,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
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
                            </Motion.div>

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

            </div>
        </PageTransition>
    );
}
