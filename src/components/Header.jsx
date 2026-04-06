import { Link, useLocation } from 'react-router-dom';
import { CosmicMark } from './CosmicDecor';

const linkClass =
    'font-sans text-sm font-normal tracking-tight text-white transition-opacity duration-300 hover:opacity-70 md:text-xl';

export default function Header() {
    const { pathname } = useLocation();

    if (pathname === '/') {
        return null;
    }

    return (
        <header className="pointer-events-none fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-4 py-8 md:px-16">
            <div className="pointer-events-auto flex items-center gap-3 md:gap-4">
                <CosmicMark className="text-accent-gold/50 shrink-0" />
                <Link to="/catalog#home-banner" className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Studio Vortessa Logo"
                        className="h-9 w-auto object-contain opacity-95 transition-opacity duration-300 [filter:drop-shadow(0_0_16px_rgba(184,146,74,0.22))] hover:opacity-100 md:h-12"
                    />
                </Link>
            </div>

            <nav className="pointer-events-auto flex flex-wrap items-center justify-end gap-x-5 gap-y-2 mix-blend-difference md:gap-x-8">
                <Link to="/catalog#home-banner" className={linkClass}>
                    Index
                </Link>
                <Link to="/catalog#collections" className={linkClass}>
                    Catalog
                </Link>
                <Link to="/catalog#materials" className={linkClass}>
                    Material
                </Link>
                <Link to="/about" className={linkClass}>
                    About
                </Link>
                <Link to="/contact" className={linkClass}>
                    Contact
                </Link>
            </nav>
        </header>
    );
}
