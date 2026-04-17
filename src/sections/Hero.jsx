import { useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';

const Scene3D = lazy(() => import('../components/Scene3D'));

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
    const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    const sceneY = useTransform(scrollYProgress, [0, 1], [0, 28]);
    const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.5, 1]);
    const scrollIndOpacity = useTransform(scrollYProgress, [0, 0.1, 0.28], [1, 0.5, 0]);

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

            <Motion.div
                className="hero__scene absolute inset-0 z-1 will-change-transform"
                style={{ y: sceneY, scale: sceneScale }}
            >
                <Suspense fallback={<div className="h-full w-full bg-bg" aria-hidden />}>
                    <Scene3D />
                </Suspense>
            </Motion.div>

            <Motion.div
                className="hero__overlay pointer-events-none absolute inset-0 z-3 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(165,165,164,0.32)_52%,rgba(140,140,139,0.68)_100%)]"
                style={{ opacity: overlayOpacity }}
            />

            <Motion.div
                className="hero__content pointer-events-none relative z-4 mx-auto flex w-full max-w-5xl flex-col items-start justify-end px-4 pb-28 pt-16 text-left sm:px-8 md:px-16 md:pb-32 will-change-[transform,opacity]"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="pointer-events-auto max-w-xl">
                    <Motion.p
                        className="label mb-5 text-accent-gold/85"
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.75, ease }}
                    >
                        Studio Vortessa
                    </Motion.p>

                    <Motion.h1
                        className="text-balance text-[clamp(1.65rem,4.2vw,2.65rem)] font-medium leading-[1.12] tracking-[0.12em] text-text uppercase [text-shadow:0_0_80px_rgba(230,201,138,0.14)]"
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.05, ease, delay: 0.2 }}
                    >
                        Furniture &amp; objects in graphite and alloy
                    </Motion.h1>

                    <Motion.div
                        className="hero__line mt-8 h-px w-14 origin-left bg-[linear-gradient(90deg,var(--color-accent-gold),transparent)] md:mt-10"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
                    />

                    <Motion.p
                        className="font-sans mt-8 max-w-md text-[0.9375rem] font-light leading-relaxed tracking-normal text-muted md:mt-10 md:text-base"
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.95, ease, delay: 0.45 }}
                    >
                        Limited sculptural pieces—steel, stone, and quiet upholstery—for spaces that stay sharp
                        and composed.
                    </Motion.p>

                    <Motion.div
                        initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease, delay: 0.55 }}
                    >
                        <Link
                            to="/catalog"
                            className="label mt-8 inline-flex items-center gap-2 text-accent-gold transition-colors duration-300 hover:text-text"
                        >
                            View catalog
                            <span aria-hidden className="text-xs opacity-80">
                                →
                            </span>
                        </Link>
                    </Motion.div>
                </div>
            </Motion.div>

            <Motion.div
                className="hero__scroll-indicator pointer-events-none absolute bottom-16 left-1/2 z-4 flex -translate-x-1/2 flex-col items-center gap-2"
                style={{ opacity: scrollIndOpacity }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.33, 0.11, 0.02, 1], delay: 0.65 }}
            >
                <span className="hero__scroll-text label text-dim">Scroll</span>
                <div className="hero__scroll-line h-12 w-px origin-top animate-scroll-pulse bg-[linear-gradient(to_bottom,var(--color-text-dim),transparent)]" />
            </Motion.div>
        </section>
    );
}
