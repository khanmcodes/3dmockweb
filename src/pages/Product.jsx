import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import './Product.css';

export default function Product() {
    const { id } = useParams();
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="product page product--not-found">
                <h1 className="font-serif">Object not found.</h1>
                <Link to="/shop" className="label" style={{ marginTop: 'var(--space-md)' }}>Return to Collection</Link>
            </div>
        );
    }

    return (
        <div className="product page">
            <div className="product__layout">
                {/* Left side: Immersive Image Presentation */}
                <div className="product__visuals">
                    <div 
                        className="product__hero-image"
                        style={{ 
                            background: `radial-gradient(circle at center, ${product.colorTone}20, transparent 80%)` 
                        }}
                    >
                         <span className="product__hero-label label">Cinematic View</span>
                    </div>
                </div>

                {/* Right side: Sticky Context & Purchase flow */}
                <div className="product__context">
                    <div className="product__context-inner">
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
        </div>
    );
}
