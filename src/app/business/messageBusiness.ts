import { getMessageListData, searchMessageData } from "@/data/messageData"
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ConvertToPageMap } from "@/lib/utils";
import { PaginatedData } from "@/types/commonType";
import { MessageItem } from "@/types/messageType";

// Get message list,convert to MessageItem type
export const getMessageList = async (className: string, keyword: string) => {
  try {
    // Get message list from data, call search if keyword is not null
    const messages = (keyword !== '') && (keyword !== null)
      ? await searchMessageData(className, keyword)
      : await getMessageListData(className);
    // Generate message list with pagination info
    // Conver to MessageItem type
    if (messages !== null && messages.length > 0) {
      const messageList: PaginatedData<MessageItem>[]
        = messages.map((message, index) => {
          // Generate page number as key
          const pageNumber = Math.floor(index / ITEM_PER_PAGE) + 1;
          return {
            page: pageNumber,
            item: {
              title: message.title,
              description: message.description,
              class: className,
              time: new Date(message._creationTime)
            }
          };
        });
      return messageList;
    }
  } catch (error) {
    throw new Error(`Failed to get message list with page info: ${error}`);
  }
}

// // Convert to message map with page number as key
export const getMessageListWithPage = async (messageList: PaginatedData<MessageItem>[]) => {
  try {
    if (messageList === null || messageList.length === 0) {
      throw new Error(`Message list is empty`);
    }
    // Convert to message map with page number as key
    const messageMap = ConvertToPageMap(messageList);
    return messageMap;

  } catch (error) {
    throw new Error(`Failed to convert message list: ${error}`);
  }
}

