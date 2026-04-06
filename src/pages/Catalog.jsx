import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Snap from 'lenis/snap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { appLenisRef } from '../hooks/useLenis';
import {
    products,
    getProductPath,
    getDefaultVariant,
} from '../data/products';
import { ArrowDownRight } from 'lucide-react';
import HeroLiveNoise from '../components/HeroLiveNoise';
import PageTransition from '../components/PageTransition';
import Closing from '../sections/Closing';

gsap.registerPlugin(ScrollTrigger);

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const EDITORIAL = {
    showroom: { src: picPath('(1).webp'), alt: 'Studio showroom' },
    chair: { src: picPath('(2).webp'), alt: 'Silver chair with neon portal' },
    loveseat: { src: picPath('(3).webp'), alt: 'Metallic loveseat' },
    stairs: { src: picPath('(6).webp'), alt: 'Futuristic staircase sculpture' },
    spheres: { src: picPath('(8).webp'), alt: 'Chrome spheres study' },
};

/** Materials — `layout` maps to bento grid slots on md+ */
const MATERIALS = [
    {
        id: 'chrome',
        title: 'Chrome',
        blurb: 'Liquid reflections and mirror-finished profiles.',
        visual: EDITORIAL.spheres,
        layout: 'hero',
    },
    {
        id: 'stainless-steel',
        title: 'Stainless steel',
        blurb: 'Surgical precision, softened for living spaces.',
        visual: EDITORIAL.chair,
        layout: 'stack-top',
    },
    {
        id: 'marble',
        title: 'Marble',
        blurb: 'Veined mass, weight, and quiet ceremony.',
        visual: EDITORIAL.stairs,
        layout: 'stack-bottom',
    },
    {
        id: 'gem-stones',
        title: 'Gem Stones',
        blurb: 'Faceted depth, prismatic accents, rare cuts.',
        visual: EDITORIAL.loveseat,
        layout: 'wide',
    },
];

function docTopWithLenis(el, lenis) {
    return el.getBoundingClientRect().top + lenis.scroll;
}

function catalogSnapHeaderOffset() {
    const md = window.matchMedia('(min-width: 768px)').matches;
    if (md) {
        return Math.max(5.5 * 16, Math.min(window.innerHeight * 0.18, 10.5 * 16));
    }
    return Math.max(4.5 * 16, Math.min(window.innerHeight * 0.14, 8.5 * 16));
}

function AtlasCard({ product }) {
    const initial = getDefaultVariant(product);
    const [variant, setVariant] = useState(initial);

    const productPath = getProductPath(product);
    const inquiryHref = `/contact?piece=${encodeURIComponent(product.name)}`;

    return (
        <article
            className="catalog-product-reveal group relative mx-auto flex min-h-[78vh] w-full max-w-6xl items-center py-10 md:min-h-[86vh] md:py-14"
            data-catalog-snap=""
        >
            <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
                <Link
                    to={productPath}
                    className="catalog-product-reveal__image relative block w-full max-w-[34rem] aspect-[4/5] overflow-hidden rounded-[30px] border border-[rgba(46,46,46,0.08)] bg-[rgba(219,219,219,0.68)] shadow-[0_24px_80px_rgba(100,100,99,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold md:justify-self-center"
                    aria-label={`View ${product.name}`}
                >
                    <div
                        className="relative flex h-full w-full items-center justify-center overflow-hidden"
                        style={
                            variant?.image
                                ? undefined
                                : {
                                      background: `radial-gradient(circle at 40% 35%, ${product.colorTone}33, transparent 70%)`,
                                  }
                        }
                    >
                        {variant?.image ? (
                            <img
                                src={variant.image}
                                alt=""
                                loading="lazy"
                                className="block h-full w-full object-cover brightness-[0.94] contrast-[1.04] saturate-[0.97] transition-[transform,filter] duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:brightness-[1.01]"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-sans text-[0.65rem] font-medium tracking-wide text-dim">
                                Visual pending
                            </div>
                        )}
                    </div>
                    {product.variants?.length > 1 ? (
                        <div className="pointer-events-auto absolute bottom-5 left-5 z-[3] flex gap-2 md:bottom-6 md:left-6">
                            {product.variants.map((v) => (
                                <button
                                    key={v.id}
                                    type="button"
                                    className={`h-[18px] w-[18px] cursor-pointer rounded-full border border-[rgba(255,255,255,0.55)] shadow-[0_1px_3px_rgba(100,100,99,0.2),inset_0_0_0_1px_rgba(46,46,46,0.12)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-110 hover:shadow-[0_2px_8px_rgba(100,100,99,0.22)] ${
                                        v.id === variant?.id
                                            ? 'shadow-[0_0_0_2px_var(--color-accent-gold),0_2px_8px_rgba(184,146,74,0.25)]'
                                            : ''
                                    }`}
                                    style={{ backgroundColor: v.swatch }}
                                    title={v.label}
                                    aria-label={`${product.name} — ${v.label}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setVariant(v);
                                    }}
                                />
                            ))}
                        </div>
                    ) : null}
                </Link>
                <div className="catalog-product-reveal__content relative p-2 md:p-4">
                    <h2 className="font-sans text-3xl font-medium tracking-tight text-text md:text-[2.2rem]">
                        {product.name}
                    </h2>
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted md:text-base">
                        {product.description}
                    </p>
                    <div className="mt-8 border-t border-[rgba(46,46,46,0.08)] pt-5">
                        <div>
                            <p className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-dim">
                                Material
                            </p>
                            <p className="mt-1 font-sans text-sm font-medium text-text md:text-base">
                                {product.material}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            to={productPath}
                            className="inline-flex items-center rounded-full bg-[rgba(255,255,255,0.52)] px-4 py-2 font-sans text-sm font-medium tracking-tight text-text no-underline ring-1 ring-[rgba(46,46,46,0.09)] transition-[background-color,color,box-shadow] duration-300 hover:bg-[rgba(255,255,255,0.78)] hover:text-accent-gold"
                        >
                            View details
                        </Link>
                        <Link
                            to={inquiryHref}
                            className="inline-flex items-center rounded-full bg-[rgba(165,165,164,0.22)] px-4 py-2 font-sans text-sm font-medium tracking-tight text-text no-underline ring-1 ring-[rgba(46,46,46,0.08)] transition-[background-color,color] duration-300 hover:bg-[rgba(255,255,255,0.6)] hover:text-accent-gold"
                        >
                            Inquiry
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Catalog() {
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const materialsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const sub = heroRef.current.querySelector('.catalog2-hero__sub');
                const headlineLines = heroRef.current.querySelectorAll('.catalog2-hero__headline-line');
                const headline = heroRef.current.querySelector('.catalog2-hero__headline');
                const cta = heroRef.current.querySelector('.catalog2-hero__cta');
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
                if (cta) gsap.set(cta, { y: 20, autoAlpha: 0, scale: 0.96 });

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
                if (cta) {
                    intro.to(
                        cta,
                        { y: 0, autoAlpha: 1, scale: 1, duration: 0.75, ease: 'power2.out' },
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

                const scrubFade = [headline, sub, cta].filter(Boolean);
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

            const sectionHeadings = rootRef.current?.querySelectorAll('.catalog-section-heading');
            if (sectionHeadings?.length) {
                sectionHeadings.forEach((block) => {
                    const label = block.querySelector('.catalog-section-heading__label');
                    const title = block.querySelector('.catalog-section-heading__title');
                    const rule = block.querySelector('.catalog-section-heading__rule');
                    const desc = block.querySelector('.catalog-section-heading__desc');
                    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

                    const parts = [label, title, desc].filter(Boolean);
                    if (parts.length) {
                        gsap.set(parts, { y: 32, autoAlpha: 0 });
                    }
                    if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: '50% 50%', autoAlpha: 0 });

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                        defaults: { ease: 'power3.out' },
                    });

                    if (label) {
                        tl.to(label, { y: 0, autoAlpha: 1, duration: reduced ? 0.35 : 0.8 });
                    }
                    if (title) {
                        tl.to(title, { y: 0, autoAlpha: 1, duration: reduced ? 0.35 : 0.95 }, label ? '-=0.5' : 0);
                    }
                    if (rule) {
                        tl.to(
                            rule,
                            { scaleX: 1, autoAlpha: 1, duration: reduced ? 0.25 : 1.1, ease: 'expo.out' },
                            '-=0.55',
                        );
                    }
                    if (desc) {
                        tl.to(desc, { y: 0, autoAlpha: 1, duration: reduced ? 0.3 : 0.75 }, '-=0.6');
                    }
                });
            }

            if (gridRef.current) {
                const rows = gridRef.current.querySelectorAll('.catalog-product-reveal');
                rows.forEach((row) => {
                    const image = row.querySelector('.catalog-product-reveal__image');
                    const content = row.querySelector('.catalog-product-reveal__content');
                    if (!image || !content) return;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 82%',
                            end: 'bottom 56%',
                            toggleActions: 'play none none reverse',
                        },
                    });

                    gsap.set([image, content], { willChange: 'transform, opacity' });
                    tl.fromTo(
                        image,
                        { y: 24, autoAlpha: 0, scale: 0.972, force3D: true },
                        { y: 0, autoAlpha: 1, scale: 1, duration: 0.98, ease: 'power3.out', force3D: true }
                    ).fromTo(
                        content,
                        { y: 18, x: 10, autoAlpha: 0, force3D: true },
                        {
                            y: 0,
                            x: 0,
                            autoAlpha: 1,
                            duration: 0.82,
                            ease: 'power3.out',
                            force3D: true,
                            clearProps: 'willChange',
                        },
                        '-=0.48'
                    );
                });
            }

            if (materialsRef.current) {
                const rows = materialsRef.current.querySelectorAll('.catalog-materials-reveal');
                rows.forEach((row) => {
                    const photo = row.querySelector('.catalog-materials-reveal__photo');
                    const content = row.querySelector('.catalog-materials-reveal__content');
                    if (!photo || !content) return;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 82%',
                            end: 'bottom 56%',
                            toggleActions: 'play none none reverse',
                        },
                    });

                    gsap.set([photo, content], { willChange: 'transform, opacity' });
                    tl.fromTo(
                        photo,
                        { y: 22, autoAlpha: 0, scale: 0.97, force3D: true },
                        { y: 0, autoAlpha: 1, scale: 1, duration: 1.02, ease: 'power3.out', force3D: true }
                    ).fromTo(
                        content,
                        { y: 18, x: 10, autoAlpha: 0, force3D: true },
                        {
                            y: 0,
                            x: 0,
                            autoAlpha: 1,
                            duration: 0.84,
                            ease: 'power3.out',
                            force3D: true,
                            clearProps: 'willChange',
                        },
                        '-=0.5'
                    );
                });
            }
        }, rootRef);

        return () => ctx.revert();
    }, []);

    /** Smooth section snap via Lenis (not CSS scroll-snap — that fights Lenis and feels abrupt). */
    useEffect(() => {
        let alive = true;
        let snap = null;
        let unsubscribeAdds = [];
        let ro = null;
        let debounceId = 0;

        const refreshSnapPositions = (lenis) => {
            const root = rootRef.current;
            if (!snap || !root || !lenis) return;
            unsubscribeAdds.forEach((u) => u());
            unsubscribeAdds = [];
            const targets = [...root.querySelectorAll('[data-catalog-snap]')];
            const headerOff = catalogSnapHeaderOffset();
            targets.forEach((el) => {
                const off = el.dataset.catalogSnap === 'hero' ? 0 : headerOff;
                const y = Math.ceil(docTopWithLenis(el, lenis) - off);
                if (y >= -1) unsubscribeAdds.push(snap.add(y));
            });
        };

        const start = () => {
            const lenis = appLenisRef.current;
            const root = rootRef.current;
            if (!alive || !lenis || !root) {
                return () => {};
            }

            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            snap = new Snap(lenis, {
                type: 'proximity',
                duration: reduced ? 0.42 : 1.18,
                easing: (t) => 1 - (1 - t) ** 3,
                debounce: reduced ? 200 : 100,
                distanceThreshold: reduced ? '55%' : '32%',
            });

            refreshSnapPositions(lenis);

            const scheduleRefresh = () => {
                clearTimeout(debounceId);
                debounceId = window.setTimeout(() => {
                    if (!alive) return;
                    requestAnimationFrame(() => {
                        const l = appLenisRef.current;
                        if (l) {
                            refreshSnapPositions(l);
                            ScrollTrigger.refresh();
                        }
                    });
                }, 160);
            };

            ro = new ResizeObserver(scheduleRefresh);
            ro.observe(root);

            const onRefresh = () => scheduleRefresh();
            window.addEventListener('orientationchange', onRefresh);

            return () => {
                window.removeEventListener('orientationchange', onRefresh);
                clearTimeout(debounceId);
                ro?.disconnect();
                unsubscribeAdds.forEach((u) => u());
                unsubscribeAdds = [];
                snap?.destroy();
                snap = null;
            };
        };

        let cleanup = () => {};
        let raf = 0;
        const waitLenis = () => {
            if (!alive) return;
            const lenis = appLenisRef.current;
            if (lenis && rootRef.current) {
                cleanup = start();
                return;
            }
            raf = requestAnimationFrame(waitLenis);
        };
        waitLenis();

        return () => {
            alive = false;
            cancelAnimationFrame(raf);
            cleanup();
        };
    }, []);

    return (
        <PageTransition className="catalog page relative min-h-screen bg-bg p-0">
            <div ref={rootRef} className="relative bg-bg">
                {/* ━━━ 1 · Home banner ━━━ */}
                <section
                    id="home-banner"
                    ref={heroRef}
                    className="catalog2-hero relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12"
                    data-catalog-snap="hero"
                    aria-labelledby="catalog-home-banner-heading"
                >
                    <div className="pointer-events-none absolute inset-0 z-0 min-h-[100dvh] w-full">
                        <img
                            src={EDITORIAL.showroom.src}
                            alt={EDITORIAL.showroom.alt}
                            className="catalog2-hero__bg absolute inset-0 h-full min-h-[100dvh] w-full object-cover"
                            loading="eager"
                        />
                    </div>
                    {/* Own layer so grain isn’t clipped / blended inside the image stack */}
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

                    <div className="relative z-[3] mx-auto flex max-w-3xl flex-col items-center text-center [perspective:1200px]">
                        <p className="catalog2-hero__sub text-balance text-white uppercase font-medium tracking-wide">
                            Welcome to a dimension where design transcends the ordinary
                        </p>
                        <h1
                            id="catalog-home-banner-heading"
                            className="catalog2-hero__headline mt-6 font-light leading-[1.10] tracking-tight text-white normal-case md:mt-8 text-8xl [transform-style:preserve-3d]"
                        >
                            <span className="catalog2-hero__headline-line block italic font-serif text-[7rem]">
                                Creating for
                            </span>
                            <span className="catalog2-hero__headline-line mt-1 block font-sans font-medium tracking-tight">
                                Cosmic Beings
                            </span>
                        </h1>
                        <a
                            href="#collections"
                            className="catalog2-hero__cta mt-15 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium tracking-tight text-black/70 transition-opacity hover:opacity-90"
                        >
                            View our work
                            <ArrowDownRight className="size-4 shrink-0" aria-hidden strokeWidth={2} />
                        </a>
                    </div>
                </section>

                {/* ━━━ 2 · Collections ━━━ */}
                <section id="collections" className="relative border-t border-[rgba(46,46,46,0.08)] bg-bg">
                    <div className="sticky top-0 z-30 border-b border-[rgba(46,46,46,0.08)] bg-[rgba(219,219,219,0.88)] backdrop-blur-md">
                        <div className="catalog-section-heading relative mx-auto flex max-w-screen-2xl flex-col items-center px-6 pb-8 pt-16 text-center md:px-12 md:pb-0 md:pt-10">
                            <span className="catalog-section-heading__label font-sans text-[1rem] font-medium uppercase text-black/50">
                                Catalog
                            </span>
                            <span className="catalog-section-heading__title font-sans text-[2.9rem] font-medium tracking-tight text-text md:text-[4.1rem]">
                                Crafted with Love
                            </span>
                            <div
                                className="catalog-section-heading__rule mt-7 h-px w-[min(14rem,42vw)] bg-linear-to-r from-transparent via-accent-gold/55 to-transparent"
                                aria-hidden
                            />
                            <div
                                className="pointer-events-none absolute inset-x-0 -bottom-14 h-14 bg-linear-to-b from-[rgba(219,219,219,0.9)] via-[rgba(219,219,219,0.62)] to-transparent backdrop-blur-[2px]"
                                aria-hidden
                            />
                        </div>
                    </div>

                    <div className="relative z-0 border-t border-[rgba(46,46,46,0.08)]">
                        <div className="mx-auto max-w-screen-2xl px-6 py-10 md:px-12 md:py-14">
                            <div ref={gridRef} className="flex flex-col gap-2">
                                {products.map((p) => (
                                    <AtlasCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━ 3 · Materials ━━━ */}
                <section
                    id="materials"
                    ref={materialsRef}
                    className="relative z-0 border-t border-[rgba(46,46,46,0.08)] bg-bg-elevated"
                    aria-labelledby="catalog-materials-heading"
                >
                    <div className="sticky top-0 z-30 border-b border-[rgba(46,46,46,0.08)] bg-[rgba(219,219,219,0.88)] backdrop-blur-md">
                        <div className="catalog-section-heading relative mx-auto flex max-w-screen-2xl flex-col items-center px-6 pb-8 pt-8 text-center md:px-12 md:pb-6">
                            <h2
                                id="catalog-materials-heading"
                                className="mt-4 leading-[1.02] tracking-tight text-text"
                            >
                                <span className="catalog-section-heading__title block font-sans text-[2.9rem] font-medium tracking-tight md:text-[4.1rem]">
                                    Materials
                                </span>
                            </h2>
                            <div
                                className="catalog-section-heading__rule mt-6 h-px w-[min(14rem,42vw)] bg-linear-to-r from-transparent via-accent-gold/55 to-transparent"
                                aria-hidden
                            />
                            <p className="catalog-section-heading__desc mt-5 max-w-xl font-sans text-sm font-light leading-relaxed text-muted md:text-base">
                                Four families of finish — each with its own tempo, reflectance, and gravity in a room.
                            </p>
                            <div
                                className="pointer-events-none absolute inset-x-0 -bottom-14 h-14 bg-linear-to-b from-[rgba(219,219,219,0.9)] via-[rgba(219,219,219,0.62)] to-transparent backdrop-blur-[2px]"
                                aria-hidden
                            />
                        </div>
                    </div>

                    <div className="mx-auto max-w-screen-2xl px-6 py-10 md:px-12 md:py-14">
                        <ul className="flex list-none flex-col gap-2">
                            {MATERIALS.map((m) => (
                                <li
                                    key={m.id}
                                    className="catalog-materials-reveal mx-auto flex min-h-[min(72vh,840px)] w-full max-w-6xl items-center py-8 md:min-h-[min(78vh,900px)] md:py-12"
                                    data-catalog-snap=""
                                >
                                    <article className="group relative w-full overflow-hidden rounded-[30px] border border-[rgba(46,46,46,0.08)] bg-[rgba(219,219,219,0.35)] shadow-[0_20px_72px_rgba(100,100,99,0.13),0_1px_0_rgba(255,255,255,0.66)_inset] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[rgba(184,146,74,0.22)] hover:shadow-[0_28px_86px_rgba(100,100,99,0.18),0_1px_0_rgba(255,255,255,0.72)_inset]">
                                        <div className="catalog-materials-reveal__image relative w-full overflow-hidden rounded-[24px]">
                                            <div className="catalog-materials-reveal__photo relative overflow-hidden rounded-[24px]">
                                                <div className="aspect-[16/9] w-full overflow-hidden md:aspect-[2.2/1]">
                                                    <img
                                                        src={m.visual.src}
                                                        alt={m.visual.alt}
                                                        className="h-full w-full object-cover brightness-[0.9] contrast-[1.06] saturate-[0.95] transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.05]"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(46,46,46,0.72)] via-[rgba(46,46,46,0.18)] to-transparent" />
                                            </div>
                                            <div className="catalog-materials-reveal__content absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
                                                <span className="mb-2 inline-flex w-fit rounded-full border border-white/35 bg-white/15 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.28em] text-white/90 backdrop-blur-sm">
                                                    MATERIAL
                                                </span>
                                                <h3 className="font-sans text-2xl font-medium tracking-tight text-white [text-shadow:0_2px_28px_rgba(46,46,46,0.45)] md:text-3xl lg:text-4xl">
                                                    {m.title}
                                                </h3>
                                                <p className="mt-2 max-w-xl font-sans text-sm font-light leading-relaxed text-white/92 [text-shadow:0_1px_14px_rgba(46,46,46,0.4)] md:text-base">
                                                    {m.blurb}
                                                </p>
                                                <span className="mt-5 inline-flex w-fit items-center gap-2 font-mono text-[0.6rem] tracking-[0.26em] text-accent-gold [text-shadow:0_1px_12px_rgba(46,46,46,0.35)]">
                                                    PRISM / CUT
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <Closing catalogSnapSection />
            </div>
        </PageTransition>
    );
}
