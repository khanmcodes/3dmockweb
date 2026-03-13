import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { products } from '../data/products';
import PageTransition from '../components/PageTransition';
import './Shop.css';

export default function Shop() {
    const gridRef = useRef(null);

    useEffect(() => {
        const cards = gridRef.current?.querySelectorAll('.shop-card');
        if (!cards) return;

        cards.forEach(card => {
            const wrapper = card.querySelector('.shop-card__image-wrapper');
            const placeholder = card.querySelector('.shop-card__image-placeholder');

            const moveParallax = (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate pull based on mouse distance from center
                const distX = (x - centerX) / centerX; // -1 to 1
                const distY = (y - centerY) / centerY; // -1 to 1

                gsap.to(placeholder, {
                    x: distX * 15,
                    y: distY * 15,
                    scale: 1.1,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            const resetParallax = () => {
                gsap.to(placeholder, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)",
                    overwrite: "auto"
                });
            };

            wrapper.addEventListener('mousemove', moveParallax);
            wrapper.addEventListener('mouseleave', resetParallax);

            return () => {
                wrapper.removeEventListener('mousemove', moveParallax);
                wrapper.removeEventListener('mouseleave', resetParallax);
            };
        });
    }, []);

    return (
        <PageTransition className="shop page">
            <div className="shop__container">
                <div className="shop__header">
                    <h1 className="shop__title font-serif">The Collection</h1>
                </div>

                <div ref={gridRef} className="shop__grid">
                    {products.map((product, i) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="shop-card">
                            <div className="shop-card__image-wrapper">
                                {/* Simulated image with subtle gradient matching colorTone */}
                                <div 
                                    className="shop-card__image-placeholder"
                                    style={{ 
                                        background: `radial-gradient(circle at center, ${product.colorTone}15, transparent 70%)` 
                                    }}
                                >
                                    No Image Data
                                </div>
                            </div>
                            <div className="shop-card__info">
                                <div className="shop-card__text">
                                    <h2 className="shop-card__name font-serif">{product.name}</h2>
                                    <span className="shop-card__material">{product.material}</span>
                                </div>
                                <span className="shop-card__price">{product.price}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
