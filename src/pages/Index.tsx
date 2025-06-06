
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import StatsSection from "@/components/StatsSection";
import DesignerShowcase from "@/components/DesignerShowcase";
import AiStylistPreview from "@/components/AiStylistPreview";
import TailorNetwork from "@/components/TailorNetwork";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LoadingScreen from "@/components/LoadingScreen";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen on first visit
    const hasVisited = localStorage.getItem('hasVisitedNeuralThreads');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    localStorage.setItem('hasVisitedNeuralThreads', 'true');
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main>
        <Hero />
        <FeatureSection />
        <StatsSection />
        <DesignerShowcase />
        <AiStylistPreview />
        <TailorNetwork />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <QuickActions />
    </div>
  );
};

export default Index;
