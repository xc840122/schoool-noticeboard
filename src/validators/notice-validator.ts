import { z } from "zod";

/**
 * Define form schema to update or create a message.
 */
export const NoticeCreationValidator = z.object({
  title: z.string().max(20, {
    message: "Title must be less than 20 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

export type NoticeCreationType = z.infer<typeof NoticeCreationValidator>;

/**
 * Schema for message item on list.
 */
// export const NoticeValidator = NoticeCreationValidator.extend({
//   id: z.string(),
//   class: z.string()
//     .min(2, {
//       message: "Class must be at least 2 characters.",
//     })
//     .regex(/^[A-Za-z0-9]+$/, {
//       message: "Class must contain only letters and numbers.",
//     }),
//   time: z.date(),
// })

// export type NoticeType = z.infer<typeof NoticeValidator>;


/**
 * Schema for message item on list.
 */
export const SearchInputValidator = z.object({
  keyword: z.string().regex(/^[A-Za-z0-9]+$/, {
    message: "Keyword must contain only letters and numbers.",
  }),
})