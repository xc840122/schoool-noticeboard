import DialogCard from "@/components/DialogCard";
import DialogModal from "@/components/DialogModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import NoticeForm from "@/components/forms/NoticeForm";
import { NoticeDataModel } from "@/types/convex-type";
import Loading from "@/components/Loading";
import { paginatedNotices } from "@/services/notice-service";
import { ConvexTimeToDisplayFormat } from "@/utils/date-convertor";
import { ClassroomEnum } from "@/constants/class-enum";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { SignIn } from "@clerk/nextjs";

export const NoticeListContent = ({
  pageNum,
  status,
  role,
  notices,
  classroom,
}: {
  pageNum: number,
  status: 'loading' | 'unAuthenticated' | 'authenticated',
  role: 'student' | 'teacher',
  classroom: ClassroomEnum,
  notices: NoticeDataModel[] | undefined,
}) => {
  // Handle the Loading, unAuthenticated
  if (!notices) return <Loading />;
  if (status === 'unAuthenticated') return <SignIn />;

  // Get total pages
  const totalPages = Math.ceil(notices.length / ITEM_PER_PAGE);
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
    // <div className="w-full bg-gray-50 p-4 rounded-lg">
    <>
      {/* Table content,[] to avoid crash */}
      <Table columns={columns} renderRow={renderRow} data={noticesPerPage ?? []} />
      {/* Pagination */}
      <Pagination currentPage={pageNum} totalPages={totalPages} />
    </>
    // </div>
  )
}

export default NoticeListContent