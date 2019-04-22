/** @jsx jsx */
import * as React from 'react'
import Helmet from 'react-helmet'
import { jsx, css } from '@emotion/core'
import { format, isToday, isBefore, parse, isSameDay, getDaysInMonth } from 'date-fns'
import getTrackerYear from '~/utils/tracker/getTrackerYear'
import getEntry from '~/utils/tracker/getEntry'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import LabelMenu from './LabelMenu'
import s from '~/styles'
import constants from './constants'
import UiTooltip from '~components/UiTooltip'

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
C.anchor = css`
  position: absolute;
  top: -64px;
  pointer-events: none;
`
C.tooltip = css`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  /* display: none; */
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 10px;
  color: ${s['color-bw-100']};
  background: ${s['color-bw-600']};
  border-radius: 50%;
  opacity: 0;
  transition: 200ms opacity ease;

  .js-calendar-box-tooltip-hack:hover & {
    opacity: 1;
  }
`
C.tooltipIsBeforeCreationDate = css`
  background: ${s['color-bw-400']};
`

const columns = Array(12).fill(0)
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
              <div css={C.headingColumn} />

              {columns.map((_, i) => (
                <div css={C.headingColumn} key={i}>
                  {format(new Date(year, i), 'MMM')}
                </div>
              ))}
            </div>

            <div css={C.body}>
              <div css={C.bodyColumn}>
                {boxes.map((_, j) => (
                  <div css={C.boxContainer} key={j}>
                    <div css={C.boxInner}>
                      <div css={C.date} key={j}>
                        {j + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {columns.map((_, i) => {
                const numberOfDays = getDaysInMonth(new Date(year, i))

                return (
                  <div css={C.bodyColumn} key={i}>
                    {boxes.map((_, j) => {
                      const date = new Date(year, i, j + 1)
                      const isDateToday = isToday(date)
                      const isDateBeforeCreationDate = isBefore(date, creationDate) && !isSameDay(date, creationDate)
                      const isDateBeforeToday = isBefore(date, today)
                      const isBeforeOrToday = isDateBeforeToday || isDateToday

                      const entry = getEntry({
                        tracker: this.props.tracker,
                        // We'll add 1 here since our database' months start with 1, not 0 (unlike Date)
                        month: i + 1,
                        day: j + 1
                      })

                      return (
                        <div css={C.boxContainer} key={j}>
                          <div css={C.boxInner}>
                            {j < numberOfDays && (
                              <React.Fragment>
                                {isBeforeOrToday && (
                                  <div
                                    css={[C.box, isDateBeforeCreationDate && C.boxIsBeforeCreation]}
                                    className="js-calendar-box-tooltip-hack">
                                    {Boolean(entry) && (
                                      <div
                                        css={[C.entry, isDateToday && C.entryIsToday]}
                                        style={{ background: entry.label.color }}
                                      />
                                    )}

                                    {isDateToday && (
                                      <div css={C.today}>
                                        <div css={C.todayText}>Today</div>
                                      </div>
                                    )}

                                    <button
                                      onClick={() => {
                                        // We'll add 1 here since our database' months start with 1, not 0 (unlike Date)
                                        this.props.onEntryClick(i + 1, j + 1)
                                      }}
                                      type="button"
                                      css={C.fill}
                                      style={isDateToday ? { top: 8 } : {}}>
                                      <div
                                        css={C.fillCircle}
                                        style={{ background: tracker.labels[this.props.activeLabelIndex].color }}
                                      />
                                    </button>

                                    {isDateBeforeCreationDate && (
                                      <UiTooltip
                                        text="The tracker was created after this date."
                                        attachment="right"
                                        delay={1000}>
                                        <div css={[C.tooltip, C.tooltipIsBeforeCreationDate]}>
                                          <i className="fa fa-question" />
                                        </div>
                                      </UiTooltip>
                                    )}

                                    <div className={isDateToday ? constants.todayAnchorClassName : ''} css={C.anchor} />
                                  </div>
                                )}

                                {!isBeforeOrToday && (
                                  <div
                                    css={[C.box, !isBeforeOrToday && C.boxIsDisabled]}
                                    className="js-calendar-box-tooltip-hack">
                                    <UiTooltip text="You cannot fill this date yet." attachment="right" delay={500}>
                                      <div css={C.tooltip}>
                                        <i className="fa fa-question" />
                                      </div>
                                    </UiTooltip>
                                  </div>
                                )}
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>

          <LabelMenu {...this.props} />
        </div>
      </div>
    )
  }
}

export default DashboardTrackerHome
