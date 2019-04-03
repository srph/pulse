/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import EventListener from 'react-event-listener'
import UiContainer from '~/components/UiContainer'
import CreateLabelPopover from './CreateLabelPopover'
import EditLabelPopover from './EditLabelPopover'
import DeleteLabelPopover from './DeleteLabelPopover'
import { format, getDaysInMonth, isToday, isBefore } from 'date-fns'
import immer from 'immer'
import axios from '~/lib/axios'
import { RouteComponentProps } from '~/lib/history/types'
import s from '~/styles'
import random from '~/utils/random'
import isNumericKeyCode from '~/utils/isNumericKeyCode'
import toPropertyKeys from '~/utils/toPropertyKeys'

const C = {} as any
C.title = css`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: ${s['font-size-title']}px;
`
C.wrapper = css`
  display: flex;
  padding-bottom: 64px;
`
C.calendar = css`
  display: flex;
  width: 100%;
  margin-right: 16px;
`
C.calendarColumn = css`
  width: ${(1 / 13) * 100}%;
`
C.calendarBox = css`
  box-sizing: content-box;
  border: 1px solid ${s['color-bw-400']};

  /* .css-${C.calendarColumn.name}:not(:last-child) & {
    border-right-color: transparent;
  } */

  /* &:not(:last-child) {
    border-bottom-color: transparent;
  } */
`
C.calendarBoxIsToday = css`
  border-color: ${s['color-blue-500']};
`
C.calendarBoxInner = css`
  position: relative;
  padding-bottom: 100%;
`
C.calendarBoxContent = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  outline: 0;

  &:focus {
    border-color: ${s['color-blue-400']};
    box-shadow: 0 0 0 3px ${s['color-blue-300']};
  }
`
C.calendarBoxContentIsButton = css`
  cursor: pointer;
`
C.calendarBoxContentTodayBorder = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid ${s['color-blue-500']};
  border-top-width: 5px;
  pointer-events: none;
`
C.calendarBoxTitle = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
`
C.calendarBoxLabel = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`
C.calendarBoxLabelStamp = css`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  opacity: 0;

  .css-${C.calendarBox.name}:hover & {
    opacity: 1;
  }
`
C.calendarBoxLabelInvalid = css`
  color: red;
  opacity: 0;

  .css-${C.calendarBox.name}:hover & {
    opacity: 1;
  }
`
C.calendarBoxLabelIsToday = css`
  border-top-width: 5px;
  border-color: ${s['color-blue-500']};
`
C.labelSection = css`
  flex-shrink: 0;
  width: 180px;
`
C.labelMenu = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`
C.labelMenuHeading = css`
  margin: 0;
  text-transform: uppercase;
`
C.labelContainer = css`
  position: relative;

  &:last-child {
    margin-bottom: 32px;
  }
`
C.label = css`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  padding: 0;
  text-transform: uppercase;
  background: ${s['color-bw-800']};
  border: 0;
  border-radius: ${s['border-radius']}px;
  cursor: pointer;
  outline: 0;

  &:focus {
    border-color: ${s['color-blue-400']};
    box-shadow: 0 0 0 3px ${s['color-blue-300']};
  }
`
C.labelColor = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  height: 48px;
  width: 48px;
  color: ${s['color-bw-100']};
  font-weight: 600;
  font-size: 8px;
  background: ${s['color-blue-500']};
  border-radius: ${s['border-radius']}px;
`
C.labelName = css`
  color: ${s['color-bw-100']};
  font-weight: 600;
  font-size: ${s['font-size-subtitle']}px;
`
C.labelActions = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  margin-left: 16px;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: 100ms all ease;

  .css-${C.labelContainer.name}:hover & {
    opacity: 1;
  }
`
C.labelActionsIsActive = css`
  opacity: 1;
`
C.labelAction = css`
  &:not(:last-child) {
    margin-right: 16px;
  }
`
C.labelActionButton = css`
  display: inline-block;
  padding: 0;
  color: ${s['color-bw-700']};
  background: transparent;
  border: 0;
  cursor: pointer;
`

const columns = Array(13).fill(0)
const boxes = Array(32).fill(0)

const labels: AppDataTrackerLabel[] = [
  {
    id: 1,
    name: 'Muntik Lang',
    color: '#2186EB',
    created_at: '',
    updated_at: ''
  },
  {
    id: 2,
    name: 'Relapsed',
    color: '#EB5757',
    created_at: '',
    updated_at: ''
  },
  {
    id: 3,
    name: 'Muntik Lang',
    color: '#D5DDE5',
    created_at: '',
    updated_at: ''
  },
  {
    id: 4,
    name: 'Eut',
    color: '#26AE60',
    created_at: '',
    updated_at: ''
  }
]

const label: AppDataTrackerLabel = labels[0]

interface State {
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

type Props = RouteComponentProps<{
  trackerId: string
}>

class DashboardTracker extends React.Component<Props, State> {
  state = {
    color: '',
    activeLabelIndex: 0,
    editIndex: -1,
    tracker: null,
    deleteIndex: -1,
    isFetching: false,
    isEditingLabel: false,
    isDeletingLabel: false,
    isDestroyingLabel: false,
    isCreatingLabel: false,
    isStoringLabel: false,
    isUpdatingLabel: false
  }

  async componentDidMount() {    let response = await axios.get(
      `/api/trackers/${this.props.match.params.trackerId}`
    )

    this.setState({
      tracker: response.data,
      isFetching: false
    })
  }

  getEntryDate = (month: number, day: number) => {
    const mm = String(month).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `2019-${mm}-${dd}`
  }

  getEntry = (month: number, day: number) => {
    return this.state.tracker.entries[this.getEntryDate(month, day)]
  }

  render() {
    const { tracker } = this.state

    if (tracker == null) {
      return null;
    }

    return (
      <UiContainer size="lg">
        <Helmet title={`${tracker.name}`} />

        <EventListener target="document" onKeyDown={this.handleKeyDown} />

        <h4 css={C.title}>{tracker.name}</h4>

        <div css={C.wrapper}>
          <div css={C.calendar}>
            {columns.map((_, columnIndex: number) => {
              return (
                <div css={C.calendarColumn} key={columnIndex} data-column>
                  {boxes.map((_, boxIndex: number) => {
                    const isHeading = columnIndex > 0 && boxIndex === 0
                    const isDate = columnIndex === 0 && boxIndex > 0
                    const isEntry = columnIndex > 0 && boxIndex > 0

                    if (isEntry && boxIndex > getDaysInMonth(new Date(2019, columnIndex - 1))) {
                      return
                    }

                    const isToday2 = isToday(new Date(2019, columnIndex - 1, boxIndex))
                    const isEntryToday = isEntry && isToday2
                    const entry = this.getEntry(columnIndex, boxIndex)
                    const date = new Date(2019, columnIndex - 1, boxIndex)
                    const isBeforeOrToday = isBefore(date, new Date()) || isToday2
                    const isActive = isEntry && isBeforeOrToday
                    const Content = !isActive ? 'div' : 'button'

                    return (
                      <div css={[C.calendarBox, isEntryToday && C.calendarBoxIsToday]} data-calendar-box key={boxIndex}>
                        <div css={C.calendarBoxInner}>
                          <Content
                            css={[C.calendarBoxContent, isActive && C.calendarBoxContentIsButton]}
                            onClick={isActive ? () => this.handleEntryClick(columnIndex, boxIndex) : () => {}}
                            data-calendar-etits>
                            {isHeading && (
                              <div css={C.calendarBoxTitle}>{format(new Date(2019, columnIndex - 1), 'MMM')}</div>
                            )}

                            {isDate && <div css={C.calendarBoxTitle}>{boxIndex}</div>}

                            {isEntry && (
                              <div
                                css={[
                                  C.calendarBoxLabel,
                                  Boolean(entry) &&
                                    css`
                                      background: ${entry.label.color};
                                    `
                                ]}>
                                {entry == null &&
                                  (isBeforeOrToday ? (
                                    <div
                                      css={[
                                        C.calendarBoxLabelStamp,
                                        css`
                                          background: ${this.state.tracker.labels[this.state.activeLabelIndex].color};
                                        `
                                      ]}
                                    />
                                  ) : (
                                    <span css={C.calendarBoxLabelInvalid}>
                                      <i className="fa fa-close" />
                                    </span>
                                  ))}
                              </div>
                            )}
                          </Content>

                          {isEntryToday && <div css={C.calendarBoxContentTodayBorder} />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div css={C.labelSection}>
            <div css={C.labelMenu}>
              <h5 css={C.labelMenuHeading}>Labels</h5>

              <CreateLabelPopover
                isDisabled={false}
                isOpen={this.state.isCreatingLabel}
                isLoading={this.state.isStoringLabel}
                onStore={this.handleStoreLabel}
                onOpen={() => this.setState({ isCreatingLabel: true })}
                onClose={() => this.setState({ isCreatingLabel: false })}
              />
            </div>

            <section>
              {tracker.labels.map((label: AppDataTrackerLabel, i: number) => (
                <div css={C.labelContainer} key={label.id}>
                  <button type="button" css={C.label} onClick={() => this.handleLabelClick(i)}>
                    <div css={C.labelColor} style={{ backgroundColor: label.color }}>
                      Alt + {i + 1}
                    </div>

                    <span css={C.labelName}>{label.name}</span>
                  </button>

                  <div
                    css={[
                      C.labelActions,
                      (this.state.editIndex === i || this.state.deleteIndex === i) && C.labelActionsIsActive
                    ]}>
                    <div css={C.labelAction}>
                      <EditLabelPopover
                        label={label}
                        isOpen={this.state.editIndex === i}
                        isLoading={this.state.isUpdatingLabel}
                        isDisabled={false}
                        onUpdate={this.handleUpdateLabel}
                        onOpen={() => this.setState({ editIndex: i })}
                        onClose={() => this.setState({ editIndex: -1 })}>
                        <button type="button" css={C.labelActionButton}>
                          <i className="fa fa-pencil" />
                        </button>
                      </EditLabelPopover>
                    </div>

                    <div css={C.labelAction}>
                      <DeleteLabelPopover
                        label={label}
                        isOpen={this.state.deleteIndex === i}
                        isLoading={this.state.isDestroyingLabel}
                        isDisabled={false}
                        onDelete={this.handleDeleteLabel}
                        onOpen={() => this.setState({ deleteIndex: i })}
                        onClose={() => this.setState({ deleteIndex: -1 })}>
                        <button type="button" css={C.labelActionButton}>
                          <i className="fa fa-trash" />
                        </button>
                      </DeleteLabelPopover>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </UiContainer>
    )
  }

  handleKeyDown = (evt: React.KeyboardEvent<HTMLDocument>) => {
    if (!evt.altKey || !isNumericKeyCode(evt.keyCode)) {
      return
    }

    const number = evt.keyCode - 48

    const index = number === 0 ? 9 : number - 1

    if (this.state.tracker.labels[index] != null) {
      this.setState({
        activeLabelIndex: index
      })
    }
  }

  handleLabelClick = (index: number) => {
    this.setState({
      activeLabelIndex: index
    })
  }

  handleStoreLabel = async (data: Partial<AppDataTrackerLabel>) => {
    if (this.state.isStoringLabel) {
      return
    }

    this.setState({
      isStoringLabel: true
    })

    try {
      const response = await axios.post(
        `/api/trackers/${this.state.tracker.id}/labels`,
        data
      )

      this.setState({
        isCreatingLabel: false,
        isStoringLabel: false,
        tracker: immer(this.state.tracker, draft => {
          draft.labels.push(response.data)
        })
      })
    } catch(e) {
      this.setState({ isStoringLabel: false })
    }
  }

  handleEditLabel = index => {
    if (index === this.state.editIndex) {
      this.setState({
        isEditingLabel: false,
        editIndex: -1
      })
    } else {
      this.setState({
        isEditingLabel: true,
        editIndex: index
      })
    }
  }

  handleUpdateLabel = async (data: Partial<AppDataTrackerLabel>) => {
    if (this.state.isUpdatingLabel) {
      return
    }

    this.setState({
      isUpdatingLabel: true
    })

    const { tracker } = this.state
    const index = this.state.editIndex

    try {
      await axios.put(
        `/api/trackers/${tracker.id}/labels/${tracker.labels[index].id}`,
        data
      )
    } catch(e) {
      this.setState({ isUpdatingLabel: false })
      return
    }

    this.setState({
      editIndex: -1,
      isUpdatingLabel: false,
      tracker: immer(this.state.tracker, draft => {
        draft.labels[index].name = data.name
        draft.labels[index].color = data.color
      })
    })
  }

  handleDeleteLabel = async () => {
    if (this.state.isDestroyingLabel) {
      return
    }

    this.setState({
      isDestroyingLabel: true
    })

    const { tracker } = this.state
    const index = this.state.deleteIndex
    const label = tracker.labels[index]

    try {
      await axios.delete(`/api/trackers/${tracker.id}/labels/${label.id}`)
    } catch(e) {
      this.setState({ isDestroyingLabel: false })
      return
    }

    this.setState({
      deleteIndex: -1,
      isDeletingLabel: false,
      isDestroyingLabel: false,
      tracker: immer(this.state.tracker, draft => {
        draft.entries = toPropertyKeys(
          Object.values(draft.entries).filter((entry: AppDataTrackerEntry) => entry.label.id !== label.id),
          'entry_date'
        )
        delete draft.labels[index]
      })
    })
  }

  handleEntryClick = async (month: number, day: number) => {
    const id = random(2, 5000)
    const date = this.getEntryDate(month, day)
    const label = this.state.tracker.labels[this.state.activeLabelIndex]

    this.setState({
      tracker: immer(this.state.tracker, draft => {
        draft.entries[date] = {
          id,
          label,
          entry_date: date,
          created_at: '',
          updated_at: ''
        }
      })
    })

    // @TODO Undo errors
    await axios.post(`/api/trackers/${this.state.tracker.id}/entries`, {
      entry_date: date,
      tracker_label_id: label.id
    })
  }
}

export default DashboardTracker
