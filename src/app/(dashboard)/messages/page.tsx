'use client';

import { getMessageListWithPage, paginateMessages } from "@/business/messageBusiness";
import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogCard from "@/components/DialogCard";
import DialogModal from "@/components/DialogModal";
import MessageForm from "@/components/forms/MessageForm";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import { TableCell, TableRow } from "@/components/ui/table";
import { MessageItem } from "@/types/messageType";
import { useMessageData } from "@/hooks/useMessageData";


export const className = '3A';

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

const MessagePage = () => {

  // Get message data from useMessageData hook
  const { messages, pageNum, totalPages } = useMessageData();

  if (messages === undefined) {
    return [];
  }

  // Generate message list with pagination info
  const messagesWithPageInfo = getMessageListWithPage(paginateMessages(messages ?? []));
  // Get message list by page number
  const messagesPerPage = messagesWithPageInfo.get(pageNum) ?? [];

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

const renderRow = (item: MessageItem) => {
  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
      key={item.id}
    >
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.time?.toString()}</TableCell>
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
            <MessageForm operationType="edit" defaultData={item} />
          </DialogModal>
        </div>
      </TableCell>
    </TableRow>
  )
}


/**
 * This is the SSR page which is not apply convex subscription features to update data
 * It uses feathQuery to fetch data and display it(Beta SSR feature of Convex,without data subscription)
 * It applies traditional way by router.refresh() to update data
 */

// import { getMessageList, getMessageListWithPage } from "@/app/business/messageBusiness";
// import DashboardHeader from "@/components/DashboardHeader"
// import { DatePickerWithRange } from "@/components/DatePickerWithRange";
// import DialogCard from "@/components/DialogCard";
// import DialogModal from "@/components/DialogModal";
// import MessageForm from "@/components/forms/MessageForm";
// import Pagination from "@/components/Pagination";
// import SearchBar from "@/components/SearchBar";
// import Table from "@/components/Table";
// import { TableCell, TableRow } from "@/components/ui/table";
// import { PaginatedData } from "@/types/commonType";
// import { MessageItem } from "@/types/messageType";


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

// const renderRow = (item: MessageItem) => {
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
//             <MessageForm operationType="edit" defaultData={item} />
//           </DialogModal>
//         </div>
//       </TableCell >
//     </TableRow >
//   )
// }

// const MessagePage = async ({ searchParams }: {
//   searchParams: { page?: string, search?: string }
// }) => {
//   // Extract page from url, defaulting to '1' if missing
//   const { page } = await searchParams;
//   const pageNum = parseInt(page ?? '1');

//   const { search } = await searchParams;
//   const searchValue = (search ?? '').trim();

//   // Get message map
//   const messageList = await getMessageList(className, searchValue);
//   const messagesWithPageInfo = await getMessageListWithPage(messageList as PaginatedData<MessageItem>[]);

//   // Get message list by page number
//   const messagesPerPage = messagesWithPageInfo.get(pageNum) ?? [];

//   //  Get total page number
//   const totalPages = messagesWithPageInfo.size;

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
//           triggerButtonText="New Message"
//           triggerButtonStyles="w-full md:w-auto"
//         >
//           <MessageForm operationType="create" />
//         </DialogModal>
//       </div>
//       {/* Table content */}
//       <div className="w-full bg-gray-50 p-4 rounded-lg">
//         <Table columns={columns} renderRow={renderRow} data={messagesPerPage} />
//         <Pagination currentPage={pageNum} totalPages={totalPages} />
//       </div>
//     </div>
//   )
// }

// export default MessagePage