/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import { format, getDaysInMonth, isToday, isBefore, parse } from 'date-fns'
import getTrackerYear from '~/utils/tracker/getTrackerYear'
import getEntry from '~/utils/tracker/getEntry'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import LabelMenu from './LabelMenu'
import s from '~/styles'

const C = {} as any
C.wrapper = css`
  display: flex;
  padding-bottom: 64px;
`
C.calendar = css`
  width: 100%;
  margin-right: 16px;
`
C.heading = css`
  position: sticky;
  top: 0;
  z-index: ${s['z-index-tracker-calendar-heading']};
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  background: ${s['color-bw-100']};
  border-bottom: 1px solid ${s['color-bw-200']};
`
C.headingColumn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(1 / 13) * 100}%;
  padding-left: 4px;
  padding-right: 4px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${s['color-bw-700']};
`
C.body = css`
  position: relative;
  z-index: ${s['z-index-tracker-calendar-body']};
  display: flex;
  margin-left: -4px;
  margin-right: -4px;
`
C.bodyColumn = css`
  width: ${(1 / 13) * 100}%;
  padding-left: 4px;
  padding-right: 4px;
`
C.boxContainer = css`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 8px;
`
C.boxInner = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
C.date = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-weight: 800;
  color: ${s['color-bw-700']};
`
C.box = css`
  height: 100%;
  width: 100%;
  border-radius: ${s['border-radius']}px;
  border: 1px solid ${s['color-bw-500']};
`
C.boxIsBeforeCreation = css`
  border-color: ${s['color-bw-200']};
`
C.boxIsDisabled = css`
  background: ${s['color-bw-400']};
  border-color: ${s['color-bw-400']};
`
C.today = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  font-size: 10px;
  border: 2px solid ${s['color-blue-500']};
  border-radius: ${s['border-radius']}px;
`
C.todayText = css`
  height: 18px;
  text-align: center;
  padding-top: 4px;
  color: ${s['color-bw-100']};
  font-weight: 800;
  letter-spacing: 2px;
  background: ${s['color-blue-500']};
  text-transform: uppercase;
`
C.entry = css`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 32px;
  width: 32px;
  border-radius: ${s['border-radius']}px;
  transform: translateY(-50%) translateX(-50%);
`
C.entryIsToday = css` 
  top: calc(50% + 9px);
`
C.fill = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  outline: 0;
`
C.fillCircle = css`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  opacity: 0;

  .css-${C.fill.name}:hover & {
    opacity: 1;
  }
`

const columns = Array(13).fill(0)
const boxes = Array(31).fill(0)

class DashboardTrackerHome extends React.Component<ClonedProps, {}> {
  render() {
    const { tracker } = this.props

    if (tracker == null) {
      return null
    }

    const creationDate: Date = parse(tracker.created_at)
    const year = getTrackerYear(tracker)
    const today = new Date()

    return (
      <div>
        <Helmet title={`${tracker.name}`} />

        <div css={C.wrapper}>
          <div css={C.calendar}>
            <div css={C.heading}>
              {columns.map((_, i) => (
                <div css={C.headingColumn} key={i}>
                  {i > 0 && format(new Date(year, i - 1), 'MMM')}
                </div>
              ))}
            </div>

            <div css={C.body}>
              {columns.map((_, i) => (
                <div css={C.bodyColumn} key={i}>
                  {boxes.map((_, j) => {
                    const date = new Date(year, i - 1, j)
                    const isDateToday = isToday(date)
                    const isDateBeforeCreationDate = isBefore(date, creationDate)
                    const isDateBeforeToday = isBefore(date, today)
                    const isBeforeOrToday = isDateBeforeToday || isDateToday

                    const entry = getEntry({
                      tracker: this.props.tracker,
                      month: i,
                      day: j + 1
                    })

                    return (
                      <div css={C.boxContainer} key={j}>
                        <div css={C.boxInner}>
                          {i === 0 && (
                            <div css={C.date} key={j}>
                              {j}
                            </div>
                          )}

                          {i > 0 && (
                            <React.Fragment>
                              {isBeforeOrToday && (
                                <div css={[C.box, isDateBeforeCreationDate && C.boxIsBeforeCreation]}>
                                  {Boolean(entry) && <div css={[C.entry, isDateToday && C.entryIsToday]} style={{ background: entry.label.color }} />}

                                  {isDateToday && (
                                    <div css={C.today}>
                                      <div css={C.todayText}>Today</div>
                                    </div>
                                  )}

                                  <button
                                    onClick={() => this.props.onEntryClick(i, j + 1)}
                                    type="button"
                                    css={C.fill}
                                    style={isDateToday ? { top: 8 } : {}}>
                                    <div
                                      css={C.fillCircle}
                                      style={{ background: tracker.labels[this.props.activeLabelIndex].color }}
                                    />
                                  </button>
                                </div>
                              )}

                              {!isBeforeOrToday && <div css={[C.box, !isBeforeOrToday && C.boxIsDisabled]} />}
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <LabelMenu {...this.props} />
        </div>
      </div>
    )
  }
}

export default DashboardTrackerHome
