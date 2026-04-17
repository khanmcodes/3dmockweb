/**
 * Layout wrapper for page-level classes. Route enter/exit is handled globally in App
 * (AnimatePresence) so transitions stay one smooth crossfade without stacking motion.
 */
export default function PageTransition({ children, className = '' }) {
    return <div className={className}>{children}</div>;
}
