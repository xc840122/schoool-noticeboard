"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertDialogTitle } from "../ui/alert-dialog"
import { MessageFormValues } from "@/types/messageType"
import { MessageFormSchema } from "@/schemas/messageSchema"

const MessageForm = ({
  operationType,
  data
}: {
  operationType: 'create' | 'edit'
  data?: MessageFormValues
}) => {
  // Define form.
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(MessageFormSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
    }, //Load default values for edit action
  })

  // Define a submit handler.
  const onSubmit = (values: MessageFormValues) => {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values)
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
              {/* <FormDescription>
                Title must be at least 2 characters.
              </FormDescription> */}
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
              {/* <FormDescription>
                Description must be at least 10 characters.
              </FormDescription> */}
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