
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const DesignerShowcase = () => {
  const [designers, setDesigners] = useState([]);
  const [visibleDesigners, setVisibleDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const { data, error } = await supabase
        .from('designer_profiles')
        .select('*')
        .eq('user_type', 'designer')
        .limit(4); // Show only first 4 for showcase

      if (error) {
        console.error('Error fetching designers:', error);
      } else {
        const designersData = data || [];
        setDesigners(designersData);
        setVisibleDesigners(designersData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (designer: any) => {
    setSelectedDesigner(designer);
    setShowProfile(true);
  };

  const getRandomImage = () => {
    const images = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMGRlc2lnbmVyfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbWFufGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const getRating = () => (Math.random() * 0.3 + 4.6).toFixed(1); // Random rating between 4.6-4.9

  if (loading) {
    return (
      <section className="py-24" id="designers">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Featured <span className="gradient-text">Designers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loading designers...
            </p>
          </div>
        </div>
      </section>
    );
  }

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

          {visibleDesigners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No designers available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleDesigners.map((designer: any) => (
                <Card key={designer.id} className="overflow-hidden border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={getRandomImage()} 
                      alt={designer.specialization || 'Designer'} 
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{designer.specialization || 'Designer'}</CardTitle>
                    <CardDescription>{designer.location || 'Location not specified'}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2">
                      {designer.specialization?.split(', ').map((specialty: string) => (
                        <Badge key={specialty} variant="outline" className="bg-muted">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center">
                      <div className="text-fashion-gold">★</div>
                      <span className="ml-1 font-medium">{getRating()}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewProfile(designer)}>
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

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
              <h2 className="text-xl font-bold">{selectedDesigner.specialization || 'Designer Profile'}</h2>
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
