import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// For demo purpose, we define a simple schema with two tables: message and sign_up_verification
// Class is hardcode as value for the demo purpose
// In real world, class should be a
// Foreign key to a class table to ensure the value is valid
export default defineSchema({
  // Message schema
  notices: defineTable({
    title: v.string(),
    description: v.string(),
    class: v.string(),
  })
    .index("by_class", ["class"]) // Index for filtering by class
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["class"]
    }),

  // Verification schema
  verification_info: defineTable({
    code: v.string(), // Verification code
    class: v.string(),// Class code
    role: v.string(), // Role of the user (student, teacher, etc.)
    isValid: v.boolean(),//false if code is used
  })
    .index("by_code", ["code"]) // Index for filtering by class
});