'use client';

import { Suspense } from "react";
import NoticeListWrapper from "./notice-list-wrapper";
import Loading from "@/components/Loading";

const NoticePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NoticeListWrapper />
    </Suspense>
  );
};

export default NoticePage;
