import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import Gallery from '../sections/Gallery';
import Materials from '../sections/Materials';
import Closing from '../sections/Closing';
import PageTransition from '../components/PageTransition';

export default function Landing() {
    return (
        <PageTransition className="page landing-page">
            <Hero />
            <Philosophy />
            <Gallery />
            <Materials />
            <Closing />
        </PageTransition>
    );
}
