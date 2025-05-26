
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import DesignerCard from "./DesignerCard";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const TailorNetwork = () => {
  const [designers, setDesigners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const { data, error } = await supabase
        .from('designer_profiles')
        .select('*')
        .eq('user_type', 'designer')
        .limit(6); // Show only first 6 for the network section

      if (error) {
        console.error('Error fetching designers:', error);
      } else {
        setDesigners(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDesigners = designers.filter((designer: any) =>
    designer.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    designer.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    designer.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('tailors')} Network
            </h2>
            <p className="text-muted-foreground">Loading designers...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('tailors')} Network
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with skilled designers and tailors in your area. Find the perfect match for your fashion needs.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by specialization or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredDesigners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No designers found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigners.map((designer: any) => (
              <DesignerCard key={designer.id} designer={designer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TailorNetwork;
