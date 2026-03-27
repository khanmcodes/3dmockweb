import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const { pathname } = useLocation();

    if (pathname === '/') {
        return null;
    }

    return (
        <header className="header">
            <div className="header__brand">
                {/* 
                  Since the logo image has a black background, we use 
                  mixBlendMode: 'screen' or 'lighten' to blend it perfectly 
                  into the dark theme of the website.
                */}
                <Link to="/catalog">
                    <img 
                        src="/logo.png" 
                        alt="Studio Vortessa Logo" 
                        className="header__logo" 
                    />
                </Link>
            </div>
            
            <nav className="header__nav">
                <Link to="/catalog" className="header__link label">Catalog</Link>
                <Link to="/about" className="header__link label">About</Link>
                <Link to="/contact" className="header__link label">Contact</Link>
            </nav>
        </header>
    );
}
