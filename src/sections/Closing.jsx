import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import HeroLiveNoise from '../components/HeroLiveNoise';

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

// Use a known-working asset convention already used across pages.
function getFooterPhotoForPath(pathname) {
    if (pathname === '/catalog') return picPath('(5).jpg');
    if (pathname === '/about') return picPath('(5).webp');
    if (pathname === '/contact') return picPath('(10).webp');
    if (pathname?.startsWith('/product/')) return picPath('(2).webp');
    return picPath('(6).webp');
}

export default function Closing({ className = '', catalogSnapSection = false }) {
    const { pathname } = useLocation();
    const FOOTER_BG_PHOTO = getFooterPhotoForPath(pathname);

    const ref = useScrollAnimation((el, gsap) => {
        const footer = el.querySelector('.closing__footer');
        const tagline = el.querySelector('.closing__tagline');
        const newsletter = el.querySelector('.closing__newsletter');
        const navLinks = el.querySelectorAll('.closing__nav a');
        const legal = el.querySelectorAll('.closing__legal a, .closing__legal span');
        const primaryTargets = [tagline, newsletter, footer, ...legal].filter(Boolean);
        const introTargets = [tagline, newsletter].filter(Boolean);
        const hasNavLinks = navLinks.length > 0;
        const hasLegal = legal.length > 0;

        if (primaryTargets.length > 0) {
            gsap.set(primaryTargets, { y: 18 });
        }
        if (hasNavLinks) {
            gsap.set(navLinks, { y: 14 });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
            },
        });

        if (introTargets.length > 0) {
            tl.to(introTargets, { y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06 });
        }
        if (hasNavLinks) {
            tl.to(navLinks, { y: 0, duration: 0.42, ease: 'power2.out', stagger: 0.06 });
        }
        if (footer) {
            tl.to(footer, { y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.2');
        }
        if (hasLegal) {
            tl.to(legal, { y: 0, duration: 0.42, ease: 'power2.out', stagger: 0.05 }, '-=0.35');
        }
    });

    return (
        <section
            ref={ref}
            className={`closing-stage relative z-40 isolate w-full overflow-hidden ${className}`}
            {...(catalogSnapSection ? { 'data-catalog-snap': '' } : {})}
            id="closing"
            style={{ fontFamily: 'var(--font-mono)' }}
        >
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
                <img
                    src={FOOTER_BG_PHOTO}
                    alt=""
                    className="h-full w-full object-cover opacity-[0.96] brightness-[0.8] contrast-[1.05] saturate-[0.95]"
                    loading="lazy"
                />
                <div
                        className="pointer-events-none bg-gradient-to-b from-transparent to-black/70 absolute inset-0 z-[1] min-h-[100dvh] w-full"
                        aria-hidden
                    >
                        <HeroLiveNoise className="h-full min-h-[100dvh] w-full" />
                    </div>
            </div>
            <div className="relative z-[2]">
                {/* Visible photo band before footer */}
                <div className="closing-stage__photo h-[min(82vh,740px)] w-full" aria-hidden />

                <footer className="closing__footer texture-noise texture-noise--footer w-full border-t border-white/15 bg-white/14 backdrop-blur-2xl">
                    <div className="mx-auto flex max-w-[1400px] flex-col px-6 py-8 font-sans tracking-[0.09em] text-white/90 md:px-12 lg:px-16">
                        <p className="max-w-4xl text-left text-sm font-normal tracking-[0.09em] font-sans uppercase">
                            A new dimension of living where furniture becomes art and spaces become sanctuaries.
                        </p>

                        <div className="closing__mid relative mt-7 flex flex-col gap-10 md:mt-8 md:flex-row md:items-start md:justify-between md:gap-8">
                            <nav className="closing__nav flex flex-col gap-4 md:max-w-xs" aria-label="Footer">
                                <Link
                                    className="w-fit text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/92 transition-colors duration-300 hover:text-accent-gold"
                                    to="/catalog"
                                >
                                    Catalogue
                                </Link>
                                <Link
                                    className="w-fit text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/92 transition-colors duration-300 hover:text-accent-gold"
                                    to="/about"
                                >
                                    About
                                </Link>
                                <Link
                                    className="w-fit text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/92 transition-colors duration-300 hover:text-accent-gold"
                                    to="/contact"
                                >
                                    Contact us
                                </Link>
                            </nav>
                        </div>

                        <div className="closing__bottom mt-10 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:mt-12 md:flex-row md:items-end md:gap-6">
                            <p className="closing__newsletter max-w-sm text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/90">
                                Sign up for our newsletter
                            </p>

                            <div className="closing__legal flex flex-col items-start gap-3 md:items-end">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/70 transition-colors hover:text-accent-gold"
                                >
                                    Instagram
                                </a>
                                <Link
                                    to="/catalog"
                                    className="text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/70 transition-colors hover:text-accent-gold"
                                >
                                    Terms + conditions
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-sm font-normal tracking-[0.09em] font-sans uppercase text-white/70 transition-colors hover:text-accent-gold"
                                    aria-label="Privacy policy"
                                >
                                    Pr1vacy p0l1cy
                                </Link>
                                <span className="mt-2 text-sm font-normal uppercase tracking-[0.09em] font-sans text-white/60">
                                    &copy; {new Date().getFullYear()} Studio Vortessa Inc. All rights reserved
                                </span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
}
