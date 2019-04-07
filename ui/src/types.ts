declare module '@srph/react-notification'
declare module 'color'
declare module 'cookie-machine'
declare module 'victory'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type ComponentSlotProps = {
  children: React.ReactNode
}

type AppDataValidationBag = {
  [key: string]: string[]
}

interface AppDataUser {
  id: number
  email: string
  name: string
  avatar: string
}

interface AppDataTrackerLabel {
  id: number
  name: string
  color: string
  created_at: string
  updated_at: string
}

interface AppDataTrackerEntry {
  id: number
  label: AppDataTrackerLabel
  entry_date: string
  created_at: string
  updated_at: string
}

interface AppDataTracker {
  id: number
  name: string
  description: string
  labels: AppDataTrackerLabel[]
  entries: {
    [key: string]: AppDataTrackerEntry
  }
  created_at: string
  updated_at: string
}