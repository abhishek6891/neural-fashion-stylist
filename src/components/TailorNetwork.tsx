
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const TailorNetwork = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -z-10 -top-10 -left-10 w-full h-full bg-fashion-gold/10 rounded-xl"></div>
              
              <div className="relative rounded-xl overflow-hidden border border-border shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1590401549336-6ab494104e26?w=800&auto=format&fit=crop&q=60" 
                  alt="Tailor working" 
                  className="w-full h-80 object-cover object-center"
                />
                
                <div className="bg-white p-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"].map((city) => (
                      <div key={city} className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {city}
                      </div>
                    ))}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="text-fashion-purple">+120 more cities</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div 
                          key={item} 
                          className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                        ></div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-fashion-purple/20 border-2 border-white flex items-center justify-center text-xs font-medium">
                        240+
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Tailors in our growing network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">
              Hyperlocal <span className="gradient-text">Tailor Network</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We connect you with skilled local tailors who can bring your custom designs to life with precision.
              Our network spans across India, ensuring quality craftsmanship is always within reach.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-fashion-purple/10 flex items-center justify-center text-fashion-purple shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-1">Design Your Outfit</h3>
                  <p className="text-muted-foreground">
                    Work with designers or use our AI tools to create your perfect outfit
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-fashion-pink/10 flex items-center justify-center text-fashion-pink shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-1">Find Local Tailors</h3>
                  <p className="text-muted-foreground">
                    Browse our verified network of skilled tailors in your area
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-fashion-gold/10 flex items-center justify-center text-fashion-gold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-1">Perfect Fit Guarantee</h3>
                  <p className="text-muted-foreground">
                    Get measured and enjoy a perfect fit with our satisfaction guarantee
                  </p>
                </div>
              </div>
            </div>
            
            <Button asChild className="bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90">
              <Link to="/tailors">Find Tailors Near You</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TailorNetwork;
