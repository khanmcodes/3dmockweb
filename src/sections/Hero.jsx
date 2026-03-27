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
        description: null,
    },
    catalog: {
        title: 'Studio Vortessa',
        subtitle: 'Catalog',
        description:
            'Sculptural furniture in brushed steel, graphite, and silver-toned finishes — limited pieces for spaces that stay sharp and quiet.',
    },
};

export default function Hero({ variant = 'default', layout }) {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descRef = useRef(null);
    const lineRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const contentRef = useRef(null);
    const sceneRef = useRef(null);
    const overlayRef = useRef(null);

    const isCatalog = variant === 'catalog';
    const isSplit = layout === 'split' || (layout == null && isCatalog);
    const copy = isCatalog ? COPY.catalog : COPY.default;

    useEffect(() => {
        const section = sectionRef.current;
        const line = lineRef.current;
        const scrollInd = scrollIndicatorRef.current;
        const content = contentRef.current;
        const scene = sceneRef.current;
        const overlay = overlayRef.current;
        if (!section || !line || !scrollInd || !content || !scene || !overlay) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            const titleChars = titleRef.current?.querySelectorAll?.('.hero__char') ?? [];
            const subtitleChars = subtitleRef.current?.querySelectorAll?.('.hero__char') ?? [];

            tl.set([titleChars, subtitleChars], {
                yPercent: 120,
                rotateX: -110,
                scale: 0.8,
                opacity: 0,
                filter: 'blur(10px)',
                transformOrigin: '50% 100% -50px',
            })
                .set(line, { scaleX: 0, opacity: 0 })
                .set(scrollInd, { opacity: 0, y: 30 })
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
                    line,
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.4,
                        ease: 'expo.inOut',
                    },
                    '-=1.0'
                );

            if (isSplit && descRef.current) {
                gsap.set(descRef.current, { opacity: 0, y: 28, filter: 'blur(6px)' });
                tl.to(
                    descRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.1,
                        ease: 'power3.out',
                    },
                    '-=0.9'
                );
            }

            tl.to(
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
                        amount: 0.35,
                        from: 'center',
                    },
                },
                isSplit ? '-=0.85' : '-=1.2'
            ).to(
                scrollInd,
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

            gsap.to(content, {
                ...scrollEase.content,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: scrollEase.scrub,
                },
            });

            gsap.to(scene, {
                ...scrollEase.scene,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: scrollEase.scrub,
                },
            });

            gsap.to(overlay, {
                opacity: scrollEase.overlay.opacity,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: '60% top',
                    end: 'bottom top',
                    scrub: scrollEase.scrub,
                },
            });

            gsap.to(scrollInd, {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: '10% top',
                    end: '30% top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isCatalog, isSplit]);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="hero__char-wrapper">
                <span className="hero__char">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));

    const sectionClass = `hero section section--full${isCatalog ? ' hero--catalog' : ''}${isSplit ? ' hero--split' : ''}`;

    return (
        <section ref={sectionRef} className={sectionClass} id="hero">
            <div ref={sceneRef} className="hero__scene">
                <Suspense fallback={<div className="hero__scene-placeholder" aria-hidden />}>
                    <Scene3D />
                </Suspense>
            </div>
            <div ref={overlayRef} className="hero__overlay" />
            <div
                ref={contentRef}
                className={`hero__content${isSplit ? ' hero__content--split' : ''}`}
            >
                {isSplit ? (
                    <>
                        <div className="hero__split-col hero__split-col--primary">
                            <h1 ref={titleRef} className="hero__title font-serif">
                                {splitText(copy.title)}
                            </h1>
                            <div ref={lineRef} className="hero__line hero__line--split" />
                        </div>
                        <div className="hero__split-col hero__split-col--secondary">
                            {copy.description ? (
                                <p ref={descRef} className="hero__desc font-sans">
                                    {copy.description}
                                </p>
                            ) : null}
                            <p ref={subtitleRef} className="hero__subtitle">
                                {splitText(copy.subtitle)}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 ref={titleRef} className="hero__title font-serif">
                            {splitText(copy.title)}
                        </h1>
                        <div ref={lineRef} className="hero__line" />
                        <p ref={subtitleRef} className="hero__subtitle">
                            {splitText(copy.subtitle)}
                        </p>
                    </>
                )}
            </div>
            <div ref={scrollIndicatorRef} className="hero__scroll-indicator">
                <span className="hero__scroll-text label">Scroll</span>
                <div className="hero__scroll-line" />
            </div>
        </section>
    );
}
