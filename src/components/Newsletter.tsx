
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-fashion-purple/5 to-fashion-pink/5 border-fashion-purple/20">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-fashion-purple to-fashion-pink mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              Stay in <span className="gradient-text">Style</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest fashion trends, designer spotlights, and exclusive offers delivered to your inbox.
            </p>
            
            {isSubscribed ? (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
