import z from "zod";
export const blogSchema = z.object({
  title: z.string().min(3).max(40),
  content: z.string().min(4).max(55),
});
