
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye } from "lucide-react";

const fashionImages = [
  {
    id: 1,
    title: "Elegant Evening Dress",
    category: "Formal Wear",
    image: "https://images.unsplash.com/photo-1566479179817-0da9d6d6f1b7?w=300&h=400&fit=crop",
    likes: 234,
    views: 1240
  },
  {
    id: 2,
    title: "Modern Suit Collection",
    category: "Business Wear",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    likes: 156,
    views: 890
  },
  {
    id: 3,
    title: "Casual Summer Outfit",
    category: "Casual Wear",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop",
    likes: 189,
    views: 756
  },
  {
    id: 4,
    title: "Traditional Saree",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300&h=400&fit=crop",
    likes: 312,
    views: 1560
  },
  {
    id: 5,
    title: "Designer Lehenga",
    category: "Wedding Wear",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop",
    likes: 445,
    views: 2340
  },
  {
    id: 6,
    title: "Trendy Casual Look",
    category: "Street Style",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=400&fit=crop",
    likes: 178,
    views: 934
  }
];

const FashionShowcase = () => {
  return (
    <div className="w-full max-w-sm space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">
        ✨ Fashion Inspiration
      </h3>
      <div className="grid gap-4">
        {fashionImages.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium text-sm mb-2">{item.title}</h4>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{item.views}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Badge variant="outline" className="animate-pulse">
          Live Fashion Updates
        </Badge>
      </div>
    </div>
  );
};

export default FashionShowcase;
