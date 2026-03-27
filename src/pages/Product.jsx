import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    getProductBySlugOrId,
    getProductNeighbors,
    getOtherProducts,
    getProductPath,
    getDefaultVariant,
} from '../data/products';
import PageTransition from '../components/PageTransition';
import './Product.css';

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
    const { slug } = useParams();
    const product = getProductBySlugOrId(slug);
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);
    const [variant, setVariant] = useState(() =>
        product ? getDefaultVariant(product) : null
    );

    useEffect(() => {
        if (product) setVariant(getDefaultVariant(product));
    }, [product]);

    const { prev, next } = product ? getProductNeighbors(product) : { prev: null, next: null };
    const related = product ? getOtherProducts(product, 4) : [];

    useEffect(() => {
        if (!product) return;
        document.title = `${product.name} · Studio Vortessa`;
        return () => {
            document.title = 'Studio Vortessa';
        };
    }, [product]);

    useEffect(() => {
        if (!product || !containerRef.current) return;

        const ctx = gsap.context(() => {
            const elements = contextRef.current?.children;
            const tl = gsap.timeline({ delay: 0.3 });

            tl.fromTo(
                imageRef.current,
                { scale: 1.08, opacity: 0, filter: 'blur(10px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
            );

            if (elements?.length) {
                tl.fromTo(
                    elements,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.1 },
                    '-=1.0'
                );
            }

            gsap.to(imageRef.current, {
                y: 150,
                scale: 1.04,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [product, variant?.id]);

    if (!product) {
        return (
            <PageTransition className="product page product--not-found">
                <h1 className="font-serif">Object not found.</h1>
                <Link to="/catalog" className="label" style={{ marginTop: 'var(--space-md)' }}>
                    Return to catalog
                </Link>
            </PageTransition>
        );
    }

    const proposalHref = `/contact?piece=${encodeURIComponent(product.name)}`;
    const heroImage = variant?.image;

    return (
        <PageTransition className="product page">
            <article>
                <div ref={containerRef} className="product__layout">
                    <div className="product__visuals">
                        <div
                            ref={imageRef}
                            className="product__hero-image"
                            key={variant?.id || 'default'}
                            style={
                                heroImage
                                    ? undefined
                                    : {
                                          background: `radial-gradient(circle at center, ${product.colorTone}22, transparent 80%)`,
                                      }
                            }
                        >
                            {heroImage ? (
                                <img
                                    className="product__hero-img"
                                    src={heroImage}
                                    alt=""
                                />
                            ) : null}
                            <span className="product__hero-label label">Studio Vortessa</span>
                        </div>
                    </div>

                    <div className="product__context">
                        <div ref={contextRef} className="product__context-inner">
                            <Link to="/catalog" className="product__back label">
                                ← Back to catalog
                            </Link>

                            <header className="product__header">
                                <h1 className="product__title font-serif">{product.name}</h1>
                                <div className="product__meta">
                                    <span className="product__material">{product.material}</span>
                                    <span className="product__price">{product.price}</span>
                                </div>
                            </header>

                            {product.variants?.length > 1 ? (
                                <div className="product__variants">
                                    <span className="label product__variants-label">Finish</span>
                                    <div className="product__swatch-row">
                                        {product.variants.map((v) => (
                                            <button
                                                key={v.id}
                                                type="button"
                                                className={`product__swatch${variant?.id === v.id ? ' product__swatch--active' : ''}`}
                                                style={{ backgroundColor: v.swatch }}
                                                title={v.label}
                                                onClick={() => setVariant(v)}
                                            />
                                        ))}
                                    </div>
                                    {variant?.label ? (
                                        <p className="product__variant-caption font-sans text-muted">
                                            {variant.label}
                                        </p>
                                    ) : null}
                                </div>
                            ) : null}

                            <div className="product__description">
                                <p className="font-sans">{product.description}</p>
                            </div>

                            <div className="product__actions">
                                <Link to={proposalHref} className="product__btn product__btn--primary">
                                    <span className="label">Request a proposal</span>
                                </Link>
                                <Link to="/contact" className="product__btn product__btn--ghost">
                                    <span className="label">General inquiry</span>
                                </Link>
                            </div>

                            <nav className="product__pager" aria-label="Adjacent pieces">
                                {prev ? (
                                    <Link to={getProductPath(prev)} className="product__pager-link label">
                                        ← {prev.name}
                                    </Link>
                                ) : (
                                    <span className="product__pager-link product__pager-link--disabled label">
                                        ← Previous
                                    </span>
                                )}
                                {next ? (
                                    <Link to={getProductPath(next)} className="product__pager-link label">
                                        {next.name} →
                                    </Link>
                                ) : (
                                    <span className="product__pager-link product__pager-link--disabled label">
                                        Next →
                                    </span>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>

                <section className="product__related" aria-labelledby="related-heading">
                    <div className="product__related-inner">
                        <h2 id="related-heading" className="product__related-title font-serif">
                            More in the collection
                        </h2>
                        <ul className="product__related-grid">
                            {related.map((p) => {
                                const rv = getDefaultVariant(p);
                                return (
                                    <li key={p.id}>
                                        <Link to={getProductPath(p)} className="product__related-card">
                                            <div
                                                className="product__related-visual"
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
                                                        className="product__related-img"
                                                        src={rv.image}
                                                        alt=""
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="product__related-info">
                                                <span className="product__related-name font-serif">{p.name}</span>
                                                <span className="product__related-meta label">{p.material}</span>
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
