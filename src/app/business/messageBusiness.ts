import { getMessageListData } from "@/data/messageData"
import { MessageItem } from "@/types/messageType";

// Get message list with pagination info.
export const getMessageListWithPagination = async (className: string) => {
  try {
    const messages = await getMessageListData(className);
    const count = messages.length;
    // Get total page number
    const pageNumber = Math.ceil(count / 10);
    // Convert message list to MessageItem for display
    if (messages.length > 0) {
      const messageList: MessageItem[]
        = Array.from(messages, (message) => {
          return {
            title: message.title,
            description: message.description,
            class: className,
            time: new Date(message._creationTime)
          }
        });
      return { messageList, count, pageNumber };
    }

  } catch (error) {
    throw new Error(`Failed to convert message list: ${error}`);
  }
}