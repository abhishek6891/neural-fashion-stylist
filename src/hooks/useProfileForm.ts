
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { ProfileFormValues } from "@/schemas/profileSchema";

export const useProfileForm = (
  userId: string, 
  userType: "customer" | "designer" | null,
  onOpenChange: (open: boolean) => void,
  onComplete?: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const onSubmit = async (data: ProfileFormValues) => {
    if (!userId) {
      toast.error("User type not selected");
      return;
    }

    setIsLoading(true);

    try {
      // Store the profile table with the appropriate user type
      const tableName = userType === "designer" ? 'designer_profiles' : 'profile_measurements';
      
      const profileData = {
        user_id: userId,
        user_type: userType,
        height: data.height,
        weight: data.weight,
        age: data.age,
        updated_at: new Date().toISOString(),
      };
      
      // Add additional fields for customer measurements
      if (userType === "customer") {
        Object.assign(profileData, {
          chest: data.chest,
          waist: data.waist,
          hip: data.hip,
          inseam: data.inseam || null,
          shoe_size: data.shoeSize || null,
        });
      }
      
      // Add designer-specific fields
      if (userType === "designer") {
        Object.assign(profileData, {
          specialization: data.specialization || null,
          experience: data.experience || null,
          location: data.location || null,
        });
      }

      const { error } = await supabase
        .from(tableName)
        .upsert(profileData);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile information saved successfully!");
      onOpenChange(false);
      
      // Use the onComplete callback if provided
      if (onComplete) {
        onComplete();
      } else {
        // Fallback to the old behavior
        navigate(0);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
