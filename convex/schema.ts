import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  message: defineTable({
    title: v.string(),
    description: v.string(),
    class: v.string(),
  })
    .index("by_class", ["class"]) // Index for filtering by class
    .index("by_title_description", ["title", "description"]) // Multi-field index for keyword search
});