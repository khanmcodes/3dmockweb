import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import PageTransition from '../components/PageTransition';
import './Product.css';

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        if (!product || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // ── Entrance Animation ──
            const elements = contextRef.current.children;
            const tl = gsap.timeline({ delay: 0.3 });
            
            // Image scale reveal
            tl.fromTo(imageRef.current,
                { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
            );

            // Context elements stagger up
            tl.fromTo(elements,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.1 },
                "-=1.0"
            );

            // ── Scroll Parallax ──
            // Makes the left image slide down slightly as user scrolls right context
            gsap.to(imageRef.current, {
                y: 150,
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [product]);

    if (!product) {
        return (
            <PageTransition className="product page product--not-found">
                <h1 className="font-serif">Object not found.</h1>
                <Link to="/shop" className="label" style={{ marginTop: 'var(--space-md)' }}>Return to Collection</Link>
            </PageTransition>
        );
    }

    return (
        <PageTransition className="product page">
            <div ref={containerRef} className="product__layout">
                {/* Left side: Immersive Image Presentation */}
                <div className="product__visuals">
                    <div 
                        ref={imageRef}
                        className="product__hero-image"
                        style={{ 
                            background: `radial-gradient(circle at center, ${product.colorTone}20, transparent 80%)`,
                            height: '110%' // extra room for parallax translation
                        }}
                    >
                         <span className="product__hero-label label">Cinematic View</span>
                    </div>
                </div>

                {/* Right side: Sticky Context & Purchase flow */}
                <div className="product__context">
                    <div ref={contextRef} className="product__context-inner">
                        <Link to="/shop" className="product__back label">← Back to Collection</Link>
                        
                        <div className="product__header">
                            <h1 className="product__title font-serif">{product.name}</h1>
                            <div className="product__meta">
                                <span className="product__material">{product.material}</span>
                                <span className="product__price">{product.price}</span>
                            </div>
                        </div>

                        <div className="product__description">
                            <p className="font-sans">{product.description}</p>
                        </div>
                        
                        <div className="product__actions">
                            <button className="product__btn">
                                <span className="label">Acquire</span>
                            </button>
                            <button className="product__btn product__btn--ghost">
                                <span className="label">Inquire</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
