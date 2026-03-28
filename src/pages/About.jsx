import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const STUDIO_ARCHIVE_IMG = encodeURI(
    '/VORTESSAWEB Material/PICTURES.jpg/StudioVortessa_2026.jpg'
);

export default function About() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const leadRef = useRef(null);
    const mediaSectionRef = useRef(null);
    const mediaFrameRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const chars = titleRef.current?.querySelectorAll('.hero__char') ?? [];
            const media = mediaFrameRef.current;
            const gridCols = el.querySelectorAll('.about__grid .about__col');

            const tl = gsap.timeline({ delay: 0.2 });

            tl.set(chars, {
                yPercent: 100,
                rotateX: -90,
                opacity: 0,
                filter: 'blur(10px)',
                transformOrigin: '50% 100% -50px',
            }).to(chars, {
                yPercent: 0,
                rotateX: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.4,
                ease: 'power4.out',
                stagger: {
                    amount: 0.6,
                    from: 'start',
                },
            });

            if (leadRef.current) {
                gsap.set(leadRef.current, { opacity: 0, y: 28, filter: 'blur(8px)' });
                tl.to(
                    leadRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.15,
                        ease: 'power3.out',
                    },
                    '-=1.05'
                );
            }

            if (media) {
                tl.fromTo(
                    media,
                    { scale: 0.94, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1.45, ease: 'expo.out' },
                    '-=0.95'
                );
            }

            gridCols.forEach((col, i) => {
                gsap.fromTo(
                    col,
                    { opacity: 0, y: 48, filter: 'blur(6px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.15,
                        ease: 'power3.out',
                        delay: i * 0.06,
                        scrollTrigger: {
                            trigger: col,
                            start: 'top 82%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            if (mediaFrameRef.current && mediaSectionRef.current) {
                gsap.to(mediaFrameRef.current, {
                    yPercent: -5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: mediaSectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.1,
                    },
                });
            }
        }, el);

        return () => ctx.revert();
    }, []);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="hero__char-wrapper inline-block overflow-hidden">
                <span
                    className="hero__char inline-block will-change-[transform,filter,opacity]"
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));

    return (
        <PageTransition className="about page bg-bg">
            <div ref={containerRef}>
                <div className="about__hero relative flex min-h-[75vh] flex-col justify-center overflow-hidden px-16 pt-16 pb-32 max-md:px-8">
                    <div className="about__hero-split relative z-[2] mx-auto grid max-w-7xl grid-cols-1 items-end gap-8 px-0 text-left max-[900px]:grid-cols-1 max-[900px]:gap-16 md:grid-cols-2 md:gap-12 md:px-16 lg:gap-16">
                        <div className="about__hero-col about__hero-col--left min-w-0">
                            <span className="about__label label mb-8 block text-accent-gold">Studio Vortessa</span>
                            <h1 ref={titleRef} className="about__title font-serif m-0 text-5xl font-normal leading-tight tracking-tight text-text [text-shadow:0_0_80px_rgba(196,200,210,0.06)] sm:text-6xl md:text-7xl lg:text-8xl">
                                {splitText('Matter.')}
                                <br />
                                {splitText('Memory.')}
                                <br />
                                {splitText('Obsession.')}
                            </h1>
                        </div>
                        <div className="about__hero-col about__hero-col--right min-w-0 pb-[0.35em] max-[900px]:order-first max-[900px]:pb-0">
                            <p
                                ref={leadRef}
                                className="about__lead font-serif m-0 max-w-xl text-base font-normal leading-loose text-muted md:text-lg"
                            >
                                Founded on the principle that objects should possess a gravitational pull, Studio
                                Vortessa designs furniture that challenges the boundary between brutalism and high
                                luxury.
                            </p>
                        </div>
                    </div>

                    <div
                        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full mix-blend-screen"
                        style={{
                            top: '55%',
                            left: '40%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.35,
                            background: 'radial-gradient(circle at center, var(--color-highlight) 0%, transparent 60%)',
                        }}
                        aria-hidden
                    />
                </div>

                <div className="about__content mx-auto max-w-7xl px-16 pb-64 pt-32 max-md:px-8">
                    <div className="about__grid grid grid-cols-1 gap-64 max-[900px]:grid-cols-1 max-[900px]:gap-32 md:grid-cols-2">
                        <div className="about__col">
                            <p className="about__p font-sans m-0 text-base font-light leading-loose text-muted md:text-lg">
                                Every piece we create is an exercise in extreme material discipline. We strip away
                                ornamentation until only structural inevitability remains. Our works are not designed
                                to fade into the background—they are built to anchor the spaces they inhabit.
                            </p>
                        </div>
                        <div className="about__col">
                            <p className="about__p font-sans m-0 text-base font-light leading-loose text-muted md:text-lg">
                                Operating without compromise, we source absolute black marble from ancient quarries,
                                forge solid titanium, and pour concrete with surgical precision.
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={mediaSectionRef} className="about__media mx-auto max-w-screen-2xl px-16 pb-64 max-md:px-8">
                    <div
                        ref={mediaFrameRef}
                        className="about__media-frame about__media-frame--studio relative flex aspect-[21/9] w-full items-end justify-start overflow-hidden bg-surface bg-cover bg-center p-16 max-[900px]:aspect-video max-[900px]:p-8"
                        style={{ backgroundImage: `url(${STUDIO_ARCHIVE_IMG})` }}
                    >
                        <span className="label about__media-label relative z-[2] text-text/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                            Archive — Studio Vortessa 2026
                        </span>
                        <span
                            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,8,0.65)_100%)]"
                            aria-hidden
                        />
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
