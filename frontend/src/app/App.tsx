import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedEvents } from './components/FeaturedEvents';
import { Categories } from './components/Categories';
import { ComingSoon } from './components/ComingSoon';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedEvents />
        <Categories />
        <ComingSoon />
        <TrustSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}