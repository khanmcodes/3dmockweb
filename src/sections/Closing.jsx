import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Closing() {
    const ref = useScrollAnimation((el, gsap) => {
        const lines = el.querySelectorAll('.closing__line');
        const footer = el.querySelector('.closing__footer');
        const divider = el.querySelector('.closing__divider');

        gsap.set(lines, { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.95 });
        gsap.set(divider, { scaleX: 0, opacity: 0 });
        gsap.set(footer, { opacity: 0, filter: 'blur(5px)' });

        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 65%',
                toggleActions: 'play none none reverse',
            },
        })
            .to(lines, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 2.0,
                ease: 'power3.out',
                stagger: 0.3,
            })
            .to(
                divider,
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.6,
                    ease: 'power3.inOut',
                },
                '-=1.2'
            )
            .to(
                footer,
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    ease: 'power2.out',
                },
                '-=1.0'
            );
    });

    return (
        <section
            ref={ref}
            className="closing relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg px-16 py-64 max-md:px-8"
            id="closing"
        >
            <div className="closing__container mx-auto max-w-4xl text-center">
                <div className="closing__statement mb-16">
                    <p className="closing__line font-serif text-4xl font-normal leading-tight tracking-tight text-text [text-shadow:0_0_40px_rgba(230,194,135,0.1)] will-change-[transform,opacity] md:text-5xl lg:text-6xl">
                        Objects that outlast
                    </p>
                    <p className="closing__line mt-2 font-serif text-4xl font-normal leading-tight tracking-tight text-accent-gold [text-shadow:0_0_40px_rgba(230,194,135,0.1)] will-change-[transform,opacity] md:text-5xl lg:text-6xl">
                        the moment of their making.
                    </p>
                </div>
                <div className="closing__divider mx-auto my-16 h-px w-[60px] origin-center bg-[linear-gradient(90deg,transparent,var(--color-accent-gold),transparent)] [transform-origin:center]" />
                <footer className="closing__footer flex flex-col items-center gap-2 will-change-[transform,opacity]">
                    <span className="closing__brand label text-muted">Studio Vortessa</span>
                    <span className="closing__copy font-sans text-xs tracking-wider text-dim">
                        &copy; {new Date().getFullYear()} — All rights reserved
                    </span>
                </footer>
            </div>
        </section>
    );
}
