
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Tailors = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <h1 className="text-4xl font-bold mb-8">
          Find <span className="gradient-text">Tailors</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Coming soon - Connect with skilled tailors in your local area
        </p>
        <div className="w-full h-96 bg-muted rounded-lg animate-pulse"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Tailors;
