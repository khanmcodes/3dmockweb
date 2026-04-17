import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
    products,
    getProductPath,
    getDefaultVariant,
} from '../data/products';
import { ArrowDownRight } from 'lucide-react';
import HeroLiveNoise from '../components/HeroLiveNoise';
import PageTransition from '../components/PageTransition';

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
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.article>
    );
}

export default function Catalog() {
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const heroImgScale = useMotionValue(prefersReducedMotion ? 1 : 1.12);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroImgScrollBoost = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const heroImgScaleCombined = useTransform([heroImgScale, heroImgScrollBoost], ([a, b]) => a * b);
    const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
    const heroTypeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.55, 0.25]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const ctrl = animate(heroImgScale, 1, {
            duration: 1.45,
            ease: [0.33, 0.11, 0.02, 1],
            delay: 0.08,
        });
        return () => ctrl.stop();
    }, [heroImgScale, prefersReducedMotion]);

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
                        <motion.img
                            src={EDITORIAL.showroom.src}
                            alt={EDITORIAL.showroom.alt}
                            className="catalog2-hero__bg absolute inset-0 h-full min-h-[100dvh] w-full object-cover"
                            loading="eager"
                            style={{
                                scale: heroImgScaleCombined,
                                y: heroImgY,
                            }}
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
                    <motion.div
                        className="relative z-[3] mx-auto flex max-w-3xl flex-col items-center text-center [perspective:1200px]"
                        style={{ opacity: heroTypeOpacity }}
                    >
                        <h1
                            id="catalog-home-banner-heading"
                            className="catalog2-hero__headline font-light leading-[1.10] tracking-tight text-white normal-case text-8xl [transform-style:preserve-3d]"
                        >
                            <motion.span
                                className="catalog2-hero__headline-line block italic font-serif text-[7rem]"
                                initial={{ y: 36, opacity: 0, rotateX: prefersReducedMotion ? 0 : -6 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0.3 : 1.05,
                                    delay: prefersReducedMotion ? 0 : 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                Creating for
                            </motion.span>
                            <motion.span
                                className="catalog2-hero__headline-line mt-1 block font-sans font-medium tracking-tight"
                                initial={{ y: 36, opacity: 0, rotateX: prefersReducedMotion ? 0 : -6 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                transition={{
                                    duration: prefersReducedMotion ? 0.3 : 1.05,
                                    delay: prefersReducedMotion ? 0 : 0.64,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                Cosmic Beings
                            </motion.span>
                        </h1>
                        <motion.a
                            href="#collections"
                            className="catalog2-hero__cta mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3 font-medium text-black transition-opacity hover:opacity-90"
                            initial={{ y: 20, opacity: 0, scale: 0.96 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 0.75, ease: [0.33, 0.11, 0.02, 1], delay: prefersReducedMotion ? 0 : 0.85 }}
                        >
                            View our work
                            <ArrowDownRight className="size-5" aria-hidden strokeWidth={2} />
                        </motion.a>
                    </motion.div>
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
                            <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-start md:gap-x-10 md:gap-y-0 lg:gap-x-14">
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
