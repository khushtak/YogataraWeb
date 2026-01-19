
/**
 * Converts a duration string (HH:MM:SS or MM:SS) to minutes
 */
export function convertToMinutes(duration: string): number {
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60);
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]) + Math.round(parseInt(parts[2]) / 60);
  }
  return 0;
}
