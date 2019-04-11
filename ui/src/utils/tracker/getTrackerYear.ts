import { parse } from 'date-fns'

export default function getTrackerYear(tracker: AppDataTracker) {
  return parse(tracker.created_at).getFullYear()
}