import { Handshake, Landmark, MessageSquareText } from 'lucide-react';

function picPath(filename) {
    const normalized = filename.startsWith('(') ? ` ${filename}` : filename;
    return encodeURI(`/VORTESSAWEB Material/PICTURES.jpg/${normalized}`);
}

export const CONTACT_HERO_IMAGE = {
    src: picPath('(10).webp'),
    alt: 'Desk scene with materials and design sketches',
};

export const CONTACT_INQUIRIES = [
    {
        id: 'discuss-project',
        index: '01',
        title: 'Discuss a project',
        tagline: 'Shape the vision',
        teaser: 'Share scope, timeline, and space — we respond with care.',
        description:
            'Tell us what you are building. We review scope, spatial intent, and references to understand how Studio Vortessa can enter the room.',
        subject: 'Project discussion',
        image: picPath('(2).webp'),
        imageAlt: 'Desk scene with materials and design sketches',
        icon: MessageSquareText,
        messagePlaceholder:
            'Describe your project — scope, timeline, intended space, and any references that guide the vision…',
        prompts: ['Scope & intent', 'Timeline', 'Spatial context'],
    },
    {
        id: 'furniture-inquiries',
        index: '02',
        title: 'Furniture inquiries',
        tagline: 'From the collection',
        teaser: 'Pricing, materials, availability, and bespoke variations.',
        description:
            'For pieces from the Studio Vortessa collection — finishes, lead times, and bespoke adaptations tailored to your interior.',
        subject: 'Furniture inquiry',
        image: picPath('(5).webp'),
        imageAlt: 'Sculptural furniture detail with premium materials',
        icon: Landmark,
        messagePlaceholder:
            'Which piece interests you? Note materials, dimensions, or bespoke variations you are considering…',
        prompts: ['Piece or collection', 'Materials & finish', 'Availability'],
    },
    {
        id: 'commissions-collaborations',
        index: '03',
        title: 'Commissions & collaborations',
        tagline: 'Built together',
        teaser: 'Architecture, hospitality, and sculptural installations.',
        description:
            'For architectural partnerships, hospitality environments, and custom sculptural installations developed in collaboration with the studio.',
        subject: 'Commission / collaboration',
        image: picPath('(6).webp'),
        imageAlt: 'Collaborative design moodboard in neutral tones',
        icon: Handshake,
        messagePlaceholder:
            'Share the collaboration context — project type, location, scale, and how you envision working with the studio…',
        prompts: ['Project type', 'Location & scale', 'Collaboration model'],
    },
];

const inquiryById = Object.fromEntries(CONTACT_INQUIRIES.map((item) => [item.id, item]));

export function getInquiryById(id) {
    return inquiryById[id] ?? CONTACT_INQUIRIES[0];
}

export function resolveInquiryId(inquiryParam, hasPiece) {
    if (inquiryParam && inquiryById[inquiryParam]) return inquiryParam;
    if (hasPiece) return 'furniture-inquiries';
    return CONTACT_INQUIRIES[0].id;
}
