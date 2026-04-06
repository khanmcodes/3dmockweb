import { useEffect, useRef } from 'react';

const HERO_SELECTOR = '.catalog2-hero';
/** Cap internal buffer size — keeps grain sharp without full-viewport per-pixel cost every frame */
const MAX_NOISE_WIDTH = 1280;

function u32(n) {
    return n >>> 0;
}

/** 0..1 — isotropic; no bilinear blur. */
function hash2d(x, y, frame, salt) {
    let h =
        (Math.imul(x | 0, 0x9e3779b1) ^
            Math.imul(y | 0, 0x85ebca6b) ^
            Math.imul(frame | 0, 0xc2b2ae35) ^
            salt) >>>
        0;
    h = u32(Math.imul(h ^ (h >>> 16), 0x7feb352d));
    h = u32(Math.imul(h ^ (h >>> 15), 0x846ca68b));
    return h / 4294967296;
}

/**
 * Fine, sharp film grain — high-res buffer + per-pixel hashes (no smooth blur).
 */
export default function HeroLiveNoise({ className = '' }) {
    const canvasRef = useRef(null);
    const imageDataRef = useRef(null);
    const prevLumRef = useRef(null);
    const reducedRef = useRef(false);
    const frameRef = useRef(0);
    const tickRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const syncMotion = () => {
            reducedRef.current = mq.matches;
        };
        syncMotion();

        let raf = 0;
        let interval = 0;

        const heroRoot = () => canvas.closest(HERO_SELECTOR) ?? canvas.parentElement;

        const layout = () => {
            const root = heroRoot();
            if (!root) return;
            const rect = root.getBoundingClientRect();
            const cw = Math.max(32, Math.round(rect.width));
            const ch = Math.max(32, Math.round(rect.height));
            const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);
            let w = Math.floor(cw * dpr);
            let h = Math.floor(ch * dpr);
            if (w > MAX_NOISE_WIDTH) {
                const r = MAX_NOISE_WIDTH / w;
                w = MAX_NOISE_WIDTH;
                h = Math.max(2, Math.floor(h * r));
            }
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
                imageDataRef.current = null;
                prevLumRef.current = null;
            }
        };

        const drawNoise = () => {
            if (canvas.width < 2 || canvas.height < 2) return;
            frameRef.current += 1;
            const frame = frameRef.current;

            const w = canvas.width;
            const h = canvas.height;
            const count = w * h;

            let imageData = imageDataRef.current;
            if (!imageData || imageData.width !== w || imageData.height !== h) {
                imageData = ctx.createImageData(w, h);
                imageDataRef.current = imageData;
            }

            let prevLum = prevLumRef.current;
            if (!prevLum || prevLum.length !== count) {
                prevLum = new Uint8Array(count);
                prevLum.fill(128);
                prevLumRef.current = prevLum;
            }

            const data = imageData.data;

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const pi = y * w + x;
                    // Three decorrelated samples → fine speckle, no big blurry blobs
                    const a = hash2d(x, y, frame, 0x51ed);
                    const b = hash2d(x ^ 31, y ^ 47, frame + 11, 0xa2f1);
                    const c = hash2d(x + y, x - y + (frame & 255), frame + 23, 0x33c3);
                    let n = (a + b + c) / 3;
                    n = 0.5 + (n - 0.5) * 0.16;

                    let g = (Math.min(1, Math.max(0, n)) * 255) | 0;
                    // Light temporal blend — keeps motion without smearing
                    g = (g * 0.78 + prevLum[pi] * 0.22 + 0.5) | 0;
                    prevLum[pi] = g;

                    const i = pi * 4;
                    data[i] = g;
                    data[i + 1] = g;
                    data[i + 2] = g;
                    data[i + 3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
        };

        const stopLoop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
            if (interval) {
                clearInterval(interval);
                interval = 0;
            }
        };

        const startLoop = () => {
            stopLoop();
            if (reducedRef.current) {
                interval = window.setInterval(drawNoise, 1000 / 12);
            } else {
                const tick = () => {
                    tickRef.current += 1;
                    // ~30fps grain updates — motion stays visible, halves CPU vs 60fps full redraw
                    if (tickRef.current % 2 === 0) {
                        drawNoise();
                    }
                    raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            }
        };

        const boot = () => {
            layout();
            drawNoise();
            startLoop();
        };

        const onMotionChange = () => {
            syncMotion();
            boot();
        };

        const root = heroRoot();
        const ro =
            root &&
            new ResizeObserver(() => {
                layout();
                drawNoise();
            });
        if (root) ro.observe(root);

        mq.addEventListener('change', onMotionChange);
        layout();
        requestAnimationFrame(boot);

        return () => {
            mq.removeEventListener('change', onMotionChange);
            ro?.disconnect();
            stopLoop();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`block h-full w-full max-h-none max-w-none opacity-[0.35] mix-blend-normal ${className}`}
            aria-hidden
        />
    );
}
