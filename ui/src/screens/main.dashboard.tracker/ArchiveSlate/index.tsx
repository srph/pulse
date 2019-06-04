import * as React from 'react'
import archived from './archived.svg'
import UiEmptySlate from '~/components/UiEmptySlate'
import UiButtonLoader from '~/components/UiButtonLoader'

import { toast } from '~/components/Toast';
import axios from '~/lib/axios'

interface Props {
  tracker: AppDataTracker
  onUnarchive: () => void
}

interface State {
  isLoading: boolean
}

class ArchiveSlate extends React.Component<Props, State> {
  state = {
    isLoading: false 
  }

  render() {
    return (
      <UiEmptySlate img={archived}
        heading={`Tracker ${this.props.tracker.name} has been archived.`}
        text="Click the button below to unarchive."
        action={<UiButtonLoader preset="primary" isLoading={this.state.isLoading} onClick={this.handleArchiveTracker}>Unarchive</UiButtonLoader>}
      />
    )
  }

  handleArchiveTracker = async () => {
    this.setState({
      isLoading: true
    })

    try {
      await axios.put(`/api/trackers/${this.props.tracker.id}/unarchive`)
    } catch(e) {
      this.setState({
        isLoading: false
      })

      return
    }

    this.setState({
      isLoading: false
    })

    this.props.onUnarchive()

    toast(`Tracker ${this.props.tracker.name} was unarchived.`)
  }
}

export default ArchiveSlate