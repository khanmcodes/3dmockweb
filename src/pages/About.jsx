import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';
import Closing from '../sections/Closing';

gsap.registerPlugin(ScrollTrigger);

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const HERO_BG = picPath('StudioVortessa_2026.jpg');
const HERO_VIDEO = picPath('Untitled-design.mp4');
const FOUNDER_IMG = picPath('founder.png');

const STUDIO_IMAGES = [
    picPath('(1).webp'),
    picPath('(3).webp'),
];

const STRIP_IMAGES = [
    { src: picPath('(1).jpg'), alt: 'Studio detail', speed: 1 },
    { src: picPath('(2).jpg'), alt: 'Material study', speed: 0.7 },
    { src: picPath('(3).jpg'), alt: 'Form exploration', speed: 1.2 },
    { src: picPath('(4).jpg'), alt: 'Surface finish', speed: 0.5 },
    { src: picPath('(5).jpg'), alt: 'Texture closeup', speed: 1.1 },
    { src: picPath('(1).webp'), alt: 'Object portrait', speed: 0.8 },
    { src: picPath('(2).webp'), alt: 'Collection object', speed: 1.3 },
    { src: picPath('(4).webp'), alt: 'Composition', speed: 0.6 },
    { src: picPath('(6).webp'), alt: 'Assembly', speed: 1 },
    { src: picPath('(7).webp'), alt: 'Form snapshot', speed: 0.9 },
    { src: picPath('(8).webp'), alt: 'Object detail', speed: 1.2 },
    { src: picPath('(9).webp'), alt: 'Contour detail', speed: 0.7 },
    { src: picPath('(10).webp'), alt: 'Material accent', speed: 1.1 },
    { src: picPath('(1).GIF'), alt: 'Studio motion loop', speed: 0.8 },
    { src: picPath('(2).GIF'), alt: 'Process motion loop', speed: 1 },
];

const VISION_BG = picPath('(3).GIF');

const STATS = [
    { number: '2024', label: 'EST.' },
    { number: 'NYC', label: 'BASED' },
    { number: '∞', label: 'DIMENSIONS' },
];

const HERO_TITLE = 'About';

export default function About() {
    const rootRef = useRef(null);
    const heroBgRef = useRef(null);
    const heroContentRef = useRef(null);
    const heroOverlayRef = useRef(null);
    const heroCharsRef = useRef([]);
    const studioSectionRef = useRef(null);
    const studioImageRef = useRef(null);
    const studioImageWrapRef = useRef(null);
    const stripSectionRef = useRef(null);
    const stripTrackRef = useRef(null);
    const founderSectionRef = useRef(null);
    const founderImageRef = useRef(null);
    const visionSectionRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // ─── Zone 1: Hero character reveal ───
            if (heroCharsRef.current.length) {
                gsap.set(heroCharsRef.current, {
                    y: 120,
                    opacity: 0,
                    rotateX: -90,
                    transformOrigin: 'bottom center',
                });
                gsap.to(heroCharsRef.current, {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1.4,
                    ease: 'power4.out',
                    stagger: 0.06,
                    delay: 0.3,
                });
            }

            const heroReveals = root.querySelectorAll('.about-hero__reveal');
            gsap.set(heroReveals, { y: 44, opacity: 0, filter: 'blur(10px)' });
            gsap.to(heroReveals, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.14,
                delay: 0.8,
            });

            // Hero scroll parallax
            if (heroBgRef.current && heroContentRef.current) {
                gsap.to(heroBgRef.current, {
                    yPercent: -18,
                    scale: 1.06,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroBgRef.current.parentElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
                gsap.to(heroContentRef.current, {
                    y: -80,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroBgRef.current.parentElement,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                });
                if (heroOverlayRef.current) {
                    gsap.to(heroOverlayRef.current, {
                        opacity: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: heroBgRef.current.parentElement,
                            start: '50% top',
                            end: 'bottom top',
                            scrub: 0.8,
                        },
                    });
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

            // ─── Zone 3: Film strip horizontal scrub ───
            if (stripTrackRef.current && stripSectionRef.current) {
                mm.add('(min-width: 768px)', () => {
                    gsap.to(stripTrackRef.current, {
                        xPercent: -35,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: stripSectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.6,
                        },
                    });
                });
                mm.add('(max-width: 767px)', () => {
                    gsap.to(stripTrackRef.current, {
                        xPercent: -55,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: stripSectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.6,
                        },
                    });
                });

                // Individual image parallax for depth
                const stripImgs = stripTrackRef.current.querySelectorAll('.strip-img-inner');
                stripImgs.forEach((img, i) => {
                    const speed = STRIP_IMAGES[i]?.speed || 1;
                    gsap.to(img, {
                        yPercent: (speed - 1) * 25,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: stripSectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 0.8,
                        },
                    });
                });
            }

            // ─── Zone 4: Founder image parallax ───
            if (founderImageRef.current && founderSectionRef.current) {
                gsap.to(founderImageRef.current, {
                    yPercent: -8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: founderSectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.1,
                    },
                });

                // Glassmorphism panel entrance
                const glassPanel = founderSectionRef.current.querySelector('.founder-glass');
                if (glassPanel) {
                    gsap.fromTo(
                        glassPanel,
                        { x: 60, opacity: 0, filter: 'blur(20px)' },
                        {
                            x: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 1.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: founderSectionRef.current,
                                start: 'top 65%',
                                toggleActions: 'play none none reverse',
                            },
                        }
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

            // ─── Zone 5: Vision parallax + floating orbs ───
            if (visionSectionRef.current) {
                const visionBg = visionSectionRef.current.querySelector('.about-vision__bg');
                if (visionBg) {
                    gsap.to(visionBg, {
                        yPercent: -12,
                        scale: 1.04,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: visionSectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }

                // Shimmer text
                const shimmerText = visionSectionRef.current.querySelector('.vision-shimmer');
                if (shimmerText) {
                    gsap.fromTo(
                        shimmerText,
                        { backgroundPosition: '-200% center' },
                        {
                            backgroundPosition: '200% center',
                            duration: 4,
                            ease: 'none',
                            repeat: -1,
                        }
                    );
                }
            }
        }, root);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <PageTransition className="about page bg-bg">
            <div ref={rootRef} className="texture-noise texture-noise--footer relative min-h-screen">

                {/* ━━━━━━━━━━ ZONE 1 — Cinematic Hero with Character Reveal ━━━━━━━━━━ */}
                <section className="about__hero relative h-screen w-full overflow-hidden">
                    <div ref={heroBgRef} className="absolute inset-0 z-0 will-change-transform">
                        <img
                            src={HERO_BG}
                            alt=""
                            className="h-full w-full object-cover brightness-[0.4] contrast-[1.15] saturate-[0.88]"
                        />
                        <video
                            className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-[0.18] mix-blend-soft-light"
                            src={HERO_VIDEO}
                            muted
                            playsInline
                            autoPlay
                            loop
                            aria-hidden
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(165,165,164,0.38)_55%,rgba(140,140,139,0.78)_100%)]" aria-hidden />
                    <div
                        ref={heroOverlayRef}
                        className="pointer-events-none absolute inset-0 z-[3] bg-bg opacity-0"
                        aria-hidden
                    />

                    {/* Floating decorative rings */}
                    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
                        <div
                            className="absolute right-[15%] top-[20%] h-[300px] w-[300px] rounded-full border border-[rgba(212,163,115,0.08)]"
                            style={{ animation: 'floatOrbit 20s linear infinite' }}
                        />
                        <div
                            className="absolute left-[10%] bottom-[25%] h-[200px] w-[200px] rounded-full border border-[rgba(46,46,46,0.08)]"
                            style={{ animation: 'floatOrbitReverse 25s linear infinite' }}
                        />
                        <div
                            className="absolute right-[8%] bottom-[15%] h-[80px] w-[80px] rounded-full bg-[rgba(212,163,115,0.04)]"
                            style={{ animation: 'pulseGlow 4s ease-in-out infinite' }}
                        />
                    </div>

                    <div
                        ref={heroContentRef}
                        className="relative z-[4] flex h-full w-full flex-col justify-end px-6 pb-20 sm:px-8 md:px-12 lg:px-16 lg:pb-28"
                    >
                        <div className="mx-auto w-full max-w-7xl">
                            <div className="grid max-w-7xl grid-cols-1 items-end gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
                                <div className="min-w-0">
                                    <span className="about-hero__reveal label mb-6 block text-accent-gold">Studio Vortessa</span>

                                    {/* Character-by-character title reveal */}
                                    <h1
                                        className="heading-serif text-6xl font-normal leading-[0.98] text-text [perspective:600px] sm:text-7xl md:text-8xl lg:text-9xl"
                                        aria-label={HERO_TITLE}
                                    >
                                        {HERO_TITLE.split('').map((char, i) => (
                                            <span
                                                key={i}
                                                ref={(el) => { heroCharsRef.current[i] = el; }}
                                                className="inline-block [text-shadow:0_0_100px_rgba(212,163,115,0.18)]"
                                                style={{ display: char === ' ' ? 'inline' : undefined }}
                                                aria-hidden
                                            >
                                                {char === ' ' ? '\u00A0' : char}
                                            </span>
                                        ))}
                                    </h1>

                                    <div className="about-hero__reveal mt-8 h-px w-[60px] bg-[linear-gradient(90deg,var(--color-accent),transparent)]" />
                                </div>
                                <div className="min-w-0 max-md:order-first md:pb-3">
                                    <p className="about-hero__reveal font-serif m-0 max-w-lg text-base font-normal leading-loose text-text/70 md:text-lg">
                                        Sculptural furniture and objects between art and function — forms distilled to essence,
                                        materials chosen for permanence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-2">
                        <span className="about-hero__reveal label text-dim/60">Scroll</span>
                        <div className="about-hero__reveal h-10 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,var(--color-text-dim),transparent)]" />
                    </div>
                </section>

                {/* ━━━━━━━━━━ ZONE 2 — About Studio (Asymmetric + Stats) ━━━━━━━━━━ */}
                <section
                    ref={studioSectionRef}
                    className="about__studio relative overflow-hidden border-b border-[rgba(46,46,46,0.08)] bg-bg"
                >
                    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_80%_20%,rgba(212,163,115,0.09),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_5%_90%,rgba(196,194,190,0.06),transparent_48%)]" />
                    </div>

                    <div className="relative z-[1] mx-auto max-w-7xl px-6 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16 lg:py-40">

                        {/* Stats Bar */}
                        <div ref={statsRef} className="about-animate mb-16 flex items-center gap-8 md:mb-24 md:gap-16">
                            {STATS.map((stat, i) => (
                                <div key={i} className="about-stat flex flex-col items-center gap-2">
                                    <span className="font-serif text-3xl font-normal tracking-tight text-text md:text-5xl lg:text-6xl">
                                        {stat.number}
                                    </span>
                                    <span className="label text-dim">{stat.label}</span>
                                </div>
                            ))}
                            <div className="flex-1 h-px bg-[linear-gradient(90deg,rgba(212,163,115,0.3),transparent_70%)]" />
                        </div>

                        {/* Main content grid */}
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr] md:gap-16 lg:gap-20">
                            <div className="about-animate min-w-0">
                                {/* Pull quote */}
                                <blockquote className="mb-12 border-l-2 border-accent-gold/40 pl-6 md:pl-8">
                                    <p className="font-serif text-2xl font-normal leading-snug tracking-tight text-text/90 md:text-3xl lg:text-4xl">
                                        "Objects that shape atmosphere rather than simply occupy space."
                                    </p>
                                </blockquote>

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
                                </div>
                            </div>

                            <div className="relative min-w-0 max-md:order-first">
                                <div
                                    ref={studioImageWrapRef}
                                    className="group relative overflow-hidden rounded-[2px] bg-surface shadow-[0_24px_90px_rgba(100,100,99,0.26)] ring-1 ring-[rgba(46,46,46,0.1)] will-change-[clip-path]"
                                >
                                    <img
                                        ref={studioImageRef}
                                        src={STUDIO_IMAGES[0]}
                                        alt="Studio interior"
                                        className="about-studio__image aspect-3/4 h-full w-full object-cover will-change-transform md:aspect-[3/5]"
                                        loading="lazy"
                                    />
                                    <span
                                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(165,165,164,0.38)_100%)]"
                                        aria-hidden
                                    />
                                </div>
                                <div
                                    className="pointer-events-none absolute -bottom-8 -right-8 -z-[1] h-[min(42vw,320px)] w-[min(42vw,320px)] rounded-full border border-[rgba(212,163,115,0.08)] max-md:hidden"
                                    aria-hidden
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━ ZONE 3 — Process Band + Manifesto (Parallax Depth) ━━━━━━━━━━ */}
                <section
                    ref={stripSectionRef}
                    className="about__process relative overflow-hidden border-b border-[rgba(46,46,46,0.08)] bg-bg py-24 md:py-36"
                >
                    <div className="relative z-[1] mb-16 overflow-hidden md:mb-24">
                        <div
                            ref={stripTrackRef}
                            className="flex w-max gap-3 will-change-transform md:gap-4"
                        >
                            {STRIP_IMAGES.map((img, i) => (
                                <div
                                    key={i}
                                    className="group relative flex-shrink-0 overflow-hidden rounded-[2px] bg-surface shadow-[0_16px_60px_rgba(100,100,99,0.24)] ring-1 ring-[rgba(46,46,46,0.08)] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:z-10 hover:scale-[1.03]"
                                    style={{
                                        height: `${280 + (img.speed - 0.5) * 120}px`,
                                        width: `${220 + (img.speed - 0.5) * 80}px`,
                                        marginTop: i % 2 === 0 ? '0' : '40px',
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="strip-img-inner h-full w-full object-cover brightness-[0.82] contrast-[1.12] saturate-[0.9] transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform group-hover:scale-[1.06] group-hover:brightness-[1.0]"
                                        loading="lazy"
                                    />
                                    <span
                                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(130,130,129,0.28)] to-transparent"
                                        aria-hidden
                                    />
                                    {/* 3D tilt effect on hover via CSS */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.5)_0%,transparent_50%,rgba(120,120,119,0.1)_100%)]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-animate relative z-[1] mx-auto max-w-3xl px-6 sm:px-8 md:px-12 lg:px-16">
                        <header className="mb-10 md:mb-14">
                            <span className="label mb-5 block text-dim">Principles</span>
                            <div className="mb-5 h-px w-[60px] origin-left bg-accent" />
                            <h2 className="text-3xl font-normal leading-tight text-text md:text-4xl">
                                Manifesto
                            </h2>
                            <div className="mt-5 h-px w-full bg-[linear-gradient(90deg,rgba(212,163,115,0.35),transparent_65%)]" />
                        </header>
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16">
                            <ul className="list-none space-y-4 border-l border-[rgba(212,163,115,0.25)] pl-6 font-sans text-base font-light lowercase leading-relaxed text-muted md:text-[1.0625rem]">
                                <li>art as furniture.</li>
                                <li>objects as artifacts.</li>
                                <li>spaces as sanctuaries.</li>
                            </ul>
                            <ul className="list-none space-y-4 border-l border-[rgba(46,46,46,0.12)] pl-6 font-sans text-base font-light lowercase leading-relaxed text-muted md:text-[1.0625rem]">
                                <li>silence over excess.</li>
                                <li>form over ornament.</li>
                                <li>material over trend.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━ ZONE 4 — Founder (Editorial Overlap + Glassmorphism) ━━━━━━━━━━ */}
                <section
                    ref={founderSectionRef}
                    className="about__founder relative overflow-hidden border-b border-[rgba(46,46,46,0.08)] bg-bg"
                >
                    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_55%,rgba(212,163,115,0.06),transparent_50%)]" />
                    </div>

                    <div className="relative z-[1] mx-auto max-w-7xl px-6 py-24 sm:px-8 md:py-32 lg:px-16 lg:py-40">
                        {/* Editorial layout: large image with overlapping glass panel */}
                        <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-[1.1fr_0.9fr] lg:gap-0">
                            {/* Image column — takes up ~60% */}
                            <div className="about-animate relative min-w-0">
                                <figure className="group relative overflow-hidden rounded-[2px] bg-surface shadow-[0_28px_100px_rgba(100,100,99,0.28)] ring-1 ring-[rgba(46,46,46,0.1)]">
                                    <div className="overflow-hidden">
                                        <img
                                            ref={founderImageRef}
                                            src={FOUNDER_IMG}
                                            alt="Çilga Yesilyaprak, founder of Studio Vortessa"
                                            className="aspect-3/4 h-full w-full object-cover will-change-transform transition-[transform,filter] duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:brightness-[1.04] md:aspect-[4/5]"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span
                                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(165,165,164,0.32)_100%)]"
                                        aria-hidden
                                    />
                                </figure>
                            </div>

                            {/* Glassmorphism text panel — overlaps the image */}
                            <div className="founder-glass relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[52%] lg:max-w-[520px]">
                                <div className="relative rounded-[4px] border border-[rgba(46,46,46,0.12)] bg-[rgba(219,219,219,0.72)] px-8 py-10 shadow-[0_32px_80px_rgba(100,100,99,0.22)] backdrop-blur-[24px] md:px-12 md:py-14 lg:-ml-16">
                                    <span className="label mb-3 block text-accent-gold">Profile</span>
                                    <h2 className="mb-8 text-3xl font-normal leading-tight text-text md:text-4xl">
                                        Founder
                                    </h2>
                                    <div className="mb-8 h-px w-full bg-[linear-gradient(90deg,rgba(212,163,115,0.35),transparent_65%)]" />
                                    <div className="space-y-5 font-sans text-base font-light leading-loose text-muted md:text-[1.0625rem] md:leading-[1.85]">
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
                                    </div>
                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="h-px flex-1 bg-border" />
                                        <span className="label text-dim/60">Çilga Yesilyaprak</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━━━━━━━━ ZONE 5 — Vision (Shimmer + Floating Orbs) ━━━━━━━━━━ */}
                <section
                    ref={visionSectionRef}
                    className="about__vision relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden"
                >
                    <div className="about-vision__bg absolute inset-0 z-0 will-change-transform">
                        <img
                            src={VISION_BG}
                            alt=""
                            className="h-full w-full object-cover brightness-[0.3] contrast-[1.2] saturate-[0.7]"
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,transparent_0%,rgba(165,165,164,0.42)_55%,rgba(140,140,139,0.8)_100%)]" aria-hidden />
                    <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-bg/60 via-transparent to-bg/80" aria-hidden />

                    {/* Floating decorative orbs */}
                    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
                        <div
                            className="absolute left-[8%] top-[30%] h-[6px] w-[6px] rounded-full bg-accent-gold/30"
                            style={{ animation: 'floatOrbit 15s linear infinite' }}
                        />
                        <div
                            className="absolute right-[12%] top-[20%] h-[4px] w-[4px] rounded-full bg-metallic/20"
                            style={{ animation: 'floatOrbitReverse 18s linear infinite' }}
                        />
                        <div
                            className="absolute left-[20%] bottom-[20%] h-[8px] w-[8px] rounded-full bg-accent-gold/15"
                            style={{ animation: 'floatOrbit 22s linear infinite', animationDelay: '-5s' }}
                        />
                        <div
                            className="absolute right-[25%] bottom-[30%] h-[3px] w-[3px] rounded-full bg-silver/25"
                            style={{ animation: 'floatOrbitReverse 12s linear infinite', animationDelay: '-3s' }}
                        />
                        <div
                            className="absolute left-[45%] top-[15%] h-[100px] w-[100px] rounded-full border border-[rgba(212,163,115,0.04)]"
                            style={{ animation: 'floatOrbit 30s linear infinite', animationDelay: '-10s' }}
                        />
                    </div>

                    <div className="about-animate relative z-[3] mx-auto max-w-4xl px-6 py-28 text-center sm:px-8 md:px-12 md:py-36 lg:px-16">
                        <span className="label mb-6 block text-accent-gold/80">North Star</span>
                        <div className="mb-8 mx-auto h-px w-[60px] bg-[linear-gradient(90deg,transparent,var(--color-accent-gold),transparent)]" />

                        {/* Shimmer text */}
                        <p
                            className="vision-shimmer font-serif text-2xl font-normal leading-snug md:text-3xl md:leading-snug lg:text-4xl lg:leading-snug"
                            style={{
                                background: 'linear-gradient(90deg, var(--color-text) 0%, var(--color-accent-gold) 25%, var(--color-text) 50%, var(--color-accent-gold) 75%, var(--color-text) 100%)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            To redefine furniture as sculptural presence, creating a new dimension of living where
                            objects transform space into sanctuary.
                        </p>

                        <div className="mt-14 mx-auto h-px w-24 bg-[linear-gradient(90deg,transparent,rgba(212,163,115,0.3),transparent)]" />
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
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
                    </div>
                </section>

                {/* ━━━━━━━━━━ Footer ━━━━━━━━━━ */}
                <Closing />
            </div>
        </PageTransition>
    );
}
