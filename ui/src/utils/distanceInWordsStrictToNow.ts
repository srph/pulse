import { distanceInWordsStrict } from 'date-fns'

/**
 * distanceInWordsStrict, but with a hard-coded comparison date (now)
 */
export default function distanceInWordsStrictToNow(date: string | Date): string {
  return distanceInWordsStrict(new Date(date), new Date())
}