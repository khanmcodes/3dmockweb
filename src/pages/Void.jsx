import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { catalogImagePath } from '../data/products';

const Scene3D = lazy(() => import('../components/Scene3D'));

const MOSAIC = [
    catalogImagePath('diningtable.webp'),
    catalogImagePath('chair.webp'),
    catalogImagePath('coffeetable.webp'),
    catalogImagePath('sidetable.webp'),
    catalogImagePath('loungebed.webp'),
    catalogImagePath('workdesk.webp'),
];

const VIDEO_SRC = encodeURI('/VORTESSAWEB Material/PICTURES.jpg/Untitled-design.mp4');

export default function Void() {
    const navigate = useNavigate();
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setReduceMotion(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    return (
        <PageTransition className="relative min-h-dvh min-h-screen overflow-hidden bg-bg">
            <div className="absolute inset-0 z-0" aria-hidden>
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5 saturate-[0.85] contrast-[1.05]">
                    {MOSAIC.map((src, i) => (
                        <div key={`void-mosaic-${i}`} className="overflow-hidden bg-surface">
                            <img
                                src={src}
                                alt=""
                                className="h-full w-full scale-[1.02] object-cover opacity-[0.88] motion-reduce:scale-100"
                            />
                        </div>
                    ))}
                </div>
                {!reduceMotion ? (
                    <video
                        className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover opacity-[0.32] mix-blend-soft-light"
                        src={VIDEO_SRC}
                        muted
                        playsInline
                        autoPlay
                        loop
                        aria-hidden
                    />
                ) : null}
                <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.07]" aria-hidden>
                    <Suspense fallback={null}>
                        <Scene3D variant="void" className="h-full w-full" />
                    </Suspense>
                </div>
                <div
                    className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(105deg,rgba(5,6,8,0.92)_0%,rgba(5,6,8,0.72)_38%,rgba(5,6,8,0.55)_55%,rgba(5,6,8,0.88)_100%)]"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,transparent_0%,rgba(5,6,8,0.25)_55%,rgba(5,6,8,0.9)_100%)]"
                    aria-hidden
                />
            </div>

            <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
                <span className="absolute top-6 right-[8%] left-[8%] z-[5] h-px bg-[linear-gradient(90deg,transparent,rgba(197,202,211,0.45),transparent)] opacity-50" />
                <span className="absolute top-[18%] bottom-[22%] left-6 z-[5] w-px max-[840px]:hidden bg-[linear-gradient(180deg,transparent,rgba(197,202,211,0.4),transparent)]" />
            </div>

            <div className="relative z-[6] mx-auto grid min-h-dvh min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-8 pt-20 max-[840px]:content-center max-[840px]:gap-8 sm:px-8 md:grid-cols-2 md:gap-12 md:px-12 md:pt-24 lg:gap-16 lg:pb-12 lg:pt-28">
                <div className="min-w-0">
                    <Motion.p
                        className="mb-5 font-void-ui text-xs font-medium tracking-widest text-muted uppercase"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        stud10 vort3554
                    </Motion.p>
                    <Motion.h1
                        className="font-void-display mb-8 text-5xl font-normal leading-none tracking-tight text-balance text-text sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Studio
                        <br />
                        Vortessa
                    </Motion.h1>
                    <Motion.div
                        className="flex flex-wrap items-center gap-8"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <button
                            type="button"
                            className="font-void-ui group relative inline-flex shrink-0 cursor-pointer items-center gap-3 rounded-full border border-white/14 bg-[rgba(236,238,242,0.08)] px-7 py-3.5 text-sm font-semibold tracking-wide text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(212,163,115,0.08)] backdrop-blur-2xl transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-gold/40 hover:bg-[rgba(236,238,242,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,163,115,0.22),0_0_40px_rgba(212,163,115,0.12)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-accent max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-6 max-[480px]:py-4"
                            onClick={() => navigate('/catalog')}
                            aria-label="Enter the void — open catalog"
                        >
                            <span className="text-balance">
                                Enter the void
                            </span>
                            <span
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs opacity-80 transition-[transform,opacity,background-color] duration-300 group-hover:translate-x-0.5 group-hover:bg-accent-gold/25 group-hover:opacity-100"
                                aria-hidden
                            >
                                →
                            </span>
                        </button>
                        <Link
                            to="/about"
                            className="label text-muted transition-colors duration-300 hover:text-accent-gold"
                        >
                            About the studio
                        </Link>
                    </Motion.div>
                </div>

                <div className="min-w-0 pt-0 max-[840px]:order-first max-[840px]:pt-0 md:pt-2">
                    <Motion.p
                        className="font-void-ui mb-6 max-w-lg text-balance text-base font-normal leading-relaxed tracking-normal text-muted md:text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        interdimensional altarware for cosmic beings.
                    </Motion.p>
                    <Motion.div
                        className="mb-5 h-px max-w-48 origin-left bg-[linear-gradient(90deg,var(--color-accent-gold),transparent)]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        style={{ transformOrigin: 'left center' }}
                        transition={{ duration: 1.1, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    />
                    <Motion.p
                        className="font-void-ui m-0 text-xs font-medium tracking-widest text-dim uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.85 }}
                    >
                        Steel. Stone. Upholstery.
                        <span className="text-accent"> Bronze detail.</span>
                    </Motion.p>
                </div>
            </div>
        </PageTransition>
    );
}
