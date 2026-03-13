import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Header from './components/Header';

import Landing from './pages/Landing';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

export default function App() {
  // Initialize smooth scrolling context globally
  useLenis();

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Persistent cinematic overlays & layout */}
      <CustomCursor />
      <GrainOverlay />
      <Header />
      
      <main className="main-content">
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
