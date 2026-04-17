import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { getProductPath, catalogImagePath } from '../data/products';

const OBJECTS = [
    {
        id: 'throne',
        productSlug: 'monolith-table',
        category: '001_AETHERIS',
        name: 'Monolith Table',
        description: 'A single marble mass on whisper-thin steel — weight made to hover.',
        material: 'Marble & brushed steel',
        image: catalogImagePath('diningtable.webp'),
    },
    {
        id: 'table',
        productSlug: 'void-side-table',
        category: '001_AETHERIS',
        name: 'Void Side Table',
        description: 'Glass and obsidian in a quiet cylinder — light catches the edge.',
        material: 'Silver & graphite finishes',
        image: catalogImagePath('sidetable.webp'),
    },
    {
        id: 'console',
        productSlug: 'aurelia-credenza',
        category: '001_AETHERIS',
        name: 'Aurelia Credenza',
        description: 'Deep oak planes sliced by hairline brass — storage as sculpture.',
        material: 'Warm oak & metal',
        image: catalogImagePath('coffeetable.webp'),
    },
    {
        id: 'vessel',
        productSlug: 'nucleus-stool',
        category: '001_AETHERIS',
        name: 'Nucleus Stool',
        description: 'A lathed titanium cylinder — cool, minimal, built to outlast trends.',
        material: 'Machined titanium tone',
        image: catalogImagePath('chair.webp'),
    },
];

const view = { once: true, amount: 0.2 };
const ease = [0.22, 1, 0.36, 1];

function GalleryCard({ item, index }) {
    const infoRef = useRef(null);
    const isRight = index % 2 === 1;

    return (
        <Motion.div
            className="gallery-card__root w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={view}
        >
            <Link
                to={getProductPath(item.productSlug)}
                className={`gallery-card group grid grid-cols-1 items-center gap-16 text-inherit no-underline outline-none max-md:grid-cols-1 md:grid-cols-2 md:gap-16 ${
                    isRight ? 'gallery-card--right md:[direction:rtl]' : ''
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-accent`}
            >
                <Motion.div
                    className={`gallery-card__image-wrapper group/image relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[2px] bg-surface shadow-[0_20px_80px_rgba(100,100,99,0.26)] will-change-[clip-path] max-md:[direction:ltr] ${
                        isRight ? 'md:[direction:ltr]' : ''
                    }`}
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    viewport={view}
                    transition={{ duration: 0.88, ease }}
                >
                    <div className="gallery-card__image-inner h-full w-full overflow-hidden">
                        <Motion.img
                            src={item.image}
                            alt={item.name}
                            className="gallery-card__image h-full w-full object-cover brightness-[0.85] contrast-[1.1] transition-[transform,filter] duration-[1.1s] will-change-[transform,filter] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover/image:scale-[1.08] group-hover/image:brightness-[1.05] group-hover/image:contrast-100"
                            loading="lazy"
                            initial={{ scale: 1.06, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={view}
                            transition={{ duration: 0.82, ease: [0.33, 0.11, 0.02, 1] }}
                        />
                    </div>
                </Motion.div>
                <div
                    ref={infoRef}
                    className={`gallery-card__info flex flex-col gap-3 p-16 max-md:p-0 [&>*]:will-change-[transform,opacity] ${
                        isRight ? 'md:[direction:ltr]' : ''
                    }`}
                >
                    <Motion.span
                        className="gallery-card__category label block text-[0.65rem] font-medium tracking-[0.2em] text-dim uppercase"
                        initial={{ y: 22, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={view}
                        transition={{ duration: 0.52, ease, delay: 0.14 }}
                    >
                        {item.category}
                    </Motion.span>
                    <Motion.h3
                        className="gallery-card__name heading-serif text-3xl font-normal leading-tight tracking-normal text-text [text-shadow:0_0_60px_rgba(230,194,135,0.15)] md:text-4xl lg:text-5xl"
                        initial={{ y: 22, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={view}
                        transition={{ duration: 0.52, ease, delay: 0.22 }}
                    >
                        {item.name}
                    </Motion.h3>
                    <Motion.p
                        className="gallery-card__description mt-1 max-w-md font-sans text-sm font-light leading-relaxed tracking-normal text-muted"
                        initial={{ y: 22, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={view}
                        transition={{ duration: 0.52, ease, delay: 0.3 }}
                    >
                        {item.description}
                    </Motion.p>
                    <Motion.p
                        className="gallery-card__material font-sans text-xs font-medium tracking-widest text-accent uppercase"
                        initial={{ y: 22, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={view}
                        transition={{ duration: 0.52, ease, delay: 0.38 }}
                    >
                        {item.material}
                    </Motion.p>
                </div>
            </Link>
        </Motion.div>
    );
}

export default function Gallery() {
    return (
        <section
            className="gallery texture-noise relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden border-b border-[rgba(46,46,46,0.08)] bg-bg px-16 py-44 max-md:px-8"
            id="gallery"
        >
            <div className="gallery__container relative z-[1] mx-auto max-w-7xl">
                <Motion.div
                    className="gallery__header mb-28 will-change-[transform,opacity,filter]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={view}
                >
                    <Motion.span
                        className="gallery__label label mb-8 block will-change-[transform,opacity,filter]"
                        initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={view}
                        transition={{ duration: 0.55, ease }}
                    >
                        Collect10n
                    </Motion.span>
                    <Motion.div
                        className="gallery__line mb-8 h-px w-[60px] origin-left bg-accent [transform-origin:left_center]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={view}
                        transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
                    />
                    <Motion.h2
                        className="gallery__title text-4xl font-normal tracking-tight text-text [text-shadow:0_0_60px_rgba(230,194,135,0.15)] will-change-[transform,opacity,filter] md:text-5xl lg:text-6xl"
                        initial={{ opacity: 0, y: 40, filter: 'blur(5px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={view}
                        transition={{ duration: 0.62, ease, delay: 0.12 }}
                    >
                        Objects
                    </Motion.h2>
                </Motion.div>
                <div className="gallery__grid relative z-[2] flex flex-col gap-0">
                    {OBJECTS.map((item, i) => (
                        <GalleryCard key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
