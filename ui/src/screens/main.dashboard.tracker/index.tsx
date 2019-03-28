/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import UiContainer from '/components/UiContainer'
import UiButtonLink from '/components/UiButtonLink'
import UiDropdown from '/components/UiDropdown'
import UiInput from '/components/UiInput'
import UiField from '/components/UiField'
import UiSpacer from '/components/UiSpacer'
import UiButton from '/components/UiButton'
import UiInputColorPicker from '/components/UiInputColorPicker'
import UiLevelMenu from '/components/UiLevelMenu'
import { format, getDaysInMonth } from 'date-fns'
import immer from 'immer'
import s from '/styles'
import random from '/utils/random';
import isNumericKeyCode from '/utils/isNumericKeyCode';

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
  border: 1px solid ${s['color-bw-400']};

  .css-${C.calendarColumn.name}:not(:last-child) & {
    border-right-color: transparent;
  }

  &:not(:last-child) {
    border-bottom-color: transparent;
  }
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
  cursor: pointer;

  &:focus {
    border-color: ${s['color-blue-400']};
    box-shadow: 0 0 0 3px ${s['color-blue-300']};
  }
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
  height: 100%;
  width: 100%;
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
C.popover = css`
  padding: 12px 16px;
  width: 320px;
`
C.popoverNote = css`
  color: ${s['color-bw-700']};
  line-height: 1.5;
`

const columns = Array(13).fill(0)
const boxes = Array(32).fill(0)

interface State {
  color: string
  activeLabelIndex: number
  tracker: AppDataTracker
  isEditingLabel: boolean
  isDeletingLabel: boolean
  isCreatingLabel: boolean
}

const tz = {
  date: '',
  timezone_type: 0,
  timezone: ''
}

const labels: AppDataTrackerLabel[] = [
  {
    id: 1,
    name: 'Muntik Lang',
    color: '#2186EB',
    created_at: tz,
    updated_at: tz
  },
  {
    id: 2,
    name: 'Relapsed',
    color: '#EB5757',
    created_at: tz,
    updated_at: tz
  },
  {
    id: 3,
    name: 'Muntik Lang',
    color: '#D5DDE5',
    created_at: tz,
    updated_at: tz
  },
  {
    id: 4,
    name: 'Eut',
    color: '#26AE60',
    created_at: tz,
    updated_at: tz
  }
]

const label: AppDataTrackerLabel = labels[0]

class DashboardTracker extends React.Component<{}, State> {
  state = {
    color: '',
    activeLabelIndex: 0,
    tracker: {
      id: 1,
      title: 'Jog Tracker 2019',
      description: 'Yada yada, maybe?',
      labels,
      entries: {
        '2019-01-01': {
          id: 1,
          label,
          entry_date: '2019-01-01',
          created_at: tz,
          updated_at: tz
        }
      },
      created_at: tz,
      updated_at: tz
    },
    isEditingLabel: false,
    isDeletingLabel: false,
    isCreatingLabel: false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  getEntryDate = (month: number, day: number) => {
    const mm = String(month).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `2019-${mm}-${dd}`
  }

  getEntry = (month: number, day: number) => {
    return this.state.tracker.entries[this.getEntryDate(month, day)]
  }

  renderEntry(month: number, day: number) {
    const entry = this.getEntry(month, day)

    if (entry == null) {
      return
    }

    return (
      <div
        css={[
          C.calendarBoxLabel,
          css`
            background: ${entry.label.color};
          `
        ]}>
      </div>
    )
  }

  render() {
    const { tracker } = this.state

    return (
      <UiContainer size="lg">
        <h4 css={C.title}>J*k*l Tracker 2019</h4>

        <div css={C.wrapper}>
          <div css={C.calendar}>
            {columns.map((_, columnIndex: number) => (
              <div css={C.calendarColumn} key={columnIndex} data-column>
                {boxes.map((_, boxIndex: number) => {
                  const isHeading = columnIndex > 0 && boxIndex === 0
                  const isDate = columnIndex === 0 && boxIndex > 0
                  const isEntry = columnIndex > 0 && boxIndex > 0
                  const Content = isEntry ? 'button' : 'div'

                  return (
                    <div css={C.calendarBox} data-calendar-box key={boxIndex}>
                      <div css={C.calendarBoxInner}>
                        <Content css={C.calendarBoxContent} onClick={isEntry ? (() => this.handleEntryClick(columnIndex, boxIndex)) : (() => {})} data-calendar-etits>
                          {isHeading && (
                            <div css={C.calendarBoxTitle}>{format(new Date(2019, columnIndex - 1), 'MMM')}</div>
                          )}

                          {isDate && <div css={C.calendarBoxTitle}>{boxIndex}</div>}

                          {isEntry && this.renderEntry(columnIndex, boxIndex)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <div css={C.labelSection}>
            <div css={C.labelMenu}>
              <h5 css={C.labelMenuHeading}>Labels</h5>

              <UiDropdown
                isOpen={this.state.isCreatingLabel}
                onOpen={() => this.setState({ isCreatingLabel: true })}
                onClose={() => this.setState({ isCreatingLabel: false })}>
                <UiDropdown.Body>
                  <UiButtonLink icon="fa fa-plus">New</UiButtonLink>
                </UiDropdown.Body>

                <UiDropdown.Menu>
                  <div css={C.popover}>
                    <UiDropdown.Heading text="Create New Label" />

                    <UiField label="Name">
                      <UiInput type="text" />
                    </UiField>

                    <UiSpacer />

                    <UiField label="Color">
                      <UiInputColorPicker
                        value={this.state.color}
                        onChange={color => this.setState({ color })}
                        type="text"
                      />
                    </UiField>

                    <UiSpacer />

                    <UiButton preset="primary">Create</UiButton>
                  </div>
                </UiDropdown.Menu>
              </UiDropdown>
            </div>

            <section>
              {tracker.labels.map((label: AppDataTrackerLabel, i: number) =>
                <div css={C.labelContainer} key={label.id}>
                  <button type="button" css={C.label} onClick={() => this.handleLabelClick(i)}>
                    <div css={C.labelColor} style={{ backgroundColor: label.color }}>Alt + {i + 1}</div>

                    <span css={C.labelName}>{label.name}</span>
                  </button>

                  <div
                    css={[
                      C.labelActions,
                      (this.state.isEditingLabel || this.state.isDeletingLabel) && C.labelActionsIsActive
                    ]}>
                    <div css={C.labelAction}>
                      <UiDropdown
                        isOpen={this.state.isEditingLabel}
                        onOpen={() => this.setState({ isEditingLabel: true })}
                        onClose={() => this.setState({ isEditingLabel: false })}>
                        <UiDropdown.Body>
                          <button type="button" css={C.labelActionButton}>
                            <i className="fa fa-pencil" />
                          </button>
                        </UiDropdown.Body>

                        <UiDropdown.Menu>
                          <div css={C.popover}>
                            <UiDropdown.Heading text="Edit Label" />

                            <UiField label="Name">
                              <UiInput type="text" />
                            </UiField>

                            <UiSpacer />

                            <UiField label="Color">
                              <UiInputColorPicker
                                value={this.state.color}
                                onChange={color => this.setState({ color })}
                                type="text"
                              />
                            </UiField>

                            <UiSpacer />

                            <UiButton preset="primary">Create</UiButton>
                          </div>
                        </UiDropdown.Menu>
                      </UiDropdown>
                    </div>

                    <div c={C.labelAction}>
                      <UiDropdown
                        isOpen={this.state.isDeletingLabel}
                        onOpen={() => this.setState({ isDeletingLabel: true })}
                        onClose={() => this.setState({ isDeletingLabel: false })}>
                        <UiDropdown.Body>
                          <button type="button" css={C.labelActionButton}>
                            <i className="fa fa-trash" />
                          </button>
                        </UiDropdown.Body>

                        <UiDropdown.Menu>
                          <div css={C.popover}>
                            <UiDropdown.Heading text="Delete Confirmation" />

                            <p css={C.popoverNote}>
                              <strong>This action cannot be undone.</strong> This will <strong>permanently delete</strong>{' '}
                              all of your entries marked with this label.
                            </p>

                            <UiSpacer />

                            <UiLevelMenu>
                              <UiLevelMenu.Section>
                                <UiButton preset="danger">Delete</UiButton>
                              </UiLevelMenu.Section>

                              <UiLevelMenu.Section>
                                <UiButton>Cancel</UiButton>
                              </UiLevelMenu.Section>
                            </UiLevelMenu>
                          </div>
                        </UiDropdown.Menu>
                      </UiDropdown>
                    </div>
                  </div>
                </div>
              )}
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

    const index = number === 0
      ? 9
      : (number - 1)

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

  handleEntryClick = (month: number, day: number) => {
    const entry = this.getEntry(month, day)

    this.setState({
      tracker: immer(this.state.tracker, draft => {
        const date = this.getEntryDate(month, day)

        draft.entries[date] = {
          id: random(2, 5000),
          label: draft.labels[this.state.activeLabelIndex],
          entry_date: date,
          created_at: tz,
          updated_at: tz
        }
      })
    })
  }
}

export default DashboardTracker
