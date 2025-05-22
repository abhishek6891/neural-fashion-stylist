
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { ProfileFormValues } from "@/schemas/profileSchema";

export const useProfileForm = (userId: string, onOpenChange: (open: boolean) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

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

  return { onSubmit, isLoading };
};
