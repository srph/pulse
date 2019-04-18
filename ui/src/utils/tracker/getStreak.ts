import { parse, subDays } from 'date-fns';
import getEntryTodayDateString from './getEntryTodayDateString'
import getEntryDateString from './getEntryDateString'

/**
 * Get the streak between today and the last date.
 * Assumes that there is an entry for today.
 */

export default function getStreak(tracker: AppDataTracker): number {
  let cursor: string = getEntryTodayDateString(tracker)
  let streak: number = 0

  while (tracker.entries[cursor]) {
    const previous = subDays(parse(cursor), 1)

    cursor = getEntryDateString({
      tracker,
      month: previous.getMonth() + 1,
      day: previous.getDate()
    })

    ++streak
  }

  return streak
}