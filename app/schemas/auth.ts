import z from "zod";
export const signUpSchema = z.object({
  email: z.email(),
  fullName: z.string().min(4).max(30),
  password: z.string().min(4).max(30),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(4).max(30),
});
