/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'
import UiButtonLoader from '~/components/UiButtonLoader'
import UiButtonAction from '~/components/UiButtonAction'
import UiSpacer from '~/components/UiSpacer'
import UiFieldGroup from '~components/UiFieldGroup';
import ls from 'linkstate'
import axios from '~/lib/axios';
import { toast } from '~/components/Toast'

interface State {
  name: string
  isLoading: boolean
}

class TrackerArchive extends React.Component<ClonedProps, State> {
  state = {
    name: '',
    isLoading: false
  }
  
  render() {
    return (
      <UiFieldGroup heading="Archive Tracker" tagline="Enter the tracker's name to archive. You may view all closed trackers from the Nav Dropdown > Archived Trackers." isDangerous>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input autoComplete="false" name="hidden" type="text" style= {{ display: 'none' }} />

          <UiField label="Tracker name" isRequired>
            <UiInput type="text" name="name" placeholder={this.props.tracker.name} value={this.state.name} onChange={ls(this, 'name')} />
          </UiField>

          <UiSpacer />

          <UiButtonAction>
            <UiButtonLoader isLoading={this.state.isLoading} preset="default-danger" size="lg" disabled={this.state.name !== this.props.tracker.name}>
              Archive this tracker
            </UiButtonLoader>
          </UiButtonAction>
        </form>
      </UiFieldGroup>
    )
  }

  handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    this.setState({
      isLoading: true
    })

    try {
      await axios.delete(`/api/trackers/${this.props.tracker.id}`)
    } catch(e) {
      this.setState({
        isLoading: false
      })

      return
    }

    this.setState({
      isLoading: false
    })

    toast('Your tracker was archived!')

    this.props.onArchiveTracker()
  }
}

export default TrackerArchive
