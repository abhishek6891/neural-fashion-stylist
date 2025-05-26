
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProfileView from "@/components/ProfileView";
import { supabase } from "@/integrations/supabase/client";

interface TailorProfile {
  id: string;
  user_id: string;
  specialization?: string;
  experience?: string;
  location?: string;
  bio?: string;
  height?: string;
  weight?: string;
  age?: string;
}

const Tailors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedTailor, setSelectedTailor] = useState<TailorProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [tailors, setTailors] = useState<TailorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTailors();
  }, []);

  const fetchTailors = async () => {
    try {
      const { data, error } = await supabase
        .from('designer_profiles')
        .select('*')
        .eq('user_type', 'designer');

      if (error) {
        console.error('Error fetching tailors:', error);
      } else {
        setTailors(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tailors based on search term and location
  const filteredTailors = tailors.filter(tailor => 
    (tailor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tailor.bio?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedLocation === "All" || tailor.location?.includes(selectedLocation))
  );

  // Extract unique locations
  const locations = ["All", ...new Set(tailors.map(tailor => tailor.location?.split(", ")[0]).filter(Boolean))];

  const handleViewProfile = (tailor: TailorProfile) => {
    setSelectedTailor(tailor);
    setShowProfile(true);
  };

  const getRating = () => (Math.random() * 0.4 + 4.6).toFixed(1); // Random rating between 4.6-5.0
  const getPriceRange = () => ["₹₹", "₹₹₹", "₹₹₹₹"][Math.floor(Math.random() * 3)]; // Random price range

  if (loading) {
    return (
      <>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-32 pb-24 container">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-8">Loading Tailors...</h1>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

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
              placeholder="Search by specialization or description..."
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
          {filteredTailors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tailors found. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTailors.map(tailor => (
                <Card key={tailor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-fashion-purple/20">
                        <AvatarFallback className="bg-gradient-to-br from-fashion-purple to-fashion-pink text-white">
                          {tailor.specialization?.[0]?.toUpperCase() || 'T'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{tailor.specialization || 'Tailor'}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{tailor.location || 'Location not specified'}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-fashion-gold">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 font-medium">{getRating()}</span>
                      </div>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{tailor.experience} years</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span>{getPriceRange()}</span>
                    </div>
                    
                    {tailor.bio && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {tailor.bio}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tailor.specialization?.split(', ').map(specialty => (
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
          )}
        </main>
        <Footer />
      </div>

      {/* Profile View Dialog */}
      {showProfile && selectedTailor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedTailor.specialization || 'Tailor Profile'}</h2>
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
