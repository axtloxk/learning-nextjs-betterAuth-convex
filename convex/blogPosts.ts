import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createPosts = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // i want to show an error msg if the user isnt signed in
    const user = await authComponent.safeGetAuthUser(ctx);
    // i need an if statemt it'll work like a wall that'll protect the code behind it if the user isnt signed in
    if (!user) {
      throw new Error("Unauthorized: You must be signed in to create a post.");
    }
    const newPosts = await ctx.db.insert("blogPosts", {
      title: args.title,
      content: args.content,
      autherId: user._id,
    }); // await because we're waiting a response from the backend server
    return newPosts;
  },
});
export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = ctx.db.query("blogPosts").order("desc").collect();
    return posts;
  },
});
