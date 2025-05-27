
import { z } from "zod";

export const profileSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  
  // Customer-specific fields - make them optional for signup
  chest: z.string().optional(),
  waist: z.string().optional(),
  hip: z.string().optional(),
  inseam: z.string().optional(),
  shoeSize: z.string().optional(),
  
  // Designer-specific fields
  specialization: z.string().optional(),
  experience: z.string().optional(),
  location: z.string().optional(),
});

// Create a more lenient schema for signup
export const signupProfileSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  
  // Make all other fields optional during signup
  chest: z.string().optional(),
  waist: z.string().optional(),
  hip: z.string().optional(),
  inseam: z.string().optional(),
  shoeSize: z.string().optional(),
  specialization: z.string().optional(),
  experience: z.string().optional(),
  location: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type SignupProfileFormValues = z.infer<typeof signupProfileSchema>;
