/**
 * Message data layer
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
    console.error(`Failed to get message list from db: ${error}`);
    return [];
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
    console.error(`Failed to search message: ${error}`);
    return [];
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
    console.error(`Failed to create message: ${error}`);
    return null;
  }
}

export const updateMessageData = async (id: string, title: string, description: string) => {
  try {

    await fetchMutation(
      api.message.updateMessage,
      {
        _id: id,
        title: title,
        description: description
      }
    );
  } catch (error) {
    console.error(`Failed to update message: ${error}`);
  }
}

export const deleteMessageData = async (id: string) => {
  try {
    await fetchMutation(
      api.message.deleteMessage,
      { _id: id }
    );
  } catch (error) {
    console.error(`Failed to delete message: ${error}`);
  }
}

