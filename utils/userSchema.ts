import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email("Please enter a valid email address").min(1),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address").min(1),
  password: z.string().min(1, "Password is required"),
});
