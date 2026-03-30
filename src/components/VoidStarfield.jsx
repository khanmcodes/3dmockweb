import { useMemo } from 'react';

/** Deterministic star positions (no Math.random) for Void entrance backdrop */
export default function VoidStarfield({ reduceMotion = false }) {
    const stars = useMemo(() => {
        const out = [];
        for (let i = 0; i < 200; i++) {
            const x = ((i * 137.508) % 10000) / 100;
            const y = ((i * 211.337 + 29.17) % 10000) / 100;
            const r = 0.35 + ((i * 17) % 10) * 0.12;
            const baseOpacity = 0.18 + ((i * 31) % 45) / 100;
            const twinkle = i % 5 !== 0;
            const period = 3.2 + ((i * 13) % 18) / 10;
            const delay = ((i * 0.11) % 4) + ((i % 7) * 0.09);
            out.push({ x, y, r, baseOpacity, twinkle, period, delay });
        }
        return out;
    }, []);

    return (
        <svg
            className="pointer-events-none absolute inset-0 h-full min-h-dvh w-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
        >
            <rect width="100%" height="100%" className="fill-bg" />
            {stars.map((s, i) => (
                <circle
                    key={i}
                    cx={`${s.x}%`}
                    cy={`${s.y}%`}
                    r={s.r}
                    fill="#e8eaf0"
                    opacity={s.twinkle && !reduceMotion ? undefined : s.baseOpacity}
                    style={
                        s.twinkle && !reduceMotion
                            ? {
                                  animation: `voidStarTwinkle ${s.period}s ease-in-out infinite`,
                                  animationDelay: `${s.delay}s`,
                              }
                            : undefined
                    }
                />
            ))}
        </svg>
    );
}
