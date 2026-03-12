import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Philosophy.css';

export default function Philosophy() {
    const ref = useScrollAnimation((el, gsap, ScrollTrigger) => {
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
            .to(accent, {
                scaleX: 1,
                duration: 1.0,
                ease: 'power3.inOut',
            }, '-=0.4')
            .to(lines, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.15,
            }, '-=0.6');
    });

    return (
        <section ref={ref} className="philosophy section" id="philosophy">
            <div className="philosophy__container">
                <span className="philosophy__label label">Philosophy</span>
                <div className="philosophy__accent" />
                <div className="philosophy__text">
                    <p className="philosophy__line font-serif">
                        We believe furniture should challenge the boundary
                        between function and sculpture.
                    </p>
                    <p className="philosophy__line font-serif">
                        Each piece begins as raw material — stone pulled from earth,
                        metal forged under pressure — and through obsessive craft,
                        transforms into an object that commands presence.
                    </p>
                    <p className="philosophy__line font-serif">
                        Our work is not made for comfort alone.
                        It is made to be felt, to occupy space with intention,
                        and to endure beyond trend.
                    </p>
                </div>
                <div className="philosophy__aside">
                    <p className="philosophy__line text-muted">
                        Founded in silence. <br />
                        Shaped by obsession. <br />
                        Built to remain.
                    </p>
                </div>
            </div>
        </section>
    );
}
