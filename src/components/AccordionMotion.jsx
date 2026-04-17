import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Smooth height open/close using measured px (browser cannot interpolate to `auto`).
 */
export default function AccordionMotion({ open, id, className, children }) {
    const innerRef = useRef(null);
    const [height, setHeight] = useState(0);
    const reduced = useReducedMotion();

    useLayoutEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        const measure = () => setHeight(el.scrollHeight);

        if (!open) {
            setHeight(0);
            return;
        }

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [open, children]);

    return (
        <motion.div
            id={id}
            className={className}
            initial={false}
            animate={
                reduced
                    ? { height: open ? 'auto' : 0, opacity: open ? 1 : 0 }
                    : { height: open ? height : 0, opacity: open ? 1 : 0 }
            }
            transition={
                reduced
                    ? { duration: 0.15 }
                    : {
                          height: { duration: 0.42, ease: [0.25, 0.1, 0.25, 1] },
                          opacity: { duration: 0.2, ease: 'easeOut' },
                      }
            }
            style={{ overflow: 'hidden' }}
            aria-hidden={!open}
        >
            <div ref={innerRef}>{children}</div>
        </motion.div>
    );
}
