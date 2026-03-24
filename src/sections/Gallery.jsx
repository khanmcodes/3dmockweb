import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getProductPath } from '../data/products';
import './Gallery.css';

/** Editorial gallery items; each links to a catalog product detail page. */
const OBJECTS = [
    {
        id: 'throne',
        productSlug: 'monolith-table',
        name: 'Monolith Throne',
        material: 'Black Marble & Stainless Steel',
        year: '2024',
        image: '/images/furniture_throne.png',
    },
    {
        id: 'table',
        productSlug: 'void-side-table',
        name: 'Arc Side Table',
        material: 'Polished Chrome & Engraved Stone',
        year: '2024',
        image: '/images/furniture_table.png',
    },
    {
        id: 'console',
        productSlug: 'aurelia-credenza',
        name: 'Drift Console',
        material: 'Brushed Metal & Black Marble',
        year: '2023',
        image: '/images/furniture_console.png',
    },
    {
        id: 'vessel',
        productSlug: 'nucleus-stool',
        name: 'Erosion Vessel',
        material: 'Black Marble & Stainless Steel',
        year: '2024',
        image: '/images/furniture_vessel.png',
    },
];

function GalleryCard({ item, index }) {
    const imageRef = useRef(null);
    const infoRef = useRef(null);

    const ref = useScrollAnimation((el, gsap, ScrollTrigger) => {
        const wrapper = el.querySelector('.gallery-card__image-wrapper');
        const image = el.querySelector('.gallery-card__image');

        // ── Clip-path reveal animation ──
        gsap.set(wrapper, { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(image, { scale: 1.2, autoAlpha: 0 });
        gsap.set(infoRef.current.children, { y: 30, opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            },
        });

        tl.to(wrapper, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power4.inOut',
        })
            .to(image, {
                autoAlpha: 1,
                scale: 1,
                duration: 1.6,
                ease: 'power3.out',
            }, '-=1.0')
            .to(infoRef.current.children, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1,
            }, '-=0.8');
    });

    return (
        <div ref={ref} className="gallery-card__root">
            <Link
                to={getProductPath(item.productSlug)}
                className={`gallery-card gallery-card--${index % 2 === 0 ? 'left' : 'right'}`}
            >
                <div className="gallery-card__image-wrapper">
                    <div className="gallery-card__image-inner">
                        <img
                            ref={imageRef}
                            src={item.image}
                            alt={item.name}
                            className="gallery-card__image"
                            loading="lazy"
                        />
                    </div>
                </div>
                <div ref={infoRef} className="gallery-card__info">
                    <span className="gallery-card__index label">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="gallery-card__name font-serif">{item.name}</h3>
                    <p className="gallery-card__material">{item.material}</p>
                    <span className="gallery-card__year text-dim">{item.year}</span>
                </div>
            </Link>
        </div>
    );
}

export default function Gallery() {
    const headerRef = useScrollAnimation((el, gsap) => {
        const label = el.querySelector('.gallery__label');
        const title = el.querySelector('.gallery__title');
        const line = el.querySelector('.gallery__line');

        gsap.set([label, title], { opacity: 0, y: 40, filter: 'blur(5px)' });
        gsap.set(line, { scaleX: 0 });

        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            },
        })
            .to(label, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' })
            .to(line, { scaleX: 1, duration: 1, ease: 'power3.inOut' }, '-=0.4')
            .to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' }, '-=0.6');
    });

    return (
        <section className="gallery section" id="gallery">
            <div className="gallery__container">
                <div ref={headerRef} className="gallery__header">
                    <span className="gallery__label label">Collection</span>
                    <div className="gallery__line" />
                    <h2 className="gallery__title font-serif">Objects</h2>
                </div>
                <div className="gallery__grid">
                    {OBJECTS.map((item, i) => (
                        <GalleryCard key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
