import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

const Scene3D = lazy(() => import('../components/Scene3D'));

gsap.registerPlugin(ScrollTrigger);

const COPY = {
    default: {
        title: 'Studio Vortessa',
        subtitle: 'Sculptural Objects',
    },
    catalog: {
        title: 'Studio Vortessa',
        subtitle: 'Furniture',
    },
};

export default function Hero({ variant = 'default' }) {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const lineRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const contentRef = useRef(null);
    const sceneRef = useRef(null);
    const overlayRef = useRef(null);

    const isCatalog = variant === 'catalog';
    const copy = isCatalog ? COPY.catalog : COPY.default;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            const titleChars = titleRef.current.querySelectorAll('.hero__char');
            const subtitleChars = subtitleRef.current.querySelectorAll('.hero__char');

            tl.set([titleChars, subtitleChars], {
                yPercent: 120,
                rotateX: -110,
                scale: 0.8,
                opacity: 0,
                filter: 'blur(10px)',
                transformOrigin: '50% 100% -50px',
            })
                .set(lineRef.current, { scaleX: 0, opacity: 0 })
                .set(scrollIndicatorRef.current, { opacity: 0, y: 30 })
                .to(titleChars, {
                    yPercent: 0,
                    rotateX: 0,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.4,
                    ease: 'power4.out',
                    stagger: {
                        amount: 0.5,
                        from: 'start',
                    },
                })
                .to(
                    lineRef.current,
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.4,
                        ease: 'expo.inOut',
                    },
                    '-=1.0'
                )
                .to(
                    subtitleChars,
                    {
                        yPercent: 0,
                        rotateX: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.4,
                        ease: 'power4.out',
                        stagger: {
                            amount: 0.4,
                            from: 'center',
                        },
                    },
                    '-=1.2'
                )
                .to(
                    scrollIndicatorRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.0,
                        ease: 'power3.out',
                    },
                    '-=0.4'
                );

            const scrollEase = isCatalog
                ? {
                      content: { y: -56, opacity: 0.45 },
                      scene: { y: 28, scale: 1.02 },
                      overlay: { opacity: 1 },
                      scrub: 0.45,
                  }
                : {
                      content: { y: -120, opacity: 0 },
                      scene: { y: 80, scale: 1.08 },
                      overlay: { opacity: 1 },
                      scrub: 0.8,
                  };

            gsap.to(contentRef.current, {
                ...scrollEase.content,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: scrollEase.scrub,
                },
            });

            gsap.to(sceneRef.current, {
                ...scrollEase.scene,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: scrollEase.scrub,
                },
            });

            gsap.to(overlayRef.current, {
                opacity: scrollEase.overlay.opacity,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '60% top',
                    end: 'bottom top',
                    scrub: scrollEase.scrub,
                },
            });

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
    }, [isCatalog]);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="hero__char-wrapper">
                <span className="hero__char">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));

    return (
        <section
            ref={sectionRef}
            className={`hero section section--full${isCatalog ? ' hero--catalog' : ''}`}
            id="hero"
        >
            <div ref={sceneRef} className="hero__scene">
                <Suspense fallback={<div className="hero__scene-placeholder" aria-hidden />}>
                    <Scene3D />
                </Suspense>
            </div>
            <div ref={overlayRef} className="hero__overlay" />
            <div ref={contentRef} className="hero__content">
                <h1 ref={titleRef} className="hero__title font-serif">
                    {splitText(copy.title)}
                </h1>
                <div ref={lineRef} className="hero__line" />
                <p ref={subtitleRef} className="hero__subtitle">
                    {splitText(copy.subtitle)}
                </p>
            </div>
            <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
                <span className="hero__scroll-text label">Scroll</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}
