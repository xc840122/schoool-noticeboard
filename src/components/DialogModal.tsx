'use client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { ReactElement, useState } from "react";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
        <div className="absolute top-4 right-4 cursor-pointer">
          <Link href="/" passHref>
            <Button aria-label="Close" variant='ghost' className="hover:opacity-70 transition-opacity duration-200">
              <X className="text-gray-600" onClick={() => setIsOpen(false)} />
            </Button>
          </Link>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DialogModal