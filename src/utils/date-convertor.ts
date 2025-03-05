
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