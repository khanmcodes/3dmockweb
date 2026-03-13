import Hero from '../sections/Hero';
import Philosophy from '../sections/Philosophy';
import Gallery from '../sections/Gallery';
import Materials from '../sections/Materials';
import Closing from '../sections/Closing';

export default function Landing() {
    return (
        <div className="page landing-page">
            <Hero />
            <Philosophy />
            <Gallery />
            <Materials />
            <Closing />
        </div>
    );
}
