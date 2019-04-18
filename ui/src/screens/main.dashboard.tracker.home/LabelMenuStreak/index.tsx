/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import C from './styles'
import isTrackerFinished from '~/utils/tracker/isTrackerFinished'
import getTrackerYear from '~/utils/tracker/getTrackerYear'
import getEntryToday from '~utils/tracker/getEntryToday'
import getMissStreak from '~utils/tracker/getMissStreak'
import getStreak from '~utils/tracker/getStreak'

interface Props {
  tracker: AppDataTracker
}

class LabelMenuStreak extends React.Component<Props, {}> {
  render() {
    const { tracker } = this.props

    // If the year concluded.
    if (isTrackerFinished(tracker)) {
      console.log('finished')

      return this.renderContent({
        text: `${getTrackerYear(tracker)} was a good year.`,
        type: 'info',
        icon: 'fa fa-star'
      })
    }

    // If the tracker is clean
    if (!Object.values(tracker.entries).length) {
      console.log('empty')

      return this.renderContent({
        text: 'Progress is progress. Start filling up those boxes.',
        type: 'info',
        icon: 'fa fa-magic'
      })
    }

    // If the user has caught up
    if (getEntryToday(tracker)) {
      const streak = getStreak(tracker)

      return this.renderContent({
        text: streak >= 3
          ? `Good job. You're on a ${streak}-day streak. Keep it up!`
          : `You're all caught up.`,
        type: 'success',
        icon: 'fa fa-star'
      })
    }

    const missStreak = getMissStreak(tracker)

    // If the user hasn't updated in a while
    if (missStreak >= 3) {
      return this.renderContent({
        text: `Your last update was ${missStreak} days ago. How are you?`,
        type: 'warning',
        icon: 'fa fa-exclamation'
      })
    }

    return this.renderContent({
      text: 'How was your day?',
      type: 'info',
      icon: 'fa fa-magic'
    })
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