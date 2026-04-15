import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { appLenisRef } from '../hooks/useLenis';

const FADE_SECTION_IDS = new Set(['collections']);

function sectionScrollOffset() {
    return -Math.min(112, Math.max(72, window.innerHeight * 0.08));
}

function scrollToSectionImmediate(id) {
    const lenis = appLenisRef.current;
    if (!lenis) return;
    const el = document.getElementById(id);
    if (!el) return;
    lenis.scrollTo(el, {
        offset: sectionScrollOffset(),
        immediate: true,
        force: true,
    });
    ScrollTrigger.refresh();
}

/**
 * /catalog#collections: opaque fade + instant jump (no long scroll).
 */
export default function CatalogSectionFade() {
    const { pathname, hash } = useLocation();
    const [active, setActive] = useState(false);
    const cycleRef = useRef(0);

    useEffect(() => {
        if (pathname !== '/catalog' || !hash) return;
        const id = hash.replace(/^#/, '');
        if (!FADE_SECTION_IDS.has(id)) return;

        let cancelled = false;
        const cycle = ++cycleRef.current;
        let scrollTimer = 0;
        let clearTimer = 0;

        let waitAttempts = 0;
        const startFadeSequence = () => {
            if (cancelled || cycle !== cycleRef.current) return;
            if (!appLenisRef.current) {
                waitAttempts += 1;
                if (waitAttempts > 90) return;
                requestAnimationFrame(startFadeSequence);
                return;
            }
            setActive(true);
            scrollTimer = window.setTimeout(() => {
                if (cancelled || cycle !== cycleRef.current) return;
                scrollToSectionImmediate(id);
            }, 400);
            clearTimer = window.setTimeout(() => {
                if (cancelled || cycle !== cycleRef.current) return;
                setActive(false);
            }, 560);
        };

        startFadeSequence();

        return () => {
            cancelled = true;
            clearTimeout(scrollTimer);
            clearTimeout(clearTimer);
            if (cycle === cycleRef.current) setActive(false);
        };
    }, [pathname, hash]);

    return (
        <AnimatePresence mode="wait">
            {active ? (
                <motion.div
                    key="catalog-section-fade"
                    aria-hidden
                    className="pointer-events-none fixed inset-0 z-[200] bg-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.62, ease: [0.33, 1, 0.68, 1] },
                    }}
                    transition={{
                        duration: 0.44,
                        ease: [0.45, 0, 0.15, 1],
                    }}
                    style={{ willChange: 'opacity' }}
                />
            ) : null}
        </AnimatePresence>
    );
}
