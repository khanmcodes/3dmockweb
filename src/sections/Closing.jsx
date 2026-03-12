import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Closing.css';

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
            .to(divider, {
                scaleX: 1,
                opacity: 1,
                duration: 1.6,
                ease: 'power3.inOut',
            }, '-=1.2')
            .to(footer, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power2.out',
            }, '-=1.0');
    });

    return (
        <section ref={ref} className="closing section" id="closing">
            <div className="closing__container">
                <div className="closing__statement">
                    <p className="closing__line font-serif">
                        Objects that outlast
                    </p>
                    <p className="closing__line font-serif">
                        the moment of their making.
                    </p>
                </div>
                <div className="closing__divider" />
                <footer className="closing__footer">
                    <span className="closing__brand label">Studio Vortessa</span>
                    <span className="closing__copy text-dim">
                        &copy; {new Date().getFullYear()} — All rights reserved
                    </span>
                </footer>
            </div>
        </section>
    );
}
