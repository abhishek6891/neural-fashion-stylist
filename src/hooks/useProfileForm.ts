
import { useState } from "react";
import { toast } from "sonner";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { supabase } from "@/integrations/supabase/client";

export const useProfileForm = (
  userId: string, 
  userType: "customer" | "designer" | null,
  onOpenChange: (open: boolean) => void,
  onComplete?: () => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!userId || !userType) {
      toast.error("User information missing");
      return;
    }

    setIsLoading(true);

    try {
      // Get the current authenticated user to verify
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast.error("Please log in to save your profile");
        return;
      }

      // Ensure we're using the authenticated user's ID
      const actualUserId = user.id;

      // Store the profile in the appropriate table
      const tableName = userType === "designer" ? 'designer_profiles' : 'profile_measurements';
      
      const profileData: any = {
        user_id: actualUserId,
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

      console.log("Saving profile data:", profileData);

      // Check if profile exists first
      const { data: existingProfile } = await supabase
        .from(tableName)
        .select('id')
        .eq('user_id', actualUserId)
        .single();

      let error;
      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from(tableName)
          .update(profileData)
          .eq('user_id', actualUserId);
        error = updateError;
      } else {
        // Insert new profile
        const { error: insertError } = await supabase
          .from(tableName)
          .insert(profileData);
        error = insertError;
      }

      if (error) {
        console.error('Database error:', error);
        toast.error(`Failed to save profile: ${error.message}`);
        return;
      }

      toast.success("Profile information saved successfully!");
      onOpenChange(false);
      
      // Store user type in localStorage
      localStorage.setItem('userType', userType);
      
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
