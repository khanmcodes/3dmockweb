import { lazy, Suspense } from 'react';
import LiquidChrome from '../components/LiquidChrome';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const MorphingBlobs = lazy(() => import('../components/MorphingBlobs'));
const revealEase = [0.22, 1, 0.36, 1];

export default function Void() {
    return (
        <PageTransition className="fixed inset-0 z-0 box-border overflow-hidden overscroll-none bg-black">
            <div className="absolute inset-0 z-0" aria-hidden>
                <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden
                >
                    <LiquidChrome
                        baseColor={[0.12, 0.12, 0.13]}
                        speed={0.38}
                        amplitude={0.42}
                        frequencyX={2.6}
                        frequencyY={1.9}
                        interactive
                    />
                </div>
                <div
                    className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_120%_100%_at_50%_18%,rgba(236,236,236,0.08)_0%,rgba(165,165,164,0.18)_46%,rgba(120,120,119,0.44)_100%)]"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 z-2 bg-linear-to-b from-[rgba(245,245,245,0.06)] via-[rgba(200,200,200,0.05)] to-[rgba(120,120,119,0.3)]"
                    aria-hidden
                />
                <Suspense fallback={null}>
                    <MorphingBlobs
                        reduceMotion={false}
                        className="pointer-events-none absolute inset-0 z-3"
                    />
                </Suspense>
            </div>

            <main className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center overscroll-none px-5 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center sm:px-8">
                <Motion.div
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: revealEase }}
                >
                    <Motion.div
                        className="flex items-center -space-x-4 text-white"
                        initial={{ opacity: 0, y: 42, scale: 0.92, filter: 'blur(12px)' }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                        }}
                        transition={{ duration: 1.1, ease: revealEase, delay: 0.08 }}
                    >
                        <span className="font-sans italic text-[6rem] font-medium tracking-tighter">
                            Studio
                        </span>
                        <img
                            src="/logo.png"
                            alt=""
                            className="h-22 w-auto object-contain opacity-95 transition-opacity duration-300 [filter:drop-shadow(0_0_14px_rgba(184,146,74,0.2))] hover:opacity-100"
                            aria-hidden
                        />
                        <span className="font-sans italic text-[6rem] font-medium tracking-tighter">
                            Vortessa
                        </span>
                    </Motion.div>
                    <Motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{
                            opacity: 1,
                            y: [0, -4, 0],
                            scale: [1, 1.03, 1],
                            filter: 'blur(0px)',
                        }}
                        transition={{
                            opacity: { duration: 0.9, delay: 0.48, ease: revealEase },
                            filter: { duration: 0.9, delay: 0.48, ease: revealEase },
                            y: { duration: 2.2, delay: 0.62, repeat: Infinity, ease: 'easeInOut' },
                            scale: { duration: 2.2, delay: 0.62, repeat: Infinity, ease: 'easeInOut' },
                        }}
                    >
                        <Link
                            to="/catalog"
                            className="catalog2-hero__cta mt-5 inline-flex items-center text-lg gap-2 rounded-xl bg-white px-6 py-2 font-medium tracking-tight text-black/70 transition-opacity hover:opacity-90"
                            aria-label="Enter the void — open catalog"
                        >
                            ENT3R THE V01D
                        </Link>
                    </Motion.div>
                </Motion.div>
            </main>
        </PageTransition>
    );
}
