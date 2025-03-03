import { PaginatedData } from "@/types/commonType"
import { MessageItem } from "@/types/messageType"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

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

// Clear search params
export const clearSearchParams = (searchParams: URLSearchParams) => {
  searchParams.forEach((value, key) => {
    searchParams.delete(key);
  });
}

// Convert date string to _creationTime (Convex format)
export const convertDateToCreationTime = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getTime();
}
