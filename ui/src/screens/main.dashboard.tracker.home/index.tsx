/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import { format, getDaysInMonth, isToday, isBefore, parse } from 'date-fns'
import getTrackerYear from '~/utils/tracker/getTrackerYear'
import getEntry from '~/utils/tracker/getEntry'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import LabelMenu from './LabelMenu'
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
  background: ${s['color-bw-100']};

  &:first-child {
    position: sticky;
    top: 0;
    z-index: 500;
  }

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
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 32px);
  width: calc(100% - 32px);
  border-radius: ${s['border-radius']}px;
`
C.calendarBoxLabelBeforeCreationIndicator = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 1px;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
`
C.calendarBoxLabelInactiveIndicator = css`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 32px);
  width: calc(100% - 32px);
  border-radius: ${s['border-radius']}px;
  background: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
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

const columns = Array(13).fill(0)
const boxes = Array(32).fill(0)

class DashboardTrackerHome extends React.Component<ClonedProps, {}> {
  render() {
    const { tracker } = this.props

    if (tracker == null) {
      return null;
    }

    const creationDate: Date = parse(tracker.created_at)

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
                    const year = getTrackerYear(this.props.tracker)

                    if (isEntry && boxIndex > getDaysInMonth(new Date(year, columnIndex - 1))) {
                      return
                    }

                    const isToday2 = isToday(new Date(year, columnIndex - 1, boxIndex))
                    const isEntryToday = isEntry && isToday2
                    const entry = getEntry({
                      tracker: this.props.tracker,
                      month: columnIndex,
                      day: boxIndex
                    })
                    const date = new Date(year, columnIndex - 1, boxIndex)
                    const isBeforeCreationDate = isBefore(date, creationDate)
                    const isBeforeOrToday = isBefore(date, new Date()) || isToday2
                    const isActive = isEntry && isBeforeOrToday
                    const Content = !isActive ? 'div' : 'button'

                    return (
                      <div css={[C.calendarBox, isEntryToday && C.calendarBoxIsToday]} data-calendar-box key={boxIndex}>
                        <div css={C.calendarBoxInner}>
                          <Content
                            css={[C.calendarBoxContent, isActive && C.calendarBoxContentIsButton]}
                            onClick={isActive ? () => this.props.onEntryClick(columnIndex, boxIndex) : () => { }}
                            data-calendar-etits>
                            {isHeading && (
                              <div css={C.calendarBoxTitle}>{format(new Date(year, columnIndex - 1), 'MMM')}</div>
                            )}

                            {isDate && <div css={C.calendarBoxTitle}>{boxIndex}</div>}

                            {isEntry && (
                              <React.Fragment>
                                {isBeforeCreationDate && (
                                  <div css={C.calendarBoxLabelBeforeCreationIndicator} />
                                )}

                                {!isBeforeOrToday && (
                                  <div css={C.calendarBoxLabelInactiveIndicator} />
                                )}

                                <div
                                  css={C.calendarBoxLabel} style={Boolean(entry) ? {
                                    background: entry.label.color
                                  } : {}}>
                                  {entry == null && isBeforeOrToday && (
                                    <div
                                      data-tite="tite"
                                      css={[
                                        C.calendarBoxLabelStamp,
                                        css`
                                              background: ${this.props.tracker.labels[this.props.activeLabelIndex].color};
                                            `
                                      ]}
                                    />
                                  )}
                                </div>
                              </React.Fragment>
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

          <LabelMenu {...this.props} />
        </div>
      </div>
    )
  }
}

export default DashboardTrackerHome
