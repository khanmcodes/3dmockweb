import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MATERIALS = [
    {
        id: 'marble',
        name: 'Black Marble',
        description:
            'Quarried from deep within the earth, each slab carries millions of years of geological memory. We select only the most dramatically veined stone, hand-polishing to reveal its inner light.',
        image: '/images/material_marble.png',
        color: '#2a2520',
    },
    {
        id: 'chrome',
        name: 'Polished Chrome',
        description:
            'Mirror-like surfaces that capture and distort the surrounding space. Our chrome finishing process involves twelve stages of polishing, creating surfaces that blur the line between object and reflection.',
        image: '/images/material_chrome.png',
        color: '#3a3835',
    },
    {
        id: 'stone',
        name: 'Engraved Stone',
        description:
            'Ancient techniques meet precision CNC milling. Intricate geometric patterns are carved into volcanic basalt, creating surfaces that shift between rough texture and mathematical exactness.',
        image: null,
        color: '#1e1c1a',
        gradient: 'linear-gradient(135deg, #1a1816 0%, #2d2a26 30%, #1e1c1a 60%, #252220 100%)',
    },
    {
        id: 'steel',
        name: 'Stainless Steel',
        description:
            'Brushed with a directional grain that catches light like fabric. Our steel is hand-finished to create a warm, textile-like quality that contradicts the coldness of the material.',
        image: null,
        color: '#28262a',
        gradient: 'linear-gradient(160deg, #22202a 0%, #2e2c30 40%, #1c1a1e 70%, #262428 100%)',
    },
];

function MaterialCard({ item, isActive, onClick }) {
    return (
        <button
            type="button"
            className={`material-card relative flex items-center gap-4 rounded-[2px] px-8 py-4 text-left font-sans text-base font-normal tracking-wide transition-[color,background] duration-500 ease-out ${
                isActive
                    ? 'material-card--active bg-highlight text-accent-gold'
                    : 'text-dim hover:bg-highlight hover:text-muted'
            }`}
            onClick={onClick}
            aria-pressed={isActive}
        >
            <span
                className={`material-card__indicator h-1.5 w-1.5 rounded-full transition-[background,transform] duration-300 ease-out ${
                    isActive ? 'scale-[1.3] bg-accent-gold' : 'bg-dim'
                }`}
            />
            <span className="material-card__name text-sm font-medium tracking-widest uppercase">{item.name}</span>
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
        <section
            ref={ref}
            className="materials relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-elevated px-16 py-64 max-md:px-8 max-md:py-32"
            id="materials"
        >
            <div className="materials__container mx-auto max-w-7xl">
                <div className="materials__header mb-48">
                    <span className="label mb-8 block">Materiality</span>
                    <h2 className="materials__title font-serif text-4xl leading-tight tracking-tight text-text [text-shadow:0_0_60px_rgba(230,194,135,0.15)] md:text-5xl lg:text-6xl">
                        Raw Matter,
                        <br />
                        Refined Form
                    </h2>
                </div>

                <div className="materials__content grid grid-cols-1 items-start gap-32 lg:grid-cols-[280px_1fr]">
                    <nav className="materials__nav flex flex-col gap-0.5 max-lg:flex-row max-lg:flex-wrap max-lg:gap-2">
                        {MATERIALS.map((item, i) => (
                            <MaterialCard
                                key={item.id}
                                item={item}
                                isActive={i === activeIndex}
                                onClick={() => handleMaterialChange(i)}
                            />
                        ))}
                    </nav>

                    <div className="materials__display grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <div
                            className={`materials__swatch relative aspect-square overflow-hidden rounded-[2px] shadow-[0_20px_80px_rgba(0,0,0,0.3)] transition-[background-image] duration-700 ease-out after:pointer-events-none after:absolute after:inset-0 after:bg-white after:opacity-0 after:mix-blend-overlay after:transition-opacity after:duration-300 after:ease-out after:content-[''] ${
                                isChanging ? 'after:opacity-[0.15] after:duration-100' : ''
                            }`}
                            style={{
                                backgroundImage: activeMaterial.image
                                    ? `url(${activeMaterial.image})`
                                    : activeMaterial.gradient,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="materials__swatch-overlay pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,3,2,0.8)_100%)]" />
                        </div>
                        <div className="materials__detail p-16">
                            <h3 className="materials__detail-name font-serif mb-8 text-3xl font-normal leading-tight tracking-normal text-text md:text-4xl lg:text-5xl">
                                {activeMaterial.name}
                            </h3>
                            <p className="materials__detail-desc font-sans text-base font-light leading-loose text-muted md:text-lg">
                                {activeMaterial.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
