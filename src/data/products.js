/** Client catalogue assets (path segments URL-encoded for spaces in folder name). */
export function catalogImagePath(filename) {
    return encodeURI(`/VORTESSAWEB Material/CATALOGUE/${filename}`);
}

export const products = [
    {
        id: 'vortessa-001',
        slug: 'monolith-table',
        name: 'Monolith Table',
        material: 'Nero Marquina Marble / Brushed Steel',
        price: '$12,500',
        description:
            'A brutalist centerpiece carved from a single block of Nero Marquina marble, suspended by paradoxically thin brushed steel legs.',
        colorTone: '#ffffff',
        defaultVariantId: 'steel',
        variants: [
            {
                id: 'steel',
                label: 'Brushed steel',
                image: catalogImagePath('diningtable.webp'),
                swatch: '#b4b8c0',
            },
            {
                id: 'graphite',
                label: 'Graphite frame',
                image: catalogImagePath('diningtable1.webp'),
                swatch: '#2a2d32',
            },
        ],
    },
    {
        id: 'vortessa-002',
        slug: 'echo-lounge',
        name: 'Echo Lounge',
        material: 'Black Leather / Chrome',
        price: '$8,200',
        description:
            'Aerodynamic chrome tubing wraps around deep, sinking black aniline leather. Designed for posture that commands the room.',
        colorTone: '#bfb8b0',
        defaultVariantId: 'ivory',
        variants: [
            {
                id: 'ivory',
                label: 'Ivory weave',
                image: catalogImagePath('loungebed.webp'),
                swatch: '#d8d4cc',
            },
            {
                id: 'charcoal',
                label: 'Charcoal weave',
                image: catalogImagePath('loungebed2.webp'),
                swatch: '#3a3d42',
            },
        ],
    },
    {
        id: 'vortessa-003',
        slug: 'void-side-table',
        name: 'Void Side Table',
        material: 'Cast Glass / Obsidian',
        price: '$4,100',
        description:
            'Translucent cast glass forming a perfect cylinder with a hollow, polished obsidian core.',
        colorTone: '#a0b3c6',
        defaultVariantId: 'silver',
        variants: [
            {
                id: 'silver',
                label: 'Brushed silver',
                image: catalogImagePath('sidetable.webp'),
                swatch: '#c0c4cc',
            },
            {
                id: 'black',
                label: 'Graphite black',
                image: catalogImagePath('sidetable2black.webp'),
                swatch: '#1a1c20',
            },
        ],
    },
    {
        id: 'vortessa-004',
        slug: 'aurelia-credenza',
        name: 'Aurelia Credenza',
        material: 'Ebonized Oak / Polished Brass',
        price: '$15,800',
        description:
            'Deep, light-absorbing ebonized oak interrupted by aggressive, razor-thin brass inlays.',
        colorTone: '#d4a373',
        defaultVariantId: 'warm',
        variants: [
            {
                id: 'warm',
                label: 'Warm oak',
                image: catalogImagePath('coffeetable.webp'),
                swatch: '#6b5344',
            },
            {
                id: 'deep',
                label: 'Deep ebonized',
                image: catalogImagePath('coffeetable2.webp'),
                swatch: '#2c241c',
            },
        ],
    },
    {
        id: 'vortessa-005',
        slug: 'sentinel-lamp',
        name: 'Sentinel Lamp',
        material: 'Machined Aluminum / Onyx',
        price: '$2,900',
        description:
            'A towering floor lamp that emits a sharp blade of light from a heavy, brutalist onyx base.',
        colorTone: '#e6c287',
        defaultVariantId: 'slate',
        variants: [
            {
                id: 'slate',
                label: 'Slate base',
                image: catalogImagePath('bedsidetable.webp'),
                swatch: '#4a4f56',
            },
            {
                id: 'onyx',
                label: 'Onyx accent',
                image: catalogImagePath('bedsidetablephoto2.webp'),
                swatch: '#1f2124',
            },
        ],
    },
    {
        id: 'vortessa-006',
        slug: 'apex-dining-chair',
        name: 'Apex Dining Chair',
        material: 'Matte Steel / Suede',
        price: '$3,400',
        description:
            'Angles so sharp they feel dangerous, softened only by a hyper-dense charcoal suede seating pad.',
        colorTone: '#8a8680',
        defaultVariantId: 'steel',
        variants: [
            {
                id: 'steel',
                label: 'Matte steel',
                image: catalogImagePath('chair.webp'),
                swatch: '#8a9099',
            },
            {
                id: 'gunmetal',
                label: 'Gunmetal',
                image: catalogImagePath('chair2.webp'),
                swatch: '#3d4248',
            },
            {
                id: 'carbon',
                label: 'Carbon',
                image: catalogImagePath('chair3.webp'),
                swatch: '#25282c',
            },
        ],
    },
    {
        id: 'vortessa-007',
        slug: 'eclipse-wall-mirror',
        name: 'Eclipse Wall Mirror',
        material: 'Smoked Glass / Travertine',
        price: '$5,200',
        description:
            'A massive disc of heavily smoked glass intersecting a raw, unpolished slab of Italian travertine.',
        colorTone: '#cebfa4',
        defaultVariantId: 'smoke',
        variants: [
            {
                id: 'smoke',
                label: 'Smoked glass',
                image: catalogImagePath('sidetable.webp'),
                swatch: '#8a9098',
            },
            {
                id: 'silver',
                label: 'Silver nitrate',
                image: catalogImagePath('coffeetable2.webp'),
                swatch: '#c5cad3',
            },
        ],
    },
    {
        id: 'vortessa-008',
        slug: 'lithic-desk',
        name: 'Lithic Desk',
        material: 'Concrete / Walnut',
        price: '$9,500',
        description:
            'A monumental cantilevered concrete surface bursting from a rich, organic walnut pedestal.',
        colorTone: '#a8a5a1',
        defaultVariantId: 'concrete',
        variants: [
            {
                id: 'concrete',
                label: 'Bone concrete',
                image: catalogImagePath('workdesk.webp'),
                swatch: '#9c9894',
            },
            {
                id: 'walnut',
                label: 'Walnut edge',
                image: catalogImagePath('sidetable.webp'),
                swatch: '#5c4a3d',
            },
        ],
    },
    {
        id: 'vortessa-009',
        slug: 'vesper-sconce',
        name: 'Vesper Sconce',
        material: 'Brass / Frosted Quartz',
        price: '$1,800',
        description:
            'A wall sconce that diffuses a warm, cinematic ember-glow through heavily frosted quartz crystal.',
        colorTone: '#f2bd79',
        defaultVariantId: 'frost',
        variants: [
            {
                id: 'frost',
                label: 'Frosted quartz',
                image: catalogImagePath('bedsidetablephoto2.webp'),
                swatch: '#e8e4dc',
            },
            {
                id: 'brass',
                label: 'Burnished brass',
                image: catalogImagePath('bedsidetable.webp'),
                swatch: '#b8956a',
            },
        ],
    },
    {
        id: 'vortessa-010',
        slug: 'crescent-sofa',
        name: 'Crescent Sofa',
        material: 'Bouclé / Gunmetal',
        price: '$14,200',
        description:
            'A sweeping, asymmetrical curve of dense ivory bouclé resting on a severe gunmetal chassis.',
        colorTone: '#e3dfd8',
        defaultVariantId: 'pearl',
        variants: [
            {
                id: 'pearl',
                label: 'Pearl bouclé',
                image: catalogImagePath('loungebed2.webp'),
                swatch: '#e6e2db',
            },
            {
                id: 'graphite',
                label: 'Graphite base',
                image: catalogImagePath('loungebed.webp'),
                swatch: '#3a3c40',
            },
        ],
    },
    {
        id: 'vortessa-011',
        slug: 'obelisk-bookshelf',
        name: 'Obelisk Bookshelf',
        material: 'Blackened Steel',
        price: '$7,900',
        description:
            'A terrifyingly thin, towering framework of blackened steel meant to display only the most essential objects.',
        colorTone: '#222222',
        defaultVariantId: 'blackened',
        variants: [
            {
                id: 'blackened',
                label: 'Blackened',
                image: catalogImagePath('chair2.webp'),
                swatch: '#1e1e20',
            },
            {
                id: 'oxide',
                label: 'Oxide',
                image: catalogImagePath('chair3.webp'),
                swatch: '#2c2620',
            },
        ],
    },
    {
        id: 'vortessa-012',
        slug: 'nucleus-stool',
        name: 'Nucleus Stool',
        material: 'Solid Titanium',
        price: '$4,500',
        description:
            'A perfectly lathed cylinder of solid titanium, cold to the touch and virtually indestructible.',
        colorTone: '#b5b9bd',
        defaultVariantId: 'titanium',
        variants: [
            {
                id: 'titanium',
                label: 'Raw titanium',
                image: catalogImagePath('chair3.webp'),
                swatch: '#a8adb2',
            },
            {
                id: 'satin',
                label: 'Satin silver',
                image: catalogImagePath('chair.webp'),
                swatch: '#c5c8cc',
            },
        ],
    },
];

export function getDefaultVariant(product) {
    if (!product?.variants?.length) return null;
    const id = product.defaultVariantId;
    return product.variants.find((v) => v.id === id) || product.variants[0];
}

/** Stable URL for a product detail page. */
export function getProductPath(productOrSlug) {
    const slug =
        typeof productOrSlug === 'string' ? productOrSlug : productOrSlug?.slug;
    if (!slug) return '/catalog';
    return `/product/${slug}`;
}

/** Resolve a product from the URL segment (slug preferred; legacy id still supported). */
export function getProductBySlugOrId(param) {
    if (param == null || param === '') return undefined;
    const raw = String(param).trim();
    let decoded = raw;
    try {
        decoded = decodeURIComponent(raw);
    } catch {
        decoded = raw;
    }
    return products.find(
        (p) =>
            p.slug === raw ||
            p.slug === decoded ||
            p.id === raw ||
            p.id === decoded
    );
}

export function getProductNeighbors(product) {
    const i = products.findIndex((p) => p.id === product.id);
    if (i === -1) return { prev: null, next: null };
    return {
        prev: i > 0 ? products[i - 1] : null,
        next: i < products.length - 1 ? products[i + 1] : null,
    };
}

export function getOtherProducts(product, limit = 4) {
    return products.filter((p) => p.id !== product.id).slice(0, limit);
}