import { useEffect, useId, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const fieldEase = [0.22, 1, 0.36, 1];

export default function ContactForm({
    inquiryId,
    inquiry,
    pieceName,
    onSubmit,
}) {
    const formId = useId();
    const messageRef = useRef(null);
    const reduced = useReducedMotion();

    const defaultMessage = pieceName
        ? `I would like to inquire about: ${pieceName}.`
        : '';

    useEffect(() => {
        if (!messageRef.current) return;
        if (pieceName && inquiryId === 'furniture-inquiries') {
            messageRef.current.value = defaultMessage;
        }
    }, [inquiryId, pieceName, defaultMessage]);

    return (
        <motion.form
            key={inquiryId}
            id="contact-form"
            className="contact-form space-y-8"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: fieldEase }}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.(e);
            }}
        >
            <div className="grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col gap-2" htmlFor={`${formId}-name`}>
                    <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#6b6b67]">
                        Name
                    </span>
                    <input
                        id={`${formId}-name`}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        className="h-12 rounded-2xl border border-black/12 bg-white/90 px-4 font-sans text-sm text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/55"
                    />
                </label>
                <label className="flex flex-col gap-2" htmlFor={`${formId}-email`}>
                    <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#6b6b67]">
                        Email
                    </span>
                    <input
                        id={`${formId}-email`}
                        type="email"
                        autoComplete="email"
                        placeholder="you@studio.com"
                        className="h-12 rounded-2xl border border-black/12 bg-white/90 px-4 font-sans text-sm text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/55"
                    />
                </label>
            </div>

            <label className="flex flex-col gap-2" htmlFor={`${formId}-subject`}>
                <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#6b6b67]">
                    Subject
                </span>
                <input
                    id={`${formId}-subject`}
                    type="text"
                    defaultValue={inquiry.subject}
                    className="h-12 rounded-2xl border border-black/12 bg-white/90 px-4 font-sans text-sm text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/55"
                />
            </label>

            <label className="flex flex-col gap-2" htmlFor={`${formId}-message`}>
                <span className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[#6b6b67]">
                    Message
                </span>
                <textarea
                    ref={messageRef}
                    id={`${formId}-message`}
                    rows={5}
                    defaultValue={defaultMessage}
                    placeholder={inquiry.messagePlaceholder}
                    className="resize-none rounded-2xl border border-black/12 bg-white/90 px-4 py-3.5 font-sans text-sm leading-relaxed text-[#1a1a18] outline-none transition-colors placeholder:text-[#9a9a95] focus:border-[#b8924a]/55"
                />
            </label>

            <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#1a1a18] px-8 font-sans text-[0.8rem] font-medium tracking-wide text-white transition-transform hover:-translate-y-0.5"
            >
                Send inquiry
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                    →
                </span>
            </button>
        </motion.form>
    );
}
