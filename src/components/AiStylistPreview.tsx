
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

const AiStylistPreview = () => {
  const [selectedStyle, setSelectedStyle] = useState("Casual");
  const [selectedOccasion, setSelectedOccasion] = useState("Office Meeting");

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
                {[1, 2, 3].map((item) => (
                  <div key={item} className="aspect-square bg-muted rounded-md animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiStylistPreview;
