
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <h1 className="text-4xl font-bold mb-8">
          About <span className="gradient-text">Neural Threads</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Neural Threads & Cognitive Couture: The Deep Learning Revolution in AI-Driven Fashion
        </p>
        <div className="prose max-w-4xl">
          <p className="text-lg mb-6">
            Our platform seamlessly connects Indian fashion designers, customers, and skilled tailors, 
            offering a personalized and inclusive fashion experience. We enable designers to showcase their portfolios, 
            customers to collaborate on custom designs, and tailors to ensure perfect fits.
          </p>
          <p className="text-lg mb-6">
            With multilingual support and an AI-powered styling assistant that considers individual body characteristics, 
            we're revolutionizing the fashion design and creation process in India.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="text-lg">
            We aim to address the gap in India's fashion landscape by creating accessible and collaborative custom clothing options, 
            empowering emerging designers, utilizing local tailors, and providing personalized solutions for customers.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
