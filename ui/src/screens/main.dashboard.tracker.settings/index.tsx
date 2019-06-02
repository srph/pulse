import * as React from 'react'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import TrackerSettings from './TrackerSettings'
import TrackerArchive from './TrackerArchive'

class DashboardTrackerSettings extends React.Component<ClonedProps> {
  render() {
    return (
      <React.Fragment>
        <TrackerSettings {...this.props} />
        <TrackerArchive {...this.props} />
      </React.Fragment>
    )
  }
}

export default DashboardTrackerSettings
