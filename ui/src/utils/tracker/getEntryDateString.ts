import getTrackerYear from '~/utils/tracker/getTrackerYear'

interface Payload {
  tracker: AppDataTracker
  month: number
  day: number
}

export default function getEntryDateString({ tracker, month, day }: Payload): string {
  const yy = getTrackerYear(tracker)
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}