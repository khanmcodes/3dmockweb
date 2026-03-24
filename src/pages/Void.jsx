import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Void.css';

const Scene3D = lazy(() => import('../components/Scene3D'));

export default function Void() {
    const navigate = useNavigate();

    return (
        <PageTransition className="void page">
            <div className="void__scene" aria-hidden>
                <Suspense fallback={<div className="void__scene-placeholder" aria-hidden />}>
                    <Scene3D variant="void" />
                </Suspense>
            </div>
            <div className="void__vignette" aria-hidden />
            <div className="void__content">
                <motion.p
                    className="void__eyebrow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    Studio Vortessa
                </motion.p>
                <motion.h1
                    className="void__title"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    Furniture
                </motion.h1>
                <motion.p
                    className="void__sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.65 }}
                >
                    Sculptural forms for considered spaces.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <button
                        type="button"
                        className="void__enter"
                        onClick={() => navigate('/shop')}
                        aria-label="Enter catalog"
                    >
                        <span className="void__enter-text">Enter</span>
                    </button>
                </motion.div>
            </div>
        </PageTransition>
    );
}
