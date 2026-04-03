import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
    Outlet,
    useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Header from './components/Header';

import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';

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
                <Route path="contact" element={<Contact />} />
            </Route>
        </Routes>
    );
}

/**
 * Lenis owns scroll; window.scrollTo alone does not reset it.
 * Must call lenis.scrollTo(0, { immediate: true }) on route changes.
 */
function ScrollRestorationWithLenis() {
    const lenisRef = useLenis();
    const { pathname } = useLocation();

    useEffect(() => {
        const lenis = lenisRef.current;
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        if (lenis) {
            lenis.scrollTo(0, { immediate: true, force: true });
        }

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, [pathname, lenisRef]);

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
    return (
        <>
            <ScrollRestorationWithLenis />
            <CustomCursor />
            <GrainOverlay />
            <Header />

            <main className="block min-h-0">
                <AppRoutes />
            </main>
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
