import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import HeroLiveNoise from '../components/HeroLiveNoise';

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

function getFooterPhotoForPath(pathname) {
    if (pathname === '/catalog') return picPath('(5).jpg');
    if (pathname === '/about') return picPath('(5).webp');
    if (pathname === '/contact') return picPath('(10).webp');
    if (pathname?.startsWith('/product/')) return picPath('(2).webp');
    return picPath('(6).webp');
}

const view = { once: true, amount: 0.12 };
const ease = [0.22, 1, 0.36, 1];

export default function Closing({ className = '', catalogSnapSection = false }) {
    const { pathname } = useLocation();
    const FOOTER_BG_PHOTO = getFooterPhotoForPath(pathname);

    return (
        <section
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

                <Motion.footer
                    className="closing__footer texture-noise texture-noise--footer w-full border-t border-white/15 bg-white/14 backdrop-blur-2xl"
                    initial={{ y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={view}
                    transition={{ duration: 0.55, ease }}
                >
                    <div
                        className="mx-auto flex max-w-[1400px] flex-col px-6 py-4 tracking-[0.09em] text-white/90 md:px-12 lg:px-16"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        <Motion.p
                            className="closing__tagline max-w-4xl text-left text-sm font-normal tracking-[0.09em] leading-relaxed uppercase"
                            initial={{ y: 18, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={view}
                            transition={{ duration: 0.55, ease, delay: 0.02 }}
                        >
                            A new dimension of living where furniture becomes art and spaces become sanctuaries.
                        </Motion.p>

                        <div className="closing__mid relative mt-4 flex flex-col gap-5 md:mt-5 md:flex-row md:items-start md:justify-between md:gap-6">
                            <Motion.nav
                                className="closing__nav flex flex-col gap-2.5 md:max-w-xs"
                                aria-label="Footer"
                                initial={{ y: 14, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={view}
                                transition={{ duration: 0.42, ease, delay: 0.08 }}
                            >
                                <Link
                                    className="w-fit py-0.5 text-sm font-normal tracking-[0.09em] uppercase text-white/92 transition-colors duration-300 hover:text-accent-gold"
                                    to="/catalog"
                                >
                                    Catalogue
                                </Link>
                                <Link
                                    className="w-fit py-0.5 text-sm font-normal tracking-[0.09em] uppercase text-white/92 transition-colors duration-300 hover:text-accent-gold"
                                    to="/about"
                                >
                                    About
                                </Link>
                                <Link
                                    className="w-fit py-0.5 text-sm font-normal tracking-[0.09em] uppercase text-white/92 transition-colors duration-300 hover:text-accent-gold"
                                    to="/contact"
                                >
                                    Contact us
                                </Link>
                            </Motion.nav>
                        </div>

                        <div className="closing__bottom mt-5 flex flex-col justify-between gap-4 border-t border-white/15 pt-4 sm:flex-row sm:items-end md:mt-6 md:gap-5">
                            <Motion.p
                                className="closing__newsletter max-w-sm text-sm font-normal tracking-[0.09em] uppercase text-white/90"
                                initial={{ y: 18, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={view}
                                transition={{ duration: 0.55, ease, delay: 0.04 }}
                            >
                                Sign up for our newsletter
                            </Motion.p>

                            <Motion.div
                                className="closing__legal flex flex-col items-start gap-2 sm:items-end"
                                initial={{ y: 18, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={view}
                                transition={{ duration: 0.42, ease, delay: 0.1 }}
                            >
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-0.5 text-sm font-normal tracking-[0.09em] uppercase text-white/70 transition-colors hover:text-accent-gold"
                                >
                                    Instagram
                                </a>
                                <Link
                                    to="/catalog"
                                    className="py-0.5 text-sm font-normal tracking-[0.09em] uppercase text-white/70 transition-colors hover:text-accent-gold"
                                >
                                    Terms + conditions
                                </Link>
                                <Link
                                    to="/contact"
                                    className="py-0.5 text-sm font-normal tracking-[0.09em] uppercase text-white/70 transition-colors hover:text-accent-gold"
                                    aria-label="Privacy policy"
                                >
                                    Pr1vacy p0l1cy
                                </Link>
                                <span className="mt-1 text-sm font-normal uppercase tracking-[0.09em] text-white/60">
                                    &copy; {new Date().getFullYear()} Studio Vortessa Inc. All rights reserved
                                </span>
                            </Motion.div>
                        </div>
                    </div>
                </Motion.footer>
            </div>
        </section>
    );
}
