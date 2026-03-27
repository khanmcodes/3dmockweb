import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
    products,
    getProductPath,
    getDefaultVariant,
} from '../data/products';
import PageTransition from '../components/PageTransition';
import Hero from '../sections/Hero';
import Gallery from '../sections/Gallery';
import Materials from '../sections/Materials';
import Closing from '../sections/Closing';
import './Catalog.css';

function CatalogCard({ product }) {
    const initial = getDefaultVariant(product);
    const [variant, setVariant] = useState(initial);

    return (
        <div className="catalog-card">
            <div className="catalog-card__image-wrapper">
                <Link
                    to={getProductPath(product)}
                    className="catalog-card__image-hit"
                    aria-label={`View ${product.name}`}
                />
                <div
                    className="catalog-card__visual"
                    style={
                        variant?.image
                            ? undefined
                            : {
                                  background: `radial-gradient(circle at center, ${product.colorTone}18, transparent 70%)`,
                              }
                    }
                >
                    {variant?.image ? (
                        <img src={variant.image} alt="" loading="lazy" />
                    ) : (
                        <div className="catalog-card__placeholder">Visual pending</div>
                    )}
                </div>
                {product.variants?.length > 1 ? (
                    <div className="catalog-card__swatches">
                        {product.variants.map((v) => (
                            <button
                                key={v.id}
                                type="button"
                                className={`catalog-card__swatch${v.id === variant?.id ? ' catalog-card__swatch--active' : ''}`}
                                style={{ backgroundColor: v.swatch }}
                                title={v.label}
                                aria-label={`${product.name} — ${v.label}`}
                                onClick={() => setVariant(v)}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="catalog-card__info">
                <Link to={getProductPath(product)} className="catalog-card__text">
                    <h2 className="catalog-card__name font-serif">{product.name}</h2>
                    <span className="catalog-card__material">{product.material}</span>
                </Link>
                <Link to={getProductPath(product)} className="catalog-card__price">
                    {product.price}
                </Link>
            </div>
        </div>
    );
}

export default function Catalog() {
    const gridRef = useRef(null);

    useEffect(() => {
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
        <PageTransition className="catalog page">
            <Hero variant="catalog" />
            <Gallery />
            <Materials />
            <div className="catalog__container">
                <div className="catalog__header">
                    <span className="catalog__title-eyebrow label">Studio Vortessa</span>
                    <h2 className="catalog__title font-serif">The Collection</h2>
                </div>

                <div ref={gridRef} className="catalog__grid">
                    {products.map((product) => (
                        <CatalogCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            <Closing />
        </PageTransition>
    );
}
