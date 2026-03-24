import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    getProductBySlugOrId,
    getProductNeighbors,
    getOtherProducts,
    getProductPath,
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
                { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
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
                scale: 1.05,
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
    }, [product]);

    if (!product) {
        return (
            <PageTransition className="product page product--not-found">
                <h1 className="font-serif">Object not found.</h1>
                <Link to="/shop" className="label" style={{ marginTop: 'var(--space-md)' }}>
                    Return to collection
                </Link>
            </PageTransition>
        );
    }

    const proposalHref = `/contact?piece=${encodeURIComponent(product.name)}`;

    return (
        <PageTransition className="product page">
            <article>
                <div ref={containerRef} className="product__layout">
                    <div className="product__visuals">
                        <div
                            ref={imageRef}
                            className="product__hero-image"
                            style={{
                                background: `radial-gradient(circle at center, ${product.colorTone}20, transparent 80%)`,
                                height: '110%',
                            }}
                        >
                            <span className="product__hero-label label">Studio Vortessa</span>
                        </div>
                    </div>

                    <div className="product__context">
                        <div ref={contextRef} className="product__context-inner">
                            <Link to="/shop" className="product__back label">
                                ← Back to collection
                            </Link>

                            <header className="product__header">
                                <h1 className="product__title font-serif">{product.name}</h1>
                                <div className="product__meta">
                                    <span className="product__material">{product.material}</span>
                                    <span className="product__price">{product.price}</span>
                                </div>
                            </header>

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
                            {related.map((p) => (
                                <li key={p.id}>
                                    <Link to={getProductPath(p)} className="product__related-card">
                                        <div
                                            className="product__related-visual"
                                            style={{
                                                background: `radial-gradient(circle at center, ${p.colorTone}18, transparent 75%)`,
                                            }}
                                        />
                                        <div className="product__related-info">
                                            <span className="product__related-name font-serif">{p.name}</span>
                                            <span className="product__related-meta label">{p.material}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </article>
        </PageTransition>
    );
}
