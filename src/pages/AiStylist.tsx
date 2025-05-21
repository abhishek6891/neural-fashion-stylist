
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AiStylist = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <h1 className="text-4xl font-bold mb-8">
          AI <span className="gradient-text">Style Assistant</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Coming soon - Get personalized style recommendations based on your body type and preferences
        </p>
        <div className="w-full max-w-3xl mx-auto h-96 bg-muted rounded-lg animate-pulse"></div>
      </main>
      <Footer />
    </div>
  );
};

export default AiStylist;
