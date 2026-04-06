import { motion as Motion } from 'framer-motion';

const easeCinematic = [0.16, 1, 0.3, 1];

/**
 * Page shell — initial={false} by default so first paint is never stuck at opacity:0.
 * `cinematic`: smooth enter (opacity, lift, gentle blur resolve) for route transitions.
 */
export default function PageTransition({ children, className = '', cinematic = false }) {
    if (!cinematic) {
        return (
            <Motion.div
                className={className}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </Motion.div>
        );
    }

    return (
        <Motion.div
            className={className}
            initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
                duration: 1.05,
                ease: easeCinematic,
                opacity: { duration: 1.1, ease: easeCinematic },
                y: { duration: 1, ease: easeCinematic },
                filter: { duration: 0.75, ease: easeCinematic },
            }}
        >
            {children}
        </Motion.div>
    );
}
