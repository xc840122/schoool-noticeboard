// db operation of messages
import { query } from "./_generated/server";
import { v } from "convex/values";

// This function is used to get messages by class
export const getMessageList = query({
  args: { className: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("message")
      .withIndex("by_class", q => q.eq("class", args.className))
      .order("desc")
      .collect();
    return messages;
  },
});