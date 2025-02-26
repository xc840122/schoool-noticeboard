import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogCard from "@/components/DialogCard";
import DialogModal from "@/components/DialogModal";
import MessageForm from "@/components/forms/MessageForm";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import { TableCell, TableRow } from "@/components/ui/table";


export type MessageItem = {
  title: string;
  description: string;
  time: string;
  action: string;
}

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

const data = [
  {
    title: 'Message 1',
    description: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 2',
    description: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 3',
    description: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 4',
    description: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 5',
    description: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 6',
    description: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 7',
    description: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 8',
    description: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 9',
    description: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 10',
    description: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 11',
    description: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 12',
    description: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
];

const renderRow = (item: MessageItem) => {
  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
      key={item.title}
    >
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.time}</TableCell>
      <TableCell>
        {/* Bind FormModal to buttons*/}
        {item.action ? (
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
        ) : null
        }
      </TableCell>
    </TableRow>
  )
}

const MessagePage = async () => {

  return (
    <div className="flex flex-col container mx-auto max-w-5xl items-center gap-4 p-2">
      {/* Top, breadcrumbs */}
      <div className="w-full">
        <DashboardHeader />
      </div>
      {/* Function bar */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full">
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
        <Table columns={columns} renderRow={renderRow} data={data} />
        <Pagination />
      </div>
    </div>
  )
}

export default MessagePage