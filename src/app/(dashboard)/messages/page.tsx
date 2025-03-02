import { getMessageList, getMessageListWithPage } from "@/app/business/messageBusiness";
import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogCard from "@/components/DialogCard";
import DialogModal from "@/components/DialogModal";
import MessageForm from "@/components/forms/MessageForm";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import { PaginatedData } from "@/types/commonType";
import { MessageItem } from "@/types/messageType";

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
  {
    header: 'Actions',
    accessor: 'action',
  }
];

const renderRow = (item: MessageItem) => {
  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
      key={item.title}
    >
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.time.toString()}</TableCell>
      <TableCell>
        {/* Bind FormModal to buttons*/}
        <div className="flex gap-2">
          {/* Delete button and dialog */}
          <DialogCard
            triggerButtonText="Delete"
            dialogTitle="Are you absolutely sure?"
            dialogDescription="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            cancelText="Cancel"
            confirmText="Delete"
          />
          {/* Edit button and dialog */}
          <DialogModal
            triggerButtonText="Edit"
          >
            <MessageForm operationType="edit" data={{ title: item.title, description: item.description }} />
          </DialogModal>
        </div>
      </TableCell>
    </TableRow>
  )
}

const MessagePage = async ({ searchParams }: {
  searchParams: { page?: string, search?: string }
}) => {
  // Extract page from url, defaulting to '1' if missing
  const { page } = await searchParams;
  const pageNum = parseInt(page ?? '1');

  const { search } = await searchParams;
  const searchValue = (search ?? '').trim();

  // Get message map, Hardcode '3A' as className for testing only
  const messageList = await getMessageList('3A', searchValue);
  const messagesWithPageInfo = await getMessageListWithPage(messageList as PaginatedData<MessageItem>[]);

  // Get message list by page number
  const messagesPerPage = messagesWithPageInfo.get(pageNum) ?? [];

  //  Get total page number
  const totalPages = messagesWithPageInfo.size;

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
          triggerButtonText="New Message"
          triggerButtonStyles="w-full md:w-auto"
        >
          <MessageForm operationType="create" />
        </DialogModal>
      </div>
      {/* Table content */}
      <div className="w-full bg-gray-50 p-4 rounded-lg">
        <Table columns={columns} renderRow={renderRow} data={messagesPerPage} />
        <Pagination currentPage={pageNum} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default MessagePage