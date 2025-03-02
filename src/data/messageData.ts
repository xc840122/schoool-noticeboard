/**
 * Message repository
 * 
 */
import { fetchMutation, fetchQuery } from "convex/nextjs";
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

export const searchMessageData = async (className: string, keyword: string) => {
  try {
    const searchResult = await fetchQuery(
      api.message.searchMessage,
      { className: className, keyword: keyword }
    );
    return searchResult;
  } catch (error) {
    throw new Error(`Failed to search message list from db: ${error}`);
  }
}

export const createMessageData = async (className: string, title: string, description: string) => {
  try {
    const newMessage = await fetchMutation(
      api.message.createMessage,
      {
        className: className,
        title: title,
        description: description
      }
    );
    // console.log('New message:', newMessage);
    return newMessage;
  } catch (error) {
    throw new Error(`Failed to create message: ${error}`);
  }
}


// export const updateMessageData = async (id: string, title: string, description: string) => {
//   try {

//     await fetchMutation(
//       api.message.updateMessage,
//       {
//         _id: id,
//         title: title,
//         description: description
//       }
//     );
//   } catch (error) {
//     throw new Error(`Failed to update message: ${error}`);
//   }
// }