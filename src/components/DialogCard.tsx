import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DialogModal from "./DialogModal"

const DialogCard = ({
  triggerButtonText,
  dialogTitle,
  dialogDescription,
  cancelText,
  confirmText
}: {
  triggerButtonText: string,
  dialogTitle: string,
  dialogDescription: string
  cancelText: string,
  confirmText?: string
}) => {
  return (
    <DialogModal triggerButtonText={triggerButtonText}>
      <AlertDialogHeader>
        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
        <AlertDialogDescription>
          {dialogDescription}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{cancelText}</AlertDialogCancel>
        <AlertDialogAction>{confirmText}</AlertDialogAction>
      </AlertDialogFooter>
    </DialogModal>
  )
}

export default DialogCard