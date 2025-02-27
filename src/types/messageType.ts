import { MessageFormSchema, MessageItemSchema } from "@/schemas/messageSchema";
import { z } from "zod";

/**
 * Message type for form values.
 */
export type MessageFormValues = z.infer<typeof MessageFormSchema>;

/**
 * Message type for list.
 */
export type MessageItem = z.infer<typeof MessageItemSchema>;
