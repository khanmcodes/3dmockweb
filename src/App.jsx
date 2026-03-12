import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Gallery from './sections/Gallery';
import Materials from './sections/Materials';
import Closing from './sections/Closing';

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <main>
        <Hero />
        <Philosophy />
        <Gallery />
        <Materials />
        <Closing />
      </main>
    </>
  );
}
