import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const { pathname } = useLocation();

    if (pathname === '/') {
        return null;
    }

    return (
        <header className="pointer-events-none fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-4 py-8 md:px-16">
            <div className="pointer-events-auto">
                <Link to="/catalog">
                    <img
                        src="/logo.png"
                        alt="Studio Vortessa Logo"
                        className="h-9 w-auto object-contain opacity-90 mix-blend-screen transition-opacity duration-300 [filter:drop-shadow(0_0_20px_rgba(212,163,115,0.2))] hover:opacity-100 md:h-12"
                    />
                </Link>
            </div>

            <nav className="pointer-events-auto flex gap-8">
                <Link to="/catalog" className="label text-muted transition-[color,text-shadow] duration-300 hover:text-accent-gold hover:[text-shadow:0_0_15px_rgba(230,194,135,0.4)]">
                    Catalog
                </Link>
                <Link to="/about" className="label text-muted transition-[color,text-shadow] duration-300 hover:text-accent-gold hover:[text-shadow:0_0_15px_rgba(230,194,135,0.4)]">
                    About
                </Link>
                <Link to="/contact" className="label text-muted transition-[color,text-shadow] duration-300 hover:text-accent-gold hover:[text-shadow:0_0_15px_rgba(230,194,135,0.4)]">
                    Contact
                </Link>
            </nav>
        </header>
    );
}
