'use client'
import { deleteNoticeAction } from "@/actions/notice/delete-action";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { NoticeDataModel } from "@/types/convex-type";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const DialogCard = ({ defaultData }: { defaultData: NoticeDataModel }) => {

  const [state, formAction, isPending] = useActionState(deleteNoticeAction, {
    feedback: { result: false, message: "" }
  });

  // Prevent multiple toasts by using useEffect to listen to the feedback state change
  useEffect(() => {
    if (state.feedback.message) {
      if (state.feedback.result) {
        toast.success(state.feedback.message);
      } else {
        toast.error(state.feedback.message);
      }
    }
  }, [state.feedback]);

  // useEffect(() => {
  //   // Handle the toast message
  //   if (state.feedback.result) {
  //     toast.success(state.feedback.message);
  //   }
  //   else {
  //     toast.error(state.feedback.message);
  //   }
  // }, [state.feedback]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {`Are you sure you want to delete ${defaultData.title}?`}
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently remove the notice.
        </AlertDialogDescription>
      </AlertDialogHeader>
      {!state.feedback.result && <p className="text-red-500 text-sm">{state.feedback.message}</p>}
      <AlertDialogFooter className="flex items-center justify-center gap-2">
        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
        <form
          autoComplete="off"
          action={formAction}
        >
          <input type="hidden" name="id" value={defaultData._id} />
          <AlertDialogAction disabled={isPending}>
            {isPending ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </form>
      </AlertDialogFooter>
    </>
  );
};

export default DialogCard;