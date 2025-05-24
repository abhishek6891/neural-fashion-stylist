
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Ruler, Scale, CalendarDays } from "lucide-react";
import { ProfileFormValues } from "@/schemas/profileSchema";

interface BasicInfoFieldsProps {
  control: Control<ProfileFormValues>;
}

const BasicInfoFields = ({ control }: BasicInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
};

export default BasicInfoFields;
