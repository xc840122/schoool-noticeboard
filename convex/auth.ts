import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getVerificationInfoModel, updateVerificationInfoModel } from "./models/auth_model";


// Mutation to process verification information
export const signUpCodeVerification = mutation({
  args: { code: v.string(), classroom: v.string() },
  handler: async (ctx, args) => {
    try {
      // Fetch verification information
      const verificationInfo = await getVerificationInfoModel(ctx, args.code);

      // Check if verification information is valid
      if (!verificationInfo
        || verificationInfo.isValid !== true
        || verificationInfo.classroom.toLowerCase() !== args.classroom.toLowerCase()) {
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