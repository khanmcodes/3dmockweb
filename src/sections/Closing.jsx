import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Closing() {
    const ref = useScrollAnimation((el, gsap) => {
        const tagline = el.querySelector('.closing__tagline');
        const navLinks = el.querySelectorAll('.closing__nav a');
        const newsletter = el.querySelector('.closing__newsletter');
        const legal = el.querySelectorAll('.closing__legal a, .closing__legal span');
        const decor = el.querySelector('.closing__decor');

        // Slide-only entrance so copy is never stuck at opacity 0 if ScrollTrigger is late.
        gsap.set([tagline, newsletter, ...legal], { y: 28 });
        gsap.set(navLinks, { y: 20 });
        gsap.set(decor, { opacity: 0, scale: 0.92 });

        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
            },
        })
            .to(tagline, { y: 0, duration: 0.65, ease: 'power2.out' })
            .to(navLinks, { y: 0, duration: 0.42, ease: 'power2.out', stagger: 0.08 }, '-=0.4')
            .to(decor, { opacity: 0.35, scale: 1, duration: 1.0, ease: 'power2.out' }, '-=0.45')
            .to(newsletter, { y: 0, duration: 0.48, ease: 'power2.out' }, '-=0.55')
            .to(legal, { y: 0, duration: 0.42, ease: 'power2.out', stagger: 0.06 }, '-=0.4');
    });

    return (
        <footer
            ref={ref}
            className="closing texture-noise texture-noise--footer relative z-40 isolate min-h-[min(92vh,880px)] w-full overflow-hidden bg-[#0a0b0d] px-6 py-16 text-[#d8dce6] md:px-12 md:py-20 lg:px-16"
            id="closing"
            style={{ fontFamily: 'var(--font-mono)' }}
        >
            <div className="closing__inner relative z-[2] mx-auto flex min-h-[inherit] max-w-[1400px] flex-col">
                <p className="closing__tagline mx-auto max-w-4xl text-center text-[0.65rem] font-normal leading-relaxed tracking-[0.28em] uppercase md:text-xs">
                    A new dimension of living — where furniture becomes art and spaces become sanctuaries.
                </p>

                <div className="closing__mid relative mt-16 flex flex-1 flex-col gap-16 md:mt-24 md:flex-row md:justify-between md:gap-8">
                    <nav className="closing__nav flex flex-col gap-4 md:max-w-xs" aria-label="Footer">
                        <Link
                            className="w-fit text-[0.7rem] font-medium tracking-[0.35em] uppercase text-[#eceef2] transition-colors duration-300 hover:text-[#d4a373]"
                            to="/catalog"
                        >
                            Catalogue
                        </Link>
                        <Link
                            className="w-fit text-[0.7rem] font-medium tracking-[0.35em] uppercase text-[#eceef2] transition-colors duration-300 hover:text-[#d4a373]"
                            to="/about"
                        >
                            About
                        </Link>
                        <Link
                            className="w-fit text-[0.7rem] font-medium tracking-[0.35em] uppercase text-[#eceef2] transition-colors duration-300 hover:text-[#d4a373]"
                            to="/contact"
                        >
                            Contact us
                        </Link>
                    </nav>

                    <div
                        className="closing__decor pointer-events-none absolute left-1/2 top-1/2 hidden h-[min(52vmin,420px)] w-[min(52vmin,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(236,238,242,0.06)] md:block"
                        aria-hidden
                    />
                </div>

                <div className="closing__bottom mt-auto flex flex-col justify-between gap-10 pt-20 md:flex-row md:items-end md:gap-6 md:pt-28">
                    <p className="closing__newsletter max-w-sm text-[0.65rem] font-medium tracking-[0.28em] uppercase text-[#8e939c]">
                        Sign up for our newsletter
                    </p>

                    <div className="closing__legal flex flex-col items-start gap-3 md:items-end">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.65rem] font-medium tracking-[0.32em] uppercase text-[#c8ccd4] transition-colors hover:text-[#d4a373]"
                        >
                            Instagram
                        </a>
                        <Link
                            to="/catalog"
                            className="text-[0.65rem] font-medium tracking-[0.32em] uppercase text-[#c8ccd4] transition-colors hover:text-[#d4a373]"
                        >
                            Terms + conditions
                        </Link>
                        <Link
                            to="/contact"
                            className="text-[0.65rem] font-medium tracking-[0.32em] uppercase text-[#c8ccd4] transition-colors hover:text-[#d4a373]"
                            aria-label="Privacy policy"
                        >
                            Pr1vacy p0l1cy
                        </Link>
                        <span className="mt-2 text-[0.6rem] font-normal tracking-[0.22em] text-[#8e939c]">
                            &copy; {new Date().getFullYear()} Studio Vortessa Inc. All rights reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
