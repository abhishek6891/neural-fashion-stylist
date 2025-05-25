
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ProfileView from "./ProfileView";

// Sample designer data
const designers = [
  {
    id: 1,
    user_id: "designer-1",
    name: "Priya Sharma",
    location: "Mumbai",
    specialties: ["Contemporary", "Fusion"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMGRlc2lnbmVyfGVufDB8fDB8fHww",
    rating: 4.9,
  },
  {
    id: 2,
    user_id: "designer-2",
    name: "Raj Malhotra",
    location: "Delhi",
    specialties: ["Traditional", "Bridal"],
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww",
    rating: 4.7,
  },
  {
    id: 3,
    user_id: "designer-3",
    name: "Meera Patel",
    location: "Ahmedabad",
    specialties: ["Sustainable", "Minimalist"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
  },
  {
    id: 4,
    user_id: "designer-4",
    name: "Vikram Singh",
    location: "Jaipur",
    specialties: ["Heritage", "Modern"],
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
  },
];

const DesignerShowcase = () => {
  const [visibleDesigners, setVisibleDesigners] = useState(designers.slice(0, 4));
  const [selectedDesigner, setSelectedDesigner] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewProfile = (designer: any) => {
    setSelectedDesigner(designer);
    setShowProfile(true);
  };

  return (
    <>
      <section className="py-24" id="designers">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="gradient-text">Designers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with talented designers who are transforming Indian fashion with their unique
              visions and craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleDesigners.map((designer) => (
              <Card key={designer.id} className="overflow-hidden border border-border/50 hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={designer.image} 
                    alt={designer.name} 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{designer.name}</CardTitle>
                  <CardDescription>{designer.location}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    {designer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="bg-muted">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <div className="text-fashion-gold">★</div>
                    <span className="ml-1 font-medium">{designer.rating}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleViewProfile(designer)}>
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" className="border-fashion-purple text-fashion-purple hover:bg-fashion-purple/5">
              <Link to="/discover">Explore All Designers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Profile View Dialog */}
      {showProfile && selectedDesigner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedDesigner.name}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                ×
              </Button>
            </div>
            <ProfileView 
              userId={selectedDesigner.user_id} 
              userType="designer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DesignerShowcase;
