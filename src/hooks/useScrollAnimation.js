import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimation — Reusable scroll-triggered GSAP animation hook
 * 
 * @param {Function} animationFn - Receives (element, gsap, ScrollTrigger) to set up animations
 * @param {Array} deps - Dependency array for re-running the animation
 */
export function useScrollAnimation(animationFn, deps = []) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            animationFn(ref.current, gsap, ScrollTrigger);
        }, ref);

        return () => ctx.revert();
    }, deps);

    return ref;
}
