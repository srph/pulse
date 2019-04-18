/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import C from './styles'
import isTrackerFinished from '~/utils/tracker/isTrackerFinished'
import getTrackerYear from '~/utils/tracker/getTrackerYear'
import getEntryToday from '~utils/tracker/getEntryToday'
import getMissStreak from '~utils/tracker/getMissStreak'

interface Props {
  tracker: AppDataTracker
}

class LabelMenuStreak extends React.Component<Props, {}> {
  render() {
    const { tracker } = this.props

    if (isTrackerFinished(tracker)) {
      console.log('finished')

      return this.renderContent({
        text: `${getTrackerYear(tracker)} was a good year.`,
        type: 'info',
        icon: 'fa fa-star'
      })
    }

    if (!Object.values(tracker.entries).length) {
      console.log('empty')

      return this.renderContent({
        text: 'Progress is progress. Start filling up those boxes.',
        type: 'info',
        icon: 'fa fa-magic'
      })
    }

    const missStreak = getMissStreak(tracker)

    if (missStreak >= 3) {
      console.log('miss streak', missStreak)

      return this.renderContent({
        text: `It's been ${missStreak} days. How are you?`,
        type: 'warning',
        icon: 'fa fa-exclamation'
      })
    }

    if (getEntryToday(tracker)) {
      console.log('today')

      return this.renderContent({
        text: `Good job! You're all caught up.`,
        type: 'success',
        icon: 'fa fa-star'
      })
    }

    console.log('null')

    return null
  }

  renderContent({ text, type, icon }: {
    text: string,
    type: 'warning' | 'info' | 'success'
    icon: string
  }) {
    return (
      <div css={C.alert}>
        <div
          css={[
            C.icon,
            type === 'info' && C.iconIsInfo,
            type === 'success' && C.iconIsSuccess,
            type === 'warning' && C.iconIsWarning
          ]}>
          <i className={icon} />
        </div>

        <p css={C.text}>{text}</p>
      </div>
    )
  }
}

export default LabelMenuStreak
