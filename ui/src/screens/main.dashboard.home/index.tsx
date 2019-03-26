/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import { Link } from 'react-router-dom'
import UiContainer from '/components/UiContainer'
import s from '/styles'

const C = {} as any
C.title = css`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: ${s['font-size-title']}px;
`
C.tracker = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  text-decoration: none;
  color: ${s['color-text']};
  height: 46px;
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-400']};
  border-radius: ${s['border-radius']}px;
  box-shadow: ${s['drop-shadow']};

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`
C.trackerTitle = css`
  margin: 0;
  margin-right: auto;
  font-size: ${s['font-size-title']}px;
`
C.trackerDate = css` 
  margin-right: 24px;
  color: ${s['color-bw-500']};
  font-weight: 500;
  font-size: ${s['font-size-subtitle']}px;
`
C.trackerCaret = css` 
  color: ${s['color-bw-500']};
`

class DashboardHome extends React.Component {
  render() {
    return (
      <UiContainer size="md">
        <h4 css={C.title}>
          Your trackers
        </h4>

        {Array(4).fill(0).map((_, i: number) =>
          <Link css={C.tracker} to={`/tracker/${i}`} key={i}>
            <h4 css={C.trackerTitle}>
              Jakol Tracker 2018
            </h4>

            <span css={C.trackerDate}>
            Last updated yesterday</span>

            <span css={C.trackerCaret}>
              <i className='fa fa-angle-right' />
            </span>
          </div>
        )}
      </UiContainer>
    )
  }
}

export default DashboardHome