import { createMessageData, deleteMessageData, getMessageListData, searchMessageData } from "@/data/messageData"
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ConvertToPageMap } from "@/lib/utils";
import { MessageFormSchema, SearchInputSchema } from "@/schemas/messageSchema";
import { PaginatedData } from "@/types/commonType";
import { MessageDataModel, MessageItem } from "@/types/messageType";


// Get message list,convert to MessageItem type
export const getMessageList = async (className: string, keyword: string) => {
  try {
    // Validate keyword
    const result = SearchInputSchema.safeParse({ keyword: keyword });
    const searchInput = result.success ? result.data.keyword : null;
    // Get message list from data, call search if keyword is not null
    const messages = searchInput !== null
      ? await searchMessageData(className, searchInput)
      : await getMessageListData(className);

    // Return empty array if messages is null
    if (messages === null) {
      return [];
    }
    return paginateMessages(messages);
  } catch (error) {
    throw new Error(`Failed to get message list with page info: ${error}`);
  }
}

// Generate message list with pagination info
// Conver to MessageItem type
const paginateMessages = (messages: MessageDataModel[]): PaginatedData<MessageItem>[] => {
  return messages.map((message, index) => {
    // Generate page number as key
    const pageNumber = Math.floor(index / ITEM_PER_PAGE) + 1;
    return {
      page: pageNumber,
      item: {
        id: message._id,
        title: message.title,
        description: message.description,
        class: message.class,
        time: new Date(message._creationTime)
      }
    };
  });
}

// // Convert to message map with page number as key
export const getMessageListWithPage = (messageList: PaginatedData<MessageItem>[]) => {
  try {
    if (messageList === null) {
      throw new Error(`Message list is null`);
    }
    // Convert to message map with page number as key
    const messageMap = ConvertToPageMap(messageList);
    return messageMap;

  } catch (error) {
    throw new Error(`Failed to convert message list: ${error}`);
  }
}

// Create a new message
export const createMessage = async (className: string, title: string, description: string) => {
  try {
    // Validate form input
    const result = MessageFormSchema.safeParse({ title: title, description: description });
    if (!result.success) {
      throw new Error(`Invalid form input: ${result.error}`);
    }
    // Create new message
    const newMessage = await createMessageData(className, title, description);
    // console.log('New message business:', newMessage);
    return newMessage;
  } catch (error) {
    throw new Error(`Failed to create message: ${error}`);
  }
}

export const deleteMessage = async (id: string) => {
  try {
    // Delete message
    await deleteMessageData(id);
  } catch (error) {
    throw new Error(`Failed to delete message: ${error}`);
  }
}

