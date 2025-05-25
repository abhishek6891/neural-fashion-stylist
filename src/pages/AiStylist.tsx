
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiStylistChat from "@/components/AiStylistChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Upload, MessageCircle } from "lucide-react";

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI <span className="gradient-text">Stylist</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
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

          {/* Example Styling Tips */}
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
