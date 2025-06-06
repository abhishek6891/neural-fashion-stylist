
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  MessageSquare, 
  Search, 
  Heart,
  Sparkles,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Search,
      label: "Discover",
      href: "/discover",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Sparkles,
      label: "AI Stylist",
      href: "/ai-stylist",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: MessageSquare,
      label: "Tailors",
      href: "/tailors",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: Heart,
      label: "Favorites",
      href: "#",
      color: "bg-pink-500 hover:bg-pink-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {actions.map((action, index) => (
            <div
              key={action.label}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Button
                asChild
                size="icon"
                className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12 rounded-full`}
              >
                <Link to={action.href} title={action.label}>
                  <action.icon className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-14 h-14 rounded-full"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default QuickActions;
