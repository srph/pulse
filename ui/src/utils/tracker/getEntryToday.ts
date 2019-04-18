import getEntry from './getEntry'

export default function getEntryToday(tracker: AppDataTracker): AppDataTrackerEntry {
  const today = new Date()

  return getEntry({
    tracker,
    month: today.getMonth() + 1,
    day: today.getDate()
  })
}