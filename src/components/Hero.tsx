
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-16">
      <div className="absolute inset-0 bg-pattern opacity-50 z-0"></div>
      <div className="container relative z-10 px-4 py-32 sm:py-48 lg:py-56">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
            <span className="block">
              The{" "}
              <span className="gradient-text">
                Deep Learning Revolution
              </span>
            </span>
            <span className="block">in AI-Driven Fashion</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
            Connecting Indian fashion designers, customers, and skilled tailors
            on a single platform. Experience personalized fashion that celebrates
            your uniqueness through AI-powered style recommendations and custom
            designs.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90 transition-opacity"
            >
              <Link to="/discover">Discover Designers</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/ai-stylist">
                Try AI Stylist{" "}
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-96 bg-gradient-to-bl from-fashion-purple/20 to-fashion-gold/20 rounded-l-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Hero;
