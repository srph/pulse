/**
 * Pad month or day with 0
 * e.g., 2 -> 02; 12 -> 12
 */
export default function padDate(str: string | number): string {
  return String(str).padStart(2, '0')
}