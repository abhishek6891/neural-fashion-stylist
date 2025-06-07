
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

      // Use the authenticated user's ID instead of the passed userId
      const authenticatedUserId = user.id;

      if (userType === "designer") {
        // Handle designer profile
        const profileData = {
          user_id: authenticatedUserId,
          user_type: 'designer' as const,
          height: data.height || null,
          weight: data.weight || null,
          age: data.age || null,
          specialization: data.specialization || null,
          experience: data.experience || null,
          location: data.location || null,
          updated_at: new Date().toISOString(),
        };

        // Check if designer profile exists
        const { data: existingProfile, error: checkError } = await supabase
          .from('designer_profiles')
          .select('id')
          .eq('user_id', authenticatedUserId)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking existing designer profile:', checkError);
          toast.error(`Failed to check existing profile: ${checkError.message}`);
          return;
        }

        let result;
        if (existingProfile) {
          // Update existing designer profile
          result = await supabase
            .from('designer_profiles')
            .update(profileData)
            .eq('user_id', authenticatedUserId);
        } else {
          // Insert new designer profile
          const insertData = {
            ...profileData,
            created_at: new Date().toISOString(),
          };
          result = await supabase
            .from('designer_profiles')
            .insert(insertData);
        }

        if (result.error) {
          console.error('Designer profile save error:', result.error);
          toast.error(`Failed to save designer profile: ${result.error.message}`);
          return;
        }

        console.log('Designer profile saved successfully!');
        toast.success(`Designer profile ${existingProfile ? 'updated' : 'created'} successfully! Welcome to Neural Threads!`);
        
      } else if (userType === "customer") {
        // Handle customer profile
        const profileData = {
          user_id: authenticatedUserId,
          user_type: 'customer' as const,
          height: data.height || null,
          weight: data.weight || null,
          age: data.age || null,
          chest: data.chest || null,
          waist: data.waist || null,
          hip: data.hip || null,
          inseam: data.inseam || null,
          shoe_size: data.shoeSize || null,
          updated_at: new Date().toISOString(),
        };

        // Check if customer profile exists
        const { data: existingProfile, error: checkError } = await supabase
          .from('profile_measurements')
          .select('id')
          .eq('user_id', authenticatedUserId)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking existing customer profile:', checkError);
          toast.error(`Failed to check existing profile: ${checkError.message}`);
          return;
        }

        let result;
        if (existingProfile) {
          // Update existing customer profile
          result = await supabase
            .from('profile_measurements')
            .update(profileData)
            .eq('user_id', authenticatedUserId);
        } else {
          // Insert new customer profile
          const insertData = {
            ...profileData,
            created_at: new Date().toISOString(),
          };
          result = await supabase
            .from('profile_measurements')
            .insert(insertData);
        }

        if (result.error) {
          console.error('Customer profile save error:', result.error);
          toast.error(`Failed to save customer profile: ${result.error.message}`);
          return;
        }

        console.log('Customer profile saved successfully!');
        toast.success(`Customer profile ${existingProfile ? 'updated' : 'created'} successfully! Welcome to Neural Threads!`);
      }
      
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
