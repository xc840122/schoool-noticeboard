import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getVerificationInfoModel, updateVerificationInfoModel } from "./models/auth_model";

// Query to get the verification information by code
export const getVerificationInfo = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await getVerificationInfoModel(ctx, args.code);
  }
});

export const updateVerificationInfo = mutation({
  args: { id: v.id("verification_info"), isValid: v.boolean() },
  handler: async (ctx, args) => {
    await updateVerificationInfoModel(ctx, args.id, args.isValid);
  }
});