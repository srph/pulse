import getEntryDateString from './getEntryDateString'

export default function getEntryTodayDateString(tracker: AppDataTracker): string {
  const today = new Date()

  return getEntryDateString({
    tracker,
    month: today.getMonth() + 1,
    day: today.getDate()
  })
}