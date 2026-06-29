import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogPosts: defineTable({
    title: v.string(),
    content: v.string(),
    autherId: v.string(), // the id is alwyas a string
  }),
});
