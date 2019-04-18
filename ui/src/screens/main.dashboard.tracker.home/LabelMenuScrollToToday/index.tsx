/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import UiButton from '~/components/UiButton'
import s from '~/styles'
import constants from '../constants'
import getTrackerYear from '~/utils/tracker/getTrackerYear'

const C = {} as any
C.container = css`
  position: relative;
  box-shadow: 0 2px 16px ${s['color-blue-300']};
`
C.border = css`
  position: absolute;
  top: -6px;
  left: -6px;
  right : -6px;
  bottom: -6px;
  border: 1px dashed ${s['color-blue-500']};
  border-radius: ${s['border-radius']}px;
  pointer-events: none;
`

interface Props {
  tracker: AppDataTracker
}

class LabelMenuScrollToToday extends React.Component<Props, {}> {
  render() {
    if (getTrackerYear(this.props.tracker) !== new Date().getFullYear()) {
      return null
    }

    return (
      <div css={C.container}>
        <UiButton isBlock preset="primary" onClick={this.handleClick}>
          Scroll To Today
        </UiButton>
        <div css={C.border} />
      </div>
    )
  }

  handleClick = () => {
    document.querySelector(`.${constants.todayAnchorClassName}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export default LabelMenuScrollToToday