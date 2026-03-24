import { motion } from 'framer-motion';

/**
 * Page shell — initial={false} so first paint is never stuck at opacity:0.
 * No blur (expensive) or long fades.
 */
export default function PageTransition({ children, className = '' }) {
    return (
        <motion.div
            className={className}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
