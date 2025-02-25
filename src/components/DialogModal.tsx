import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DialogModal = ({
  operation,
  children
}: {
  operation: string,
  children: React.ReactNode
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{operation}</AlertDialogTrigger>
      <AlertDialogContent>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DialogModal