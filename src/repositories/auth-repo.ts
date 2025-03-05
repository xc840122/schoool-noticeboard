import { fetchMutation } from "convex/nextjs"
import { api } from "../../convex/_generated/api";
// import { Id } from "../../convex/_generated/dataModel";

/**
 * Mutation to process verification information
 * @param code verification code input by new user
 * @param classroom classroom code input by new user
 * @returns
 */
export const signUpCodeVerificationRepo = async (code: string, classroom: string) => {
  try {
    const verificationInfo = await fetchMutation(
      api.auth.signUpCodeVerification,
      { code: code, class: classroom }
    );
    if (!verificationInfo) {
      console.error(`No verification information found from db: ${code}`);
      return null;
    }
    return verificationInfo;
  } catch (error) {
    console.error(`Failed to update verification information in db: ${error}`);
    return null;
  }
}

/**
 * Query to get the verification information by code
 * @param code
 * @returns
 */
// export const getVerificationInfoRepo = async (code: string) => {
//   try {
//     const verificationInfo = await fetchQuery(
//       api.auth.getVerificationInfo,
//       { code: code }
//     );
//     console.log(`Verification info: ${verificationInfo}`);
//     // If no verification information is found, log an error and return null
//     if (!verificationInfo) {
//       console.error(`No verification information found from db: ${code}`);
//       return null;
//     }
//     return verificationInfo;
//   } catch (error) {
//     console.error(`Failed to get verification information from db: ${error}`);
//     return null;
//   }
// }

/**
 * Mutation to update the verification information
 * @param id
 * @param isValid
 */
// export const updateVerificationInfoRepo = async (id: string, isValid: boolean) => {
//   try {
//     await fetchMutation(
//       api.auth.updateVerificationInfo,
//       { id: id as Id<'verification_info'>, isValid: isValid }
//     );
//   } catch (error) {
//     console.error(`Failed to update verification information in db: ${error}`);
//     return null;
//   }
// }