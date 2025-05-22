
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const styles = [
  { name: "Casual", icon: "👕" },
  { name: "Formal", icon: "👔" },
  { name: "Festive", icon: "✨" },
  { name: "Wedding", icon: "💍" },
];

const occasions = [
  "Office Meeting", 
  "Wedding Reception", 
  "Beach Vacation", 
  "Festival Celebration"
];

// Fashion image mapping simplified version
const previewImages = {
  Casual: {
    "Office Meeting": "https://images.unsplash.com/photo-1485218126466-34e6392ec754?w=800&auto=format&fit=crop&q=60",
    "Beach Vacation": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60",
    "Festival Celebration": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60",
    "Wedding Reception": "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?w=800&auto=format&fit=crop&q=60"
  },
  Formal: {
    "Office Meeting": "https://images.unsplash.com/photo-1580207646504-f2f11138a25b?w=800&auto=format&fit=crop&q=60",
    "Wedding Reception": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=60",
    "Beach Vacation": "https://images.unsplash.com/photo-1601046668428-94ea13437736?w=800&auto=format&fit=crop&q=60",
    "Festival Celebration": "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?w=800&auto=format&fit=crop&q=60"
  },
  Festive: {
    "Office Meeting": "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=800&auto=format&fit=crop&q=60",
    "Wedding Reception": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
    "Beach Vacation": "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=800&auto=format&fit=crop&q=60",
    "Festival Celebration": "https://images.unsplash.com/photo-1614093302611-8efc4de12547?w=800&auto=format&fit=crop&q=60"
  },
  Wedding: {
    "Office Meeting": "https://images.unsplash.com/photo-1597983073493-088dcad8e8ba?w=800&auto=format&fit=crop&q=60",
    "Wedding Reception": "https://images.unsplash.com/photo-1549062573-edc78a53ffa6?w=800&auto=format&fit=crop&q=60",
    "Beach Vacation": "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&auto=format&fit=crop&q=60",
    "Festival Celebration": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=60"
  }
};

const AiStylistPreview = () => {
  const [selectedStyle, setSelectedStyle] = useState("Casual");
  const [selectedOccasion, setSelectedOccasion] = useState("Office Meeting");

  // Get appropriate image based on style and occasion
  const getPreviewImage = (style: string, occasion: string): string => {
    return previewImages[style as keyof typeof previewImages]?.[occasion as keyof typeof previewImages[keyof typeof previewImages]] || 
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60";
  };

  return (
    <section className="py-24 bg-gradient-to-br from-fashion-purple/5 to-fashion-pink/5">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Your Personal <span className="gradient-text">AI Stylist</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI-powered styling assistant analyzes your body type, preferences, 
              and occasion to suggest perfectly tailored outfits that match your unique style.
            </p>
            
            <Card className="mb-8 border border-fashion-purple/20">
              <CardHeader>
                <CardTitle>Try a quick style recommendation</CardTitle>
                <CardDescription>
                  Select your style preference and occasion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Style Preference</h4>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <Button
                        key={style.name}
                        variant={selectedStyle === style.name ? "default" : "outline"}
                        onClick={() => setSelectedStyle(style.name)}
                        className={
                          selectedStyle === style.name
                            ? "bg-fashion-purple hover:bg-fashion-purple/90"
                            : ""
                        }
                      >
                        <span className="mr-1">{style.icon}</span> {style.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Occasion</h4>
                  <Tabs defaultValue="Office Meeting" onValueChange={setSelectedOccasion}>
                    <TabsList className="grid grid-cols-2 md:grid-cols-4">
                      {occasions.map((occasion) => (
                        <TabsTrigger key={occasion} value={occasion}>
                          {occasion}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90"
                  asChild
                >
                  <Link to="/ai-stylist">Get Full AI Style Analysis</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <div className="flex justify-center md:justify-start">
              <Button variant="outline" asChild>
                <Link to="/ai-stylist">
                  Learn more about our AI stylist
                  <span aria-hidden="true" className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-fashion-pink/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-fashion-purple/10 rounded-full blur-3xl"></div>
            
            <div className="relative bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fashion-purple to-fashion-pink flex items-center justify-center text-white">
                  AI
                </div>
                <div>
                  <h3 className="font-medium">Neural Stylist</h3>
                  <p className="text-xs text-muted-foreground">AI-Powered Recommendations</p>
                </div>
              </div>
              
              <div className="py-4 px-5 rounded-lg bg-muted mb-4">
                <p className="italic text-sm">
                  "For a {selectedOccasion.toLowerCase()} with a {selectedStyle.toLowerCase()} style,
                  I'd recommend a {selectedStyle === "Formal" ? "tailored ensemble with clean lines" : 
                  selectedStyle === "Festive" ? "vibrant outfit with traditional embellishments" :
                  selectedStyle === "Wedding" ? "elegant attire with intricate details" : 
                  "comfortable yet stylish outfit"}. This would perfectly suit your body type and personal preferences."
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={getPreviewImage(selectedStyle, selectedOccasion)} 
                    alt={`${selectedStyle} outfit for ${selectedOccasion}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={getPreviewImage(
                      selectedStyle === "Wedding" ? "Formal" : selectedStyle === "Formal" ? "Wedding" : "Festive", 
                      selectedOccasion
                    )} 
                    alt="Style suggestion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={getPreviewImage(
                      selectedStyle, 
                      selectedOccasion === "Office Meeting" ? "Wedding Reception" : "Office Meeting"
                    )} 
                    alt="Style suggestion"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button size="sm" variant="outline" asChild>
                  <Link to="/ai-stylist">
                    Get full recommendation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiStylistPreview;
