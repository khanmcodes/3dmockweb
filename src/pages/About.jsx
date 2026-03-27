import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/PageTransition';
import './About.css';

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
            <span key={i} className="hero__char-wrapper" style={{ display: 'inline-block', overflow: 'hidden' }}>
                <span
                    className="hero__char"
                    style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));

    return (
        <PageTransition className="about page">
            <div ref={containerRef}>
                <div className="about__hero">
                    <div className="about__hero-split">
                        <div className="about__hero-col about__hero-col--left">
                            <span className="about__label label">Studio Vortessa</span>
                            <h1 ref={titleRef} className="about__title font-serif">
                                {splitText('Matter.')}
                                <br />
                                {splitText('Memory.')}
                                <br />
                                {splitText('Obsession.')}
                            </h1>
                        </div>
                        <div className="about__hero-col about__hero-col--right">
                            <p ref={leadRef} className="about__lead font-serif">
                                Founded on the principle that objects should possess a gravitational pull,
                                Studio Vortessa designs furniture that challenges the boundary between
                                brutalism and high luxury.
                            </p>
                        </div>
                    </div>

                    <div
                        className="accent-glow"
                        style={{ top: '55%', left: '40%', transform: 'translate(-50%, -50%)', opacity: 0.35 }}
                    />
                </div>

                <div className="about__content">
                    <div className="about__grid">
                        <div className="about__col">
                            <p className="about__p font-sans text-muted">
                                Every piece we create is an exercise in extreme material discipline. We strip
                                away ornamentation until only structural inevitability remains. Our works are
                                not designed to fade into the background—they are built to anchor the spaces
                                they inhabit.
                            </p>
                        </div>
                        <div className="about__col">
                            <p className="about__p font-sans text-muted">
                                Operating without compromise, we source absolute black marble from ancient
                                quarries, forge solid titanium, and pour concrete with surgical precision.
                            </p>
                        </div>
                    </div>
                </div>

                <div ref={mediaSectionRef} className="about__media">
                    <div
                        ref={mediaFrameRef}
                        className="about__media-frame about__media-frame--studio"
                        style={{ backgroundImage: `url(${STUDIO_ARCHIVE_IMG})` }}
                    >
                        <span className="label about__media-label">Archive — Studio Vortessa 2026</span>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
