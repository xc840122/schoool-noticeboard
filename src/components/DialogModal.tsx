import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

const DialogModal = ({
  triggerButtonText,
  triggerButtonStyles,
  children
}: {
  triggerButtonText: string,
  triggerButtonStyles?: string,
  children: React.ReactNode
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={triggerButtonStyles}>
          {triggerButtonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DialogModal