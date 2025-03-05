import { SearchInputValidator } from "@/validators/notice-validator";
import { Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";

/**
 * Get notice list by class name from database
 * according to search keyword or date range
 * @param ctx
 * @param classroom
 * @param keyword
 * @param startDate
 * @param endDate
 * @returns 
 */
export const getNoticesModel = async (
  ctx: QueryCtx,
  classroom: string,
  keyword?: string,
  startDate?: number,
  endDate?: number) => {

  try {
    if (keyword) {
      // Validate keyword
      const result = SearchInputValidator.safeParse({ keyword: keyword });
      const validKeyword = result.success ? result.data.keyword : null;

      if (!validKeyword) {
        throw new Error(`Invalid keyword: ${keyword}`);
      }
      const notices = await ctx.db
        .query("notices")
        .withSearchIndex("search_title", q =>
          q
            .search("title", validKeyword)
            .eq("class", classroom)
        )
        .collect();
      return notices.sort((a, b) => b._creationTime - a._creationTime);
    } else if (startDate && endDate) {
      return await ctx.db
        .query("notices")
        .withIndex("by_class", q =>
          q
            .eq("class", classroom)
            .gte("_creationTime", startDate)
            .lte("_creationTime", endDate)
        )
        .order("desc")
        .collect();
    } else {
      return await ctx.db
        .query("notices")
        .withIndex("by_class", q => q.eq("class", classroom))
        .order("desc")
        .collect();
    }
  } catch (error) {
    console.error("Failed to get notice list:", error);
    throw new Error("Query failed");
  }
};

/**
 * Create a new notice
 * @param classroom
 * @param title
 * @param description
 * @returns 
 */
export const createNoticeModel = async (
  ctx: MutationCtx,
  classroom: string,
  title: string,
  description: string) => {
  try {
    if (!classroom || !title || !description) {
      throw new Error(`Invalid input: ${classroom}, ${title}, ${description}`);
    }
    return await ctx.db.insert("notices", {
      title: title,
      description: description,
      class: classroom,
    });

  } catch (error) {
    console.error("Failed to create notice:", error);
    throw new Error("Insert failed");
  }
}

/**
 * Update a notice
 * @param _id
 * @param title
 * @param description
 */
export const updateNoticeModel = async (
  ctx: MutationCtx,
  _id: Id<'notices'>,
  title: string,
  description: string) => {
  try {
    if (!_id || !title || !description) {
      throw new Error(`Invalid input: ${_id}, ${title}, ${description}`);
    }
    await ctx.db.patch(_id, {
      title: title,
      description: description
    });
  } catch (error) {
    console.error("Failed to update notice:", error);
    throw new Error("Update failed");
  }
}

/**
 * Delete a notice
 * @param _id
 */
export const deleteNoticeModel = async (
  ctx: MutationCtx,
  _id: Id<'notices'>) => {
  try {
    if (!_id) {
      throw new Error(`Invalid input: ${_id}`);
    }
    await ctx.db.delete(_id);
  } catch (error) {
    console.error("Failed to delete notice:", error);
    throw new Error("Delete failed");
  }
}