import { v } from "convex/values";
import { internalMutation, internalQuery, mutation } from "./_generated/server";
import { getVerificationInfoModel, updateVerificationInfoModel } from "./models/auth_model";

// Query to get the verification information by code
export const getVerificationInfo = internalQuery({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await getVerificationInfoModel(ctx, args.code);
  }
});

export const updateVerificationInfo = internalMutation({
  args: { id: v.id("verification_info"), isValid: v.boolean() },
  handler: async (ctx, args) => {
    await updateVerificationInfoModel(ctx, args.id, args.isValid);
  }
});

// Mutation to process verification information
export const signUpCodeVerification = mutation({
  args: { code: v.string(), class: v.string() },
  handler: async (ctx, args) => {
    try {
      // Fetch verification information
      const verificationInfo = await getVerificationInfoModel(ctx, args.code);
      // If no verification information is found
      if (!verificationInfo) {
        return null;
      }
      await updateVerificationInfoModel(ctx, verificationInfo._id, false);
      return verificationInfo;
    } catch (error) {
      console.error(`Transaction failed: ${error}`);
      return null;
    }
  },
});