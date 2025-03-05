
/**
 * Convert Convex Time to Display Format
 * @param creationTime Convex time format
 * @returns 
 */
export const ConvexTimeToDisplayFormat = (creationTime: number) => {
  const date = new Date(creationTime);
  return date.toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

/**
 * Convert Search Params date string to convex Time
 * @param date date string(yyyy-mm-dd)
 * @returns 
 */
export const DateToConvexTime = (date: string) => {
  return new Date(date).getTime();
}