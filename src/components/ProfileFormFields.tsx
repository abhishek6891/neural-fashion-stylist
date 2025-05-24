
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { profileSchema, ProfileFormValues } from "@/schemas/profileSchema";
import BasicInfoFields from "./profile/BasicInfoFields";
import CustomerMeasurementsFields from "./profile/CustomerMeasurementsFields";
import DesignerInfoFields from "./profile/DesignerInfoFields";

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
          <BasicInfoFields control={form.control} />
          
          {userType === "designer" && (
            <DesignerInfoFields control={form.control} />
          )}

          {userType === "customer" && (
            <CustomerMeasurementsFields control={form.control} />
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileFormFields;
