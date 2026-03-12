import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from '../components/Scene3D';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const lineRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const contentRef = useRef(null);
    const sceneRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Intro animation timeline ──
            const tl = gsap.timeline({ delay: 0.6 });

            const titleChars = titleRef.current.querySelectorAll('.hero__char');
            const subtitleChars = subtitleRef.current.querySelectorAll('.hero__char');

            tl.set([titleChars, subtitleChars], {
                opacity: 0,
                y: 80,
                rotateX: -60,
                filter: 'blur(8px)',
            })
                .set(lineRef.current, { scaleX: 0, opacity: 0 })
                .set(scrollIndicatorRef.current, { opacity: 0, y: 30 })
                .to(titleChars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 1.4,
                    ease: 'power4.out',
                    stagger: 0.035,
                })
                .to(lineRef.current, {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                }, '-=0.8')
                .to(subtitleChars, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 1.0,
                    ease: 'power4.out',
                    stagger: 0.025,
                }, '-=0.7')
                .to(scrollIndicatorRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power3.out',
                }, '-=0.4');

            // ── Scroll-driven parallax ──
            // Content drifts up + fades as you scroll
            gsap.to(contentRef.current, {
                y: -120,
                opacity: 0,
                filter: 'blur(6px)',
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            });

            // 3D scene drifts down + zooms slightly
            gsap.to(sceneRef.current, {
                y: 80,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            });

            // Overlay darkens on scroll
            gsap.to(overlayRef.current, {
                opacity: 1.5,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '60% top',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            });

            // Scroll indicator fades out early
            gsap.to(scrollIndicatorRef.current, {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '10% top',
                    end: '30% top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="hero__char">
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));

    return (
        <section ref={sectionRef} className="hero section section--full" id="hero">
            <div ref={sceneRef} className="hero__scene">
                <Scene3D />
            </div>
            <div ref={overlayRef} className="hero__overlay" />
            <div ref={contentRef} className="hero__content">
                <h1 ref={titleRef} className="hero__title font-serif">
                    {splitText('Studio Vortessa')}
                </h1>
                <div ref={lineRef} className="hero__line" />
                <p ref={subtitleRef} className="hero__subtitle">
                    {splitText('Sculptural Objects')}
                </p>
            </div>
            <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
                <span className="hero__scroll-text label">Scroll</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}
