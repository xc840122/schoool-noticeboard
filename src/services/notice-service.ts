import { ITEM_PER_PAGE } from "@/lib/settings";
import { createNoticeRepo, deleteNoticeRepo, updateNoticeRepo } from "@/repositories/notice-repo";
import { NoticeDataModel } from "@/types/convex-type";
import { noticeCreationSchema } from "@/validators/notice-validator";
import { Id } from "../../convex/_generated/dataModel";

// Get notice list,convert to page map
// export const getNoticesService = async (classroom: string, keyword: string) => {
//   try {
//     // Validate keyword
//     const result = searchInputSchema.safeParse({ keyword: keyword });
//     const searchInput = result.success ? result.data.keyword : null;
//     // Get notice list from repository, call search if keyword is not null
//     const notices = searchInput !== null
//       ? await searchNoticesRepo(classroom, searchInput)
//       : await getNoticesRepo(classroom);

//     // Return error if no notice is found
//     if (!notices) {
//       return { result: false, messageKey: "ERROR.NOTICE_NOT_FOUND" };
//     }

//     // Return paginated notice list
//     return paginatedNotices(notices);
//   } catch (error) {
//     console.error(`Failed to get notice list: ${error}`);
//     return [];
//   }
// }

// Generate notice list with page number

/**
 * Convert notice list to paginated map
 * @param notices 
 * @returns map of notice list with page number
 */
export const paginatedNotices = (notices: NoticeDataModel[]): Map<number, NoticeDataModel[]> => {

  try {
    const noticeMap = notices.reduce((map, notice, index) => {
      // Calculate page number
      const pageNumber = Math.floor(index / ITEM_PER_PAGE) + 1;
      // Set new pageNumber if not exist
      if (!map.has(pageNumber)) {
        map.set(pageNumber, []);
      }
      // Push notice to page
      map.get(pageNumber)?.push(notice);
      return map;
    }, new Map<number, NoticeDataModel[]>());
    return noticeMap;
  } catch (error) {
    console.error(`Failed to get notice list: ${error}`);
    throw new Error("Convert notice list to paginated map failed");
  }
}

/**
 * Create a new notice
 * @param classroom 
 * @param title 
 * @param description 
 * @returns 
 */
export const createNotice = async (classroom: string, title: string, description: string) => {
  try {
    // Validate form input
    const result = noticeCreationSchema.safeParse({ title: title, description: description });
    if (!result.success) {
      return { result: false, messageKey: "ERROR.INVALID_INPUT" };
    }
    // Create new notice
    return await createNoticeRepo(classroom, title, description);
  } catch (error) {
    console.error(`Failed to create notice: ${error}`);
    throw new Error("Create notice failed");
  }
}

// Update a notice
export const updateNotice = async (id: Id<'notices'>, title: string, description: string) => {
  try {
    // Validate form input
    const result = noticeCreationSchema.safeParse({ title: title, description: description });
    if (!result.success) {
      return { result: false, messageKey: "ERROR.INVALID_INPUT" };
    }
    // Update notice
    await updateNoticeRepo(id, title, description);
  } catch (error) {
    console.error(`Failed to update notice: ${error}`);
    throw new Error("Update notice failed");
  }
}

export const deleteNotice = async (id: Id<'notices'>) => {
  try {
    // Delete notice
    await deleteNoticeRepo(id);
  } catch (error) {
    console.error(`Failed to delete notice: ${error}`);
    throw new Error("Delete notice failed");
  }
}

