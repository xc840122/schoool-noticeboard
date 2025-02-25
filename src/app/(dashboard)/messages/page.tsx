import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogCard from "@/components/DialogCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";


export type MessageItem = {
  title: string;
  class: string;
  time: string;
  action: string;
}

const dialogContent = {
  operation: 'Delete',
  title: 'Are you absolutely sure?',
  description: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
};

const columns = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'Class',
    accessor: 'class',
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
    class: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 2',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 3',
    class: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 4',
    class: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 5',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 6',
    class: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 7',
    class: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 8',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 9',
    class: 'Normal',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 10',
    class: 'Important',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 11',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'Delete'
  },
  {
    title: 'Message 12',
    class: 'Normal',
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
      <TableCell>{item.class}</TableCell>
      <TableCell>{item.time}</TableCell>
      <TableCell>
        {/* Bind FormModal to buttons */}
        {item.action ? (
          <div className="flex gap-2">
            <DialogCard diglogContent={dialogContent} />
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
        <Button className="w-full md:w-auto">
          Create Message
        </Button>
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