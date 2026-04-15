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

/** Split catalogue into left / right columns (first half vs remainder). */
function splitCatalogColumns(list) {
    const mid = Math.ceil(list.length / 2);
    return {
        leftColumn: list.slice(0, mid),
        rightColumn: list.slice(mid),
    };
}

function AtlasCard({ product, pairSide }) {
    const initial = getDefaultVariant(product);
    const [variant, setVariant] = useState(initial);

    const productPath = getProductPath(product);
    const inquiryHref = `/contact?piece=${encodeURIComponent(product.name)}`;

    const isLeft = pairSide === 'left';
    const isRight = pairSide === 'right';

    return (
        <article
            className={`catalog-product-reveal group relative flex h-auto min-h-0 w-full flex-col py-10 md:h-full md:min-h-[min(76vh,860px)] md:py-10 ${
                isLeft ? 'items-start md:justify-self-start' : ''
            } ${isRight ? 'items-start md:items-end md:justify-self-end' : ''}`}
        >
            <div
                className={`relative flex w-full flex-col md:absolute md:bottom-[100px] md:space-y-[-40px] ${
                    isLeft ? 'items-start' : 'items-start md:items-end md:text-right'
                }`}
            >
                <Link
                    to={productPath}
                    className={`catalog-product-reveal__image relative z-[10] block w-full max-w-[32rem] overflow-hidden ${
                        isRight ? 'md:ml-auto' : ''
                    }`}
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
                </Link>
                <div
                    className={`catalog-product-reveal__content relative max-w-[32rem] p-2 ${
                        isRight ? 'md:ml-auto' : ''
                    }`}
                >
                    <h2 className="font-sans text-3xl font-medium tracking-tight text-text md:text-[2.2rem]">
                        {product.name}
                    </h2>
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted md:text-base">
                        {product.description}
                    </p>
                    <div className="flex justify-between mt-8 border-t border-[rgba(46,46,46,0.08)] pt-5">
                        
                        <div>
                            <p className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-dim">Variant</p>
                        {product.variants?.length > 1 ? (
                        <div className="pointer-events-auto z-[3] flex gap-2 mt-1">
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
                    <div>
                            <p className="font-sans text-[0.72rem] uppercase tracking-[0.14em] text-dim">
                                Material
                            </p>
                            <p className="mt-1 font-sans text-sm font-medium text-text md:text-base">
                                {product.material}
                            </p>
                        </div>
                    </div>
                    
                    
                    <div
                        className={`mt-8 flex flex-wrap items-center gap-3 ${
                            isRight ? 'md:justify-end' : ''
                        }`}
                    >
                        <Link
                            to={productPath}
                            className="inline-flex items-center rounded-full bg-white px-4 py-2 font-sans text-sm font-medium tracking-tight text-text no-underline  transition-[background-color,color,box-shadow] duration-300 hover:bg-[rgba(255,255,255,0.78)] hover:text-accent-gold"
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
        }, rootRef);

        return () => ctx.revert();
    }, []);

    const { leftColumn, rightColumn } = splitCatalogColumns(products);

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
                        className="pointer-events-none bg-gradient-to-b from-transparent to-black/70 absolute inset-0 z-[1] min-h-[100dvh] w-full"
                        aria-hidden
                    >
                        <HeroLiveNoise className="h-full min-h-[100dvh] w-full" />
                    </div>
                    

                    <p
                        className="text-xl absolute max-w-xl bottom-8 left-6 z-[3] text-left text-white font-normal tracking-normal md:bottom-10 md:left-12"
                    >
                        Welcome to a dimension where design transcends the ordinary. Where gravity feels optional and form bends to imagination. Where every curve, edge, and surface exists with intention—refined, minimal, and undeniably otherworldly.
                    </p>
                    <p className="text-xl absolute bottom-8 right-6 z-[3] text-right uppercase leading-tight text-white font-medium tracking-normal md:bottom-10 md:right-12">stud10<br />vort3554</p>
                    <div className="relative z-[3] mx-auto flex max-w-3xl flex-col items-center text-center [perspective:1200px]">
                        <h1
                            id="catalog-home-banner-heading"
                            className="catalog2-hero__headline font-light leading-[1.10] tracking-tight text-white normal-case text-8xl [transform-style:preserve-3d]"
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
                            className="catalog2-hero__cta mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3 font-medium text-black transition-opacity hover:opacity-90"
                        >
                            View our work
                            <ArrowDownRight className="size-5" aria-hidden strokeWidth={2} />
                        </a>
                    </div>
                </section>

                {/* ━━━ 2 · Collections ━━━ */}
                <section id="collections" className="relative border-t border-[rgba(46,46,46,0.08)] bg-bg">
                    <div className="catalog-section-heading relative z-0 mx-auto flex max-w-screen-2xl flex-col items-center px-6 pt-16 text-center md:px-12 md:pt-0">
                        <div
                            className="catalog-section-heading__rule h-px w-[min(14rem,42vw)] bg-linear-to-r from-transparent via-accent-gold/55 to-transparent"
                            aria-hidden
                        />
                        <div
                            className="pointer-events-none absolute inset-x-0 -bottom-14 h-14"
                            aria-hidden
                        />
                    </div>

                    <div className="relative z-0 border-t border-[rgba(46,46,46,0.08)]">
                        <div className="mx-auto max-w-screen-2xl px-6 py-10 md:px-20 md:py-44">
                            <div
                                ref={gridRef}
                                className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-start md:gap-x-10 md:gap-y-0 lg:gap-x-14"
                            >
                                <div className="catalog-products-grid-left grid min-w-0 grid-cols-1 gap-14 md:gap-16">
                                    {leftColumn.map((p) => (
                                        <AtlasCard key={p.id} product={p} pairSide="left" />
                                    ))}
                                </div>
                                <div className="catalog-products-grid-right grid min-w-0 grid-cols-1 gap-14 md:gap-16 mt-100">
                                    {rightColumn.map((p) => (
                                        <AtlasCard key={p.id} product={p} pairSide="right" />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-16 border-t border-[rgba(46,46,46,0.08)] pt-14 pb-6 md:mt-24 md:pt-20 md:pb-10">
                                <article
                                    className="catalog-materials-cta relative overflow-hidden rounded-[28px] border border-[rgba(46,46,46,0.1)] shadow-[0_24px_80px_rgba(100,100,99,0.16)] md:rounded-[32px]"
                                    aria-labelledby="catalog-materials-cta-heading"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={EDITORIAL.stairs.src}
                                            alt=""
                                            className="h-full min-h-[280px] w-full object-cover object-center brightness-[0.88] contrast-[1.06] saturate-[0.95] md:min-h-[320px]"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(46,46,46,0.82)_0%,rgba(46,46,46,0.45)_42%,rgba(46,46,46,0.2)_100%)]"
                                            aria-hidden
                                        />
                                        <div
                                            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(46,46,46,0.55)_0%,transparent_55%)]"
                                            aria-hidden
                                        />
                                    </div>

                                    <div className="relative z-[1] flex min-h-[280px] flex-col justify-end px-6 py-10 sm:px-10 md:min-h-[320px] md:px-14 md:py-12 lg:max-w-[min(100%,34rem)] lg:py-14">
                                        <span className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/65">
                                            Finishes
                                        </span>
                                        <h2
                                            id="catalog-materials-cta-heading"
                                            className="mt-3 font-sans text-[1.85rem] font-medium leading-[1.12] tracking-tight text-white md:text-[2.25rem]"
                                        >
                                            Discover our materials
                                        </h2>
                                        <p className="mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-white/88 md:text-[0.9375rem] md:leading-relaxed">
                                            Chrome, steel, marble, and more — how we treat surface, reflectance, and mass.
                                            Explore the full palette on About.
                                        </p>
                                        <div className="mt-8">
                                            <Link
                                                to="/about#materials"
                                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sans text-sm font-medium tracking-tight text-text shadow-[0_4px_24px_rgba(0,0,0,0.18)] transition-[background-color,color,transform,box-shadow] duration-300 ease-out hover:bg-[rgba(255,255,255,0.92)] hover:text-accent-gold hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)] md:px-6 md:py-3 md:text-base"
                                            >
                                                Discover Our Materials
                                                <ArrowDownRight className="size-4 shrink-0" aria-hidden strokeWidth={2} />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
