import getEntryTodayDateString from './getEntryTodayDateString';
import { format, parse, differenceInDays } from 'date-fns';

/**
 * Get the difference between today and the last activity.
 */
export default function getMissStreak(tracker: AppDataTracker): number {
  const entries: AppDataTrackerEntry[] = Object.values(tracker.entries)

  const today: string = getEntryTodayDateString(tracker)

  const sorted: Date[] = entries.map(entry => parse(entry.entry_date))
    .sort((a: Date, b: Date) => a.getTime() - b.getTime())

  return differenceInDays(parse(today), sorted[sorted.length - 1])
}