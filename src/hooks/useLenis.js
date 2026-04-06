import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ limitCallbacks: true });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      appLenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
