import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Materials.css';

const MATERIALS = [
    {
        id: 'marble',
        name: 'Black Marble',
        description: 'Quarried from deep within the earth, each slab carries millions of years of geological memory. We select only the most dramatically veined stone, hand-polishing to reveal its inner light.',
        image: '/images/material_marble.png',
        color: '#2a2520',
    },
    {
        id: 'chrome',
        name: 'Polished Chrome',
        description: 'Mirror-like surfaces that capture and distort the surrounding space. Our chrome finishing process involves twelve stages of polishing, creating surfaces that blur the line between object and reflection.',
        image: '/images/material_chrome.png',
        color: '#3a3835',
    },
    {
        id: 'stone',
        name: 'Engraved Stone',
        description: 'Ancient techniques meet precision CNC milling. Intricate geometric patterns are carved into volcanic basalt, creating surfaces that shift between rough texture and mathematical exactness.',
        image: null,
        color: '#1e1c1a',
        gradient: 'linear-gradient(135deg, #1a1816 0%, #2d2a26 30%, #1e1c1a 60%, #252220 100%)',
    },
    {
        id: 'steel',
        name: 'Stainless Steel',
        description: 'Brushed with a directional grain that catches light like fabric. Our steel is hand-finished to create a warm, textile-like quality that contradicts the coldness of the material.',
        image: null,
        color: '#28262a',
        gradient: 'linear-gradient(160deg, #22202a 0%, #2e2c30 40%, #1c1a1e 70%, #262428 100%)',
    },
];

function MaterialCard({ item, isActive, onClick }) {
    return (
        <button
            className={`material-card ${isActive ? 'material-card--active' : ''}`}
            onClick={onClick}
            aria-pressed={isActive}
        >
            <span className="material-card__indicator" />
            <span className="material-card__name">{item.name}</span>
        </button>
    );
}

export default function Materials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const activeMaterial = MATERIALS[activeIndex];

    const handleMaterialChange = (i) => {
        if (i === activeIndex) return;
        setIsChanging(true);
        setActiveIndex(i);
        setTimeout(() => setIsChanging(false), 150);
    };

    const ref = useScrollAnimation((el, gsap) => {
        const header = el.querySelector('.materials__header');
        const content = el.querySelector('.materials__content');

        gsap.set([header, content], { opacity: 0, y: 60 });

        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            },
        })
            .to(header, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' })
            .to(content, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, '-=0.6');
    });

    return (
        <section ref={ref} className="materials section" id="materials">
            <div className="materials__container">
                <div className="materials__header">
                    <span className="label">Materiality</span>
                    <h2 className="materials__title font-serif">Raw Matter,<br />Refined Form</h2>
                </div>

                <div className="materials__content">
                    <nav className="materials__nav">
                        {MATERIALS.map((item, i) => (
                            <MaterialCard
                                key={item.id}
                                item={item}
                                isActive={i === activeIndex}
                                onClick={() => handleMaterialChange(i)}
                            />
                        ))}
                    </nav>

                    <div className="materials__display">
                        <div
                            className={`materials__swatch ${isChanging ? 'changing' : ''}`}
                            style={{
                                backgroundImage: activeMaterial.image
                                    ? `url(${activeMaterial.image})`
                                    : activeMaterial.gradient,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="materials__swatch-overlay" />
                        </div>
                        <div className="materials__detail">
                            <h3 className="materials__detail-name font-serif">{activeMaterial.name}</h3>
                            <p className="materials__detail-desc">{activeMaterial.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
