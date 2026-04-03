import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    products,
    getProductPath,
    getDefaultVariant,
} from '../data/products';
import PageTransition from '../components/PageTransition';
import { CosmicHeroMarks } from '../components/CosmicDecor';
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

const SHOWCASE_CHUNKS = [products.slice(0, 4), products.slice(4, 8), products.slice(8, 12)];
const SHOWCASE_FEATURED = SHOWCASE_CHUNKS.map((chunk) => chunk[0]).filter(Boolean);

function AtlasCard({ product, index, featured = false }) {
    const initial = getDefaultVariant(product);
    const [variant, setVariant] = useState(initial);
    const rootRef = useRef(null);

    const num = String(index + 1).padStart(2, '0');
    const productPath = getProductPath(product);
    const inquiryHref = `/contact?piece=${encodeURIComponent(product.name)}`;

    return (
        <div
            ref={rootRef}
            className={`atlas-card group relative z-0 ${featured ? 'h-full min-h-0 w-full' : ''}`}
        >
            <Link
                to={productPath}
                className="absolute inset-0 z-[1] rounded-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
                aria-label={`View ${product.name}`}
            />
            <div
                className={`pointer-events-none relative z-[2] overflow-hidden rounded-[22px] bg-surface/80 shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-[rgba(236,238,242,0.08)] backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-[0_32px_100px_rgba(0,0,0,0.62)] ${featured ? 'flex h-full min-h-0 flex-col' : ''}`}
            >
                <div className="pointer-events-none absolute left-5 top-5 z-[2] flex items-center gap-2">
                    <span className="rounded-full bg-[rgba(58,58,60,0.45)] px-2.5 py-1 font-mono text-[0.6rem] font-medium tracking-[0.2em] text-accent-gold/90 backdrop-blur-md">
                        {num}
                    </span>
                </div>
                <div
                    className={`catalog-card__image-wrapper relative w-full overflow-hidden bg-[#141416] ${
                        featured
                            ? 'min-h-[min(42vh,440px)] flex-1 p-2.5 md:min-h-[min(52vh,580px)] md:p-3'
                            : 'aspect-[3/4] p-2 md:p-2.5'
                    }`}
                >
                    <div
                        className="catalog-card__visual relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden rounded-[14px] bg-black/45 ring-1 ring-black/35"
                        style={
                            variant?.image
                                ? undefined
                                : {
                                      background: `radial-gradient(circle at center, ${product.colorTone}22, transparent 72%)`,
                                  }
                        }
                    >
                        {variant?.image ? (
                            <img
                                src={variant.image}
                                alt=""
                                loading="lazy"
                                className="block h-full w-full object-cover brightness-[0.9] contrast-[1.05] saturate-[0.95] transition-[filter] duration-[1s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:brightness-[0.98]"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-sans text-xs font-light tracking-widest text-dim uppercase">
                                Visual pending
                            </div>
                        )}
                    </div>
                    {product.variants?.length > 1 ? (
                        <div className="pointer-events-auto absolute bottom-6 left-6 z-[3] flex gap-1.5 isolate md:bottom-7 md:left-7">
                            {product.variants.map((v) => (
                                <button
                                    key={v.id}
                                    type="button"
                                    className={`h-4 w-4 cursor-pointer rounded-full border border-[rgba(236,238,242,0.35)] p-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)] transition-transform duration-200 [transition-timing-function:var(--ease-out-expo)] hover:scale-[1.08] ${
                                        v.id === variant?.id
                                            ? 'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3),0_0_0_2px_var(--color-accent-gold)]'
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
                <div
                    className={`flex shrink-0 items-end justify-between gap-4 px-5 pb-5 pt-4 ${featured ? 'md:px-7 md:pb-6 md:pt-5' : ''}`}
                >
                    <div className="min-w-0 flex-1">
                        <h2
                            className={`font-normal tracking-tight text-text transition-colors duration-300 group-hover:text-accent-gold ${
                                featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                            }`}
                        >
                            {product.name}
                        </h2>
                        <p className="mt-1 font-sans text-[0.65rem] font-medium tracking-wider text-muted uppercase">
                            {product.material}
                        </p>
                    </div>
                    <div className="pointer-events-auto flex shrink-0 flex-col items-end gap-2">
                        <span className="rounded-full border border-[rgba(236,238,242,0.12)] bg-[rgba(236,238,242,0.04)] px-3 py-1.5 font-sans text-xs font-medium tracking-wide text-text">
                            {product.price}
                        </span>
                        <Link
                            to={inquiryHref}
                            className="rounded-full border border-white/14 bg-[rgba(236,238,242,0.08)] px-3 py-1.5 font-sans text-xs font-medium tracking-wide text-text no-underline transition-[background-color,border-color,color] duration-300 hover:border-accent-gold/45 hover:bg-accent-gold/12 hover:text-accent-gold"
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

function HeroTitle({ text }) {
    return (
        <span className="inline-flex flex-wrap justify-center gap-x-[0.04em] gap-y-0">
            {text.split('').map((ch, i) => (
                <span key={`${ch}-${i}`} className="catalog2-hero__char inline-block font-medium -tracking-[0.6rem]">
                    {ch === ' ' ? '\u00a0' : ch}
                </span>
            ))}
        </span>
    );
}

export default function Catalog() {
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeInnerRef = useRef(null);
    const showcaseRef = useRef(null);
    const trackRef = useRef(null);
    const splitRef = useRef(null);
    const gridRef = useRef(null);
    const immersionRef = useRef(null);
    const lineRef = useRef(null);
    const scrollHintRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                const chars = heroRef.current.querySelectorAll('.catalog2-hero__char');
                const sub = heroRef.current.querySelector('.catalog2-hero__sub');
                const desc = heroRef.current.querySelector('.catalog2-hero__desc');

                gsap.set(chars, {
                    yPercent: 120,
                    rotateX: -95,
                    opacity: 0,
                    filter: 'blur(14px)',
                    transformOrigin: '50% 100% -40px',
                });
                if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });
                if (sub) gsap.set(sub, { y: 22, opacity: 0, filter: 'blur(8px)' });
                if (desc) gsap.set(desc, { y: 26, opacity: 0, filter: 'blur(6px)' });
                if (scrollHintRef.current) gsap.set(scrollHintRef.current, { opacity: 0, y: 14 });

                const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } });
                tl.to(chars, {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.35,
                    stagger: { amount: 0.45, from: 'center' },
                })
                    .to(
                        lineRef.current,
                        { scaleX: 1, opacity: 1, duration: 1.05, ease: 'expo.inOut' },
                        '-=0.85'
                    )
                    .to(sub, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.75 }, '-=0.55')
                    .to(desc, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85 }, '-=0.5')
                    .to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.35');

                const heroImg = heroRef.current.querySelector('.catalog2-hero__bg');
                const veil = heroRef.current.querySelector('.catalog2-hero__veil');

                gsap.to(heroImg, {
                    scale: 1.08,
                    yPercent: -8,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });

                if (veil) {
                    gsap.to(veil, {
                        opacity: 0.92,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: '35% top',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }

                const titleBlock = heroRef.current.querySelector('.catalog2-hero__title');
                if (titleBlock) {
                    gsap.fromTo(
                        titleBlock,
                        { opacity: 1, filter: 'blur(0px)' },
                        {
                            opacity: 0.22,
                            filter: 'blur(8px)',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: heroRef.current,
                                start: 'center top',
                                end: 'bottom top',
                                scrub: 0.6,
                            },
                        },
                    );
                }

                gsap.to(scrollHintRef.current, {
                    opacity: 0,
                    y: -10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: '8% top',
                        end: '25% top',
                        scrub: true,
                    },
                });
            }

            if (marqueeInnerRef.current && marqueeRef.current) {
                gsap.to(marqueeInnerRef.current, {
                    xPercent: -50,
                    ease: 'none',
                    duration: 22,
                    repeat: -1,
                });
            }

            if (trackRef.current && showcaseRef.current) {
                const track = trackRef.current;
                gsap.to(track, {
                    x: () => -(track.scrollWidth - window.innerWidth + 64),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: showcaseRef.current,
                        start: 'top top',
                        end: () => `+=${Math.max(track.scrollWidth, window.innerWidth * 1.2)}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }

            if (splitRef.current) {
                const left = splitRef.current.querySelector('.catalog2-split__left');
                const right = splitRef.current.querySelector('.catalog2-split__right');
                const copy = splitRef.current.querySelectorAll('.catalog2-split__copy');
                const bar = splitRef.current.querySelector('.catalog2-split__bar');

                if (left) {
                    gsap.fromTo(
                        left,
                        { clipPath: 'inset(100% 0% 0% 0%)' },
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            duration: 1.25,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: splitRef.current,
                                start: 'top 78%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                    const li = left.querySelector('img');
                    if (li) {
                        gsap.to(li, {
                            yPercent: -14,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: left,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1,
                            },
                        });
                    }
                }

                if (right) {
                    gsap.fromTo(
                        right,
                        { clipPath: 'inset(0% 0% 100% 0%)' },
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            duration: 1.25,
                            ease: 'power3.out',
                            delay: 0.12,
                            scrollTrigger: {
                                trigger: splitRef.current,
                                start: 'top 78%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                    const ri = right.querySelector('img');
                    if (ri) {
                        gsap.to(ri, {
                            yPercent: -10,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: right,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1,
                            },
                        });
                    }
                }

                if (bar) {
                    gsap.fromTo(
                        bar,
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            duration: 0.9,
                            ease: 'power3.inOut',
                            scrollTrigger: {
                                trigger: splitRef.current,
                                start: 'top 72%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }

                if (copy.length) {
                    gsap.fromTo(
                        copy,
                        { y: 36, opacity: 0, filter: 'blur(8px)' },
                        {
                            y: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 0.75,
                            stagger: 0.1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: splitRef.current,
                                start: 'top 62%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }
            }

            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('.atlas-card');
                gsap.fromTo(
                    cards,
                    { y: 72, opacity: 0, filter: 'blur(10px)', rotateX: 12 },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        rotateX: 0,
                        duration: 0.85,
                        ease: 'power3.out',
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 84%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            if (immersionRef.current) {
                const p1 = immersionRef.current.querySelector('.catalog2-immerse__a');
                const p2 = immersionRef.current.querySelector('.catalog2-immerse__b');
                const cap = immersionRef.current.querySelectorAll('.catalog2-immerse__cap');

                [p1, p2].forEach((panel, i) => {
                    if (!panel) return;
                    const img = panel.querySelector('img');
                    gsap.fromTo(
                        panel,
                        { clipPath: 'inset(6% 6% 6% 6%)', scale: 0.96 },
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            scale: 1,
                            duration: 1.15,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: panel,
                                start: 'top 85%',
                                toggleActions: 'play none none reverse',
                            },
                            delay: i * 0.06,
                        }
                    );
                    if (img) {
                        gsap.to(img, {
                            scale: 1.12,
                            yPercent: i % 2 === 0 ? -10 : -6,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: panel,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1,
                            },
                        });
                    }
                });

                if (cap.length) {
                    gsap.fromTo(
                        cap,
                        { y: 28, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: immersionRef.current,
                                start: 'top 75%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }
            }
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <PageTransition className="catalog page relative min-h-screen bg-bg p-0">
            <div ref={rootRef} className="relative bg-bg">
                {/* ━━━ Immersive hero ━━━ */}
                <section
                    ref={heroRef}
                    className="catalog2-hero relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28 md:px-12"
                    aria-label="Catalog hero"
                >
                    <div className="pointer-events-none absolute inset-0 z-0">
                        <img
                            src={EDITORIAL.showroom.src}
                            alt=""
                            className="catalog2-hero__bg absolute inset-0 h-[115%] w-full object-cover opacity-90"
                            loading="eager"
                        />
                        <div className="catalog2-hero__veil pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(32,32,34,0.4)_0%,rgba(12,12,14,0.9)_72%)]" />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(230,200,150,0.07)_0%,transparent_36%,transparent_64%,rgba(18,18,20,0.78)_100%)]" />
                    </div>

                    <CosmicHeroMarks className="z-[1]" />

                    <div className="relative z-[2] mx-auto max-w-5xl text-center [perspective:1200px]">
                        <p className="catalog2-hero__sub font-sans uppercase text-sm font-medium label mb-6 text-accent-gold/80">Welcome to a dimension where design transcends the ordinary.</p>
                        <h1
                            className="catalog2-hero__title heading-serif text-[clamp(2.75rem,10vw,6.75rem)] font-light leading-[0.95] tracking-[-0.03em] text-text [text-shadow:0_0_88px_rgba(230,201,138,0.18)]"
                            aria-label="Catalog"
                        >
                            <HeroTitle text="CATALOG" />
                        </h1>
                        <div
                            ref={lineRef}
                            className="catalog2-hero__line mx-auto mt-10 h-px w-[72px] origin-center bg-[linear-gradient(90deg,transparent,var(--color-accent-gold),transparent)]"
                        />
                        <p className="catalog2-hero__desc mx-auto mt-8 max-w-md font-sans text-sm font-medium leading-relaxed text-white/70 md:text-base">
                            interdimensional altarware for cosmic beings.
                        </p>
                    </div>

                    <div
                        ref={scrollHintRef}
                        className="catalog2-hero__scroll absolute bottom-12 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2"
                    >
                        <span className="label text-dim">Explore</span>
                        <div className="h-12 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,var(--color-text-dim),transparent)]" />
                    </div>

                    <p
                        className="pointer-events-none absolute bottom-10 right-5 z-[2] max-w-[min(100%,16rem)] text-right font-mono text-[0.6rem] font-medium leading-snug tracking-[0.18em] text-muted uppercase sm:bottom-12 sm:right-8 md:text-[0.65rem]"
                        aria-hidden
                    >
                        STUD10
                        <span className="font-bold text-text">VORT3554</span>
                    </p>
                </section>

                {/* ━━━ Pinned horizontal showcase ━━━ */}
                <section
                    ref={showcaseRef}
                    className="catalog2-showcase relative z-0 min-h-screen border-t border-[rgba(236,238,242,0.06)] bg-bg"
                >
                    <div className="pointer-events-none absolute left-6 top-8 z-[2] md:left-12 md:top-12">
                        <span className="label text-dim">Featured</span>
                    </div>
                    <div className="flex h-screen items-center overflow-hidden pl-6 md:pl-12">
                        <div
                            ref={trackRef}
                            className="flex h-[min(78vh,820px)] min-h-0 items-stretch gap-6 pr-24 md:gap-10 md:pr-32"
                        >
                            {SHOWCASE_FEATURED.map((p, si) => (
                                <div
                                    key={p.id}
                                    className="flex h-full w-[min(96vw,1320px)] shrink-0 items-stretch gap-5 md:gap-8"
                                >
                                    <div className="relative flex w-14 shrink-0 flex-col items-center justify-center self-stretch border-l border-[rgba(236,238,242,0.08)] pl-3 md:w-16">
                                        <span className="font-mono text-[0.6rem] tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
                                            {String(si + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="flex min-h-0 min-w-0 flex-1 self-stretch">
                                        <AtlasCard product={p} index={si} featured />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ Split editorial ━━━ */}
                <section
                    ref={splitRef}
                    className="relative z-0 border-t border-[rgba(236,238,242,0.06)] bg-bg px-6 py-24 md:px-12 md:py-32"
                >
                    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)] md:items-stretch md:gap-10 lg:gap-14">
                        <div className="catalog2-split__left relative overflow-hidden rounded-[20px] bg-surface ring-1 ring-[rgba(236,238,242,0.08)] md:row-span-2 md:min-h-0">
                            <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[min(72vh,640px)]">
                                <img
                                    src={EDITORIAL.chair.src}
                                    alt={EDITORIAL.chair.alt}
                                    className="h-[118%] w-full object-cover brightness-[0.82] contrast-[1.12] saturate-[0.9] md:h-full md:min-h-full"
                                    loading="lazy"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(58,58,60,0.45)] via-transparent to-transparent" />
                            </div>
                        </div>

                        <div className="catalog2-split__bar mx-auto hidden w-px origin-top [transform-origin:top_center] bg-[linear-gradient(180deg,transparent,var(--color-accent-gold),transparent)] md:row-span-2 md:block md:min-h-[min(72vh,640px)]" />

                        <div className="flex flex-col justify-center gap-10 md:gap-12">
                            <div>
                                <span className="catalog2-split__copy label text-accent-gold/75">Light & alloy</span>
                                <h2 className="catalog2-split__copy mt-4 text-3xl font-light leading-tight text-text md:text-4xl lg:text-5xl">
                                    Stillness that reads loud in a quiet room.
                                </h2>
                                <p className="catalog2-split__copy mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-muted">
                                    Reflections, portals, and machined edges — editorial photography woven into the sequence instead of stacked in a grid.
                                </p>
                            </div>
                            <div className="catalog2-split__right relative overflow-hidden rounded-[20px] bg-surface ring-1 ring-[rgba(236,238,242,0.08)]">
                                <div className="relative aspect-[16/11] w-full overflow-hidden md:aspect-[5/3]">
                                    <img
                                        src={EDITORIAL.loveseat.src}
                                        alt={EDITORIAL.loveseat.alt}
                                        className="h-[118%] w-full object-cover brightness-[0.82] contrast-[1.12] saturate-[0.9]"
                                        loading="lazy"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(58,58,60,0.4)] via-transparent to-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ━━━ Staggered product mosaic ━━━ */}
                <section className="texture-noise relative z-0 border-t border-[rgba(236,238,242,0.06)]">
                    <div className="mx-auto max-w-screen-2xl px-6 py-24 md:px-12 md:py-32">
                        <div className="mb-20 max-w-2xl">
                            <span className="label text-dim">Full index</span>
                            <h2 className="text-4xl font-light tracking-tight text-text md:text-5xl">
                                Every piece, reframed
                            </h2>
                            <p className="mt-4 font-sans text-sm font-light text-muted md:text-base">
                                A mosaic grid with depth tilt on hover — optimized for large displays, still gentle on phones.
                            </p>
                        </div>
                        <div
                            ref={gridRef}
                            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-14 [&_.atlas-card:nth-child(3n+2)]:lg:translate-y-12"
                        >
                            {products.map((p, i) => (
                                <AtlasCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ━━━ Dual immersion ━━━ */}
                <section
                    ref={immersionRef}
                    className="relative z-0 border-t border-[rgba(236,238,242,0.06)] bg-bg px-6 py-24 md:px-12 md:py-32"
                >
                    <div className="mx-auto max-w-screen-2xl">
                        <div className="catalog2-immerse__cap mb-14 text-center">
                            <span className="label text-accent-gold/75">Coda</span>
                            <h2 className="mt-4 text-3xl font-light text-text md:text-4xl">
                                The atelier, in two breaths
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                            <div className="catalog2-immerse__a group relative overflow-hidden rounded-[22px] bg-surface ring-1 ring-[rgba(236,238,242,0.08)] will-change-[clip-path]">
                                <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
                                    <img
                                        src={EDITORIAL.stairs.src}
                                        alt={EDITORIAL.stairs.alt}
                                        className="h-full w-full scale-110 object-cover brightness-[0.8] contrast-[1.1] saturate-[0.9] transition-[filter] duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:brightness-[0.95]"
                                        loading="lazy"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(212,163,115,0.08)_0%,transparent_55%)] opacity-70" />
                                </div>
                            </div>
                            <div className="catalog2-immerse__b group relative overflow-hidden rounded-[22px] bg-surface ring-1 ring-[rgba(236,238,242,0.08)] will-change-[clip-path] md:translate-y-10">
                                <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
                                    <img
                                        src={EDITORIAL.spheres.src}
                                        alt={EDITORIAL.spheres.alt}
                                        className="h-full w-full scale-110 object-cover brightness-[0.8] contrast-[1.1] saturate-[0.9] transition-[filter] duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:brightness-[0.95]"
                                        loading="lazy"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(225deg,rgba(212,163,115,0.07)_0%,transparent_50%)] opacity-70" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Closing />
            </div>
        </PageTransition>
    );
}
