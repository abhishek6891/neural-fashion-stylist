
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import DesignerShowcase from "@/components/DesignerShowcase";
import AiStylistPreview from "@/components/AiStylistPreview";
import TailorNetwork from "@/components/TailorNetwork";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main>
        <Hero />
        <FeatureSection />
        <DesignerShowcase />
        <AiStylistPreview />
        <TailorNetwork />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
