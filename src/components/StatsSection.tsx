
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Scissors, Palette, Star } from "lucide-react";

const StatsSection = () => {
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    {
      icon: Users,
      label: "Happy Customers",
      value: 2500,
      suffix: "+"
    },
    {
      icon: Palette,
      label: "Fashion Designers",
      value: 150,
      suffix: "+"
    },
    {
      icon: Scissors,
      label: "Skilled Tailors",
      value: 500,
      suffix: "+"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: 4.9,
      suffix: "/5"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.value / 50;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                current = stat.value;
                clearInterval(timer);
              }
              
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = current;
                return newCounters;
              });
            }, 30);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-r from-fashion-purple/10 via-fashion-pink/10 to-fashion-gold/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="gradient-text">Growing Community</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who have transformed their style with Neural Threads
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-fashion-purple to-fashion-pink mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.label === "Average Rating" 
                    ? counters[index].toFixed(1)
                    : Math.floor(counters[index])
                  }
                  <span className="text-lg">{stat.suffix}</span>
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
