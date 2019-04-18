import getEntryDateString from './getEntryDateString'

interface Payload {
  tracker: AppDataTracker
  month: number
  day: number
}

export default function getEntry(payload: Payload): AppDataTrackerEntry {
  return payload.tracker.entries[getEntryDateString(payload)]
}