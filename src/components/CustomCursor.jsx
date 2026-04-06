import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
        let activeMagneticTarget = null;

        const setDotX = gsap.quickSetter(dot, 'x', 'px');
        const setDotY = gsap.quickSetter(dot, 'y', 'px');
        const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
        const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

        const onMouseMove = (e) => {
            if (isHoveringMagnetic && activeMagneticTarget) {
                const rect = activeMagneticTarget.getBoundingClientRect();
                const targetCenterX = rect.left + rect.width / 2;
                const targetCenterY = rect.top + rect.height / 2;

                const pullX = (e.clientX - targetCenterX) * 0.4;
                const pullY = (e.clientY - targetCenterY) * 0.4;

                mouseX = targetCenterX + pullX;
                mouseY = targetCenterY + pullY;

                gsap.to(activeMagneticTarget, {
                    x: pullX * 0.4,
                    y: pullY * 0.4,
                    duration: 0.6,
                    ease: 'power3.out',
                });
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

            setDotX(renderDotX);
            setDotY(renderDotY);

            if (isHoveringView || isHoveringMagnetic) {
                setFollowerX(renderDotX);
                setFollowerY(renderDotY);
            } else {
                setFollowerX(renderFollowerX);
                setFollowerY(renderFollowerY);
            }

            rafId = requestAnimationFrame(renderLoop);
        };

        rafId = requestAnimationFrame(renderLoop);
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        const unbinders = [];

        const bindElements = () => {
            if (!alive) return;
            document.querySelectorAll('a:not(.catalog-card):not(.gallery-card), button').forEach((el) => {
                const onMagEnter = () => {
                    isHoveringMagnetic = true;
                    activeMagneticTarget = el;
                    gsap.to(follower, {
                        width: 50,
                        height: 50,
                        borderColor: 'var(--color-accent-gold)',
                        duration: 0.3,
                    });
                    gsap.to(dot, { scale: 0, duration: 0.2 });
                };
                const onMagLeave = () => {
                    isHoveringMagnetic = false;
                    gsap.to(activeMagneticTarget, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)',
                    });
                    activeMagneticTarget = null;
                    gsap.to(follower, {
                        width: 36,
                        height: 36,
                        borderColor: 'rgba(46, 46, 46, 0.32)',
                        duration: 0.3,
                    });
                    gsap.to(dot, { scale: 1, duration: 0.2 });
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
                    gsap.to(follower, {
                        width: 100,
                        height: 100,
                        background: 'var(--color-text)',
                        borderColor: 'transparent',
                        duration: 0.4,
                        ease: 'back.out(1.5)',
                    });
                    gsap.to(dot, { scale: 0, duration: 0.2 });
                    gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
                };
                const onViewLeave = () => {
                    isHoveringView = false;
                    cursor.style.mixBlendMode = 'difference';
                    gsap.to(follower, {
                        width: 36,
                        height: 36,
                        background: 'transparent',
                        borderColor: 'rgba(46, 46, 46, 0.32)',
                        duration: 0.3,
                    });
                    gsap.to(dot, { scale: 1, duration: 0.2 });
                    gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
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
