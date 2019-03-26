/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import UiContainer from '/components/UiContainer'
import { format } from 'date-fns'
import s from '/styles'

const C = {} as any
C.title = css`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: ${s['font-size-title']}px;
`
C.wrapper = css`
  display: flex;
`
C.calendar = css`
  width: 100%;
  display: flex;
  margin-right: 16px;
`
C.calendarBox = css`
  width: ${(1/13) * 100}%;
  border: 1px solid ${s['color-bw-400']};

  &:not(:last-child) {
    border-right-color: transparent;
  }
`
C.calendarBoxInner = css`
  padding-bottom: 100%;
`

class DashboardTracker extends React.Component {
  render() {
    return (
      <UiContainer>
        <h4 css={C.title}>
          Jakol Tracker 2018
        </h4>

        <div css={C.wrapper}>
          <div css={C.calendar}>
            {Array(13).fill(0).map((_, i: number) => (
              <div css={C.calendarBox} key={i}>
                <div css={C.calendarBoxInner} />
              </div>
            ))}
          </div>
        </div>
      </UiContainer>
    )
  }
}

export default DashboardTracker