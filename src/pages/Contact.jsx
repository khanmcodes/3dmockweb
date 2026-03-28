import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import PageTransition from '../components/PageTransition';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const piece = searchParams.get('piece');
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
        <PageTransition className="contact page relative flex min-h-screen items-center overflow-hidden bg-bg px-16 py-64 max-md:px-8">
            <div className="contact__container relative z-[2] mx-auto w-full max-w-5xl">
                <div className="contact__header mb-64 grid grid-cols-1 items-end gap-6 max-[900px]:grid-cols-1 max-[900px]:items-start md:gap-10">
                    <h1 className="contact__title font-serif m-0 text-5xl font-normal leading-tight tracking-tight text-text [text-shadow:0_0_80px_rgba(196,200,210,0.05)] sm:text-6xl md:text-7xl lg:text-8xl">
                        Inquiries.
                    </h1>
                    <p className="contact__subtitle font-sans m-0 max-w-md justify-self-end text-base font-light leading-loose text-muted max-[900px]:max-w-xl max-[900px]:justify-self-start md:text-lg">
                        For commissions, press, or private acquisitions, please leave an encrypted transmission.
                    </p>
                </div>

                <div className="contact__layout grid grid-cols-1 gap-64 max-[900px]:grid-cols-1 max-[900px]:gap-32 lg:grid-cols-[1fr_300px]">
                    <form className="contact__form flex flex-col gap-32">
                        <div className="contact__group flex flex-col gap-2">
                            <label htmlFor="name" className="label text-accent-gold">
                                Identity
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="contact__input font-sans w-full border-0 border-b border-border bg-transparent py-4 text-xl font-light text-text outline-none transition-colors duration-300 placeholder:text-border focus:border-b-accent-gold md:text-2xl"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="contact__group flex flex-col gap-2">
                            <label htmlFor="email" className="label text-accent-gold">
                                Transmission Point
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="contact__input font-sans w-full border-0 border-b border-border bg-transparent py-4 text-xl font-light text-text outline-none transition-colors duration-300 placeholder:text-border focus:border-b-accent-gold md:text-2xl"
                                placeholder="jd@example.com"
                            />
                        </div>
                        <div className="contact__group flex flex-col gap-2">
                            <label htmlFor="message" className="label text-accent-gold">
                                Directive
                            </label>
                            <textarea
                                key={piece || 'message'}
                                id="message"
                                className="contact__input contact__input--area font-sans w-full resize-none border-0 border-b border-border bg-transparent py-4 text-xl font-light text-text outline-none transition-colors duration-300 placeholder:text-border focus:border-b-accent-gold md:text-2xl"
                                placeholder="Details regarding your inquiry..."
                                rows={5}
                                defaultValue={defaultMessage}
                            />
                        </div>
                        <button
                            type="submit"
                            className="contact__btn group mt-8 self-start border-0 bg-text px-32 py-8 text-bg transition-[background,transform] duration-300 hover:bg-accent-gold"
                        >
                            <span className="label font-semibold text-bg">Transmit</span>
                        </button>
                    </form>

                    <div className="contact__info flex flex-col gap-32 pt-8 max-[900px]:flex-row max-[900px]:justify-between max-[900px]:border-t max-[900px]:border-border max-[900px]:pt-0 max-[600px]:flex-col max-[600px]:gap-32">
                        <div className="contact__block">
                            <span className="label mb-8 block">Headquarters</span>
                            <p className="font-serif text-dim text-base leading-loose md:text-lg">
                                404 Brutalist Ave,
                                <br />
                                Neo-Reykjavik, 00100
                            </p>
                        </div>
                        <div className="contact__block">
                            <span className="label mb-8 block">Direct</span>
                            <p className="font-serif text-dim text-base leading-loose md:text-lg">
                                +1 (800) 555-0199
                                <br />
                                studio@vortessa.com
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="pointer-events-none absolute h-[600px] w-[600px] rounded-full mix-blend-screen"
                    style={{
                        bottom: '-10%',
                        right: '-10%',
                        opacity: 0.3,
                        background: 'radial-gradient(circle at center, var(--color-highlight) 0%, transparent 60%)',
                    }}
                    aria-hidden
                />
            </div>
        </PageTransition>
    );
}
