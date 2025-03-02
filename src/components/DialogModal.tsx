'use client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { ReactElement, useState } from "react";
import React from "react";

interface ModalProps {
  triggerButtonText: string;
  triggerButtonStyles?: string;
  children: ReactElement<{ onClose?: () => void }>;
}

const DialogModal = ({
  triggerButtonText,
  triggerButtonStyles,
  children
}: ModalProps) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className={triggerButtonStyles}>
          {triggerButtonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {children && React.isValidElement(children)
          ? React.cloneElement(children, { onClose: () => setIsOpen(false) })
          : children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DialogModal