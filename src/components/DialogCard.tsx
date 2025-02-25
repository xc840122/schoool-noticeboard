import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import DialogModal from "./DialogModal"

type DialogContent = {
  operation: string,
  title: string,
  description: string
}

const DialogCard = ({
  diglogContent
}: {
  diglogContent: DialogContent
}) => {
  return (
    <DialogModal operation={diglogContent.operation}>
      <AlertDialogHeader>
        <AlertDialogTitle>{diglogContent.title}</AlertDialogTitle>
        <AlertDialogDescription>
          {diglogContent.description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </DialogModal>
  )
}

export default DialogCard