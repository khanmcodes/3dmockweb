import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

function materialsBentoClass(layout) {
    switch (layout) {
        case 'hero':
            return 'md:col-span-8 md:row-span-2 min-h-[min(52vh,520px)] max-md:min-h-[min(52vh,380px)]';
        case 'stack-top':
            return 'md:col-span-4 md:col-start-9 md:row-start-1 min-h-[min(26vh,240px)]';
        case 'stack-bottom':
            return 'md:col-span-4 md:col-start-9 md:row-start-2 min-h-[min(26vh,240px)]';
        case 'wide':
            return 'md:col-span-12 md:row-start-3 max-md:min-h-[320px] md:min-h-[min(30vh,320px)]';
        default:
            return '';
    }
}

function AtlasCard({ product, index }) {
    const initial = getDefaultVariant(product);
    const [variant, setVariant] = useState(initial);
    const rootRef = useRef(null);

    const num = String(index + 1).padStart(2, '0');
    const productPath = getProductPath(product);
    const inquiryHref = `/contact?piece=${encodeURIComponent(product.name)}`;

    return (
        <div ref={rootRef} className="atlas-card group relative z-0">
            <Link
                to={productPath}
                className="absolute inset-0 z-[1] rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
                aria-label={`View ${product.name}`}
            />
            <div className="pointer-events-none relative z-[2] overflow-hidden rounded-[24px] bg-[linear-gradient(165deg,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0.22)_48%,rgba(165,165,164,0.35)_100%)] shadow-[0_8px_40px_rgba(100,100,99,0.12),0_1px_0_rgba(255,255,255,0.65)_inset] ring-1 ring-[rgba(46,46,46,0.06)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-1 group-hover:shadow-[0_20px_56px_rgba(100,100,99,0.18),0_1px_0_rgba(255,255,255,0.7)_inset]">
                <div className="pointer-events-none absolute left-4 top-4 z-[2] md:left-5 md:top-5">
                    <span className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.55)] bg-[rgba(255,255,255,0.4)] px-2.5 py-1 font-mono text-[0.58rem] font-medium tracking-[0.28em] text-text/80 shadow-sm backdrop-blur-sm">
                        {num}
                    </span>
                </div>
                <div className="catalog-card__image-wrapper relative aspect-[3/4] w-full overflow-hidden p-2.5 md:p-3">
                    <div
                        className="catalog-card__visual relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-[18px] bg-[rgba(120,120,119,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-[rgba(46,46,46,0.06)]"
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
                                className="block h-full w-full object-cover brightness-[0.94] contrast-[1.03] saturate-[0.96] transition-[transform,filter] duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:brightness-[1.02]"
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
                </div>
                <div className="flex shrink-0 items-end justify-between gap-4 border-t border-[rgba(46,46,46,0.05)] px-5 pb-5 pt-4 md:px-6 md:pb-6">
                    <div className="min-w-0 flex-1 pr-2">
                        <h2 className="font-sans text-lg font-medium tracking-tight text-text transition-colors duration-300 ease-out group-hover:text-accent-gold md:text-[1.125rem]">
                            {product.name}
                        </h2>
                        <p className="mt-1.5 line-clamp-2 font-sans text-[0.7rem] font-normal leading-snug tracking-tight text-muted md:text-xs">
                            {product.material}
                        </p>
                    </div>
                    <div className="pointer-events-auto flex shrink-0 flex-col items-end gap-2.5">
                        <span className="rounded-full bg-[rgba(255,255,255,0.55)] px-3 py-1.5 font-sans text-xs font-medium tabular-nums tracking-tight text-text ring-1 ring-[rgba(46,46,46,0.06)] backdrop-blur-sm">
                            {product.price}
                        </span>
                        <Link
                            to={inquiryHref}
                            className="rounded-full bg-[rgba(255,255,255,0.35)] px-3.5 py-1.5 font-sans text-xs font-medium tracking-tight text-text no-underline ring-1 ring-[rgba(46,46,46,0.08)] transition-[background-color,box-shadow,color] duration-300 hover:bg-[rgba(255,255,255,0.65)] hover:ring-accent-gold/35 hover:text-accent-gold"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Inquiry
                        </Link>
                    </div>
                </div>
            </div>
        </div>
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
                const sub = heroRef.current.querySelector('.catalog2-hero__sub');
                const headline = heroRef.current.querySelector('.catalog2-hero__headline');
                const cta = heroRef.current.querySelector('.catalog2-hero__cta');

                if (sub) gsap.set(sub, { y: 18, opacity: 0, filter: 'blur(6px)' });
                if (headline) gsap.set(headline, { y: 28, opacity: 0, filter: 'blur(8px)' });
                if (cta) gsap.set(cta, { y: 16, opacity: 0, filter: 'blur(4px)' });

                const tl = gsap.timeline({ delay: 0.12, defaults: { ease: 'power3.out' } });
                if (sub) tl.to(sub, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85 });
                if (headline)
                    tl.to(headline, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, sub ? '-=0.5' : undefined);
                if (cta) tl.to(cta, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out' }, '-=0.55');

                const heroImg = heroRef.current.querySelector('.catalog2-hero__bg');
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

                if (headline) {
                    gsap.fromTo(
                        headline,
                        { opacity: 1, filter: 'blur(0px)' },
                        {
                            opacity: 0.35,
                            filter: 'blur(6px)',
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
                if (sub) {
                    gsap.fromTo(
                        sub,
                        { opacity: 1 },
                        {
                            opacity: 0.25,
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
                if (cta) {
                    gsap.fromTo(
                        cta,
                        { opacity: 1 },
                        {
                            opacity: 0.2,
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

            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('.atlas-card');
                gsap.set(cards, { transformOrigin: '50% 92%' });
                gsap.fromTo(
                    cards,
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.965,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power2.out',
                        stagger: { each: 0.05, from: 'start' },
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 89%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            if (materialsRef.current) {
                const tiles = materialsRef.current.querySelectorAll('.catalog-materials__tile');
                gsap.fromTo(
                    tiles,
                    { y: 48, opacity: 0, filter: 'blur(8px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: materialsRef.current,
                            start: 'top 82%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition className="catalog page relative min-h-screen bg-bg p-0">
            <div ref={rootRef} className="relative bg-bg">
                {/* ━━━ 1 · Home banner ━━━ */}
                <section
                    id="home-banner"
                    ref={heroRef}
                    className="catalog2-hero relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12"
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

                    <div className="relative z-[2] mx-auto flex max-w-3xl flex-col items-center text-center">
                        <p className="text-white uppercase font-medium">
                            Welcome to a dimension where design transcends the ordinary
                        </p>
                        <h1
                            id="catalog-home-banner-heading"
                            className="mt-6 font-light leading-[1.10] tracking-tight text-white normal-case md:mt-8 text-8xl"
                        >
                            <span className="italic font-serif text-[7rem]">Creating for</span><br /> <span className="font-sans font-medium tracking-tight">Cosmic Beings</span>
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
                <section id="collections" className="border-t border-[rgba(46,46,46,0.08)] bg-bg">
                    <div className="mx-auto max-w-screen-2xl px-6 pb-10 pt-16 md:px-12 md:pb-12 md:pt-20">
                        <span className="label text-dim">Collections</span>
                        <h2 className="mt-3 text-3xl font-light tracking-tight text-text md:text-4xl lg:text-[2.75rem]">
                            Full catalog
                        </h2>
                        <p className="mt-4 max-w-xl font-sans text-sm font-light leading-relaxed text-muted md:text-base">
                            Browse every piece in the mosaic — tuned for large displays, still calm on phones.
                        </p>
                    </div>

                    <div className="texture-noise relative z-0 border-t border-[rgba(46,46,46,0.08)]">
                    <div className="mx-auto max-w-screen-2xl px-6 py-20 md:px-12 md:py-28">
                        <div
                            ref={gridRef}
                            className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10 xl:gap-11 [&_.atlas-card:nth-child(3n+2)]:lg:translate-y-10"
                        >
                            {products.map((p, i) => (
                                <AtlasCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                    </div>
                </section>

                {/* ━━━ 3 · Materials (bento) ━━━ */}
                <section
                    id="materials"
                    ref={materialsRef}
                    className="relative z-0 overflow-hidden border-t border-[rgba(46,46,46,0.08)] bg-bg-elevated px-6 py-24 md:px-12 md:py-32"
                    aria-labelledby="catalog-materials-heading"
                >
                    <div
                        className="pointer-events-none absolute -right-24 top-32 h-[22rem] w-[22rem] rounded-full border border-[rgba(184,146,74,0.07)] md:-right-16 md:top-24"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute bottom-16 left-8 h-48 w-48 rounded-full border border-[rgba(46,46,46,0.07)] md:bottom-24 md:left-16"
                        aria-hidden
                    />

                    <div className="relative mx-auto max-w-screen-2xl">
                        <header className="mb-14 flex flex-col gap-8 md:mb-20 lg:mb-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                            <div className="max-w-2xl">
                                <span className="label text-dim">Materials</span>
                                <h2
                                    id="catalog-materials-heading"
                                    className="mt-4 text-[clamp(2.1rem,4.8vw,3.5rem)] font-light leading-[1.06] tracking-tight text-text"
                                >
                                    Surfaces we{' '}
                                    <span className="bg-linear-to-r from-accent-gold via-[#c9a66a] to-accent-gold/75 bg-clip-text text-transparent">
                                        work in
                                    </span>
                                </h2>
                            </div>
                            <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-muted lg:max-w-xs lg:pb-1 lg:text-right lg:text-[0.9375rem]">
                                Four families of finish — each with its own tempo, reflectance, and gravity in a room.
                            </p>
                        </header>

                        <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
                            {MATERIALS.map((m, mi) => {
                                const num = String(mi + 1).padStart(2, '0');
                                const isHero = m.layout === 'hero';
                                const isWide = m.layout === 'wide';
                                return (
                                    <li
                                        key={m.id}
                                        className={`catalog-materials__tile min-w-0 ${materialsBentoClass(m.layout)}`}
                                    >
                                        <article
                                            className={`group relative flex h-full min-h-0 overflow-hidden rounded-[28px] bg-surface shadow-[0_20px_70px_rgba(100,100,99,0.16)] ring-1 ring-[rgba(46,46,46,0.08)] transition-shadow duration-500 hover:shadow-[0_28px_90px_rgba(100,100,99,0.22)] ${
                                                isWide ? 'max-md:flex-col md:flex-row' : 'flex-col'
                                            }`}
                                        >
                                            <span className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center rounded-full border border-[rgba(255,255,255,0.45)] bg-[rgba(255,255,255,0.38)] px-3 py-1 font-mono text-[0.6rem] font-medium tracking-[0.35em] text-text shadow-sm backdrop-blur-md md:left-6 md:top-6">
                                                {num}
                                            </span>
                                            <div
                                                className={`relative min-h-0 overflow-hidden ${
                                                    isWide
                                                        ? 'aspect-[4/5] max-md:w-full md:aspect-auto md:h-auto md:w-[52%]'
                                                        : 'min-h-[200px] flex-1'
                                                }`}
                                            >
                                                <img
                                                    src={m.visual.src}
                                                    alt={m.visual.alt}
                                                    className="h-full w-full object-cover brightness-[0.9] contrast-[1.06] saturate-[0.94] transition-[transform,filter] duration-[1.1s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03] group-hover:brightness-[0.97]"
                                                    loading="lazy"
                                                />
                                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[rgba(90,90,89,0.55)] via-[rgba(60,60,59,0.08)] to-transparent md:via-transparent md:to-transparent" />
                                                {!isWide ? (
                                                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                                        <h3
                                                            className={`font-sans font-medium tracking-tight text-white [text-shadow:0_2px_28px_rgba(46,46,46,0.45)] ${
                                                                isHero
                                                                    ? 'text-2xl md:text-3xl lg:text-4xl'
                                                                    : 'text-xl md:text-2xl'
                                                            }`}
                                                        >
                                                            {m.title}
                                                        </h3>
                                                        <p className="mt-2 max-w-md font-sans text-sm font-light leading-relaxed text-white/92 [text-shadow:0_1px_14px_rgba(46,46,46,0.4)]">
                                                            {m.blurb}
                                                        </p>
                                                    </div>
                                                ) : null}
                                            </div>
                                            {isWide ? (
                                                <div className="flex flex-1 flex-col justify-center border-t border-[rgba(46,46,46,0.08)] bg-[rgba(219,219,219,0.55)] p-8 backdrop-blur-md md:border-t-0 md:border-l md:px-10 md:py-12">
                                                    <h3 className="font-sans text-2xl font-medium tracking-tight text-text md:text-3xl">
                                                        {m.title}
                                                    </h3>
                                                    <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted md:text-base">
                                                        {m.blurb}
                                                    </p>
                                                    <span className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-[0.6rem] tracking-[0.28em] text-accent-gold">
                                                        PRISM / CUT
                                                    </span>
                                                </div>
                                            ) : null}
                                        </article>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                <Closing />
            </div>
        </PageTransition>
    );
}
