
import { Card, CardContent } from "@/components/ui/card";
import { 
  Paintbrush, 
  Users, 
  Scissors, 
  MessageSquare
} from "lucide-react";

const features = [
  {
    title: "Discover Designers",
    description:
      "Find and connect with talented Indian fashion designers, browse their portfolios, and collaborate on your dream outfit.",
    icon: Paintbrush,
  },
  {
    title: "Personalized Styling",
    description:
      "Our AI styling assistant considers your body type, preferences, and occasion to provide tailored fashion recommendations.",
    icon: Users,
  },
  {
    title: "Hyperlocal Tailor Network",
    description:
      "Connect with skilled tailors in your area who can bring your custom designs to life with perfect measurements.",
    icon: Scissors,
  },
  {
    title: "One-on-One Consultations",
    description:
      "Chat directly with designers to discuss your vision, receive guidance, and create truly unique pieces.",
    icon: MessageSquare,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-muted" id="features">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Fashion <span className="gradient-text">Reimagined</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform bridges the gap between traditional craftsmanship and modern technology,
            creating a seamless experience for everyone involved in the fashion journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-fashion-purple to-fashion-pink flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
