"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertDialogTitle } from "../ui/alert-dialog"
import { MessageFormValues, MessageItem } from "@/types/messageType"
import { MessageFormSchema } from "@/schemas/messageSchema"
import { createMessage, updateMessage } from "@/app/business/messageBusiness"
import { className } from "@/app/(dashboard)/messages/page"

const MessageForm = ({
  operationType,
  defaultData,
  onClose,
}: {
  operationType: 'create' | 'edit'
  defaultData?: MessageItem
  onClose?: () => void
}) => {

  // Define form.
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(MessageFormSchema),
    defaultValues: {
      title: defaultData?.title ?? '',
      description: defaultData?.description ?? '',
    }, //Load default values for edit action
  })

  // Define a submit handler.
  const onSubmit = (values: MessageFormValues) => {
    const result = MessageFormSchema.safeParse(values);
    if (!result.success) return;
    // Call create or update message function
    switch (operationType) {
      case 'create':
        createMessage(className, values.title, values.description);
        break;
      case 'edit':
        if (defaultData?.id) {
          updateMessage(defaultData.id, values.title, values.description);
        } else {
          console.error('No default data(id) to update message');
        }
        break;
    }
    onClose?.();
  }

  return (
    <Form {...form}>
      {/* Form title, apply AlertDialogTitle to avoid warning of screen reader */}
      <AlertDialogTitle>
        {operationType === 'create' ? 'Create Message' : 'Edit Message'}
      </AlertDialogTitle>
      {/* Fields */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className='text-xs'
                  placeholder="At least 2 characters" {...field} />
              </FormControl>
              <FormDescription>
                Title of the message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  className='text-xs'
                  placeholder="At least 10 characters." {...field} />
              </FormControl>
              <FormDescription>
                Description of the message.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default MessageForm;