import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CosmicMark } from './CosmicDecor';
import { appLenisRef } from '../hooks/useLenis';

const linkText =
    'font-sans text-lg font-normal tracking-[0.02em] transition-opacity duration-300 hover:opacity-110';

export default function Header() {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const lenisScrollBoundRef = useRef(false);

    useEffect(() => {
        if (pathname === '/') return undefined;

        const readScrollY = () => {
            const lenis = appLenisRef.current;
            if (lenis != null && typeof lenis.scroll === 'number') {
                return lenis.scroll;
            }
            return window.scrollY || document.documentElement.scrollTop || 0;
        };

        const onScroll = () => {
            setScrolled(readScrollY() > 52);
        };

        onScroll();

        const bindLenisOnce = () => {
            const l = appLenisRef.current;
            if (!l || lenisScrollBoundRef.current || typeof l.on !== 'function') return;
            l.on('scroll', onScroll);
            lenisScrollBoundRef.current = true;
        };

        bindLenisOnce();
        const retryId = window.setTimeout(bindLenisOnce, 80);

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.clearTimeout(retryId);
            window.removeEventListener('scroll', onScroll);
            const l = appLenisRef.current;
            if (lenisScrollBoundRef.current && l && typeof l.off === 'function') {
                l.off('scroll', onScroll);
            }
            lenisScrollBoundRef.current = false;
        };
    }, [pathname]);

    if (pathname === '/') {
        return null;
    }

    const brandPill =
        scrolled &&
        'rounded-xl bg-white/45 px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-1.5 transition-all duration-400 ease-in-out text-black!';

    const linkPill =
        scrolled &&
        'rounded-xl bg-white/45 px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-2 transition-all duration-400 ease-in-out text-black!';

    return (
        <header className="pointer-events-none fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-4 py-6 md:px-16 md:py-8">
            <div className="pointer-events-auto">
                <Link
                    to="/catalog#home-banner"
                    className={`flex items-center -space-x-2 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-1.5 rounded-xl ease-out text-white ${brandPill || 'py-0'}`}
                    aria-label="Studio Vortessa — Index"
                >
                    <span className="font-serif text-2xl font-medium tracking-tight">
                        Studio
                    </span>
                    <img
                        src="/logo.png"
                        alt=""
                        className="h-6 w-auto object-contain opacity-95 transition-opacity duration-300 [filter:drop-shadow(0_0_14px_rgba(184,146,74,0.2))] hover:opacity-100 md:h-8"
                        aria-hidden
                    />
                    <span className="font-serif text-2xl font-medium tracking-tight">
                        Vortessa
                    </span>
                </Link>
            </div>

            <nav
                className={`pointer-events-auto flex flex-wrap items-center justify-end text-white px-3 py-1.5 backdrop-blur-sm md:px-4 md:py-1.5 rounded-xl gap-2 md:gap-5 ${scrolled ? '' : 'mix-blend-difference'} ${linkPill || ''}`}
            >
                <Link to="/catalog#collections" className={`${linkText}`}>
                    Catalog
                </Link>
                <Link to="/about" className={`${linkText}`}>
                    About
                </Link>
                <Link to="/contact" className={`${linkText}`}>
                    Contact
                </Link>
            </nav>
        </header>
    );
}
