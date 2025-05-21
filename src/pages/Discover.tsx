
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Discover = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <h1 className="text-4xl font-bold mb-8">
          Discover <span className="gradient-text">Designers</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Coming soon - Connect with talented fashion designers from across India
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
