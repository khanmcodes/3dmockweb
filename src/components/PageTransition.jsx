import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.98,
    },
    enter: {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.19, 1.0, 0.22, 1.0], // Cinematic slow-out
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        filter: 'blur(5px)',
        transition: {
            duration: 0.6,
            ease: [0.8, 0.0, 0.2, 1.0]
        }
    }
};

export default function PageTransition({ children, className = '' }) {
    return (
        <motion.div
            className={className}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
        >
            {children}
        </motion.div>
    );
}
