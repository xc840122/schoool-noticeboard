// Type definitions for API responses
export type ApiResponse<T = null> = {
  result: boolean;
  messageKey: string;
  data?: T; // Optional, used for successful responses
  errorCode?: string; // Optional, used for errors
};