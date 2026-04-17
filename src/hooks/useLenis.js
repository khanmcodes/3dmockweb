import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/** Shared ref so pages (e.g. Catalog) can attach Lenis plugins like `lenis/snap` */
export const appLenisRef = { current: null };

export function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;
        appLenisRef.current = lenis;

        let rafId = 0;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
            appLenisRef.current = null;
        };
    }, []);

    return lenisRef;
}
