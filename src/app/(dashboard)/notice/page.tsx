'use client';

import { useQuery } from "convex/react";
import { DateToConvexTime } from "@/utils/date-convertor";
import { useMetadata } from "@/hooks/use-metadata";
import { useURLParams } from "@/hooks/use-params";
import NoticePageContent from "./notice-page";
import { api } from "../../../../convex/_generated/api";

const NoticePage = () => {
  // Get search value, start date, end date, page number from URL
  const { searchValue, startDate, endDate, pageNum } = useURLParams();
  // Get role and classroom from session (metadata)
  const { status, role, classroom } = useMetadata();
  // Get notice list (auto handle search, date range)
  const notices = useQuery(
    api.notice.getNotices,
    {
      classroom: classroom,
      keyword: searchValue,
      startDate: DateToConvexTime(startDate),
      endDate: DateToConvexTime(endDate)
    }
  );
  return <NoticePageContent pageNum={pageNum} status={status} role={role} notices={notices} />
}

export default NoticePage