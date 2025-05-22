
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Height, Weight, Calendar, Ruler, Body } from "lucide-react";

const profileSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  chest: z.string().min(1, { message: "Chest measurement is required" }),
  waist: z.string().min(1, { message: "Waist measurement is required" }),
  hip: z.string().min(1, { message: "Hip measurement is required" }),
  inseam: z.string().optional(),
  shoeSize: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const ProfileForm = ({ isOpen, onOpenChange, userId }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      height: "",
      weight: "",
      age: "",
      chest: "",
      waist: "",
      hip: "",
      inseam: "",
      shoeSize: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!userId) {
      toast.error("User is not authenticated");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profile_measurements')
        .upsert({
          user_id: userId,
          height: data.height,
          weight: data.weight,
          age: data.age,
          chest: data.chest,
          waist: data.waist,
          hip: data.hip,
          inseam: data.inseam || null,
          shoe_size: data.shoeSize || null,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile information saved successfully!");
      onOpenChange(false);
      // Refresh the current page
      navigate(0);
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold">Complete Your Profile</SheetTitle>
          <SheetDescription>
            Please enter your body measurements to help designers create perfectly fitting clothes for you.
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Height className="h-4 w-4" /> Height
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 170 cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Weight className="h-4 w-4" /> Weight
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 65 kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Age
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 28" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Body className="h-4 w-4" /> Chest
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 90 cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="waist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Body className="h-4 w-4" /> Waist
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 75 cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Body className="h-4 w-4" /> Hip
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 95 cm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inseam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" /> Inseam (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 80 cm" {...field} />
                    </FormControl>
                    <FormDescription>Inside leg measurement</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shoeSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" /> Shoe Size (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EU 42 / US 9" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileForm;
