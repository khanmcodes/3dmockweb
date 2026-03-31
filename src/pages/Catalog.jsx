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
import Hero from '../sections/Hero';
import Gallery from '../sections/Gallery';
import Closing from '../sections/Closing';

gsap.registerPlugin(ScrollTrigger);

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const LOOKBOOK_IMAGES = [
    { src: picPath('(1).webp'), alt: 'Studio showroom — full collection', span: 'col-span-2', aspect: 'aspect-[21/9]' },
    { src: picPath('(2).webp'), alt: 'Silver chair with neon portal', span: 'col-span-1 row-span-2', aspect: 'aspect-auto h-full' },
    { src: picPath('(3).webp'), alt: 'Metallic loveseat', span: 'col-span-1', aspect: 'aspect-[4/3]' },
    { src: picPath('(6).webp'), alt: 'Futuristic staircase sculpture', span: 'col-span-1', aspect: 'aspect-[4/3]' },
    { src: picPath('(8).webp'), alt: 'Chrome spheres study', span: 'col-span-2', aspect: 'aspect-[21/9]' },
];

function CatalogCard({ product }) {
    const initial = getDefaultVariant(product);
    const [variant, setVariant] = useState(initial);

    return (
        <div className="catalog-card group relative z-0 flex flex-col text-inherit no-underline transition-[opacity,filter,transform] duration-500 ease-in-out group-hover/grid:scale-[0.98] group-hover/grid:opacity-40 group-hover/grid:blur-[2px] hover:z-10 hover:scale-100 hover:!opacity-100 hover:!blur-none">
            <div className="catalog-card__image-wrapper relative mb-8 aspect-[3/4] w-full cursor-pointer overflow-hidden bg-surface">
                <Link
                    to={getProductPath(product)}
                    className="catalog-card__image-hit absolute inset-0 z-[1] block overflow-hidden indent-[200%] whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
                    aria-label={`View ${product.name}`}
                />
                <div
                    className="catalog-card__visual relative z-0 flex h-full w-full items-center justify-center transition-transform duration-[1.2s] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
                    style={
                        variant?.image
                            ? undefined
                            : {
                                  background: `radial-gradient(circle at center, ${product.colorTone}18, transparent 70%)`,
                              }
                    }
                >
                    {variant?.image ? (
                        <img src={variant.image} alt="" loading="lazy" className="block h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)] font-sans text-xs font-light tracking-widest text-dim uppercase">
                            Visual pending
                        </div>
                    )}
                </div>
                {product.variants?.length > 1 ? (
                    <div className="pointer-events-auto absolute bottom-4 left-4 z-[2] flex gap-1.5 [isolation:isolate]">
                        {product.variants.map((v) => (
                            <button
                                key={v.id}
                                type="button"
                                className={`h-[1.125rem] w-[1.125rem] cursor-pointer rounded-full border border-[rgba(236,238,242,0.35)] p-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-200 [transition-timing-function:var(--ease-out-expo)] hover:scale-[1.08] ${
                                    v.id === variant?.id
                                        ? 'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3),0_0_0_2px_var(--color-accent-gold)]'
                                        : ''
                                }`}
                                style={{ backgroundColor: v.swatch }}
                                title={v.label}
                                aria-label={`${product.name} — ${v.label}`}
                                onClick={() => setVariant(v)}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="catalog-card__info flex items-start justify-between gap-8">
                <Link to={getProductPath(product)} className="catalog-card__text flex min-w-0 flex-1 flex-col gap-2 no-underline text-inherit">
                    <h2 className="catalog-card__name font-serif text-xl font-normal tracking-normal text-text transition-colors duration-300 group-hover:text-accent-gold md:text-2xl">
                        {product.name}
                    </h2>
                    <span className="catalog-card__material font-sans text-xs tracking-wider text-muted uppercase">
                        {product.material}
                    </span>
                </Link>
                <Link
                    to={getProductPath(product)}
                    className="catalog-card__price shrink-0 font-sans text-sm font-medium tracking-wide text-text no-underline"
                >
                    {product.price}
                </Link>
            </div>
        </div>
    );
}

export default function Catalog() {
    const gridRef = useRef(null);
    const lookbookRef = useRef(null);

    useEffect(() => {
        // Lookbook scroll reveals
        if (lookbookRef.current) {
            const cells = lookbookRef.current.querySelectorAll('.lookbook-cell');
            cells.forEach((cell, i) => {
                gsap.fromTo(
                    cell,
                    {
                        clipPath: 'inset(8% 8% 8% 8%)',
                        scale: 0.95,
                        opacity: 0,
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cell,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: i * 0.08,
                    }
                );

                // Parallax on each image
                const img = cell.querySelector('img');
                if (img) {
                    gsap.to(img, {
                        yPercent: -8,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: cell,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        },
                    });
                }
            });
        }

        // Product card parallax
        const cards = gridRef.current?.querySelectorAll('.catalog-card');
        if (!cards) return;

        const cleaners = [];
        cards.forEach((card) => {
            const wrapper = card.querySelector('.catalog-card__image-wrapper');
            const visual = card.querySelector('.catalog-card__visual');

            const moveParallax = (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const distX = (x - centerX) / centerX;
                const distY = (y - centerY) / centerY;

                gsap.to(visual, {
                    x: distX * 15,
                    y: distY * 15,
                    scale: 1.08,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            };

            const resetParallax = () => {
                gsap.to(visual, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)',
                    overwrite: 'auto',
                });
            };

            wrapper.addEventListener('mousemove', moveParallax);
            wrapper.addEventListener('mouseleave', resetParallax);
            cleaners.push(() => {
                wrapper.removeEventListener('mousemove', moveParallax);
                wrapper.removeEventListener('mouseleave', resetParallax);
            });
        });

        return () => cleaners.forEach((fn) => fn());
    }, []);

    return (
        <PageTransition className="catalog page relative min-h-screen bg-bg p-0">
            <Hero />
            <Gallery />

            {/* ━━━━━━━━━━ Lookbook — Editorial Bento Grid ━━━━━━━━━━ */}
            <section className="lookbook relative z-0 border-t border-[rgba(236,238,242,0.06)] bg-bg">
                <div className="mx-auto max-w-screen-2xl px-6 py-24 sm:px-8 md:px-16 md:py-36">
                    {/* Section header */}
                    <div className="relative mb-16 text-center md:mb-24">
                        <span className="label mb-4 block text-accent-gold/70">Visual Diary</span>
                        <h2 className="font-serif text-4xl font-light tracking-tight text-text md:text-5xl lg:text-6xl">
                            The Atelier
                        </h2>
                        <div className="mx-auto mt-6 h-px w-[80px] bg-[linear-gradient(90deg,transparent,var(--color-accent-gold),transparent)]" />
                        <p className="mx-auto mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-muted">
                            A glimpse into the world of Studio Vortessa — materials, forms, and the spaces they inhabit.
                        </p>
                    </div>

                    {/* Bento grid */}
                    <div
                        ref={lookbookRef}
                        className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3"
                    >
                        {LOOKBOOK_IMAGES.map((img, i) => (
                            <div
                                key={i}
                                className={`lookbook-cell group relative overflow-hidden rounded-[2px] bg-surface ring-1 ring-[rgba(236,238,242,0.06)] will-change-[clip-path] ${
                                    i === 0 ? 'md:col-span-2 lg:col-span-2' :
                                    i === 1 ? 'md:row-span-2' :
                                    i === 4 ? 'md:col-span-2 lg:col-span-2' :
                                    ''
                                }`}
                            >
                                <div className={`relative w-full overflow-hidden ${
                                    i === 0 ? 'aspect-[21/9]' :
                                    i === 1 ? 'aspect-auto h-full min-h-[400px]' :
                                    i === 4 ? 'aspect-[21/9]' :
                                    'aspect-[4/3]'
                                }`}>
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="h-full w-full object-cover brightness-[0.85] contrast-[1.08] saturate-[0.92] transition-[transform,filter] duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform group-hover:scale-[1.04] group-hover:brightness-[1]"
                                        loading="lazy"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(5,6,8,0.4)] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(212,163,115,0.06)_0%,transparent_50%)]" />
                                </div>

                                {/* Floating label on hover */}
                                <div className="absolute bottom-4 left-5 z-[2] translate-y-3 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100">
                                    <span className="label text-text/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                                        {img.alt}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━━━━━━━━ Product Collection ━━━━━━━━━━ */}
            <section className="catalog__collection texture-noise relative z-0 border-t border-[rgba(236,238,242,0.06)]">
            <div className="catalog__container mx-auto max-w-screen-2xl px-16 pb-64 pt-64">
                <div className="catalog__header relative z-[2] mb-48 text-center">
                    <span className="catalog__title-eyebrow label mb-4 block text-dim">Studio Vortessa</span>
                    <h2 className="catalog__title font-serif text-4xl font-light tracking-tight text-text [text-shadow:0_0_60px_rgba(255,255,255,0.04)] md:text-5xl lg:text-6xl">
                        The Collection
                    </h2>
                </div>

                <div
                    ref={gridRef}
                    className="catalog__grid group/grid grid grid-cols-1 gap-x-16 gap-y-64 md:grid-cols-2 lg:grid-cols-3"
                >
                    {products.map((product) => (
                        <CatalogCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            </section>
            <Closing />
        </PageTransition>
    );
}
