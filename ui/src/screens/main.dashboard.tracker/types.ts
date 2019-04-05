export interface State {
  color: string
  activeLabelIndex: number
  tracker: AppDataTracker | null
  editIndex: number
  deleteIndex: number
  isFetching: boolean
  isEditingLabel: boolean
  isDeletingLabel: boolean
  isDestroyingLabel: boolean
  isCreatingLabel: boolean
  isStoringLabel: boolean
  isUpdatingLabel: boolean
}

export interface MethodProps {
  onKeyDown: (evt: React.KeyboardEvent<HTMLDocument>) => void
  onLabelClick: (index: number) => void
  onStoreLabel: (data: Partial<AppDataTrackerLabel>) => Promise<any>
  onEditLabel: (index: number) => void
  onUpdateLabel: (data: Partial<AppDataTrackerLabel>) => Promise<any>
  onDeleteLabel: () => Promise<any>
  onEntryClick: (month: number, day: number) => Promise<void>
  onOpenCreateLabel: () => void
  onCloseCreateLabel: () => void
  onOpenEditLabel: (index: number) => void
  onCloseEditLabel: () => void
  onOpenDeleteLabel: (index: number) => void
  onCloseDeleteLabel: () => void
}

export type ClonedProps = State & MethodProps