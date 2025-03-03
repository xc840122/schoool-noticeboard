import { PaginatedData } from "@/types/commonType";
import { MessageItem } from "@/types/messageType";

// Convert array to map with page number as key and item list as value
export const ConvertToPageMap = (arr: PaginatedData<MessageItem>[]) => {

  // Return message list by page number,[page number, message list]
  const messagesPerPage = new Map<number, MessageItem[]>();
  for (const { page, item } of arr) {
    // for new page, create new array
    if (!messagesPerPage.has(page)) {
      messagesPerPage.set(page, []);
    }
    // for existing page, push message item
    messagesPerPage.get(page)?.push(item);
  }
  return messagesPerPage;
}