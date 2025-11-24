import Hero from "../components/landing/Hero";
import SocialProof from "../components/landing/SocialProof";
import FeatureGrid from "../components/landing/FeatureGrid";
import Showcase from "../components/landing/Showcase";
import AIDemoSection from "../components/landing/AIDemoSection";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-dark-bg-primary text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <FeatureGrid />
        <Showcase />
        <AIDemoSection />
      </main>
      <Footer />
    </div>
  );
}
