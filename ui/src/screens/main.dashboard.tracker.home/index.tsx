/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import CreateLabelPopover from './CreateLabelPopover'
import EditLabelPopover from './EditLabelPopover'
import DeleteLabelPopover from './DeleteLabelPopover'
import { format, getDaysInMonth, isToday, isBefore } from 'date-fns'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import color from 'color'
import s from '~/styles'

const C = {} as any
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
  border-top-left-radius: ${s['border-radius'] + 2}px;
  border-bottom-left-radius: ${s['border-radius'] + 2}px;
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
  color: ${s['color-bw-900']};
  font-weight: 800;
  font-size: 10px;
  background: ${s['color-blue-500']};
  border-radius: ${s['border-radius']}px;
`
C.labelColorIsDark = css`
  color: ${s['color-bw-900']};
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

class DashboardTrackerHome extends React.Component<ClonedProps, {}> {
  getEntryDate = (month: number, day: number) => {
    const mm = String(month).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `2019-${mm}-${dd}`
  }

  getEntry = (month: number, day: number) => {
    return this.props.tracker.entries[this.getEntryDate(month, day)]
  }

  render() {
    const { tracker } = this.props

    if (tracker == null) {
      return null;
    }

    return (
      <div>
        <Helmet title={`${tracker.name}`} />

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
                            onClick={isActive ? () => this.props.onEntryClick(columnIndex, boxIndex) : () => {}}
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
                                          background: ${this.props.tracker.labels[this.props.activeLabelIndex].color};
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
                isOpen={this.props.isCreatingLabel}
                isLoading={this.props.isStoringLabel}
                onStore={this.props.onStoreLabel}
                onOpen={this.props.onOpenCreateLabel}
                onClose={this.props.onCloseCreateLabel}
              />
            </div>

            <section>
              {tracker.labels.map((label: AppDataTrackerLabel, i: number) => (
                <div css={C.labelContainer} key={label.id}>
                  <button type="button" css={C.label} onClick={() => this.props.onLabelClick(i)}>
                    <div css={[C.labelColor, color(label.color).isDark() && C.labelColorIsDark ]} style={{ backgroundColor: label.color }}>
                      Alt + {i + 1}
                    </div>

                    <span css={C.labelName}>{label.name}</span>
                  </button>

                  <div
                    css={[
                      C.labelActions,
                      (this.props.editIndex === i || this.props.deleteIndex === i) && C.labelActionsIsActive
                    ]}>
                    <div css={C.labelAction}>
                      <EditLabelPopover
                        label={label}
                        isOpen={this.props.editIndex === i}
                        isLoading={this.props.isUpdatingLabel}
                        isDisabled={false}
                        onUpdate={this.props.onUpdateLabel}
                        onOpen={() => this.props.onOpenEditLabel(i)}
                        onClose={this.props.onCloseEditLabel}>
                        <button type="button" css={C.labelActionButton}>
                          <i className="fa fa-pencil" />
                        </button>
                      </EditLabelPopover>
                    </div>

                    <div css={C.labelAction}>
                      <DeleteLabelPopover
                        label={label}
                        isOpen={this.props.deleteIndex === i}
                        isLoading={this.props.isDestroyingLabel}
                        isDisabled={false}
                        onDelete={this.props.onDeleteLabel}
                        onOpen={() => this.props.onOpenDeleteLabel(i)}
                        onClose={this.props.onCloseDeleteLabel}>
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
      </div>
    )
  }
}

export default DashboardTrackerHome