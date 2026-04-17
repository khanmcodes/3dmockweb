import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const dotRef = useRef(null);
    const labelRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const dot = dotRef.current;
        const label = labelRef.current;
        if (!cursor || !follower || !dot || !label) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let renderDotX = mouseX;
        let renderDotY = mouseY;
        let renderFollowerX = mouseX;
        let renderFollowerY = mouseY;

        let isHoveringMagnetic = false;
        let isHoveringView = false;
        /** Element receiving magnetic translate; cleared after smooth return to origin */
        let magneticEl = null;
        let magneticTx = 0;
        let magneticTy = 0;
        let magneticCx = 0;
        let magneticCy = 0;

        const onMouseMove = (e) => {
            if (isHoveringMagnetic && magneticEl) {
                const rect = magneticEl.getBoundingClientRect();
                const targetCenterX = rect.left + rect.width / 2;
                const targetCenterY = rect.top + rect.height / 2;

                const pullX = (e.clientX - targetCenterX) * 0.4;
                const pullY = (e.clientY - targetCenterY) * 0.4;

                mouseX = targetCenterX + pullX;
                mouseY = targetCenterY + pullY;

                magneticTx = pullX * 0.16;
                magneticTy = pullY * 0.16;
            } else {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
        };

        let rafId = 0;
        let running = true;

        const renderLoop = () => {
            if (!running) return;
            renderDotX += (mouseX - renderDotX) * 0.6;
            renderDotY += (mouseY - renderDotY) * 0.6;
            renderFollowerX += (mouseX - renderFollowerX) * 0.15;
            renderFollowerY += (mouseY - renderFollowerY) * 0.15;

            dot.style.transform = `translate3d(${renderDotX}px, ${renderDotY}px, 0) translate(-50%, -50%)`;
            if (isHoveringView || isHoveringMagnetic) {
                follower.style.transform = `translate3d(${renderDotX}px, ${renderDotY}px, 0) translate(-50%, -50%)`;
            } else {
                follower.style.transform = `translate3d(${renderFollowerX}px, ${renderFollowerY}px, 0) translate(-50%, -50%)`;
            }

            if (magneticEl) {
                const tx = isHoveringMagnetic ? magneticTx : 0;
                const ty = isHoveringMagnetic ? magneticTy : 0;
                magneticCx += (tx - magneticCx) * 0.22;
                magneticCy += (ty - magneticCy) * 0.22;
                if (!isHoveringMagnetic && Math.abs(magneticCx) < 0.02 && Math.abs(magneticCy) < 0.02) {
                    magneticEl.style.transform = '';
                    magneticEl = null;
                    magneticCx = 0;
                    magneticCy = 0;
                    magneticTx = 0;
                    magneticTy = 0;
                } else {
                    magneticEl.style.transform = `translate3d(${magneticCx}px, ${magneticCy}px, 0)`;
                }
            }

            rafId = requestAnimationFrame(renderLoop);
        };

        rafId = requestAnimationFrame(renderLoop);
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const unbinders = [];

        const bindElements = () => {
            if (!alive) return;
            document
                .querySelectorAll('a:not(.catalog-card):not(.gallery-card), button:not(.no-cursor-magnetic)')
                .forEach((el) => {
                    const onMagEnter = () => {
                        if (magneticEl && magneticEl !== el) {
                            magneticEl.style.transform = '';
                        }
                        isHoveringMagnetic = true;
                        magneticEl = el;
                        magneticTx = 0;
                        magneticTy = 0;
                        magneticCx = 0;
                        magneticCy = 0;
                        animate(follower, { width: 50, height: 50, borderColor: 'var(--color-accent-gold)' }, { duration: 0.3 });
                        animate(dot, { scale: 0 }, { duration: 0.2 });
                    };
                    const onMagLeave = () => {
                        isHoveringMagnetic = false;
                        magneticTx = 0;
                        magneticTy = 0;
                        animate(follower, { width: 36, height: 36, borderColor: 'rgba(46, 46, 46, 0.32)' }, { duration: 0.3 });
                        animate(dot, { scale: 1 }, { duration: 0.2 });
                    };
                    el.addEventListener('mouseenter', onMagEnter);
                    el.addEventListener('mouseleave', onMagLeave);
                    unbinders.push(() => {
                        el.removeEventListener('mouseenter', onMagEnter);
                        el.removeEventListener('mouseleave', onMagLeave);
                    });
                });

            document.querySelectorAll('.catalog-card, .atlas-card, .gallery-card').forEach((el) => {
                const onViewEnter = () => {
                    isHoveringView = true;
                    cursor.style.mixBlendMode = 'normal';
                    animate(
                        follower,
                        {
                            width: 100,
                            height: 100,
                            background: 'var(--color-text)',
                            borderColor: 'transparent',
                        },
                        { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                    );
                    animate(dot, { scale: 0 }, { duration: 0.2 });
                    animate(label, { opacity: 1, scale: 1 }, { duration: 0.3, delay: 0.1 });
                };
                const onViewLeave = () => {
                    isHoveringView = false;
                    cursor.style.mixBlendMode = 'difference';
                    animate(
                        follower,
                        {
                            width: 36,
                            height: 36,
                            background: 'transparent',
                            borderColor: 'rgba(46, 46, 46, 0.32)',
                        },
                        { duration: 0.3 },
                    );
                    animate(dot, { scale: 1 }, { duration: 0.2 });
                    animate(label, { opacity: 0, scale: 0.5 }, { duration: 0.2 });
                };
                el.addEventListener('mouseenter', onViewEnter);
                el.addEventListener('mouseleave', onViewLeave);
                unbinders.push(() => {
                    el.removeEventListener('mouseenter', onViewEnter);
                    el.removeEventListener('mouseleave', onViewLeave);
                });
            });
        };

        let alive = true;
        const timeout = setTimeout(() => {
            if (!alive) return;
            bindElements();
        }, 500);

        return () => {
            alive = false;
            running = false;
            if (magneticEl) {
                magneticEl.style.transform = '';
            }
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
            clearTimeout(timeout);
            unbinders.forEach((fn) => fn());
        };
    }, [location.pathname]);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed inset-0 z-[99999] mix-blend-difference [@media(hover:none)_and_(pointer:coarse)]:hidden"
            aria-hidden="true"
        >
            <div
                ref={followerRef}
                className="absolute top-0 left-0 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(46,46,46,0.32)] will-change-[transform,width,height,border-radius]"
            >
                <span
                    ref={labelRef}
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-xs font-medium tracking-widest text-bg uppercase opacity-0"
                >
                    View
                </span>
            </div>
            <div
                ref={dotRef}
                className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-metallic will-change-[transform,width,height,border-radius]"
            />
        </div>
    );
}
