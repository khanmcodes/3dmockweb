import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getProductPath, catalogImagePath } from '../data/products';

/** Editorial gallery items; each links to a catalog product detail page. */
const OBJECTS = [
    {
        id: 'throne',
        productSlug: 'monolith-table',
        name: 'Monolith Table',
        material: 'Marble & brushed steel',
        year: '2026',
        image: catalogImagePath('diningtable.png'),
    },
    {
        id: 'table',
        productSlug: 'void-side-table',
        name: 'Void Side Table',
        material: 'Silver & graphite finishes',
        year: '2026',
        image: catalogImagePath('sidetable2.png'),
    },
    {
        id: 'console',
        productSlug: 'aurelia-credenza',
        name: 'Aurelia Credenza',
        material: 'Warm oak & metal',
        year: '2026',
        image: catalogImagePath('coffeetable.png'),
    },
    {
        id: 'vessel',
        productSlug: 'nucleus-stool',
        name: 'Nucleus Stool',
        material: 'Machined titanium tone',
        year: '2026',
        image: catalogImagePath('chair3.png'),
    },
];

function GalleryCard({ item, index }) {
    const imageRef = useRef(null);
    const infoRef = useRef(null);

    const ref = useScrollAnimation((el, gsap) => {
        const wrapper = el.querySelector('.gallery-card__image-wrapper');
        const image = el.querySelector('.gallery-card__image');

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
            .to(
                image,
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.6,
                    ease: 'power3.out',
                },
                '-=1.0'
            )
            .to(
                infoRef.current.children,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                },
                '-=0.8'
            );
    });

    const isRight = index % 2 === 1;

    return (
        <div ref={ref} className="gallery-card__root w-full">
            <Link
                to={getProductPath(item.productSlug)}
                className={`gallery-card group grid grid-cols-1 items-center gap-16 text-inherit no-underline outline-none max-md:grid-cols-1 md:grid-cols-2 md:gap-16 ${
                    isRight ? 'gallery-card--right md:[direction:rtl]' : ''
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-accent`}
            >
                <div
                    className={`gallery-card__image-wrapper group/image relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2px] bg-surface shadow-[0_20px_80px_rgba(0,0,0,0.5)] will-change-[clip-path] max-md:[direction:ltr] ${
                        isRight ? 'md:[direction:ltr]' : ''
                    }`}
                >
                    <div className="gallery-card__image-inner h-full w-full overflow-hidden">
                        <img
                            ref={imageRef}
                            src={item.image}
                            alt={item.name}
                            className="gallery-card__image h-full w-full object-cover brightness-[0.85] contrast-[1.1] transition-[transform,filter] duration-[1.8s] will-change-[transform,filter,opacity] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover/image:scale-[1.08] group-hover/image:brightness-[1.05] group-hover/image:contrast-100"
                            loading="lazy"
                        />
                    </div>
                </div>
                <div
                    ref={infoRef}
                    className={`gallery-card__info flex flex-col gap-4 p-16 max-md:p-0 [&>*]:will-change-[transform,opacity] ${
                        isRight ? 'md:[direction:ltr]' : ''
                    }`}
                >
                    <span className="gallery-card__index label font-semibold text-dim">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="gallery-card__name font-serif text-3xl font-normal leading-tight tracking-normal text-text [text-shadow:0_0_60px_rgba(230,194,135,0.15)] md:text-4xl lg:text-5xl">
                        {item.name}
                    </h3>
                    <p className="gallery-card__material font-sans text-sm font-medium tracking-widest text-accent uppercase">
                        {item.material}
                    </p>
                    <span className="gallery-card__year font-sans text-xs tracking-widest text-dim">{item.year}</span>
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
        <section
            className="gallery relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg px-16 py-64 max-md:px-8 max-md:py-32"
            id="gallery"
        >
            <div className="gallery__container mx-auto max-w-7xl">
                <div ref={headerRef} className="gallery__header mb-48 will-change-[transform,opacity,filter]">
                    <span className="gallery__label label mb-8 block will-change-[transform,opacity,filter]">
                        Collection
                    </span>
                    <div className="gallery__line mb-8 h-px w-[60px] origin-left bg-accent [transform-origin:left_center]" />
                    <h2 className="gallery__title font-serif text-4xl font-normal tracking-tight text-text [text-shadow:0_0_60px_rgba(230,194,135,0.15)] will-change-[transform,opacity,filter] md:text-5xl lg:text-6xl">
                        Objects
                    </h2>
                </div>
                <div className="gallery__grid relative z-[2] flex flex-col gap-48">
                    {OBJECTS.map((item, i) => (
                        <GalleryCard key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
