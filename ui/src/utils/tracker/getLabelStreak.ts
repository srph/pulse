import { parse, subDays } from 'date-fns'
import getEntryTodayDateString from './getEntryTodayDateString'
import getEntryDateString from './getEntryDateString'

interface Payload {
  label: AppDataTrackerLabel
  streak: number
}

/**
 * Get the streak of the today's label.
 * Note: Assumes that there is an entry for today.
 */

export default function getLabelStreak(tracker: AppDataTracker): Payload {
  let streak: number = 0
  let cursor: string = ''
  let previous: string = ''

  do {
    // Initially, we want to start on the current date
    if (cursor === '') {
      cursor = getEntryTodayDateString(tracker)
    } else {
      cursor = previous
    }

    previous = (() => {
      const previous = subDays(parse(cursor), 1)

      return getEntryDateString({
        tracker,
        month: previous.getMonth() + 1,
        day: previous.getDate()
      })
    })()

    ++streak
  } while (
    tracker.entries[cursor] &&
    tracker.entries[previous] &&
    tracker.entries[cursor].label.id === tracker.entries[previous].label.id
  )

  return {
    label: tracker.entries[cursor].label,
    streak
  }
}
