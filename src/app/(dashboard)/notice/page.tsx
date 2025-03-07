import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import DialogModal from "@/components/DialogModal";
import SearchBar from "@/components/forms/SearchBarForm";
import NoticeForm from "@/components/forms/NoticeForm";
import userHelper from "@/helper/user-helper";
import { SignIn } from "@clerk/nextjs";

export const NoticePage = async () => {

  // Get user role and classroom
  const user = await userHelper();
  if (!user) return <SignIn />;
  const { role, classroom } = user;

  return (
    // <div className="flex flex-col md:flex-row md:justify-between items-end gap-4 w-full">
    <>
      <DatePickerWithRange className="w-full md:w-auto" />
      <SearchBar />
      {role === 'teacher'
        ? <DialogModal
          triggerButtonText="New notice"
          triggerButtonStyles="w-full md:w-auto"
        >
          <NoticeForm operationType="create" classroom={classroom!} />
        </DialogModal> : null}
    </>
    // </div>
  )
}

export default NoticePage