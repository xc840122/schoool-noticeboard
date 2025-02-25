import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
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
    action: 'View'
  },
  {
    title: 'Message 2',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 3',
    class: 'Normal',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 4',
    class: 'Important',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 5',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 6',
    class: 'Normal',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 7',
    class: 'Important',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 8',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 9',
    class: 'Normal',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 10',
    class: 'Important',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 11',
    class: 'Urgent',
    time: '12:00 PM',
    action: 'View'
  },
  {
    title: 'Message 12',
    class: 'Normal',
    time: '12:00 PM',
    action: 'View'
  },
];

const renderRow = (item: MessageItem) => {
  return (
    <TableRow key={item.title}>
      <TableCell className="font-medium">{item.title}</TableCell>
      <TableCell>{item.class}</TableCell>
      <TableCell>{item.time}</TableCell>
      <TableCell>
        <Button>
          {item.action}
        </Button>
      </TableCell>
    </TableRow>
  )
}

const MessagePage = async () => {

  return (
    <div className="flex flex-col items-center gap-4 p-2">
      {/* Top, breadcrumbs */}
      <div className="w-full">
        <DashboardHeader />
      </div>
      {/* Main contents */}
      <div className="flex flex-col items-center gap-4 w-full md:w-3/4">
        <div className="flex w-full gap-4 justify-evenly">
          <DatePickerWithRange />
          <SearchBar />
        </div>
        <div className="w-full bg-gray-100 p-4 rounded-lg">
          <Table columns={columns} renderRow={renderRow} data={data} />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default MessagePage