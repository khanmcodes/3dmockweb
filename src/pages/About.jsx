import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PageTransition from '../components/PageTransition';
import './About.css';

export default function About() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const chars = titleRef.current.querySelectorAll('.hero__char');
            const paragraphs = containerRef.current.querySelectorAll('.about__p');
            const media = containerRef.current.querySelector('.about__media-frame');

            const tl = gsap.timeline({ delay: 0.2 });

            // Title character reveal
            tl.set(chars, {
                yPercent: 100,
                rotateX: -90,
                opacity: 0,
                filter: 'blur(10px)',
                transformOrigin: "50% 100% -50px"
            })
            .to(chars, {
                yPercent: 0,
                rotateX: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.4,
                ease: 'power4.out',
                stagger: {
                    amount: 0.6,
                    from: "start"
                }
            });

            // Paragraphs fade up
            tl.fromTo(paragraphs, 
                { opacity: 0, y: 30, filter: 'blur(4px)' },
                { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)',
                    duration: 1.2, 
                    ease: 'power3.out', 
                    stagger: 0.15 
                }, 
                "-=1.0"
            );

            // Media frame expand
            tl.fromTo(media,
                { scale: 0.95, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' },
                "-=1.0"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text) =>
        text.split('').map((char, i) => (
            <span key={i} className="hero__char-wrapper" style={{ display: 'inline-block', overflow: 'hidden' }}>
                <span className="hero__char" style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));

    return (
        <PageTransition className="about page">
            <div ref={containerRef}>
                <div className="about__hero">
                    <div className="about__hero-inner">
                        <span className="about__label label">Studio Vortessa</span>
                        <h1 ref={titleRef} className="about__title font-serif">
                            {splitText('Matter.')}<br />
                            {splitText('Memory.')}<br />
                            {splitText('Obsession.')}
                        </h1>
                    </div>
                    
                    {/* Background ambient glow */}
                    <div className="accent-glow" style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.4 }} />
                </div>

                <div className="about__content">
                    <div className="about__grid">
                        <div className="about__col">
                            <p className="about__p font-serif">
                                Founded on the principle that objects should possess a gravitational pull, 
                                Studio Vortessa designs furniture that challenges the boundary between 
                                brutalism and high luxury.
                            </p>
                        </div>
                        <div className="about__col">
                            <p className="about__p font-sans text-muted">
                                Every piece we create is an exercise in extreme material discipline. 
                                We strip away ornamentation until only structural inevitability remains. 
                                Our works are not designed to fade into the background—they are built to 
                                anchor the spaces they inhabit.
                            </p>
                            <p className="about__p font-sans text-muted">
                                Operating without compromise, we source absolute black marble from ancient 
                                quarries, forge solid titanium, and pour concrete with surgical precision.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Cinematic Image Break */}
                <div className="about__media">
                    <div className="about__media-frame">
                         <span className="label">Workshop — 2026 Archive</span>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
