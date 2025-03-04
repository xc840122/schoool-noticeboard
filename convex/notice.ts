// db operation of notices
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// This function is used to get notices by class
export const getNotices = query({
  args: { className: v.string() },
  handler: async (ctx, args) => {
    const notices = await ctx.db
      .query("notices")
      .withIndex("by_class", q => q.eq("class", args.className))
      .order("desc")
      .collect();
    return notices;
  },
});

// Search notices by keyword
export const searchNotices = query({
  args: {
    className: v.string(),
    keyword: v.string(),
  },
  handler: async (ctx, args) => {
    const notices = await ctx.db
      .query("notices")
      .withSearchIndex("search_title", q =>
        q
          .search("title", args.keyword)
          .eq("class", args.className)
      )
      .collect();
    // Sort the notices by _creationTime in descending order
    // Coz Search queries always return results in relevance order based on how well the document matches the search query
    // Different ordering of results are not supported in search queries,must handle in memory
    return notices.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Create a new notice
export const createNotice = mutation({
  args: { className: v.string(), title: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    const notices = await ctx.db.insert("notices", {
      title: args.title,
      description: args.description,
      class: args.className,
    });
    return notices;
  },
});

// Update a notices
export const updateNotice = mutation({
  args: { _id: v.id('notices'), title: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    const { _id } = args;
    await ctx.db.patch(_id, {
      title: args.title,
      description: args.description
    });
  }
});

// Delete a notices
export const deleteNotice = mutation({
  args: { _id: v.id("notices") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
  }
});

// Query notices with date range
export const getNoticesWithDateRange = query({
  args: { className: v.string(), startDate: v.number(), endDate: v.number() },
  handler: async (ctx, args) => {
    const notices = await ctx.db
      .query("notices")
      .withIndex("by_class", q =>
        q.eq("class", args.className)
          .gte("_creationTime", args.startDate)
          .lte("_creationTime", args.endDate)
      )
      .order("desc")
      .collect();
    return notices;
  }
});