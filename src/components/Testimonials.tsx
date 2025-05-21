
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const testimonials = [
  {
    name: "Anjali Mehta",
    role: "Fashion Enthusiast",
    content: "Neural Threads connected me with an amazing designer who understood my vision perfectly. The AI style recommendations were spot on for my body type!",
    image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Rahul Kapoor",
    role: "Business Professional",
    content: "As someone who hates shopping, the AI stylist feature is a game-changer. I get perfect recommendations for my work meetings without any hassle.",
    image: "https://images.unsplash.com/photo-1582015752624-e8b1c8514eb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww",
  },
  {
    name: "Divya Sharma",
    role: "Wedding Planner",
    content: "I recommend Neural Threads to all my clients for their wedding outfits. The combination of designer creativity and local tailoring expertise is unbeatable.",
    image: "https://images.unsplash.com/photo-1619375812872-c84e41e1d8b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGluZGlhbiUyMHdvbWFufGVufDB8fDB8fHww",
  },
  {
    name: "Vikram Reddy",
    role: "Fashion Designer",
    content: "This platform has transformed how I connect with clients. The collaborative tools make it easy to bring their vision to life with precision.",
    image: "https://images.unsplash.com/photo-1504901702499-428479975aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            What Our <span className="gradient-text">Community Says</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their fashion experience with Neural Threads.
          </p>
        </div>
        
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground flex-grow">{testimonial.content}</p>
                    <div className="flex text-fashion-gold mt-4">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
