import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header__brand">
                {/* 
                  Since the logo image has a black background, we use 
                  mixBlendMode: 'screen' or 'lighten' to blend it perfectly 
                  into the dark theme of the website.
                */}
                <img 
                    src="/logo.png" 
                    alt="Studio Vortessa Logo" 
                    className="header__logo" 
                />
            </div>
            
            <nav className="header__nav">
                <a href="#philosophy" className="header__link label">Philosophy</a>
                <a href="#gallery" className="header__link label">Gallery</a>
            </nav>
        </header>
    );
}
