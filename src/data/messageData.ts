/**
 * Message repository
 * 
 */
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

/**
 * Get message list by class name from database
 * Apply beta function fetchQuery from convex/nextjs for SSR
 * @param className 
 * @returns 
 */
export const getMessageListData = async (className: string) => {
  try {
    const messageList = await fetchQuery(
      api.message.getMessageList,
      { className: className }
    );
    return messageList;
  } catch (error) {
    throw new Error(`Failed to get message list from db: ${error}`);
  }
}