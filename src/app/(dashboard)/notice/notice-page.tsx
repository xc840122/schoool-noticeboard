import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogCard from "@/components/DialogCard";
import DialogModal from "@/components/DialogModal";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/forms/SearchBarForm";
import Table from "@/components/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import NoticeForm from "@/components/forms/NoticeForm";
import { NoticeDataModel } from "@/types/convex-type";
import Loading from "@/components/Loading";
import { paginatedNotices } from "@/services/notice-service";
import { ConvexTimeToDisplayFormat } from "@/utils/date-convertor";
import UnAuthenticated from "@/components/UnAuthenticated";
import { ClassroomEnum } from "@/constants/class-enum";
import { ITEM_PER_PAGE } from "@/lib/settings";

export const NoticePageContent = ({
  pageNum,
  status,
  role,
  notices,
  classroom
}: {
  pageNum: number,
  status: 'loading' | 'unAuthenticated' | 'authenticated',
  role: 'student' | 'teacher',
  classroom: ClassroomEnum,
  notices: NoticeDataModel[] | undefined
}) => {

  // Handle the Loading, unAuthenticated
  if (!notices) return <Loading />;
  if (status === 'unAuthenticated') return <UnAuthenticated />;

  // Get total pages
  const totalPages = Math.ceil(notices.length / ITEM_PER_PAGE);

  // Get notice list by page number
  const noticesPerPage = paginatedNotices(notices).get(pageNum);
  console.log('noticesPerPage', noticesPerPage);

  const renderRow = (item: NoticeDataModel) => {
    return (
      <TableRow
        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
        key={item._id}
      >
        <TableCell className="font-medium">{item.title}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>{ConvexTimeToDisplayFormat(item._creationTime)}</TableCell>
        {role === 'teacher' ? <TableCell>
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
              <NoticeForm operationType="edit" classroom={classroom} defaultData={item} />
            </DialogModal>
          </div>
        </TableCell> : null}
      </TableRow>
    )
  }

  // Column data
  const columns = [
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Description',
      accessor: 'description',
    },
    {
      header: 'Time',
      accessor: 'time',
    },
    role === 'teacher' ? {
      header: 'Actions',
      accessor: 'action',
    } : { header: '', accessor: 'action' }
  ];

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
        {role === 'teacher' ? <DialogModal
          triggerButtonText="New notice"
          triggerButtonStyles="w-full md:w-auto"
        >
          <NoticeForm operationType="create" classroom={classroom} />
        </DialogModal> : null}
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

export default NoticePageContent


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


// export const classroom = '3A';

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
//   const noticeList = await getnoticeList(classroom, searchValue);
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