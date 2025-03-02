'use client'

import { deleteMessage } from "@/app/business/messageBusiness";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MessageItem } from "@/types/messageType";
import { useState, useTransition } from "react";

const DialogCard = ({ defaultData }: { defaultData: MessageItem }) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition(); // Ensures UI remains interactive

  const onConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    startTransition(async () => {
      try {
        await deleteMessage(defaultData.id); // Ensure deletion completes
        // router.refresh(); // Refresh the list after successful deletion
      } catch (err) {
        setError(`Failed to delete message. Please try again. ${err}`);
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
          This action cannot be undone. This will permanently remove the message.
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