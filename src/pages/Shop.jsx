import { Link } from 'react-router-dom';
import { products } from '../data/products';
import './Shop.css';

export default function Shop() {
    return (
        <div className="shop page">
            <div className="shop__container">
                <div className="shop__header">
                    <h1 className="shop__title font-serif">The Collection</h1>
                </div>

                <div className="shop__grid">
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
        </div>
    );
}
