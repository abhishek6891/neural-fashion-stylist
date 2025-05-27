
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signupProfileSchema, SignupProfileFormValues } from "@/schemas/profileSchema";
import BasicInfoFields from "./profile/BasicInfoFields";
import CustomerMeasurementsFields from "./profile/CustomerMeasurementsFields";
import DesignerInfoFields from "./profile/DesignerInfoFields";

interface ProfileFormFieldsProps {
  onSubmit: (data: SignupProfileFormValues) => Promise<void>;
  isLoading: boolean;
  userType: "customer" | "designer" | null;
}

const ProfileFormFields = ({ onSubmit, isLoading, userType }: ProfileFormFieldsProps) => {
  const form = useForm<SignupProfileFormValues>({
    resolver: zodResolver(signupProfileSchema),
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

  const handleSubmit = async (data: SignupProfileFormValues) => {
    console.log("Profile form submission started:", data);
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
          {isLoading ? "Saving..." : "Complete Profile & Continue"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileFormFields;
