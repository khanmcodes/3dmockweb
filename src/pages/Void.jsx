import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { catalogImagePath } from '../data/products';
import './Void.css';

const Scene3D = lazy(() => import('../components/Scene3D'));

const MOSAIC = [
    catalogImagePath('diningtable.png'),
    catalogImagePath('chair.png'),
    catalogImagePath('coffeetable.png'),
    catalogImagePath('sidetable2.png'),
    catalogImagePath('loungebed.png'),
    catalogImagePath('workdesk.png'),
];

const VIDEO_SRC = encodeURI('/VORTESSAWEB Material/PICTURES.jpg/Untitled design.mp4');

export default function Void() {
    const navigate = useNavigate();
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => setReduceMotion(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    return (
        <PageTransition className="void page">
            <div className="void__backdrop" aria-hidden>
                <div className="void__mosaic">
                    {MOSAIC.map((src, i) => (
                        <div key={`void-mosaic-${i}`} className={`void__mosaic-cell void__mosaic-cell--${i}`}>
                            <img src={src} alt="" />
                        </div>
                    ))}
                </div>
                {!reduceMotion ? (
                    <video
                        className="void__video"
                        src={VIDEO_SRC}
                        muted
                        playsInline
                        autoPlay
                        loop
                        aria-hidden
                    />
                ) : null}
                <div className="void__scene-ghost" aria-hidden>
                    <Suspense fallback={null}>
                        <Scene3D variant="void" />
                    </Suspense>
                </div>
                <div className="void__scrim" />
                <div className="void__vignette" />
            </div>

            <div className="void__chrome">
                <span className="void__chrome-line void__chrome-line--top" />
                <span className="void__chrome-line void__chrome-line--left" />
            </div>

            <div className="void__content void__content--split">
                <div className="void__col void__col--primary">
                    <motion.p
                        className="void__eyebrow"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Studio Vortessa
                    </motion.p>
                    <motion.h1
                        className="void__title"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Sculptural
                        <br />
                        furniture
                    </motion.h1>
                    <motion.div
                        className="void__cta-row"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <button
                            type="button"
                            className="void__enter"
                            onClick={() => navigate('/catalog')}
                            aria-label="Open catalog"
                        >
                            <span className="void__enter-text">Catalog</span>
                        </button>
                        <Link to="/about" className="void__secondary-link label">
                            About the studio
                        </Link>
                    </motion.div>
                </div>

                <div className="void__col void__col--secondary">
                    <motion.p
                        className="void__sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Limited finishes in graphite, silver, and deep black — tables, seating, and
                        objects machined like instruments. Each piece is photographed here in its
                        true material so you see weight, reflection, and edge.
                    </motion.p>
                    <motion.div
                        className="void__accent-line"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        style={{ transformOrigin: 'left center' }}
                        transition={{ duration: 1.1, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    />
                    <motion.p
                        className="void__tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.85 }}
                    >
                        Steel. Stone. Upholstery.
                        <span className="void__tagline-gold"> Bronze detail.</span>
                    </motion.p>
                </div>
            </div>
        </PageTransition>
    );
}
