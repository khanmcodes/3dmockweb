import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const dot = dotRef.current;
        if (!cursor || !follower || !dot) return;

        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            gsap.set(dot, { x: mouseX, y: mouseY });

            // Outer ring follows with delay
            gsap.to(follower, {
                x: mouseX,
                y: mouseY,
                duration: 0.6,
                ease: 'power3.out',
            });
        };

        const onMouseEnter = () => {
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
        };

        const onMouseLeave = () => {
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
        };

        // Hover effect on interactive elements
        const addHoverListeners = () => {
            const interactives = document.querySelectorAll('a, button, .gallery-card');
            interactives.forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    gsap.to(follower, { scale: 2.5, opacity: 0.5, duration: 0.4, ease: 'power3.out' });
                    gsap.to(dot, { scale: 0, duration: 0.3 });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(follower, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
                    gsap.to(dot, { scale: 1, duration: 0.3 });
                });
            });
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);

        // Delay to let DOM render
        const timer = setTimeout(addHoverListeners, 1000);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
            <div ref={followerRef} className="custom-cursor__follower" />
            <div ref={dotRef} className="custom-cursor__dot" />
        </div>
    );
}
