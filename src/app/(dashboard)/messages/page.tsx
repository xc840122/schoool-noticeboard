import DashboardHeader from "@/components/DashboardHeader"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";


const MessagePage = async () => {

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
          <Table />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default MessagePage