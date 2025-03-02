import { MessageFormSchema, MessageItemSchema } from "@/schemas/messageSchema";
import { z } from "zod";
import { DataModel } from "../../convex/_generated/dataModel";

/**
 * Message type for form values.
 */
export type MessageFormValues = z.infer<typeof MessageFormSchema>;

/**
 * Message type for list.
 */
export type MessageItem = z.infer<typeof MessageItemSchema>;


/**
 * Message type of convex data model.
 */

export type MessageDataModel = DataModel["message"]["document"];
