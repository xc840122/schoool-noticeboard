import { createMessageData, getMessageListData, searchMessageData } from "@/data/messageData"
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ConvertToPageMap } from "@/lib/utils";
import { MessageFormSchema, SearchInputSchema } from "@/schemas/messageSchema";
import { PaginatedData } from "@/types/commonType";
import { MessageItem } from "@/types/messageType";

// Get message list,convert to MessageItem type
export const getMessageList = async (className: string, keyword: string) => {
  try {
    // Validate keyword
    const result = SearchInputSchema.safeParse({ keyword: keyword });
    const searchInput = result.success ? result.data.keyword : null;
    console.log(`Search input: ${searchInput}`);
    // Get message list from data, call search if keyword is not null
    const messages = searchInput !== null
      ? await searchMessageData(className, searchInput)
      : await getMessageListData(className);

    // Return empty array if messages is null
    if (messages === null) {
      return [];
    }

    // Generate message list with pagination info
    // Conver to MessageItem type
    const messageList: PaginatedData<MessageItem>[]
      = messages.map((message, index) => {
        // Generate page number as key
        const pageNumber = Math.floor(index / ITEM_PER_PAGE) + 1;
        return {
          page: pageNumber,
          item: {
            id: message._id,
            title: message.title,
            description: message.description,
            class: className,
            time: new Date(message._creationTime)
          }
        };
      });
    return messageList;
  } catch (error) {
    throw new Error(`Failed to get message list with page info: ${error}`);
  }
}

// // Convert to message map with page number as key
export const getMessageListWithPage = async (messageList: PaginatedData<MessageItem>[]) => {
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

