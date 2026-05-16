import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    animate,
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { QRCode } from 'react-qr-code';
import ContactForm from '../components/contact/ContactForm';
import HeroLiveNoise from '../components/HeroLiveNoise';
import PageTransition from '../components/PageTransition';
import { WHATSAPP_BUSINESS_URL } from '../constants/contact';
import {
    CONTACT_HERO_IMAGE,
    CONTACT_INQUIRIES,
    getInquiryById,
    resolveInquiryId,
} from '../data/contactInquiries';

const easeView = [0.22, 1, 0.36, 1];

export default function Contact() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pieceParam = searchParams.get('piece');
    const inquiryParam = searchParams.get('inquiry');
    const heroRef = useRef(null);
    const stageRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    const pieceName = useMemo(() => {
        if (!pieceParam) return '';
        try {
            return decodeURIComponent(pieceParam);
        } catch {
            return pieceParam;
        }
    }, [pieceParam]);

    const resolvedInquiryId = useMemo(
        () => resolveInquiryId(inquiryParam, Boolean(pieceName)),
        [inquiryParam, pieceName],
    );

    const [activeInquiryId, setActiveInquiryId] = useState(resolvedInquiryId);
    const activeInquiry = getInquiryById(activeInquiryId);

    useEffect(() => {
        setActiveInquiryId(resolvedInquiryId);
    }, [resolvedInquiryId]);

    const selectInquiry = useCallback(
        (id) => {
            setActiveInquiryId(id);
            const next = new URLSearchParams(searchParams);
            next.set('inquiry', id);
            if (id !== 'furniture-inquiries') next.delete('piece');
            setSearchParams(next, { replace: true });
            stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        [searchParams, setSearchParams],
    );

    const heroImgScale = useMotionValue(prefersReducedMotion ? 1 : 1.1);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);
    const heroImgScaleCombined = useTransform(heroImgScale, (s) => s);
    const heroTypeOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.65, 0.35]);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const ctrl = animate(heroImgScale, 1, {
            duration: 1.45,
            ease: [0.33, 0.11, 0.02, 1],
            delay: 0.08,
        });
        return () => ctrl.stop();
    }, [heroImgScale, prefersReducedMotion]);

    return (
        <PageTransition className="contact page bg-bg">
            <div className="texture-noise texture-noise--footer relative min-h-screen">
                <section
                    ref={heroRef}
                    className="catalog2-hero contact__hero relative flex min-h-[88dvh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:min-h-[100dvh] md:px-12"
                    aria-labelledby="contact-hero-heading"
                >
                    <motion.div className="pointer-events-none absolute inset-0 z-0 min-h-[88dvh] w-full md:min-h-[92dvh]">
                        <motion.img
                            src={CONTACT_HERO_IMAGE.src}
                            alt={CONTACT_HERO_IMAGE.alt}
                            className="catalog2-hero__bg absolute inset-0 h-full w-full object-cover"
                            loading="eager"
                            style={{ scale: heroImgScaleCombined, y: heroImgY }}
                        />
                    </motion.div>
                    <motion.div
                        className="pointer-events-none absolute inset-0 z-[1] min-h-[88dvh] w-full bg-gradient-to-b from-transparent to-black/70 md:min-h-[92dvh]"
                        aria-hidden
                    >
                        <HeroLiveNoise className="h-full min-h-[88dvh] w-full md:min-h-[92dvh]" />
                    </motion.div>
                    <motion.div
                        className="catalog2-hero__veil pointer-events-none absolute inset-0 z-[2] min-h-[88dvh] w-full origin-top bg-[linear-gradient(180deg,rgba(219,219,219,0.94)_0%,rgba(165,165,164,0.88)_48%,rgba(100,100,99,0.82)_100%)] md:min-h-[92dvh]"
                        aria-hidden
                        initial={prefersReducedMotion ? { scaleY: 0, opacity: 0 } : { scaleY: 1 }}
                        animate={prefersReducedMotion ? { scaleY: 0, opacity: 0 } : { scaleY: 0 }}
                        transition={{
                            duration: prefersReducedMotion ? 0.2 : 1.2,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.05,
                        }}
                    />

                    <motion.div
                        className="relative z-[3] mx-auto flex max-w-4xl flex-col items-center text-center [perspective:1200px]"
                        style={{ opacity: heroTypeOpacity }}
                    >
                        <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/55">
                            Studio Vortessa
                        </span>
                        <h1
                            id="contact-hero-heading"
                            className="catalog2-hero__headline mt-5 font-light leading-[1.08] tracking-tight text-white [transform-style:preserve-3d]"
                        >
                            <motion.span
                                className="catalog2-hero__headline-line block font-serif text-[clamp(2.75rem,11vw,5.5rem)] italic leading-[0.95]"
                                initial={{ y: 32, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: easeView, delay: 0.12 }}
                            >
                                Begin the
                            </motion.span>
                            <motion.span
                                className="catalog2-hero__headline-line mt-2 block font-sans text-[clamp(1.35rem,4.5vw,2.35rem)] font-medium tracking-tight"
                                initial={{ y: 32, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: easeView, delay: 0.22 }}
                            >
                                conversation
                            </motion.span>
                        </h1>
                    </motion.div>
                </section>

                <section
                    id="contact-inquiries"
                    ref={stageRef}
                    className="contact__stage relative overflow-hidden border-b border-black/[0.06] bg-[#ebeae6]"
                    aria-label="Contact inquiries"
                >
                    <motion.div className="pointer-events-none absolute inset-0" aria-hidden>
                        <motion.div className="absolute -left-[18%] top-0 h-[65%] w-[52%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,transparent_68%)] blur-3xl" />
                        <motion.div className="absolute bottom-0 right-0 h-[42%] w-[48%] bg-[radial-gradient(ellipse_at_70%_80%,rgba(184,146,74,0.1),transparent_60%)]" />
                    </motion.div>

                    <motion.div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 md:py-24 lg:px-16">
                        <header className="mb-10 max-w-xl md:mb-14">
                            <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-text/40">
                                Inquiries
                            </span>
                            <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,2.75rem)] font-semibold tracking-tight text-[#1a1a1a]">
                                How may we assist?
                            </h2>
                            <p className="mt-4 font-sans text-[0.9375rem] font-light leading-relaxed text-[#5c5c5a] md:text-base">
                                Each channel opens a distinct dialogue — select one to shape the form and brief below.
                            </p>
                        </header>

                        <motion.div
                            className="mb-10 flex flex-col gap-2 rounded-[22px] border border-white/50 bg-white/45 p-2 shadow-[0_20px_50px_rgba(90,90,90,0.1)] backdrop-blur-xl sm:flex-row sm:gap-1.5 md:mb-14"
                            role="tablist"
                            aria-label="Inquiry type"
                        >
                            {CONTACT_INQUIRIES.map((item) => {
                                const isActive = item.id === activeInquiryId;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls="contact-inquiry-panel"
                                        id={`contact-tab-${item.id}`}
                                        onClick={() => selectInquiry(item.id)}
                                        className={`no-cursor-magnetic flex flex-1 items-start gap-3 rounded-[18px] px-4 py-3.5 text-left transition-[background-color,box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b8924a]/40 ${
                                            isActive
                                                ? 'border border-black/10 bg-white shadow-[0_8px_28px_rgba(90,90,90,0.12)]'
                                                : 'border border-transparent bg-transparent hover:bg-white/55'
                                        }`}
                                    >
                                        <span
                                            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-[#2d2d2d] transition-colors ${
                                                isActive ? 'border-[#b8924a]/35 bg-[#b8924a]/8' : 'border-black/10'
                                            }`}
                                        >
                                            {createElement(item.icon, { size: 16, strokeWidth: 1.8 })}
                                        </span>
                                        <span className="min-w-0">
                                            <span className="font-mono text-[0.52rem] font-medium uppercase tracking-[0.2em] text-[#8a8a86]">
                                                {item.index}
                                            </span>
                                            <span className="mt-0.5 block font-sans text-[0.88rem] font-medium leading-snug tracking-tight text-[#1a1a1a] md:text-[0.95rem]">
                                                {item.title}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.article
                                key={activeInquiryId}
                                id="contact-inquiry-panel"
                                role="tabpanel"
                                aria-labelledby={`contact-tab-${activeInquiryId}`}
                                className="overflow-hidden rounded-[26px] border border-white/45 bg-white/55 shadow-[0_24px_56px_rgba(90,90,90,0.12)] backdrop-blur-xl"
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                                transition={{ duration: 0.45, ease: easeView }}
                            >
                                <motion.div className="grid gap-0 md:grid-cols-12">
                                    <motion.div className="relative md:col-span-5">
                                        <motion.div className="relative w-full h-full overflow-hidden md:aspect-auto md:min-h-full">
                                            <img
                                                src={activeInquiry.image}
                                                alt={activeInquiry.imageAlt}
                                                className="h-full w-full object-cover brightness-[0.98] contrast-[1.03] saturate-[0.95]"
                                                loading="lazy"
                                            />
                                            <motion.div
                                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_40%,rgba(30,30,28,0.22)_100%)]"
                                                aria-hidden
                                            />
                                            <motion.div className="absolute left-4 top-4 z-[1] rounded-full border border-white/65 bg-white/72 px-3 py-1 font-mono text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#2e2e2e] shadow-[0_6px_20px_rgba(110,110,110,0.16)] backdrop-blur-xl">
                                                {activeInquiry.index}
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div className="flex flex-col justify-center p-6 md:col-span-7 md:p-8 lg:p-10">
                                        <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[#8a8a86]">
                                            {activeInquiry.tagline}
                                        </p>
                                        <h3 className="mt-2 font-sans text-2xl font-medium tracking-tight text-[#141414] md:text-[1.85rem]">
                                            {activeInquiry.title}
                                        </h3>
                                        <p className="mt-4 max-w-prose font-sans text-[0.9375rem] font-light leading-[1.78] text-[#4a4a48] md:text-base">
                                            {activeInquiry.description}
                                        </p>

                                        <ul className="mt-6 flex flex-wrap gap-2">
                                            {activeInquiry.prompts.map((prompt) => (
                                                <li
                                                    key={prompt}
                                                    className="rounded-full border border-black/10 bg-[#f4f3f0] px-3 py-1 font-sans text-[0.68rem] font-medium uppercase tracking-[0.12em] text-[#5c5c58]"
                                                >
                                                    {prompt}
                                                </li>
                                            ))}
                                        </ul>

                                        <motion.div className="mt-10 border-t border-black/[0.07] pt-8">
                                            <p className="mb-6 font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#6b6b67]">
                                                Your inquiry
                                            </p>
                                            <ContactForm
                                                inquiryId={activeInquiryId}
                                                inquiry={activeInquiry}
                                                pieceName={
                                                    activeInquiryId === 'furniture-inquiries' ? pieceName : ''
                                                }
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.article>
                        </AnimatePresence>

                        <footer className="mt-16 grid gap-8 border-t border-black/[0.07] pt-12 md:grid-cols-12 md:gap-10">
                            <motion.div className="md:col-span-5">
                                <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-text/40">
                                    Studio
                                </span>
                                <p className="mt-4 font-sans text-sm font-light leading-relaxed text-[#5c5c5a]">
                                    New York, NY
                                    <br />
                                    <a
                                        href="mailto:studio@vortessa.com"
                                        className="mt-2 inline-block text-[#3f3f3c] transition-colors hover:text-[#b8924a]"
                                    >
                                        studio@vortessa.com
                                    </a>
                                </p>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="mt-5 inline-flex text-[#5c5c5a] transition-colors hover:text-[#b8924a]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                        aria-hidden
                                    >
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                </a>
                            </motion.div>

                            {WHATSAPP_BUSINESS_URL ? (
                                <motion.div className="md:col-span-7">
                                    <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.28em] text-text/40">
                                        WhatsApp Business
                                    </span>
                                    <a
                                        href={WHATSAPP_BUSINESS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group mt-4 flex flex-col gap-5 rounded-[22px] border border-white/55 bg-white/50 p-5 shadow-[0_12px_36px_rgba(90,90,90,0.1)] backdrop-blur-md transition-[border-color,box-shadow] hover:border-[#b8924a]/30 hover:shadow-[0_16px_44px_rgba(184,146,74,0.1)] sm:flex-row sm:items-center sm:gap-8"
                                        aria-label="Open Studio Vortessa on WhatsApp Business"
                                    >
                                        <motion.div className="shrink-0 rounded-[18px] border border-black/8 bg-white p-3">
                                            <QRCode
                                                value={WHATSAPP_BUSINESS_URL}
                                                size={112}
                                                level="M"
                                                bgColor="#ffffff"
                                                fgColor="#141414"
                                                aria-hidden
                                            />
                                        </motion.div>
                                        <motion.div className="min-w-0">
                                            <p className="font-sans text-sm font-light leading-relaxed text-[#5c5c5a]">
                                                Prefer a direct line? Scan to open our WhatsApp Business page for
                                                quick questions between formal inquiries.
                                            </p>
                                            <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#8a7344] transition-colors group-hover:text-[#b8924a]">
                                                Open in WhatsApp
                                                <ArrowUpRight size={13} strokeWidth={2.2} />
                                            </span>
                                        </motion.div>
                                    </a>
                                </motion.div>
                            ) : null}
                        </footer>
                    </motion.div>
                </section>
            </div>
        </PageTransition>
    );
}
