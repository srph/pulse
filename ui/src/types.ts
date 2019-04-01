type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface AppDataUser {
  id: number
  email: string
  name: string
  first_name: string
  last_name: string
  phone_number: string
  landline_number: string
  organization_count: number
  campaign_count: number
  contacts_count: number
  sender_names: string[]
  has_temporary_password: number
  notifications_count: {
    unread: number
    read: number
  }
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