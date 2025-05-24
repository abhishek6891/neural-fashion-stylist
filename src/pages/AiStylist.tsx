
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiStylistChat from "@/components/AiStylistChat";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const AiStylist = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main className="pt-32 pb-24 container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            AI <span className="gradient-text">Fashion Stylist</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized fashion advice and outfit suggestions from our AI stylist. 
            Describe your style preferences and get visual recommendations instantly!
          </p>
        </div>
        
        <AiStylistChat />
      </main>
      <Footer />
    </div>
  );
};

export default AiStylist;
