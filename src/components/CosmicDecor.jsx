import { useId } from 'react';

/** Soft star clusters + faint constellations — no cool / blue cast */
export function CosmicBackdrop({ className = '' }) {
    const id = useId().replace(/:/g, '');
    const glow = `star-glow-${id}`;

    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            aria-hidden
        >
            <svg
                className="absolute inset-0 h-full w-full opacity-[0.55]"
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <radialGradient id={glow} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#f5f0e6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#2a2a2d" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="72" cy="310" r="28" fill={`url(#${glow})`} />
                <circle cx="340" cy="96" r="18" fill={`url(#${glow})`} opacity="0.7" />
                <circle cx="280" cy="280" r="12" fill={`url(#${glow})`} opacity="0.5" />

                <g fill="#f2efe8" opacity="0.9">
                    <circle cx="40" cy="120" r="0.9" />
                    <circle cx="58" cy="108" r="0.5" />
                    <circle cx="88" cy="132" r="0.7" />
                    <circle cx="120" cy="96" r="0.45" />
                    <circle cx="155" cy="118" r="0.85" />
                    <circle cx="190" cy="78" r="0.5" />
                    <circle cx="220" cy="105" r="0.65" />
                    <circle cx="48" cy="200" r="0.55" />
                    <circle cx="95" cy="228" r="0.4" />
                    <circle cx="130" cy="255" r="0.75" />
                    <circle cx="175" cy="290" r="0.5" />
                    <circle cx="210" cy="318" r="0.6" />
                    <circle cx="250" cy="340" r="0.45" />
                    <circle cx="300" cy="48" r="0.7" />
                    <circle cx="355" cy="155" r="0.5" />
                    <circle cx="320" cy="200" r="0.85" />
                    <circle cx="368" cy="240" r="0.45" />
                    <circle cx="92" cy="320" r="0.55" />
                    <circle cx="145" cy="355" r="0.4" />
                </g>
                <g fill="#dfc895" opacity="0.85">
                    <circle cx="65" cy="145" r="0.65" />
                    <circle cx="200" cy="42" r="0.5" />
                    <circle cx="332" cy="128" r="0.7" />
                    <circle cx="285" cy="320" r="0.45" />
                    <circle cx="118" cy="288" r="0.55" />
                </g>
                <g stroke="rgba(230, 210, 175, 0.2)" strokeWidth="0.35" fill="none" opacity="0.9">
                    <path d="M 58 108 L 88 132 L 120 96" />
                    <path d="M 300 48 L 332 128 L 320 200" />
                    <path d="M 130 255 L 175 290 L 210 318" />
                </g>
            </svg>
        </div>
    );
}

/** Dashed orbits + star pin — warm metal only */
export function CosmicHeroMarks({ className = '' }) {
    const id = useId().replace(/:/g, '');
    const gid = `orbit-${id}`;

    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            aria-hidden
        >
            <svg
                className="absolute right-[4%] top-[20%] h-32 w-32 opacity-[0.22] md:right-[8%] md:top-[24%] md:h-44 md:w-44"
                viewBox="0 0 120 120"
            >
                <defs>
                    <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e6c98a" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#c4c2bc" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                <circle
                    cx="60"
                    cy="60"
                    r="38"
                    fill="none"
                    stroke={`url(#${gid})`}
                    strokeWidth="0.5"
                    strokeDasharray="4 6"
                />
                <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="rgba(235, 233, 228, 0.14)"
                    strokeWidth="0.4"
                />
                <circle cx="60" cy="60" r="2.2" fill="rgba(230, 201, 138, 0.65)" />
                <path
                    d="M 60 56 L 60 64 M 56 60 L 64 60"
                    stroke="rgba(255,252,248,0.5)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                />
            </svg>
            <svg
                className="absolute bottom-[12%] left-[6%] h-20 w-20 opacity-[0.16] md:bottom-[16%] md:left-[10%]"
                viewBox="0 0 80 80"
            >
                <circle cx="40" cy="40" r="22" fill="none" stroke="rgba(230, 210, 175, 0.18)" strokeWidth="0.45" />
                <circle cx="40" cy="40" r="5" fill="rgba(242, 239, 232, 0.2)" />
                <circle cx="40" cy="40" r="1.2" fill="#f5f3ee" />
            </svg>
        </div>
    );
}

/** Small orbit mark — reads as a distant body + path */
export function CosmicMark({ className = '' }) {
    return (
        <svg
            className={className}
            width="22"
            height="22"
            viewBox="0 0 32 32"
            aria-hidden
        >
            <circle cx="14" cy="16" r="5" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
            <circle cx="14" cy="16" r="2.2" fill="currentColor" fillOpacity="0.55" />
            <path
                d="M 6 20 Q 16 26 26 18"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="0.9"
                strokeLinecap="round"
            />
        </svg>
    );
}
