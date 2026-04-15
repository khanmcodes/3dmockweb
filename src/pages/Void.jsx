import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VoidStarfield from '../components/VoidStarfield';
import { CosmicBackdrop } from '../components/CosmicDecor';
import { ArrowDownRight } from 'lucide-react';

export default function Void() {
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
                <img
                    src="/voidbg.jpg"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                    draggable={false}
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(120,120,119,0.42)_0%,rgba(100,100,99,0.62)_50%,rgba(90,90,89,0.78)_100%)]"
                    aria-hidden
                />
                <VoidStarfield reduceMotion={reduceMotion} hideBaseFill />
                <CosmicBackdrop className="z-[1]" />
                {/* GIF reads as atmosphere: bleeds into starfield, not a discrete UI object */}
                <div
                    className="pointer-events-none absolute inset-0 z-1 mask-[radial-gradient(ellipse_58%_52%_at_50%_50%,#4a4a49_0%,rgba(74,74,73,0.5)_42%,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_58%_52%_at_50%_50%,#4a4a49_0%,rgba(74,74,73,0.5)_42%,transparent_70%)]"
                    aria-hidden
                >
                    <img
                        src="/(4).gif"
                        alt=""
                        className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-center opacity-[0.26] mix-blend-soft-light"
                        draggable={false}
                    />
                </div>
                <div
                    className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_120%_100%_at_50%_18%,transparent_0%,rgba(120,120,119,0.48)_48%,rgba(100,100,99,0.88)_100%)]"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 z-2 bg-linear-to-b from-transparent via-[rgba(230,200,150,0.06)] to-[#a5a5a4]"
                    aria-hidden
                />
            </div>

            <main className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center overscroll-none px-5 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center sm:px-8">
                <Motion.div
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src="/logo.png"
                        alt="Studio Vortessa"
                        className="h-auto w-[min(24rem,82vw)] max-w-[160px] object-contain [filter:drop-shadow(0_10px_28px_rgba(46,46,46,0.26))]"
                    />
                    <p className="mt-6 max-w-xl text-balance font-sans text-xl font-normal leading-relaxed -tracking-[0.02rem] text-silver/92">
                        A portal into sculptural interiors, reflective materials, and cosmic forms curated by Studio Vortessa.
                    </p>
                    <Link
                        to="/catalog"
                        className="catalog2-hero__cta mt-5 inline-flex items-center text-lg gap-2 rounded-xl bg-white px-6 py-2 font-medium tracking-tight text-black/70 transition-opacity hover:opacity-90"
                        aria-label="Enter the void — open catalog"
                    >
                        ENT3R THE V01D
                    </Link>
                </Motion.div>
            </main>
        </PageTransition>
    );
}
