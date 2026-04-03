import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import VoidStarfield from '../components/VoidStarfield';
import { CosmicBackdrop } from '../components/CosmicDecor';

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
        <PageTransition className="fixed inset-0 z-0 box-border overflow-hidden overscroll-none bg-black">
            <div className="absolute inset-0 z-0" aria-hidden>
                <img
                    src="/voidbg.jpg"
                    alt=""
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                    draggable={false}
                />
                <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(24,24,26,0.5)_0%,rgba(8,8,10,0.72)_50%,rgba(4,4,6,0.86)_100%)]"
                    aria-hidden
                />
                <VoidStarfield reduceMotion={reduceMotion} hideBaseFill />
                <CosmicBackdrop className="z-[1]" />
                {/* GIF reads as atmosphere: bleeds into starfield, not a discrete UI object */}
                <div
                    className="pointer-events-none absolute inset-0 z-1 mask-[radial-gradient(ellipse_58%_52%_at_50%_50%,#000_0%,rgba(0,0,0,0.5)_42%,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_58%_52%_at_50%_50%,#000_0%,rgba(0,0,0,0.5)_42%,transparent_70%)]"
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
                    className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(ellipse_120%_100%_at_50%_18%,transparent_0%,rgba(18,18,20,0.58)_48%,rgba(2,2,4,0.94)_100%)]"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-0 z-2 bg-linear-to-b from-transparent via-[rgba(230,200,150,0.04)] to-black"
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
                    <Link
                        to="/catalog"
                        className="group flex aspect-square w-[min(19rem,86vw)] max-w-[300px] flex-col items-center justify-center rounded-full border border-white/6 bg-[rgba(12,12,14,0.4)] px-7 py-8 text-center no-underline shadow-none backdrop-blur-[10px] backdrop-saturate-100 outline-none transition-[border-color,background-color,transform] duration-300 ease-out hover:border-[rgba(230,200,150,0.2)] hover:bg-[rgba(22,22,26,0.48)] focus-visible:ring-1 focus-visible:ring-[rgba(230,200,150,0.35)] focus-visible:ring-offset-0 active:scale-[0.99] sm:w-82 sm:max-w-[328px] sm:px-8"
                        aria-label="Enter the void — open catalog"
                    >
                        <h1 className="text-balance text-[0.62rem] leading-snug tracking-tight font-medium text-text sm:text-[0.7rem] md:text-xl">
                            ent3r the vo1d
                        </h1>
                        <p
                            className="font-void-ui mt-0 max-h-0 overflow-hidden text-[0.65rem] font-medium tracking-wide text-silver/85 normal-case opacity-0 transition-[max-height,margin-top,opacity] duration-300 ease-out group-hover:mt-3 group-hover:max-h-14 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-14 group-focus-visible:opacity-100"
                            aria-hidden
                        >
                            Click here to continue
                        </p>
                    </Link>
                </Motion.div>
            </main>
        </PageTransition>
    );
}
