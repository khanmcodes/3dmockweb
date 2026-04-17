import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    getProductBySlugOrId,
    getProductNeighbors,
    getOtherProducts,
    getProductPath,
    getDefaultVariant,
} from '../data/products';
import PageTransition from '../components/PageTransition';

export default function Product() {
    const { slug } = useParams();
    const product = getProductBySlugOrId(slug);
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroParallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
    const [variant, setVariant] = useState(() =>
        product ? getDefaultVariant(product) : null
    );

    const { prev, next } = product ? getProductNeighbors(product) : { prev: null, next: null };
    const related = product ? getOtherProducts(product, 4) : [];

    useEffect(() => {
        if (!product) return;
        document.title = `${product.name} · Studio Vortessa`;
        return () => {
            document.title = 'Studio Vortessa';
        };
    }, [product]);

    if (!product) {
        return (
            <PageTransition className="product page flex min-h-screen flex-col items-center justify-center bg-bg">
                <h1>Object not found.</h1>
                <Link to="/catalog" className="label mt-8">
                    Return to catalog
                </Link>
            </PageTransition>
        );
    }

    const proposalHref = `/contact?piece=${encodeURIComponent(product.name)}`;
    const heroImage = variant?.image;

    return (
        <PageTransition className="product page min-h-screen bg-bg">
            <article>
                <div
                    ref={containerRef}
                    className="product__layout grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] max-[1024px]:grid-rows-[auto_1fr] lg:grid-cols-[1.2fr_1fr]"
                >
                    <div className="product__visuals sticky top-0 h-screen overflow-hidden bg-surface max-[1024px]:relative max-[1024px]:h-[60vh]">
                        <motion.div
                            ref={imageRef}
                            className="product__hero-image relative flex h-full w-full items-center justify-center overflow-hidden"
                            key={variant?.id || 'default'}
                            style={{ y: heroParallaxY, scale: heroParallaxScale }}
                        >
                            <motion.div
                                className="relative flex h-full w-full items-center justify-center overflow-hidden"
                                style={
                                    heroImage
                                        ? undefined
                                        : {
                                              background: `radial-gradient(circle at center, ${product.colorTone}22, transparent 80%)`,
                                          }
                                }
                                initial={{ scale: 1.08, opacity: 0, filter: 'blur(10px)' }}
                                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {heroImage ? (
                                    <img className="product__hero-img block h-full w-full object-cover" src={heroImage} alt="" />
                                ) : null}
                                <span className="product__hero-label label absolute bottom-16 left-16 opacity-50">
                                    Studio Vortessa
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="product__context flex flex-col px-32 py-64 max-[1024px]:px-16 max-[1024px]:py-32">
                        <motion.div
                            ref={contextRef}
                            className="product__context-inner mx-auto w-full max-w-2xl"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        >
                            <Link
                                to="/catalog"
                                className="product__back label mb-32 inline-block transition-colors duration-300 hover:text-text"
                            >
                                ← Back to catalog
                            </Link>

                            <header className="product__header mb-32">
                                <h1 className="product__title mb-8 text-5xl font-normal leading-tight text-text [text-shadow:0_0_80px_rgba(184,146,74,0.08)] sm:text-6xl md:text-7xl lg:text-8xl">
                                    {product.name}
                                </h1>
                                <div className="product__meta flex items-start justify-between border-b border-border pb-8">
                                    <span className="product__material font-sans text-sm font-medium tracking-widest text-accent-gold uppercase">
                                        {product.material}
                                    </span>
                                </div>
                            </header>

                            {product.variants?.length > 1 ? (
                                <div className="product__variants mb-32 border-b border-border pb-16">
                                    <span className="label product__variants-label mb-4 block">Finish</span>
                                    <div className="product__swatch-row flex flex-wrap gap-2">
                                        {product.variants.map((v) => (
                                            <button
                                                key={v.id}
                                                type="button"
                                                className={`product__swatch h-8 w-8 cursor-pointer rounded-full border border-[rgba(46,46,46,0.28)] p-0 shadow-[inset_0_0_0_1px_rgba(90,90,89,0.24)] transition-[transform,box-shadow] duration-200 [transition-timing-function:var(--ease-out-expo)] hover:scale-[1.06] ${
                                                    variant?.id === v.id
                                                        ? 'product__swatch--active shadow-[inset_0_0_0_1px_rgba(90,90,89,0.32),0_0_0_2px_var(--color-accent-gold)]'
                                                        : ''
                                                }`}
                                                style={{ backgroundColor: v.swatch }}
                                                title={v.label}
                                                onClick={() => setVariant(v)}
                                            />
                                        ))}
                                    </div>
                                    {variant?.label ? (
                                        <p className="product__variant-caption font-sans mt-4 text-sm text-muted">
                                            {variant.label}
                                        </p>
                                    ) : null}
                                </div>
                            ) : null}

                            <div className="product__description mb-32">
                                <p className="font-sans text-base font-light leading-loose text-muted md:text-lg">{product.description}</p>
                            </div>

                            <div className="product__actions flex flex-col gap-4">
                                <Link
                                    to={proposalHref}
                                    className="product__btn product__btn--primary block w-full border-0 bg-text px-8 py-8 text-center text-bg no-underline transition-[background,transform,border-color] duration-300 hover:bg-accent-gold"
                                >
                                    <span className="label font-semibold text-bg">Request a proposal</span>
                                </Link>
                                <Link
                                    to="/contact"
                                    className="product__btn product__btn--ghost block w-full border border-border bg-transparent px-8 py-8 text-center text-text no-underline transition-[background,transform,border-color] duration-300 hover:border-text-dim hover:bg-surface"
                                >
                                    <span className="label text-text">General inquiry</span>
                                </Link>
                            </div>

                            <nav className="product__pager mt-32 flex items-start justify-between gap-8 border-t border-border pt-32 max-[600px]:flex-col" aria-label="Adjacent pieces">
                                {prev ? (
                                    <Link
                                        to={getProductPath(prev)}
                                        className="product__pager-link label max-w-xs sm:max-w-sm md:max-w-52 leading-snug text-muted transition-colors duration-300 hover:text-accent max-[600px]:max-w-full"
                                    >
                                        ← {prev.name}
                                    </Link>
                                ) : (
                                    <span className="product__pager-link product__pager-link--disabled label max-w-xs sm:max-w-sm md:max-w-52 cursor-not-allowed leading-snug opacity-35 max-[600px]:max-w-full">
                                        ← Previous
                                    </span>
                                )}
                                {next ? (
                                    <Link
                                        to={getProductPath(next)}
                                        className="product__pager-link label max-w-xs sm:max-w-sm md:max-w-52 leading-snug text-muted transition-colors duration-300 hover:text-accent max-[600px]:max-w-full"
                                    >
                                        {next.name} →
                                    </Link>
                                ) : (
                                    <span className="product__pager-link product__pager-link--disabled label max-w-xs sm:max-w-sm md:max-w-52 cursor-not-allowed leading-snug opacity-35 max-[600px]:max-w-full">
                                        Next →
                                    </span>
                                )}
                            </nav>
                        </motion.div>
                    </div>
                </div>

                <section className="product__related border-t border-border bg-bg-elevated px-32 py-64 max-[1024px]:px-16" aria-labelledby="related-heading">
                    <div className="product__related-inner mx-auto max-w-7xl">
                        <h2 id="related-heading" className="product__related-title mb-32 text-3xl font-light tracking-tight text-text md:text-4xl lg:text-5xl">
                            More in the collection
                        </h2>
                        <ul className="product__related-grid m-0 grid list-none grid-cols-1 gap-8 p-0 max-[600px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((p) => {
                                const rv = getDefaultVariant(p);
                                return (
                                    <li key={p.id}>
                                        <Link
                                            to={getProductPath(p)}
                                            className="product__related-card block overflow-hidden rounded border border-border text-inherit no-underline transition-[border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-text-dim"
                                        >
                                            <div
                                                className="product__related-visual flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface"
                                                style={
                                                    rv?.image
                                                        ? undefined
                                                        : {
                                                              background: `radial-gradient(circle at center, ${p.colorTone}18, transparent 75%)`,
                                                          }
                                                }
                                            >
                                                {rv?.image ? (
                                                    <img
                                                        className="product__related-img block h-full w-full object-cover"
                                                        src={rv.image}
                                                        alt=""
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="product__related-info flex flex-col gap-2 px-8 py-4">
                                                <span className="product__related-name font-serif text-xl font-normal text-text md:text-2xl">
                                                    {p.name}
                                                </span>
                                                <span className="product__related-meta label text-xs leading-snug text-dim">
                                                    {p.material}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            </article>
        </PageTransition>
    );
}
