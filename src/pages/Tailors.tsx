
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProfileView from "@/components/ProfileView";

// Sample data for tailors
const tailorsData = [
  {
    id: 1,
    user_id: "tailor-1",
    name: "Rahul Sharma",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60",
    location: "Mumbai, Maharashtra",
    specialties: ["Traditional", "Wedding"],
    rating: 4.8,
    experience: "15+ years",
    priceRange: "₹₹₹"
  },
  {
    id: 2,
    user_id: "tailor-2",
    name: "Anjali Patel",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
    location: "Delhi, Delhi",
    specialties: ["Modern", "Western"],
    rating: 4.9,
    experience: "12 years",
    priceRange: "₹₹"
  },
  {
    id: 3,
    user_id: "tailor-3",
    name: "Vijay Malhotra",
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60",
    location: "Jaipur, Rajasthan",
    specialties: ["Ethnic", "Indo-Western"],
    rating: 4.7,
    experience: "20 years",
    priceRange: "₹₹₹₹"
  },
  {
    id: 4,
    user_id: "tailor-4",
    name: "Sneha Kapoor",
    image: "https://images.unsplash.com/photo-1590401549336-6ab494104e26?w=500&auto=format&fit=crop&q=60",
    location: "Bangalore, Karnataka",
    specialties: ["Contemporary", "Fusion"],
    rating: 4.6,
    experience: "8 years",
    priceRange: "₹₹"
  },
  {
    id: 5,
    user_id: "tailor-5",
    name: "Deepak Mehta",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60",
    location: "Chennai, Tamil Nadu",
    specialties: ["Traditional", "Bridal"],
    rating: 4.9,
    experience: "18 years",
    priceRange: "₹₹₹"
  },
  {
    id: 6,
    user_id: "tailor-6",
    name: "Priya Reddy",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
    location: "Hyderabad, Telangana",
    specialties: ["Modern", "Party Wear"],
    rating: 4.7,
    experience: "10 years",
    priceRange: "₹₹"
  }
];

const Tailors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedTailor, setSelectedTailor] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  // Filter tailors based on search term and location
  const filteredTailors = tailorsData.filter(tailor => 
    (tailor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tailor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (selectedLocation === "All" || tailor.location.includes(selectedLocation))
  );

  // Extract unique locations
  const locations = ["All", ...new Set(tailorsData.map(tailor => tailor.location.split(", ")[0]))];

  const handleViewProfile = (tailor: any) => {
    setSelectedTailor(tailor);
    setShowProfile(true);
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-24 container">
          <h1 className="text-4xl font-bold mb-8">
            Find <span className="gradient-text">Tailors</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Connect with skilled tailors in your local area who can bring your fashion ideas to life
          </p>

          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="Search by name or specialty..."
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {locations.map(location => (
                <Button 
                  key={location} 
                  variant={selectedLocation === location ? "default" : "outline"}
                  onClick={() => setSelectedLocation(location)}
                  size="sm"
                  className={selectedLocation === location ? "bg-fashion-purple hover:bg-fashion-purple/90" : ""}
                >
                  {location === "All" ? "All Locations" : location}
                </Button>
              ))}
            </div>
          </div>

          {/* Tailors grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTailors.map(tailor => (
              <Card key={tailor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-fashion-purple/20">
                      <AvatarImage src={tailor.image} alt={tailor.name} />
                      <AvatarFallback>{tailor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{tailor.name}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{tailor.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center text-fashion-gold">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium">{tailor.rating}</span>
                    </div>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{tailor.experience}</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span>{tailor.priceRange}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tailor.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline" className="bg-muted">
                        <Scissors className="h-3 w-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-fashion-purple hover:bg-fashion-purple/90"
                    onClick={() => handleViewProfile(tailor)}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>

      {/* Profile View Dialog */}
      {showProfile && selectedTailor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedTailor.name}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                ×
              </Button>
            </div>
            <ProfileView 
              userId={selectedTailor.user_id} 
              userType="designer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Tailors;
