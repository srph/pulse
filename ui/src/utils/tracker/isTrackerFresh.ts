import { parse, differenceInDays } from 'date-fns'

/**
 * Check if the tracker was created recently (less than 5 days old)
 * @param tracker
 */
export default function isTrackerFresh(tracker: AppDataTracker): boolean {
  return differenceInDays(new Date(), parse(tracker.created_at)) <= 5
}