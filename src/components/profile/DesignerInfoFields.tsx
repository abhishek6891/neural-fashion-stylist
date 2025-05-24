
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, CalendarDays } from "lucide-react";
import { ProfileFormValues } from "@/schemas/profileSchema";

interface DesignerInfoFieldsProps {
  control: Control<ProfileFormValues>;
}

const DesignerInfoFields = ({ control }: DesignerInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
  );
};

export default DesignerInfoFields;
