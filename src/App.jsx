import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
    Outlet,
    useParams,
} from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Header from './components/Header';
import CatalogSectionFade from './components/CatalogSectionFade';
import Closing from './sections/Closing';

import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import DiscussProject from './pages/DiscussProject';

/** Remount product page when slug changes so variant state resets without an effect. */
function ProductRoute() {
    const { slug } = useParams();
    return <Product key={slug} />;
}

/** Plain outlet — no Framer route wrapper */
function RootLayout() {
    return <Outlet />;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Landing />} />
                <Route path="shop" element={<Navigate to="/catalog" replace />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="catalog2" element={<Navigate to="/catalog" replace />} />
                <Route path="product/:slug" element={<ProductRoute />} />
                <Route path="about" element={<About />} />
                <Route path="discuss-project" element={<DiscussProject />} />
                <Route path="contact" element={<Contact />} />
            </Route>
        </Routes>
    );
}

/**
 * Lenis owns scroll; window.scrollTo alone does not reset it.
 * Must call lenis.scrollTo(0, { immediate: true }) on route changes.
 */
function scrollCatalogToHash(lenis, hash) {
    const id = hash.replace(/^#/, '');
    if (!id) return;
    const el = document.getElementById(id);
    if (!el || !lenis) return;
    const headerOffset = id === 'home-banner' ? 0 : -Math.min(112, Math.max(72, window.innerHeight * 0.08));
    lenis.scrollTo(el, {
        offset: headerOffset,
        duration: 1.35,
        easing: (t) => 1 - (1 - t) ** 3,
    });
}

function ScrollRestorationWithLenis() {
    const lenisRef = useLenis();
    const { pathname, hash } = useLocation();
    const prevPathnameRef = useRef('');

    useEffect(() => {
        const lenis = lenisRef.current;
        const routePathChanged = prevPathnameRef.current !== pathname;
        prevPathnameRef.current = pathname;

        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (pathname === '/catalog' && hash) {
            const sectionId = hash.replace(/^#/, '');
            const useFadeTransition = sectionId === 'collections';

            if (lenis) {
                if (routePathChanged) {
                    lenis.scrollTo(0, { immediate: true, force: true });
                }
                if (useFadeTransition) {
                    requestAnimationFrame(() => ScrollTrigger.refresh());
                    return;
                }
                const delay = routePathChanged ? 100 : 48;
                const t = window.setTimeout(() => {
                    const el = document.getElementById(sectionId);
                    if (el) {
                        scrollCatalogToHash(lenis, hash);
                    } else if (routePathChanged) {
                        lenis.scrollTo(0, { immediate: true, force: true });
                    }
                    ScrollTrigger.refresh();
                }, delay);
                return () => clearTimeout(t);
            }
            requestAnimationFrame(() => ScrollTrigger.refresh());
            return;
        }

        if (pathname === '/about' && hash) {
            const sectionId = hash.replace(/^#/, '');
            if (lenis) {
                if (routePathChanged) {
                    lenis.scrollTo(0, { immediate: true, force: true });
                }
                const headerOffset = -Math.min(96, Math.max(64, window.innerHeight * 0.08));
                const delay = routePathChanged ? 140 : 48;
                const t = window.setTimeout(() => {
                    const el = document.getElementById(sectionId);
                    if (el) {
                        lenis.scrollTo(el, {
                            offset: headerOffset,
                            duration: 1.3,
                            easing: (t) => 1 - (1 - t) ** 3,
                        });
                    } else if (routePathChanged) {
                        lenis.scrollTo(0, { immediate: true, force: true });
                    }
                    ScrollTrigger.refresh();
                }, delay);
                return () => clearTimeout(t);
            }
            requestAnimationFrame(() => ScrollTrigger.refresh());
            return;
        }

        if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
        }

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, [pathname, hash, lenisRef]);

    useEffect(() => {
        const lenis = lenisRef.current;
        if (!lenis) return;
        if (pathname === '/') {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [pathname, lenisRef]);

    return null;
}

function AppShell() {
    const { pathname } = useLocation();
    const showClosing = pathname !== '/';

    return (
        <>
            <ScrollRestorationWithLenis />
            <CatalogSectionFade />
            <CustomCursor />
            <GrainOverlay />
            <Header />

            <main className="block min-h-0">
                <AppRoutes />
            </main>

            {showClosing ? <Closing /> : null}
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    );
}
