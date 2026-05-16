import { createElement } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AccordionMotion from './AccordionMotion';

const easeView = [0.22, 1, 0.36, 1];

const THEMES = {
    light: {
        article: (open) =>
            open ? 'border-black/18' : 'border-black/10 hover:border-black/16',
        button: 'focus-visible:ring-black/20',
        iconWrap: (open) => (open ? 'border-black/15' : 'border-black/10'),
        iconColor: 'text-[#2d2d2d]',
        title: 'text-[#171717]',
        teaser: 'text-[#666664]',
        chevronWrap: (open) =>
            open ? 'border-black/15 bg-black/3' : 'border-black/10',
        chevronColor: 'text-[#242424]',
        panelDivider: 'border-black/8',
        imageFrame: 'border-black/8',
        imageOverlay:
            'bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(25,25,25,0.14))]',
    },
    dark: {
        article: (open) =>
            open ? 'border-border/50' : 'border-border/25 hover:border-border/40',
        button: 'focus-visible:ring-accent-gold/35',
        iconWrap: (open) => (open ? 'border-border/45 bg-white/4' : 'border-border/30'),
        iconColor: 'text-text/85',
        title: 'text-text',
        teaser: 'text-muted',
        chevronWrap: (open) =>
            open ? 'border-border/45 bg-white/4' : 'border-border/30',
        chevronColor: 'text-text/80',
        panelDivider: 'border-border/25',
        imageFrame: 'border-border/30',
        imageOverlay:
            'bg-[linear-gradient(160deg,rgba(255,255,255,0.04),rgba(0,0,0,0.35))]',
    },
};

/** Shared accordion chrome — panel copy is passed as children. */
export default function AccordionRow({
    sectionId,
    expandedIds,
    onToggle,
    title,
    teaser,
    icon,
    imageSrc,
    imageAlt,
    variant = 'light',
    children,
}) {
    const isExpanded = expandedIds.has(sectionId);
    const panelId = `${sectionId}-panel`;
    const theme = THEMES[variant] ?? THEMES.light;

    return (
        <Motion.article
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.5, ease: easeView }}
            className={`overflow-hidden rounded-[24px] border transition-[border-color] duration-200 ${theme.article(isExpanded)}`}
        >
            <button
                type="button"
                onClick={() => onToggle(sectionId)}
                className={`no-cursor-magnetic group flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 md:px-6 md:py-5 ${theme.button}`}
                aria-expanded={isExpanded}
                aria-controls={panelId}
            >
                <div className="flex min-w-0 items-start gap-3.5">
                    <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-[border-color,background-color] duration-200 ${theme.iconWrap(isExpanded)} ${theme.iconColor}`}
                    >
                        {createElement(icon, { size: 17, strokeWidth: 1.8 })}
                    </span>
                    <div className="min-w-0">
                        <h3
                            className={`truncate font-sans text-[1.08rem] font-medium tracking-tight md:text-[1.22rem] ${theme.title}`}
                        >
                            {title}
                        </h3>
                        {!isExpanded ? (
                            <p
                                className={`mt-1.5 line-clamp-1 max-w-2xl font-sans text-[0.84rem] font-normal md:text-[0.88rem] ${theme.teaser}`}
                            >
                                {teaser}
                            </p>
                        ) : null}
                    </div>
                </div>
                <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-[border-color,background-color] duration-200 ${theme.chevronWrap(isExpanded)} ${theme.chevronColor}`}
                >
                    <ChevronDown
                        size={18}
                        strokeWidth={1.9}
                        className={`transition-transform duration-200 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </span>
            </button>

            <AccordionMotion open={isExpanded} id={panelId} className="px-5 md:px-6">
                <div
                    className={`grid gap-5 border-t py-5 md:grid-cols-12 md:items-start md:gap-8 md:py-6 ${theme.panelDivider}`}
                >
                    <div className="group relative md:col-span-5">
                        <div
                            className={`relative aspect-4/3 overflow-hidden rounded-[20px] border ${theme.imageFrame}`}
                        >
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="h-full w-full object-cover brightness-[0.98] contrast-[1.03] saturate-[0.95] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                loading="lazy"
                            />
                            <div
                                className={`pointer-events-none absolute inset-0 ${theme.imageOverlay}`}
                                aria-hidden
                            />
                        </div>
                    </div>
                    <div className="min-w-0 md:col-span-7">{children}</div>
                </div>
            </AccordionMotion>
        </Motion.article>
    );
}
