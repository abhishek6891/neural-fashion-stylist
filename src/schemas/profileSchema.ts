
import { z } from "zod";

export const profileSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  
  // Customer-specific fields
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

export type ProfileFormValues = z.infer<typeof profileSchema>;
