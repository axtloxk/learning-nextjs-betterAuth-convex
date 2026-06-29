"use server";

import z from "zod";
import { blogSchema as bs } from "../schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchAuthMutation } from "@/lib/auth-server";

export const createPost = async (v: z.infer<typeof bs>) => {
  const safeData = bs.safeParse(v);
  if (!safeData.success) {
    throw new Error("Error in actions.ts user isnt authendicated");
  }
  await fetchAuthMutation(api.blogPosts.createPosts, {
    title: safeData.data.title,
    content: safeData.data.content,
  });
  redirect("/blog");
};
