
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for designers
const designersData = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    specialties: ["Contemporary", "Fusion"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    collections: ["Summer Breeze", "Monsoon Magic"],
    featured: true
  },
  {
    id: 2,
    name: "Raj Malhotra",
    location: "Delhi",
    specialties: ["Traditional", "Bridal"],
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    collections: ["Royal Heritage", "Modern Bride"],
    featured: true
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "Ahmedabad",
    specialties: ["Sustainable", "Minimalist"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    collections: ["Eco Chic", "Less is More"],
    featured: false
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    specialties: ["Heritage", "Modern"],
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    collections: ["Royal Rajasthan", "Urban Nomad"],
    featured: true
  },
  {
    id: 5,
    name: "Ananya Reddy",
    location: "Bangalore",
    specialties: ["Casual", "Workwear"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    collections: ["Office Edit", "Weekend Vibes"],
    featured: false
  },
  {
    id: 6,
    name: "Arjun Kapoor",
    location: "Chennai",
    specialties: ["Indo-Western", "Festive"],
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    collections: ["Celebration", "Fusion Fest"],
    featured: true
  },
  {
    id: 7,
    name: "Nisha Khan",
    location: "Hyderabad",
    specialties: ["Luxury", "Couture"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    collections: ["Opulence", "Red Carpet"],
    featured: false
  },
  {
    id: 8,
    name: "Rohit Mehta",
    location: "Kolkata",
    specialties: ["Ethnic", "Contemporary"],
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    collections: ["Bengali Modern", "Urban Ethnic"],
    featured: false
  },
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");

  // Filter designers based on search and filter
  const filteredDesigners = designersData.filter(designer => {
    const matchesSearch = 
      designer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      designer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      designer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "featured") {
      return matchesSearch && designer.featured;
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 container">
        <h1 className="text-4xl font-bold mb-8">
          Discover <span className="gradient-text">Designers</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          Connect with talented fashion designers from across India and explore their unique collections
        </p>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <Input
            placeholder="Search designers..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-4">
            <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="w-fit">
              <TabsList>
                <TabsTrigger value="all">All Designers</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="border rounded-md flex overflow-hidden">
              <Button 
                variant={view === "grid" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("grid")}
                className={view === "grid" ? "bg-fashion-purple hover:bg-fashion-purple/90 rounded-none" : "rounded-none"}
              >
                Grid
              </Button>
              <Button 
                variant={view === "list" ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView("list")}
                className={view === "list" ? "bg-fashion-purple hover:bg-fashion-purple/90 rounded-none" : "rounded-none"}
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDesigners.map((designer) => (
              <Card key={designer.id} className="overflow-hidden border border-border/50 hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden relative group">
                  <img 
                    src={designer.image} 
                    alt={designer.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  {designer.featured && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-fashion-gold border-fashion-gold text-white">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{designer.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{designer.location}</p>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="text-fashion-gold">★</div>
                    <span className="ml-1 font-medium">{designer.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {designer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="bg-muted">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full hover:bg-fashion-purple/5 hover:text-fashion-purple border-fashion-purple/30">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Designer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Specialties</TableHead>
                  <TableHead>Collections</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDesigners.map((designer) => (
                  <TableRow key={designer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={designer.image} 
                            alt={designer.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{designer.name}</span>
                        {designer.featured && (
                          <Badge className="bg-fashion-gold border-fashion-gold text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{designer.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {designer.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="bg-muted text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{designer.collections.join(", ")}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-fashion-gold">{designer.rating} ★</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
