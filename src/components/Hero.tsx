
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-16">
      <div className="absolute inset-0 bg-pattern opacity-50 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-fashion-purple/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-fashion-pink/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-fashion-gold/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <div className="container relative z-10 px-4 py-32 sm:py-48 lg:py-56">
        <div className="max-w-4xl">
          <div className="animate-fade-in">
            <div className="inline-flex items-center rounded-full bg-fashion-purple/10 px-3 py-1 text-sm font-medium text-fashion-purple ring-1 ring-inset ring-fashion-purple/20 mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Fashion Platform
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-8">
              <span className="block animate-slide-in-left">
                The{" "}
                <span className="gradient-text">
                  Deep Learning Revolution
                </span>
              </span>
              <span className="block animate-slide-in-right animation-delay-300">in AI-Driven Fashion</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl animate-fade-in animation-delay-500">
              Connecting Indian fashion designers, customers, and skilled tailors
              on a single platform. Experience personalized fashion that celebrates
              your uniqueness through AI-powered style recommendations and custom
              designs.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-in animation-delay-700">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90 transition-all duration-300 hover:scale-105 group"
              >
                <Link to="/discover" className="flex items-center">
                  Discover Designers
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-fashion-purple text-fashion-purple hover:bg-fashion-purple hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Link to="/ai-stylist" className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try AI Stylist
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 animate-fade-in animation-delay-1000">
              <p className="text-sm text-muted-foreground mb-4">Trusted by fashion enthusiasts across India</p>
              <div className="flex items-center space-x-6 opacity-60">
                <div className="text-sm font-medium">2500+ Customers</div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                <div className="text-sm font-medium">150+ Designers</div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                <div className="text-sm font-medium">500+ Tailors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced background gradient */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-96 bg-gradient-to-bl from-fashion-purple/20 via-fashion-pink/15 to-fashion-gold/20 rounded-l-full blur-3xl -z-10 animate-pulse"></div>
    </div>
  );
};

export default Hero;
