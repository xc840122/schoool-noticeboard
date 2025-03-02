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

// Search messages by keyword
export const searchMessage = query({
  args: { className: v.string(), keyword: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("message")
      .withSearchIndex("search_title", q =>
        q.search("title", args.keyword).eq("class", args.className)
      )
      .collect();
    // Sort the messages by _creationTime in descending order
    // Coz Search queries always return results in relevance order based on how well the document matches the search query
    // Different ordering of results are not supported in search queries,must handle in memory
    return messages.sort((a, b) => b._creationTime - a._creationTime);
  },
});