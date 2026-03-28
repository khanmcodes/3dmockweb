import { useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                <span className="hero__char inline-block will-change-[transform,opacity]">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));

    const sectionClass = `hero relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg ${isCatalog ? 'hero--catalog' : ''} ${isSplit ? 'hero--split' : ''}`;

    return (
        <section ref={sectionRef} className={sectionClass} id="hero">
            <div ref={sceneRef} className="hero__scene absolute inset-0 z-[1] will-change-transform">
                <Suspense fallback={<div className="h-full w-full bg-bg" aria-hidden />}>
                    <Scene3D />
                </Suspense>
            </div>
            <div
                ref={overlayRef}
                className="hero__overlay absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.5)_55%,rgba(10,10,10,0.9)_100%)]"
            />
            <div
                ref={contentRef}
                className={`hero__content relative z-[3] will-change-[transform,opacity] [perspective:800px] ${
                    isSplit
                        ? 'hero__content--split mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-8 px-4 pb-12 text-left sm:px-8 md:grid-cols-2 md:gap-16 md:px-16 lg:gap-20 lg:pb-24'
                        : 'text-center'
                } ${isCatalog && !isSplit ? 'px-8' : ''}`}
            >
                {isSplit ? (
                    <>
                        <div className="hero__split-col hero__split-col--primary min-w-0">
                            <h1
                                ref={titleRef}
                                className={`hero__title font-serif font-normal tracking-tight leading-tight text-text [text-shadow:0_0_100px_rgba(212,163,115,0.15)] md:mb-2 ${
                                    isCatalog
                                        ? 'text-4xl max-md:text-3xl md:text-7xl lg:text-8xl'
                                        : 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl'
                                }`}
                            >
                                {splitText(copy.title)}
                            </h1>
                            <div
                                ref={lineRef}
                                className="hero__line hero__line--split mx-0 mt-8 h-px w-[60px] origin-center bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)] md:mt-8"
                            />
                        </div>
                        <div className="hero__split-col hero__split-col--secondary min-w-0 pb-[0.2em] max-md:order-first max-md:items-start max-md:pb-0">
                            {copy.description ? (
                                <p
                                    ref={descRef}
                                    className="hero__desc font-sans mb-8 max-w-lg text-base font-normal leading-loose tracking-normal text-muted md:text-lg"
                                >
                                    {copy.description}
                                </p>
                            ) : null}
                            <p ref={subtitleRef} className="hero__subtitle m-0 text-left font-sans text-sm font-medium tracking-widest text-accent uppercase">
                                {splitText(copy.subtitle)}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <h1
                            ref={titleRef}
                            className="hero__title font-serif mb-2 text-6xl font-normal tracking-tight leading-tight text-text sm:text-7xl md:text-8xl lg:text-9xl [text-shadow:0_0_100px_rgba(212,163,115,0.15)]"
                        >
                            {splitText(copy.title)}
                        </h1>
                        <div
                            ref={lineRef}
                            className="hero__line mx-auto my-8 h-px w-[60px] origin-center bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)]"
                        />
                        <p ref={subtitleRef} className="hero__subtitle font-sans text-sm font-medium tracking-widest text-accent uppercase">
                            {splitText(copy.subtitle)}
                        </p>
                    </>
                )}
            </div>
            <div
                ref={scrollIndicatorRef}
                className="hero__scroll-indicator absolute bottom-16 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="hero__scroll-text label text-dim">Scroll</span>
                <div className="hero__scroll-line h-12 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,var(--color-text-dim),transparent)]" />
            </div>
        </section>
    );
}
