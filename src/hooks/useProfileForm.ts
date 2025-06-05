
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
      toast.error("User information missing. Please try logging in again.");
      return;
    }

    setIsLoading(true);
    console.log("Starting profile submission for:", { userId, userType, data });

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to save your profile");
        return;
      }

      // Determine the correct table based on user type
      const tableName = userType === "designer" ? 'designer_profiles' : 'profile_measurements';
      
      // Check if profile already exists
      const { data: existingProfile, error: checkError } = await supabase
        .from(tableName)
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing profile:', checkError);
        toast.error(`Failed to check existing profile: ${checkError.message}`);
        return;
      }

      // Base profile data that's common to both types
      const baseProfileData = {
        user_id: userId,
        user_type: userType,
        height: data.height || null,
        weight: data.weight || null,
        age: data.age || null,
        updated_at: new Date().toISOString(),
      };
      
      let profileData: any = { ...baseProfileData };
      
      // Add type-specific fields
      if (userType === "customer") {
        Object.assign(profileData, {
          chest: data.chest || null,
          waist: data.waist || null,
          hip: data.hip || null,
          inseam: data.inseam || null,
          shoe_size: data.shoeSize || null,
        });
      } else if (userType === "designer") {
        Object.assign(profileData, {
          specialization: data.specialization || null,
          experience: data.experience || null,
          location: data.location || null,
        });
      }

      console.log("Saving profile data to table:", tableName, profileData);

      let result;
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from(tableName)
          .update(profileData)
          .eq('user_id', userId);
      } else {
        // Insert new profile
        profileData.created_at = new Date().toISOString();
        result = await supabase
          .from(tableName)
          .insert(profileData);
      }

      const { error } = result;

      if (error) {
        console.error('Database error:', error);
        toast.error(`Failed to save ${userType} profile: ${error.message}`);
        return;
      }

      console.log(`${userType} profile saved successfully!`);
      toast.success(`${userType === 'designer' ? 'Designer' : 'Customer'} profile ${existingProfile ? 'updated' : 'created'} successfully! Welcome to Neural Threads!`);
      
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
      toast.error("An unexpected error occurred while saving your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
