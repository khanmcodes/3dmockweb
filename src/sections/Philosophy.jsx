import { motion } from 'framer-motion';

const view = { once: true, amount: 0.35 };
const ease = [0.22, 1, 0.36, 1];

export default function Philosophy() {
    return (
        <section
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
                <motion.span
                    className="philosophy__label label mb-8 block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={view}
                    transition={{ duration: 0.8, ease }}
                >
                    Philosophy
                </motion.span>
                <motion.div
                    className="philosophy__accent mb-16 h-px w-[60px] origin-left bg-[linear-gradient(90deg,var(--color-accent-gold),transparent)] [transform-origin:left_center]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={view}
                    transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
                />
                <div className="philosophy__text relative z-[2] mb-16 flex flex-col gap-16">
                    <motion.p
                        className="philosophy__line font-serif text-4xl font-normal leading-tight tracking-tight text-accent-gold [text-shadow:0_0_60px_rgba(230,194,135,0.15)] md:text-5xl lg:text-6xl"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={view}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    >
                        We believe furniture should challenge the boundary between function and sculpture.
                    </motion.p>
                </div>
                <motion.div
                    className="philosophy__aside border-t border-border pt-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={view}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                >
                    <p className="philosophy__line font-sans text-base leading-loose text-muted md:text-lg">
                        Founded in silence. <br />
                        Shaped by obsession. <br />
                        Built to remain.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
