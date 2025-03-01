import { getMessageListData } from "@/data/messageData"
import { ITEM_PER_PAGE } from "@/lib/settings";
import { MessageItem } from "@/types/messageType";

// Get message list with pagination info.
export const getMessageListWithPagination = async (className: string) => {
  try {
    // Get message list from data
    const messages = await getMessageListData(className);
    // Generate message list with pagination info,
    // conver to MessageItem type
    if (messages !== null && messages.length > 0) {
      const messageList: { page: number, messageItem: MessageItem }[]
        = messages.map((message, index) => {
          // Generate page number as key
          const pageNumber = Math.floor(index / ITEM_PER_PAGE) + 1;
          return {
            page: pageNumber,
            messageItem: {
              title: message.title,
              description: message.description,
              class: className,
              time: new Date(message._creationTime)
            }
          };
        });
      // Return message list by page number,[page number, message list]
      const messagesPerPage = new Map<number, MessageItem[]>();
      for (const { page, messageItem } of messageList) {
        // for new page, create new array
        if (!messagesPerPage.has(page)) {
          messagesPerPage.set(page, []);
        }
        // for existing page, push message item
        messagesPerPage.get(page)?.push(messageItem);
      }
      return messagesPerPage;
    }
  } catch (error) {
    throw new Error(`Failed to convert message list: ${error}`);
  }
}