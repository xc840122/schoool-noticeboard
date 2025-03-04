import { signUpCodeVerificationRepo } from "@/repositories/auth-repo";
import { ApiResponse } from "@/types/api-type";
import { VerificationInfoDataModel } from "@/types/convex-type";


export const signUpVerificationService = async (code: string, className: string)
  : Promise<ApiResponse<VerificationInfoDataModel>> => {
  try {
    // Get the verification information by code
    const verificationInfo = await signUpCodeVerificationRepo(code, className);

    // // If no verification information is found,return false
    if (!verificationInfo)
      return { result: false, messageKey: "ERROR.CODE_NOT_FOUND" };

    // If the verification code is invalid, return false
    if (verificationInfo.isValid !== true) {
      return { result: false, messageKey: "ERROR.INVALID_CODE" };
    }
    // If the classroom doesn't match, return false
    if (verificationInfo.class !== className) {
      return { result: false, messageKey: "ERROR.CLASSROOM_NOT_MATCH" };
    }
    return { result: false, messageKey: "SUCCESS.VERIFICATION_SUCCESSFUL", data: verificationInfo };;

  } catch (error) {
    console.error(`Failed to get verification information from db: ${error}`);
    return { result: false, messageKey: "ERROR.UNKNOWN" };
  }
} 