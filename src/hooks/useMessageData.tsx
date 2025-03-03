'use client';

import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { className } from "@/app/(dashboard)/messages/page";
import { convertDateToCreationTime } from "@/lib/utils";

export const useMessageData = () => {

  const searchParams = useSearchParams();
  // Extract page from url, defaulting to '1' if missing
  const pageNum = parseInt(searchParams.get('page') ?? '1');

  // Get search keyword from url
  const searchValue = searchParams.has('search')
    ? (searchParams.get('search') ?? '').trim().toLowerCase()
    : '';

  // Get start and end date from url
  const startDate = searchParams.has('start')
    ? searchParams.get('start') ?? ''
    : '';
  const endDate = searchParams.has('end')
    ? searchParams.get('end') ?? ''
    : '';

  // Get message list
  const messageList = useQuery(
    api.message.getMessageList,
    { className: className }
  );

  // Get search result if search value is not empty
  const searchResult = useQuery(
    api.message.searchMessage,
    { className: className, keyword: searchValue }
  );

  // Get date range result if start and end date are not empty
  const dateRangeResult = useQuery(
    api.message.getMessageListWithDateRange,
    {
      className: className,
      startDate: convertDateToCreationTime(startDate),
      endDate: convertDateToCreationTime(endDate)
    }
  );

  // Get message list according to params
  const messages = searchValue !== ''
    ? searchResult
    : (startDate !== '' && endDate !== '')
      ? dateRangeResult
      : messageList;

  // Get total pages
  const totalPages = Math.ceil(messages?.length ?? 0 / 10);

  return { messages, pageNum, totalPages };
}