'use client';

import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogCard from "@/components/DialogCard";
import DialogModal from "@/components/DialogModal";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/forms/SearchBarForm";
import Table from "@/components/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import NoticeForm from "@/components/forms/NoticeForm";
import { columns } from "@/constants/notice-data";
import { NoticeDataModel } from "@/types/convex-type";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Loading from "@/components/Loading";
import { paginatedNotices } from "@/services/notice-service";
import { useSearchParams } from "next/navigation";
import { ConvexTimeToDisplayFormat } from "@/utils/date-convertor";

export const className = '3A';

const NoticePage = () => {

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

  // Get notice list
  const noticeList = useQuery(
    api.notice.getNotices,
    { className: className }
  );

  // Get search result if search value is not empty
  const searchResult = useQuery(
    api.notice.searchNotices,
    { className: className, keyword: searchValue }
  );

  // Get date range result if start and end date are not empty
  const dateRangeResult = useQuery(
    api.notice.getNoticesWithDateRange,
    {
      className: className,
      startDate: (new Date(startDate)).getTime(),
      endDate: (new Date(endDate)).getTime()
    }
  );

  // Get notice list according to params
  const notices = searchValue !== ''
    ? searchResult
    : (startDate !== '' && endDate !== '')
      ? dateRangeResult
      : noticeList;

  if (!notices) return <Loading />;

  // Get total pages
  const totalPages = Math.ceil(notices?.length ?? 0 / 10);

  // Get notice list by page number
  const noticesPerPage = paginatedNotices(notices).get(pageNum);

  const renderRow = (item: NoticeDataModel) => {
    return (
      <TableRow
        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
        key={item._id}
      >
        <TableCell className="font-medium">{item.title}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>{ConvexTimeToDisplayFormat(item._creationTime)}</TableCell>
        <TableCell>
          {/* Bind FormModal to buttons*/}
          <div className="flex gap-2">
            {/* Delete button and dialog */}
            <DialogModal triggerButtonText="Delete">
              <DialogCard
                defaultData={item}
              />
            </DialogModal>
            {/* Edit button and dialog */}
            <DialogModal
              triggerButtonText="Edit"
            >
              <NoticeForm operationType="edit" defaultData={item} />
            </DialogModal>
          </div>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <div className="flex flex-col container mx-auto max-w-5xl items-center gap-4 p-2">
      {/* Top, breadcrumbs */}
      <div className="w-full">
        <DashboardHeader />
      </div>
      {/* Function bar */}
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 w-full">
        <DatePickerWithRange className="w-full md:w-auto" />
        <SearchBar />
        <DialogModal
          triggerButtonText="New notice"
          triggerButtonStyles="w-full md:w-auto"
        >
          <NoticeForm operationType="create" />
        </DialogModal>
      </div>
      {/* Table content */}
      <div className="w-full bg-gray-50 p-4 rounded-lg">
        {/* [] to avoid crash */}
        <Table columns={columns} renderRow={renderRow} data={noticesPerPage ?? []} />
        <Pagination currentPage={pageNum} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default NoticePage


/**
 * This is the SSR page which is not apply convex subscription features to update data
 * It uses feathQuery to fetch data and display it(Beta SSR feature of Convex,without data subscription)
 * It applies traditional way by router.refresh() to update data
 */

// import { getnoticeList, getnoticeListWithPage } from "@/app/business/noticeBusiness";
// import DashboardHeader from "@/components/DashboardHeader"
// import { DatePickerWithRange } from "@/components/DatePickerWithRange";
// import DialogCard from "@/components/DialogCard";
// import DialogModal from "@/components/DialogModal";
// import noticeForm from "@/components/forms/noticeForm";
// import Pagination from "@/components/Pagination";
// import SearchBar from "@/components/SearchBar";
// import Table from "@/components/Table";
// import { TableCell, TableRow } from "@/components/ui/table";
// import { PaginatedData } from "@/types/commonType";
// import { noticeItem } from "@/types/noticeType";


// export const className = '3A';

// const columns = [
//   {
//     header: 'Title',
//     accessor: 'title',
//   },
//   {
//     header: 'Description',
//     accessor: 'description',
//   },
//   {
//     header: 'Time',
//     accessor: 'time',
//   },
//   {
//     header: 'Actions',
//     accessor: 'action',
//   }
// ];

// const renderRow = (item: noticeItem) => {
//   return (
//     <TableRow
//       className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
//       key={item.id}
//     >
//       <TableCell className="font-medium">{item.title}</TableCell>
//       <TableCell>{item.description}</TableCell>
//       <TableCell>{item.time?.toString()}</TableCell>
//       <TableCell>
//         {/* Bind FormModal to buttons*/}
//         <div className="flex gap-2">
//           {/* Delete button and dialog */}
//           <DialogModal triggerButtonText="Delete">
//             <DialogCard
//               defaultData={item}
//             />
//           </DialogModal>
//           {/* Edit button and dialog */}
//           <DialogModal
//             triggerButtonText="Edit"
//           >
//             <noticeForm operationType="edit" defaultData={item} />
//           </DialogModal>
//         </div>
//       </TableCell >
//     </TableRow >
//   )
// }

// const noticePage = async ({ searchParams }: {
//   searchParams: { page?: string, search?: string }
// }) => {
//   // Extract page from url, defaulting to '1' if missing
//   const { page } = await searchParams;
//   const pageNum = parseInt(page ?? '1');

//   const { search } = await searchParams;
//   const searchValue = (search ?? '').trim();

//   // Get notice map
//   const noticeList = await getnoticeList(className, searchValue);
//   const noticesWithPageInfo = await getnoticeListWithPage(noticeList as PaginatedData<noticeItem>[]);

//   // Get notice list by page number
//   const noticesPerPage = noticesWithPageInfo.get(pageNum) ?? [];

//   //  Get total page number
//   const totalPages = noticesWithPageInfo.size;

//   return (
//     <div className="flex flex-col container mx-auto max-w-5xl items-center gap-4 p-2">
//       {/* Top, breadcrumbs */}
//       <div className="w-full">
//         <DashboardHeader />
//       </div>
//       {/* Function bar */}
//       <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 w-full">
//         <DatePickerWithRange className="w-full md:w-auto" />
//         <SearchBar />
//         <DialogModal
//           triggerButtonText="New notice"
//           triggerButtonStyles="w-full md:w-auto"
//         >
//           <noticeForm operationType="create" />
//         </DialogModal>
//       </div>
//       {/* Table content */}
//       <div className="w-full bg-gray-50 p-4 rounded-lg">
//         <Table columns={columns} renderRow={renderRow} data={noticesPerPage} />
//         <Pagination currentPage={pageNum} totalPages={totalPages} />
//       </div>
//     </div>
//   )
// }

// export default noticePage