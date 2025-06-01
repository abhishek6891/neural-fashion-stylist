
import { useState } from "react";
import { toast } from "sonner";
import { SignupProfileFormValues } from "@/schemas/profileSchema";
import { supabase } from "@/integrations/supabase/client";

export const useProfileForm = (
  userId: string, 
  userType: "customer" | "designer" | null,
  onOpenChange: (open: boolean) => void,
  onComplete?: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignupProfileFormValues) => {
    if (!userId || !userType) {
      toast.error("User information missing");
      return;
    }

    setIsLoading(true);
    console.log("Starting profile submission for:", { userId, userType, data });

    try {
      // Use the provided userId directly instead of trying to get current user
      // This ensures we work with the just-signed-up user
      console.log("Using provided user ID:", userId);

      // Store the profile in the appropriate table
      const tableName = userType === "designer" ? 'designer_profiles' : 'profile_measurements';
      
      const profileData: any = {
        user_id: userId,
        user_type: userType,
        height: data.height,
        weight: data.weight,
        age: data.age,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // Add additional fields for customer measurements
      if (userType === "customer") {
        Object.assign(profileData, {
          chest: data.chest || null,
          waist: data.waist || null,
          hip: data.hip || null,
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

      console.log("Saving profile data to table:", tableName, profileData);

      // Always insert new profile (no update logic for signup)
      console.log("Inserting new profile");
      const { error } = await supabase
        .from(tableName)
        .insert(profileData);

      if (error) {
        console.error('Database error:', error);
        toast.error(`Failed to save profile: ${error.message}`);
        return;
      }

      console.log("Profile saved successfully!");
      toast.success("Profile created successfully! Welcome to Neural Threads!");
      
      // Store user type in localStorage
      localStorage.setItem('userType', userType);
      
      // Close the profile form
      onOpenChange(false);
      
      // Use the onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Profile save error:', error);
      toast.error("An unexpected error occurred while saving your profile");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
