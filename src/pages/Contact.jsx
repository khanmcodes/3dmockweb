import { useSearchParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

const CONTACT_IMAGE = picPath('(8).webp');

const fieldEase = [0.22, 1, 0.36, 1];
const formContainer = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};
const formField = {
    hidden: { y: 40, opacity: 0, filter: 'blur(8px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: fieldEase } },
};

export default function Contact() {
    const [searchParams] = useSearchParams();
    const piece = searchParams.get('piece');
    const formRef = useRef(null);
    const imageRef = useRef(null);

    const defaultMessage = useMemo(() => {
        if (!piece) return '';
        try {
            const name = decodeURIComponent(piece);
            return `I would like to inquire about: ${name}.`;
        } catch {
            return '';
        }
    }, [piece]);

    return (
        <PageTransition className="contact page relative min-h-screen overflow-hidden bg-bg">
            <div className="contact__container relative z-[2] mx-auto flex min-h-screen w-full max-w-screen-2xl">

                {/* ─── Left: Form Side ─── */}
                <div className="flex flex-1 flex-col justify-center px-8 py-32 sm:px-12 md:px-16 lg:px-20 xl:px-28">
                    {/* Heading */}
                    <motion.div
                        className="contact-heading mb-16"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: fieldEase, delay: 0.1 }}
                    >
                        <span className="label mb-4 block text-accent-gold">Get in Touch</span>
                        <h1 className="text-5xl font-normal leading-tight text-text sm:text-6xl md:text-7xl">
                            Contact
                        </h1>
                        <div className="mt-6 h-px w-[60px] bg-[linear-gradient(90deg,var(--color-accent),transparent)]" />
                        <p className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-muted md:text-lg">
                            For commissions, press, or private acquisitions — we'd love to hear from you.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        ref={formRef}
                        className="flex max-w-lg flex-col gap-10"
                        variants={formContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={formField} className="contact-field flex flex-col gap-2">
                            <label htmlFor="name" className="font-sans text-xs font-medium tracking-wider text-accent-gold/80 uppercase">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border-0 border-b border-border bg-transparent py-3 font-sans text-lg font-light text-text outline-none transition-[border-color] duration-500 placeholder:text-border/60 focus:border-b-accent-gold md:text-xl"
                                placeholder="Your name"
                            />
                        </motion.div>
                        <motion.div variants={formField} className="contact-field flex flex-col gap-2">
                            <label htmlFor="email" className="font-sans text-xs font-medium tracking-wider text-accent-gold/80 uppercase">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border-0 border-b border-border bg-transparent py-3 font-sans text-lg font-light text-text outline-none transition-[border-color] duration-500 placeholder:text-border/60 focus:border-b-accent-gold md:text-xl"
                                placeholder="you@example.com"
                            />
                        </motion.div>
                        <motion.div variants={formField} className="contact-field flex flex-col gap-2">
                            <label htmlFor="subject" className="font-sans text-xs font-medium tracking-wider text-accent-gold/80 uppercase">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full border-0 border-b border-border bg-transparent py-3 font-sans text-lg font-light text-text outline-none transition-[border-color] duration-500 placeholder:text-border/60 focus:border-b-accent-gold md:text-xl"
                                placeholder="Commission, Press, General inquiry..."
                            />
                        </motion.div>
                        <motion.div variants={formField} className="contact-field flex flex-col gap-2">
                            <label htmlFor="message" className="font-sans text-xs font-medium tracking-wider text-accent-gold/80 uppercase">
                                Your Message
                            </label>
                            <textarea
                                key={piece || 'message'}
                                id="message"
                                className="w-full resize-none border-0 border-b border-border bg-transparent py-3 font-sans text-lg font-light text-text outline-none transition-[border-color] duration-500 placeholder:text-border/60 focus:border-b-accent-gold md:text-xl"
                                placeholder="Tell us about your project or inquiry..."
                                rows={4}
                                defaultValue={defaultMessage}
                            />
                        </motion.div>

                        {/* Submit button — pill shape with hover fill */}
                        <motion.button
                            variants={formField}
                            type="submit"
                            className="contact-field group relative mt-4 self-start overflow-hidden rounded-full border border-text/20 bg-transparent px-10 py-4 transition-[border-color] duration-500 hover:border-accent-gold"
                        >
                            <span className="absolute inset-0 origin-left scale-x-0 bg-accent-gold transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
                            <span className="relative z-[1] font-sans text-sm font-semibold tracking-wider text-text uppercase transition-colors duration-500 group-hover:text-bg">
                                Send Message
                            </span>
                        </motion.button>
                    </motion.form>

                    {/* Contact Info */}
                    <div className="mt-16 flex gap-12 border-t border-border/30 pt-8 max-sm:flex-col max-sm:gap-8">
                        <motion.div
                            className="contact-info-block"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: fieldEase, delay: 0.9 }}
                        >
                            <span className="label mb-3 block text-dim">Location</span>
                            <p className="font-sans text-sm font-light leading-relaxed text-muted">
                                New York, NY
                            </p>
                        </motion.div>
                        <motion.div
                            className="contact-info-block"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: fieldEase, delay: 1.0 }}
                        >
                            <span className="label mb-3 block text-dim">Email</span>
                            <a href="mailto:studio@vortessa.com" className="font-sans text-sm font-light leading-relaxed text-muted transition-colors duration-300 hover:text-accent-gold">
                                studio@vortessa.com
                            </a>
                        </motion.div>
                        <motion.div
                            className="contact-info-block"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: fieldEase, delay: 1.1 }}
                        >
                            <span className="label mb-3 block text-dim">Social</span>
                            <a href="#" className="font-sans text-sm font-light leading-relaxed text-muted transition-colors duration-300 hover:text-accent-gold">
                                Instagram
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* ─── Right: Atmospheric Image ─── */}
                <div className="hidden lg:block lg:w-[45%] xl:w-[48%]">
                    <motion.div
                        ref={imageRef}
                        className="sticky top-0 h-screen w-full overflow-hidden will-change-[clip-path]"
                        initial={{ clipPath: 'inset(0 0 100% 0)', scale: 1.05 }}
                        animate={{ clipPath: 'inset(0 0 0% 0)', scale: 1 }}
                        transition={{ duration: 1.4, ease: fieldEase, delay: 0.2 }}
                    >
                        <img
                            src={CONTACT_IMAGE}
                            alt="Chrome spheres — Studio Vortessa"
                            className="h-full w-full object-cover brightness-[0.7] contrast-[1.1] saturate-[0.85]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-transparent to-transparent opacity-80" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(165,165,164,0.45)_100%)]" />

                        {/* Decorative text on image */}
                        <div className="absolute bottom-12 right-8 z-[2]">
                            <span className="label text-text/30 [text-shadow:0_1px_8px_rgba(100,100,99,0.25)]">
                                Studio Vortessa © 2024
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background accents */}
            <div
                className="pointer-events-none absolute h-[600px] w-[600px] rounded-full mix-blend-screen"
                style={{
                    bottom: '-10%',
                    left: '20%',
                    opacity: 0.15,
                    background: 'radial-gradient(circle at center, var(--color-accent-gold) 0%, transparent 60%)',
                }}
                aria-hidden
            />
        </PageTransition>
    );
}
