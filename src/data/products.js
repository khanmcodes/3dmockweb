export const products = [
    {
        id: 'vortessa-001',
        slug: 'monolith-table',
        name: 'Monolith Table',
        material: 'Nero Marquina Marble / Brushed Steel',
        price: '$12,500',
        description: 'A brutalist centerpiece carved from a single block of Nero Marquina marble, suspended by paradoxically thin brushed steel legs.',
        colorTone: '#ffffff',
    },
    {
        id: 'vortessa-002',
        slug: 'echo-lounge',
        name: 'Echo Lounge',
        material: 'Black Leather / Chrome',
        price: '$8,200',
        description: 'Aerodynamic chrome tubing wraps around deep, sinking black aniline leather. Designed for posture that commands the room.',
        colorTone: '#bfb8b0',
    },
    {
        id: 'vortessa-003',
        slug: 'void-side-table',
        name: 'Void Side Table',
        material: 'Cast Glass / Obsidian',
        price: '$4,100',
        description: 'Translucent cast glass forming a perfect cylinder with a hollow, polished obsidian core.',
        colorTone: '#a0b3c6',
    },
    {
        id: 'vortessa-004',
        slug: 'aurelia-credenza',
        name: 'Aurelia Credenza',
        material: 'Ebonized Oak / Polished Brass',
        price: '$15,800',
        description: 'Deep, light-absorbing ebonized oak interrupted by aggressive, razor-thin brass inlays.',
        colorTone: '#d4a373',
    },
    {
        id: 'vortessa-005',
        slug: 'sentinel-lamp',
        name: 'Sentinel Lamp',
        material: 'Machined Aluminum / Onyx',
        price: '$2,900',
        description: 'A towering floor lamp that emits a sharp blade of light from a heavy, brutalist onyx base.',
        colorTone: '#e6c287',
    },
    {
        id: 'vortessa-006',
        slug: 'apex-dining-chair',
        name: 'Apex Dining Chair',
        material: 'Matte Steel / Suede',
        price: '$3,400',
        description: 'Angles so sharp they feel dangerous, softened only by a hyper-dense charcoal suede seating pad.',
        colorTone: '#8a8680',
    },
    {
        id: 'vortessa-007',
        slug: 'eclipse-wall-mirror',
        name: 'Eclipse Wall Mirror',
        material: 'Smoked Glass / Travertine',
        price: '$5,200',
        description: 'A massive disc of heavily smoked glass intersecting a raw, unpolished slab of Italian travertine.',
        colorTone: '#cebfa4',
    },
    {
        id: 'vortessa-008',
        slug: 'lithic-desk',
        name: 'Lithic Desk',
        material: 'Concrete / Walnut',
        price: '$9,500',
        description: 'A monumental cantilevered concrete surface bursting from a rich, organic walnut pedestal.',
        colorTone: '#a8a5a1',
    },
    {
        id: 'vortessa-009',
        slug: 'vesper-sconce',
        name: 'Vesper Sconce',
        material: 'Brass / Frosted Quartz',
        price: '$1,800',
        description: 'A wall sconce that diffuses a warm, cinematic ember-glow through heavily frosted quartz crystal.',
        colorTone: '#f2bd79',
    },
    {
        id: 'vortessa-010',
        slug: 'crescent-sofa',
        name: 'Crescent Sofa',
        material: 'Bouclé / Gunmetal',
        price: '$14,200',
        description: 'A sweeping, asymmetrical curve of dense ivory bouclé resting on a severe gunmetal chassis.',
        colorTone: '#e3dfd8',
    },
    {
        id: 'vortessa-011',
        slug: 'obelisk-bookshelf',
        name: 'Obelisk Bookshelf',
        material: 'Blackened Steel',
        price: '$7,900',
        description: 'A terrifyingly thin, towering framework of blackened steel meant to display only the most essential objects.',
        colorTone: '#222222',
    },
    {
        id: 'vortessa-012',
        slug: 'nucleus-stool',
        name: 'Nucleus Stool',
        material: 'Solid Titanium',
        price: '$4,500',
        description: 'A perfectly lathed cylinder of solid titanium, cold to the touch and virtually indestructible.',
        colorTone: '#b5b9bd',
    },
];

/** Stable URL for a product detail page. */
export function getProductPath(productOrSlug) {
    const slug =
        typeof productOrSlug === 'string' ? productOrSlug : productOrSlug?.slug;
    if (!slug) return '/shop';
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
