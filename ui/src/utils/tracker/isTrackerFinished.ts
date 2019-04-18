import getTrackerYear from './getTrackerYear'

export default function isTrackerFinished(tracker: AppDataTracker): boolean {
  return new Date().getFullYear() > getTrackerYear(tracker)
}