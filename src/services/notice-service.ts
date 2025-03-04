import { ITEM_PER_PAGE } from "@/lib/settings";
import { createNoticeRepo, deleteNoticeRepo, getNoticesRepo, searchNoticesRepo, updateNoticeRepo } from "@/repositories/notice-repo";
import { NoticeDataModel } from "@/types/convex-type";
import { NoticeCreationValidator, SearchInputValidator } from "@/validators/notice-validator";
import { Id } from "../../convex/_generated/dataModel";

// Get notice list,convert to page map
export const getNoticesService = async (className: string, keyword: string) => {
  try {
    // Validate keyword
    const result = SearchInputValidator.safeParse({ keyword: keyword });
    const searchInput = result.success ? result.data.keyword : null;
    // Get notice list from repository, call search if keyword is not null
    const notices = searchInput !== null
      ? await searchNoticesRepo(className, searchInput)
      : await getNoticesRepo(className);

    // Return error if no notice is found
    if (!notices) {
      return { result: false, messageKey: "ERROR.NOTICE_NOT_FOUND" };
    }

    // Return paginated notice list
    return paginatedNotices(notices);
  } catch (error) {
    console.error(`Failed to get notice list: ${error}`);
    return [];
  }
}

// Generate notice list with page number
export const paginatedNotices = (notices: NoticeDataModel[]): Map<number, NoticeDataModel[]> => {

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
}

// Create a new notice
export const createNotice = async (className: string, title: string, description: string) => {
  try {
    // Validate form input
    const result = NoticeCreationValidator.safeParse({ title: title, description: description });
    if (!result.success) {
      return { result: false, messageKey: "ERROR.INVALID_INPUT" };
    }
    // Create new notice
    return await createNoticeRepo(className, title, description);
  } catch (error) {
    console.error(`Failed to create notice: ${error}`);
    return { result: false, messageKey: "ERROR.UNKNOWN" };
  }
}

// Update a notice
export const updateNotice = async (id: Id<'notices'>, title: string, description: string) => {
  try {
    // Validate form input
    const result = NoticeCreationValidator.safeParse({ title: title, description: description });
    if (!result.success) {
      return { result: false, messageKey: "ERROR.INVALID_INPUT" };
    }
    // Update notice
    await updateNoticeRepo(id, title, description);
  } catch (error) {
    console.error(`Failed to update notice: ${error}`);
    return { result: false, messageKey: "ERROR.UNKNOWN" };
  }
}

export const deleteNotice = async (id: Id<'notices'>) => {
  try {
    // Delete notice
    await deleteNoticeRepo(id);
  } catch (error) {
    console.error(`Failed to delete notice: ${error}`);
    return { result: false, messageKey: "ERROR.UNKNOWN" };
  }
}

