
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Ruler, Scale, CalendarDays, User } from "lucide-react";
import { profileSchema, ProfileFormValues } from "@/schemas/profileSchema";

interface ProfileFormFieldsProps {
  onSubmit: (data: ProfileFormValues) => Promise<void>;
  isLoading: boolean;
  userType: "customer" | "designer" | null;
}

const ProfileFormFields = ({ onSubmit, isLoading, userType }: ProfileFormFieldsProps) => {
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
      specialization: "",
      experience: "",
      location: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" /> Height
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
                  <Scale className="h-4 w-4" /> Weight
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
                  <CalendarDays className="h-4 w-4" /> Age
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 28" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {userType === "designer" ? (
            <>
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Specialization
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wedding dresses, Suits" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" /> Experience (years)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai, India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : null}

          {userType === "customer" ? (
            <>
              <FormField
                control={form.control}
                name="chest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Chest
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
                      <User className="h-4 w-4" /> Waist
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
                      <User className="h-4 w-4" /> Hip
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
            </>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileFormFields;
