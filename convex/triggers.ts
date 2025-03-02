import { Triggers } from "convex-helpers/server/triggers";
import { DataModel } from "./_generated/dataModel";

export const triggers = new Triggers<DataModel>();

export const maintainCombinedSearch = triggers.register("message", async (ctx, change) => {
  if (change.newDoc) {
    const combinedSearch = `${change.newDoc.title} ${change.newDoc.description}`;
    if (change.newDoc.combinedSearch !== combinedSearch) {
      await ctx.db.patch(change.id, { combinedSearch });
    }
  }
});