import './About.css';

export default function About() {
    return (
        <div className="about page">
            <div className="about__hero">
                <div className="about__hero-inner">
                    <span className="about__label label">Studio Vortessa</span>
                    <h1 className="about__title font-serif">
                        Matter.<br />
                        Memory.<br />
                        Obsession.
                    </h1>
                </div>
                
                {/* Background ambient glow */}
                <div className="accent-glow" style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.4 }} />
            </div>

            <div className="about__content">
                <div className="about__grid">
                    <div className="about__col">
                        <p className="about__p font-serif">
                            Founded on the principle that objects should possess a gravitational pull, 
                            Studio Vortessa designs furniture that challenges the boundary between 
                            brutalism and high luxury.
                        </p>
                    </div>
                    <div className="about__col">
                        <p className="about__p font-sans text-muted">
                            Every piece we create is an exercise in extreme material discipline. 
                            We strip away ornamentation until only structural inevitability remains. 
                            Our works are not designed to fade into the background—they are built to 
                            anchor the spaces they inhabit.
                        </p>
                        <p className="about__p font-sans text-muted">
                            Operating without compromise, we source absolute black marble from ancient 
                            quarries, forge solid titanium, and pour concrete with surgical precision.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Cinematic Image Break */}
            <div className="about__media">
                <div className="about__media-frame">
                     <span className="label">Workshop — 2026 Archive</span>
                </div>
            </div>
        </div>
    );
}
