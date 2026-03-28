import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Philosophy() {
    const ref = useScrollAnimation((el, gsap) => {
        const lines = el.querySelectorAll('.philosophy__line');
        const accent = el.querySelector('.philosophy__accent');
        const label = el.querySelector('.philosophy__label');

        gsap.set(lines, { opacity: 0, y: 50 });
        gsap.set(accent, { scaleX: 0 });
        gsap.set(label, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse',
            },
        });

        tl.to(label, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
        })
            .to(
                accent,
                {
                    scaleX: 1,
                    duration: 1.0,
                    ease: 'power3.inOut',
                },
                '-=0.4'
            )
            .to(
                lines,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: 0.15,
                },
                '-=0.6'
            );
    });

    return (
        <section
            ref={ref}
            className="philosophy relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg px-16 py-64 max-md:px-8"
            id="philosophy"
        >
            <div className="philosophy__container relative z-[2] mx-auto max-w-3xl">
                <div
                    className="pointer-events-none absolute h-[600px] w-[600px] rounded-full mix-blend-screen"
                    style={{
                        top: '30%',
                        left: '0%',
                        opacity: 0.6,
                        background: 'radial-gradient(circle at center, var(--color-highlight) 0%, transparent 60%)',
                    }}
                    aria-hidden
                />
                <span className="philosophy__label label mb-8 block">Philosophy</span>
                <div className="philosophy__accent mb-16 h-px w-[60px] origin-left bg-[linear-gradient(90deg,var(--color-accent-gold),transparent)] [transform-origin:left_center]" />
                <div className="philosophy__text relative z-[2] mb-16 flex flex-col gap-16">
                    <p className="philosophy__line font-serif text-4xl font-normal leading-tight tracking-tight text-accent-gold [text-shadow:0_0_60px_rgba(230,194,135,0.15)] md:text-5xl lg:text-6xl">
                        We believe furniture should challenge the boundary between function and sculpture.
                    </p>
                </div>
                <div className="philosophy__aside border-t border-border pt-16">
                    <p className="philosophy__line font-sans text-base leading-loose text-muted md:text-lg">
                        Founded in silence. <br />
                        Shaped by obsession. <br />
                        Built to remain.
                    </p>
                </div>
            </div>
        </section>
    );
}
