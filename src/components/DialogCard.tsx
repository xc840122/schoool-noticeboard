'use client'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteNotice } from "@/services/notice-service";
import { NoticeDataModel } from "@/types/convex-type";
import { useState, useTransition } from "react";

const DialogCard = ({ defaultData }: { defaultData: NoticeDataModel }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition(); // Ensures UI remains interactive

  const onConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    startTransition(async () => {
      try {
        await deleteNotice(defaultData._id); // Ensure deletion completes
        // router.refresh(); // Refresh the list after successful deletion
      } catch (err) {
        setError(`Failed to delete notice. Please try again. ${err}`);
      }
    });
  };

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
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <AlertDialogFooter className="flex items-center justify-center gap-2">
        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
        <form onSubmit={onConfirm}>
          <AlertDialogAction type="submit" disabled={isPending}>
            {isPending ? "Deleting..." : "Confirm"}
          </AlertDialogAction>
        </form>
      </AlertDialogFooter>
    </>
  );
};

export default DialogCard;