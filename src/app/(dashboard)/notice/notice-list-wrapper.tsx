'use client';

import { useQuery } from "convex/react";
import { DateToConvexTime } from "@/utils/date-convertor";
import { useMetadata } from "@/hooks/use-metadata";
import { useURLParams } from "@/hooks/use-params";
import { api } from "../../../../convex/_generated/api";
import NoticeListContent from "./notice-list";
import Loading from "@/components/Loading";
import { SignIn } from "@clerk/nextjs";

const NoticeListWrapper = () => {
  // Get search value, start date, end date, page number from URL
  const { searchValue, startDate, endDate, pageNum, mode } = useURLParams();
  // Get role and classroom from session (metadata)
  const { status, role, classroom } = useMetadata();
  // Get notice list (auto handle search, date range)
  const notices = useQuery(
    api.notice.getNotices,
    {
      classroom: classroom,
      keyword: searchValue,
      startDate: DateToConvexTime(startDate, true),
      endDate: DateToConvexTime(endDate, false)
    }
  ) ?? [];

  // Handle the Loading, unAuthenticated
  if (notices === undefined) return <Loading />;
  if (status === 'unAuthenticated') return <SignIn />;

  return (
    <NoticeListContent
      mode={mode}
      pageNum={pageNum}
      status={status}
      role={role}
      notices={notices}
      classroom={classroom}
    />
  )
}

export default NoticeListWrapper