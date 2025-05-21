
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define our form schema
const formSchema = z.object({
  bodyType: z.string().min(1, "Please select your body type"),
  occasion: z.string().min(1, "Please select an occasion"),
  stylePreference: z.string().min(1, "Please select your style preference"),
  colorPreference: z.string().optional(),
  budget: z.number().min(1, "Please set your budget"),
  additionalInfo: z.string().optional(),
});

// Define outfit suggestion type
interface OutfitSuggestion {
  title: string;
  description: string;
  imageUrl?: string;
  items: {
    name: string;
    type: string;
  }[];
}

const bodyTypes = [
  "Rectangle",
  "Pear",
  "Hourglass",
  "Apple",
  "Athletic",
  "Petite",
  "Tall",
];

const occasions = [
  "Casual Everyday",
  "Office Work",
  "Business Meeting",
  "First Date",
  "Wedding Guest",
  "Formal Event",
  "Vacation",
  "Festive Celebration",
];

const stylePreferences = [
  "Minimal",
  "Classic",
  "Bohemian",
  "Street Style",
  "Preppy",
  "Vintage",
  "Elegant",
  "Trendy",
];

const AiStylist = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<OutfitSuggestion[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bodyType: "",
      occasion: "",
      stylePreference: "",
      colorPreference: "",
      budget: 100,
      additionalInfo: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock outfits based on form inputs
      const generatedOutfits = generateMockOutfits(values);
      
      setSuggestions(generatedOutfits);
      toast.success("Style recommendations generated!");
    } catch (error) {
      toast.error("Failed to generate recommendations");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Mock outfit generation function
  const generateMockOutfits = (values: z.infer<typeof formSchema>): OutfitSuggestion[] => {
    const { bodyType, occasion, stylePreference, budget } = values;
    
    // Simple logic to create different outfits based on inputs
    const outfits: OutfitSuggestion[] = [
      {
        title: `${stylePreference} Look for ${occasion}`,
        description: `A perfectly tailored ${stylePreference.toLowerCase()} outfit for your ${bodyType.toLowerCase()} body type. This ensemble works beautifully for a ${occasion.toLowerCase()} setting while staying within your budget of $${budget}.`,
        items: [
          { name: `${stylePreference} Top`, type: "Top" },
          { name: `Fitted ${bodyType}-flattering Bottoms`, type: "Bottom" },
          { name: `${occasion}-appropriate Footwear`, type: "Shoes" },
          { name: `${stylePreference} Accessories`, type: "Accessories" }
        ]
      },
      {
        title: `Alternative ${stylePreference} Ensemble`,
        description: `Another option that emphasizes your ${bodyType.toLowerCase()} frame's best features while maintaining a ${stylePreference.toLowerCase()} aesthetic. Perfect for ${occasion.toLowerCase()} events.`,
        items: [
          { name: `Statement ${stylePreference} Piece`, type: "Outerwear" },
          { name: `${bodyType}-enhancing Base Layer`, type: "Top" },
          { name: `Complementary Bottom`, type: "Bottom" },
          { name: `Trending Accessories`, type: "Accessories" }
        ]
      },
      {
        title: `Budget-Friendly ${occasion} Look`,
        description: `An affordable yet stylish outfit for your ${bodyType.toLowerCase()} shape that works well for ${occasion.toLowerCase()} settings. Complete with mix-and-match pieces that stay under your $${budget} budget.`,
        items: [
          { name: "Versatile Top", type: "Top" },
          { name: "Signature Bottom", type: "Bottom" },
          { name: "Essential Footwear", type: "Shoes" },
          { name: "Statement Accessory", type: "Accessories" }
        ]
      }
    ];
    
    return outfits;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-32 pb-24 container flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            AI <span className="gradient-text">Style Assistant</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Get personalized style recommendations based on your body type and preferences
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="bodyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Body Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your body type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {bodyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This helps us recommend flattering styles
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="occasion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occasion</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an occasion" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {occasions.map((occasion) => (
                                  <SelectItem key={occasion} value={occasion}>{occasion}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              For what occasion do you need outfit ideas?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stylePreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Style Preference</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your preferred style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {stylePreferences.map((style) => (
                                  <SelectItem key={style} value={style}>{style}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              What aesthetic do you prefer?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="colorPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color Preference (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Blue, Earth tones, Pastels" {...field} />
                            </FormControl>
                            <FormDescription>
                              Any specific colors you prefer or want to avoid?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget: ${field.value}</FormLabel>
                            <FormControl>
                              <Slider
                                defaultValue={[field.value]}
                                min={50}
                                max={500}
                                step={10}
                                onValueChange={(vals) => field.onChange(vals[0])}
                                className="py-4"
                              />
                            </FormControl>
                            <FormDescription>
                              Set your approximate budget for the outfit
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any specific requirements or preferences?" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Add any other details that might help us style you better
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-fashion-purple to-fashion-pink hover:opacity-90"
                        disabled={isGenerating}
                      >
                        {isGenerating ? "Generating Suggestions..." : "Get Style Recommendations"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div>
              {suggestions.length > 0 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Your Style Recommendations</h2>
                  <Tabs defaultValue="outfit1" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="outfit1">Look 1</TabsTrigger>
                      <TabsTrigger value="outfit2">Look 2</TabsTrigger>
                      <TabsTrigger value="outfit3">Look 3</TabsTrigger>
                    </TabsList>

                    {suggestions.map((suggestion, index) => (
                      <TabsContent key={index} value={`outfit${index + 1}`} className="space-y-4">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">
                            [Outfit visualization would appear here]
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-medium">{suggestion.title}</h3>
                          <p className="text-muted-foreground mt-2">{suggestion.description}</p>
                          
                          <Separator className="my-4" />
                          
                          <h4 className="font-medium mb-2">Suggested Items:</h4>
                          <ul className="space-y-1">
                            {suggestion.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">{item.type}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-end pt-4">
                          <Button variant="outline" className="mr-2">Save Look</Button>
                          <Button>Shop This Look</Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-muted/30 rounded-lg">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-fashion-purple to-fashion-pink flex items-center justify-center text-white text-2xl">
                    👚
                  </div>
                  <h2 className="text-xl font-medium mb-2">Your Personal Style Recommendations</h2>
                  <p className="text-muted-foreground mb-4">
                    Fill out the form with your preferences and our AI will generate personalized outfit recommendations just for you.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AiStylist;
