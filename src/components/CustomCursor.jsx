import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import './CustomCursor.css';

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
        let activeHoverScale = 1;

        // X/Y setters
        const setDotX = gsap.quickSetter(dot, "x", "px");
        const setDotY = gsap.quickSetter(dot, "y", "px");
        const setFollowerX = gsap.quickSetter(follower, "x", "px");
        const setFollowerY = gsap.quickSetter(follower, "y", "px");

        const onMouseMove = (e) => {
            if (isHoveringMagnetic && activeMagneticTarget) {
                // Magnetic Physics: Calculate distance from center of target
                const rect = activeMagneticTarget.getBoundingClientRect();
                const targetCenterX = rect.left + rect.width / 2;
                const targetCenterY = rect.top + rect.height / 2;
                
                // Pull the mouse position towards the center of the button
                const pullX = (e.clientX - targetCenterX) * 0.4;
                const pullY = (e.clientY - targetCenterY) * 0.4;
                
                mouseX = targetCenterX + pullX;
                mouseY = targetCenterY + pullY;

                // Move the actual DOM element slightly as well (parallax)
                gsap.to(activeMagneticTarget, {
                    x: pullX * 0.4,
                    y: pullY * 0.4,
                    duration: 0.6,
                    ease: "power3.out"
                });
            } else {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
        };

        const renderLoop = () => {
             // LERP smoothing
             renderDotX += (mouseX - renderDotX) * 0.6;
             renderDotY += (mouseY - renderDotY) * 0.6;
             renderFollowerX += (mouseX - renderFollowerX) * 0.15;
             renderFollowerY += (mouseY - renderFollowerY) * 0.15;

             setDotX(renderDotX);
             setDotY(renderDotY);
             
             // If hovering 'view', follower locks completely to dot instantly, else lags
             if (isHoveringView || isHoveringMagnetic) {
                 setFollowerX(renderDotX);
                 setFollowerY(renderDotY);
             } else {
                 setFollowerX(renderFollowerX);
                 setFollowerY(renderFollowerY);
             }

             requestAnimationFrame(renderLoop);
        };

        const rafId = requestAnimationFrame(renderLoop);
        window.addEventListener('mousemove', onMouseMove);

        // Bind interactive elements
        const bindElements = () => {
            // Magnetic elements (buttons, nav links)
            document.querySelectorAll('a:not(.catalog-card):not(.gallery-card), button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    isHoveringMagnetic = true;
                    activeMagneticTarget = el;
                    gsap.to(follower, { width: 50, height: 50, borderColor: 'var(--color-accent-gold)', duration: 0.3 });
                    gsap.to(dot, { scale: 0, duration: 0.2 });
                });
                el.addEventListener('mouseleave', () => {
                    isHoveringMagnetic = false;
                    gsap.to(activeMagneticTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
                    activeMagneticTarget = null;
                    gsap.to(follower, { width: 36, height: 36, borderColor: 'rgba(232, 230, 227, 0.4)', duration: 0.3 });
                    gsap.to(dot, { scale: 1, duration: 0.2 });
                });
            });

            // View elements (catalog cards, gallery cards)
            document.querySelectorAll('.catalog-card, .gallery-card').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    isHoveringView = true;
                    cursor.style.mixBlendMode = 'normal';
                    gsap.to(follower, { 
                        width: 100, 
                        height: 100, 
                        background: 'var(--color-text)', 
                        borderColor: 'transparent',
                        duration: 0.4, 
                        ease: "back.out(1.5)" 
                    });
                    gsap.to(dot, { scale: 0, duration: 0.2 });
                    gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
                });
                el.addEventListener('mouseleave', () => {
                    isHoveringView = false;
                    cursor.style.mixBlendMode = 'difference';
                    gsap.to(follower, { 
                        width: 36, 
                        height: 36, 
                        background: 'transparent', 
                        borderColor: 'rgba(232, 230, 227, 0.4)',
                        duration: 0.3 
                    });
                    gsap.to(dot, { scale: 1, duration: 0.2 });
                    gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
                });
            });
        };

        // Re-bind when location changes (React Router)
        const timeout = setTimeout(bindElements, 500);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
            clearTimeout(timeout);
        };
    }, [location.pathname]); // Dependency array includes route path to rebind on nav

    return (
        <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
            <div ref={followerRef} className="custom-cursor__follower">
                <span ref={labelRef} className="custom-cursor__label">View</span>
            </div>
            <div ref={dotRef} className="custom-cursor__dot" />
        </div>
    );
}
