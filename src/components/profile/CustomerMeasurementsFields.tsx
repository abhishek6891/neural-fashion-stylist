
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Ruler, User } from "lucide-react";
import { SignupProfileFormValues } from "@/schemas/profileSchema";

interface CustomerMeasurementsFieldsProps {
  control: Control<SignupProfileFormValues>;
}

const CustomerMeasurementsFields = ({ control }: CustomerMeasurementsFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="chest"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <User className="h-4 w-4" /> Chest (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., 90 cm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="waist"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <User className="h-4 w-4" /> Waist (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., 75 cm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="hip"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <User className="h-4 w-4" /> Hip (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., 95 cm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
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
        control={control}
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
  );
};

export default CustomerMeasurementsFields;
