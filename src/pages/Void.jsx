import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VoidStarfield from '../components/VoidStarfield';

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
        <PageTransition className="fixed inset-0 z-0 box-border overflow-hidden overscroll-none bg-bg">
            <div className="absolute inset-0 z-0" aria-hidden>
                <VoidStarfield reduceMotion={reduceMotion} />
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_20%,transparent_0%,rgba(5,6,8,0.35)_50%,rgba(5,6,8,0.88)_100%)]"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg"
                    aria-hidden
                />
            </div>

            <main className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center overscroll-none px-5 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center sm:px-8">
                <div className="flex min-h-0 w-full max-w-3xl flex-shrink-0 flex-col items-center justify-center gap-2 overflow-hidden sm:max-w-4xl sm:gap-3 md:max-w-4xl md:gap-4 lg:max-w-5xl lg:gap-5 [@media(max-height:700px)]:gap-1.5 [@media(max-height:700px)]:sm:gap-2">
                    <Motion.p
                        className="font-void-ui shrink-0 text-xs font-medium tracking-widest text-muted uppercase"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Studio Vortessa
                    </Motion.p>

                    <Motion.h1
                        className="font-void-display shrink-0 text-4xl font-normal leading-none tracking-tight text-balance text-text sm:text-5xl md:text-6xl md:leading-[0.95] lg:text-7xl xl:text-8xl [@media(max-height:700px)]:text-3xl [@media(max-height:700px)]:sm:text-4xl"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Studio
                        <br />
                        Vortessa
                    </Motion.h1>

                    <Motion.p
                        className="font-void-ui line-clamp-3 max-w-lg shrink-0 text-balance text-sm font-normal leading-snug text-muted sm:line-clamp-none sm:text-base sm:leading-relaxed md:max-w-2xl md:text-lg [@media(max-height:700px)]:text-xs [@media(max-height:700px)]:leading-snug"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Sculptural furniture and objects — graphite, silver, and deep black. Spaces that stay quiet
                        and sharp.
                    </Motion.p>

                    <Motion.div
                        className="h-px w-32 max-w-full shrink-0 bg-[linear-gradient(90deg,transparent,var(--color-accent-gold),transparent)] sm:w-40 md:w-48"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        style={{ transformOrigin: 'center center' }}
                        transition={{ duration: 1.1, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    />

                    <Motion.p
                        className="font-void-ui shrink-0 text-xs font-medium tracking-widest text-dim uppercase [@media(max-height:700px)]:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.85 }}
                    >
                        Steel · Stone · Upholstery
                        <span className="text-accent"> · Bronze detail</span>
                    </Motion.p>

                    <Motion.div
                        className="mt-1 flex shrink-0 flex-col items-center gap-4 sm:mt-0 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 md:gap-10 [@media(max-height:700px)]:gap-3"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <button
                            type="button"
                            className="font-void-ui group inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/14 bg-[rgba(236,238,242,0.08)] px-6 py-3 text-sm font-semibold tracking-wide text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(212,163,115,0.08)] backdrop-blur-2xl transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent-gold/40 hover:bg-[rgba(236,238,242,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,163,115,0.22),0_0_40px_rgba(212,163,115,0.12)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-accent [@media(max-height:700px)]:px-5 [@media(max-height:700px)]:py-2.5 [@media(max-height:700px)]:text-xs"
                            onClick={() => navigate('/catalog')}
                            aria-label="Enter the void — open catalog"
                        >
                            <span className="text-balance">Enter the void</span>
                            <span
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs opacity-80 transition-[transform,opacity,background-color] duration-300 group-hover:translate-x-0.5 group-hover:bg-accent-gold/25 group-hover:opacity-100 sm:h-7 sm:w-7"
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
            </main>
        </PageTransition>
    );
}
