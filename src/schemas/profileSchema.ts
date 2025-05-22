
import { z } from "zod";

export const profileSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  chest: z.string().min(1, { message: "Chest measurement is required" }),
  waist: z.string().min(1, { message: "Waist measurement is required" }),
  hip: z.string().min(1, { message: "Hip measurement is required" }),
  inseam: z.string().optional(),
  shoeSize: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
