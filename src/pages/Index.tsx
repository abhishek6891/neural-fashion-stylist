
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import DesignerShowcase from "@/components/DesignerShowcase";
import AiStylistPreview from "@/components/AiStylistPreview";
import TailorNetwork from "@/components/TailorNetwork";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FashionShowcase from "@/components/FashionShowcase";

const Index = () => {
  return (
    <div className="min-h-screen flex">
      {/* Main content */}
      <div className="flex-1">
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
      
      {/* Fashion showcase sidebar */}
      <div className="hidden lg:block w-80 bg-gradient-to-b from-background to-muted/20 border-l p-4 overflow-y-auto">
        <FashionShowcase />
      </div>
    </div>
  );
};

export default Index;
