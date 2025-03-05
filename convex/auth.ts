import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getVerificationInfoModel, updateVerificationInfoModel } from "./models/auth_model";


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