
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiStylistChat from "@/components/AiStylistChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Upload, MessageCircle, Palette, Scissors, Users } from "lucide-react";

const AiStylist = () => {
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "Personalized Recommendations",
      description: "Get style suggestions based on your preferences, body type, and lifestyle."
    },
    {
      icon: <Upload className="h-8 w-8 text-pink-600" />,
      title: "Style Analysis",
      description: "Upload photos of your current wardrobe for AI-powered style analysis."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Interactive Chat",
      description: "Chat with our AI stylist for real-time fashion advice and styling tips."
    }
  ];

  const styleServices = [
    {
      icon: <Palette className="h-6 w-6 text-orange-500" />,
      title: "Color Coordination",
      description: "Expert advice on color palettes that complement your skin tone"
    },
    {
      icon: <Scissors className="h-6 w-6 text-red-500" />,
      title: "Custom Tailoring",
      description: "Connect with skilled tailors for perfect-fit clothing"
    },
    {
      icon: <Users className="h-6 w-6 text-yellow-600" />,
      title: "Personal Styling",
      description: "One-on-one consultations with professional stylists"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section with Fashion Illustration */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 rounded-3xl opacity-60"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  AI <span className="gradient-text">Fashion Stylist</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                  Get personalized fashion advice and style recommendations from our advanced AI stylist. 
                  Perfect your look with intelligent suggestions tailored just for you.
                </p>
                
                <Button 
                  onClick={() => setShowChat(true)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Styling Session
                </Button>
              </div>

              {/* Fashion Illustration */}
              <div className="relative">
                <div className="grid grid-cols-3 gap-4">
                  {/* Fashion Figure 1 */}
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
                      <div className="absolute bottom-2 left-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="text-xs font-medium text-center">Casual Chic</div>
                  </div>

                  {/* Fashion Figure 2 - Center */}
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow transform scale-110">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 bg-orange-400 rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="text-xs font-medium text-center">Business Style</div>
                  </div>

                  {/* Fashion Figure 3 */}
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
                      <div className="absolute top-2 left-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="text-xs font-medium text-center">Evening Wear</div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full animate-float"></div>
                <div className="absolute top-1/2 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute -bottom-4 left-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services Section */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Styling Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {styleServices.map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Styling Tips */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Styling Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Body Type Styling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn how to dress for your body type with AI-powered recommendations 
                    that enhance your best features and create a flattering silhouette.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Color Coordination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Discover color combinations that complement your skin tone and 
                    create harmonious outfits that make you look radiant.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Occasion Dressing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get specific outfit suggestions for any occasion, from casual 
                    weekends to formal events and professional meetings.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Trend Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay current with the latest fashion trends while maintaining 
                    your personal style with smart trend integration advice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {showChat && (
        <AiStylistChat 
          isOpen={showChat}
          onOpenChange={setShowChat}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default AiStylist;
