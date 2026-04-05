import { useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Scene3D = lazy(() => import('../components/Scene3D'));

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef(null);
    const kickerRef = useRef(null);
    const titleRef = useRef(null);
    const lineRef = useRef(null);
    const descRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const contentRef = useRef(null);
    const sceneRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const line = lineRef.current;
        const scrollInd = scrollIndicatorRef.current;
        const content = contentRef.current;
        const scene = sceneRef.current;
        const overlay = overlayRef.current;
        const kicker = kickerRef.current;
        const title = titleRef.current;
        const desc = descRef.current;
        const cta = ctaRef.current;

        if (!section || !line || !scrollInd || !content || !scene || !overlay) return;

        const ctx = gsap.context(() => {
            const blocks = [kicker, title, desc, cta].filter(Boolean);
            gsap.set(blocks, { opacity: 0, y: 32, filter: 'blur(10px)' });
            gsap.set(line, { scaleX: 0, opacity: 0 });
            gsap.set(scrollInd, { opacity: 0, y: 24 });

            const tl = gsap.timeline({ delay: 0.25, defaults: { ease: 'power3.out' } });

            if (kicker) {
                tl.to(kicker, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 });
            }
            if (title) {
                tl.to(
                    title,
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.05 },
                    kicker ? '-=0.45' : 0,
                );
            }
            tl.to(
                line,
                { scaleX: 1, opacity: 1, duration: 1.15, ease: 'expo.inOut' },
                '-=0.65',
            );
            if (desc) {
                tl.to(desc, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.95 }, '-=0.75');
            }
            if (cta) {
                tl.to(cta, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, '-=0.55');
            }
            tl.to(scrollInd, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.35');

            const scrub = 0.45;
            gsap.to(content, {
                y: -48,
                opacity: 0.4,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub,
                },
            });

            gsap.to(scene, {
                y: 28,
                scale: 1.02,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub,
                },
            });

            gsap.to(overlay, {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: '60% top',
                    end: 'bottom top',
                    scrub,
                },
            });

            gsap.to(scrollInd, {
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: '10% top',
                    end: '28% top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="hero relative flex h-screen w-full items-center justify-center overflow-hidden bg-bg"
            id="hero"
        >
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_75%_15%,rgba(230,200,150,0.12),transparent_58%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_8%_85%,rgba(235,233,228,0.06),transparent_52%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(220,210,195,0.06),transparent_45%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(200,185,155,0.06)_0%,transparent_32%,transparent_68%,rgba(165,165,164,0.42)_100%)]" />
            </div>

            <div ref={sceneRef} className="hero__scene absolute inset-0 z-1 will-change-transform">
                <Suspense fallback={<div className="h-full w-full bg-bg" aria-hidden />}>
                    <Scene3D />
                </Suspense>
            </div>

            <div
                ref={overlayRef}
                className="hero__overlay pointer-events-none absolute inset-0 z-3 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(165,165,164,0.32)_52%,rgba(140,140,139,0.68)_100%)]"
            />

            <div
                ref={contentRef}
                className="hero__content pointer-events-none relative z-4 mx-auto flex w-full max-w-5xl flex-col items-start justify-end px-4 pb-28 pt-16 text-left sm:px-8 md:px-16 md:pb-32 will-change-[transform,opacity]"
            >
                <div className="pointer-events-auto max-w-xl">
                    <p
                        ref={kickerRef}
                        className="label mb-5 text-accent-gold/85"
                    >
                        Studio Vortessa
                    </p>

                    <h1
                        ref={titleRef}
                        className="text-balance text-[clamp(1.65rem,4.2vw,2.65rem)] font-medium leading-[1.12] tracking-[0.12em] text-text uppercase [text-shadow:0_0_80px_rgba(230,201,138,0.14)]"
                    >
                        Furniture &amp; objects in graphite and alloy
                    </h1>

                    <div
                        ref={lineRef}
                        className="hero__line mt-8 h-px w-14 origin-left bg-[linear-gradient(90deg,var(--color-accent-gold),transparent)] md:mt-10"
                    />

                    <p
                        ref={descRef}
                        className="font-sans mt-8 max-w-md text-[0.9375rem] font-light leading-relaxed tracking-normal text-muted md:mt-10 md:text-base"
                    >
                        Limited sculptural pieces—steel, stone, and quiet upholstery—for spaces that stay sharp
                        and composed.
                    </p>

                    <Link
                        ref={ctaRef}
                        to="/catalog"
                        className="label mt-8 inline-flex items-center gap-2 text-accent-gold transition-colors duration-300 hover:text-text"
                    >
                        View catalog
                        <span aria-hidden className="text-xs opacity-80">
                            →
                        </span>
                    </Link>
                </div>
            </div>

            <div
                ref={scrollIndicatorRef}
                className="hero__scroll-indicator pointer-events-none absolute bottom-16 left-1/2 z-4 flex -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="hero__scroll-text label text-dim">Scroll</span>
                <div className="hero__scroll-line h-12 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,var(--color-text-dim),transparent)]" />
            </div>
        </section>
    );
}
