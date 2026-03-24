import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import PageTransition from '../components/PageTransition';
import './Contact.css';

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
        <PageTransition className="contact page">
            <div className="contact__container">
                <div className="contact__header">
                    <h1 className="contact__title font-serif">Inquiries.</h1>
                    <p className="contact__subtitle font-sans text-muted">
                        For commissions, press, or private acquisitions, please leave an encrypted transmission.
                    </p>
                </div>

                <div className="contact__layout">
                    <form className="contact__form">
                        <div className="contact__group">
                            <label htmlFor="name" className="label">Identity</label>
                            <input type="text" id="name" className="contact__input font-sans" placeholder="John Doe" />
                        </div>
                        <div className="contact__group">
                            <label htmlFor="email" className="label">Transmission Point</label>
                            <input type="email" id="email" className="contact__input font-sans" placeholder="jd@example.com" />
                        </div>
                        <div className="contact__group">
                            <label htmlFor="message" className="label">Directive</label>
                            <textarea
                                key={piece || 'message'}
                                id="message"
                                className="contact__input contact__input--area font-sans"
                                placeholder="Details regarding your inquiry..."
                                rows={5}
                                defaultValue={defaultMessage}
                            />
                        </div>
                        <button type="submit" className="contact__btn">
                            <span className="label">Transmit</span>
                        </button>
                    </form>

                    <div className="contact__info">
                        <div className="contact__block">
                            <span className="label">Headquarters</span>
                            <p className="font-serif text-dim">
                                404 Brutalist Ave,<br />
                                Neo-Reykjavik, 00100
                            </p>
                        </div>
                        <div className="contact__block">
                            <span className="label">Direct</span>
                            <p className="font-serif text-dim">
                                +1 (800) 555-0199<br />
                                studio@vortessa.com
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Background glow accent */}
                <div className="accent-glow" style={{ bottom: '-10%', right: '-10%', opacity: 0.3 }} />
            </div>
        </PageTransition>
    );
}
