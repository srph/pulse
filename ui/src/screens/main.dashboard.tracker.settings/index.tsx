/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import { ClonedProps } from '~/screens/main.dashboard.tracker/types'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'
import UiButtonLoader from '~/components/UiButtonLoader'
import UiSpacer from '~/components/UiSpacer'
import ls from 'linkstate'
import UiGrid from '~components/UiGrid';
import UiPanel from '~/components/UiPanel';
import axios from '~/lib/axios';
import { toast } from '~/components/Toast'

interface State {
  form: {
    name: string
    description: string
  }
  errors: AppDataValidationBag
  isLoading: boolean
}

class DashboardTrackerStats extends React.Component<ClonedProps, State> {
  state = {
    form: {
      name: this.props.tracker.name,
      description: this.props.tracker.description || ''
    },
    errors: {} as AppDataValidationBag,
    isLoading: false
  }
  
  render() {
    const { form, errors } = this.state

    return (
      <UiGrid>
        <UiGrid.Column size={6}>
          <UiPanel>
            <form onSubmit={this.handleSubmit}>
              <UiField label="Name" isRequired error={errors.name}>
                <UiInput type="text" name="name" value={form.name} autoFocus onChange={ls(this, 'form.name')} />
              </UiField>

              <UiSpacer />

              <UiField label="Description" error={errors.description}>
                <UiInput type="text" name="name" value={form.description} onChange={ls(this, 'form.description')} />
              </UiField>

              <UiSpacer />

              <UiButtonLoader preset="primary" isLoading={this.state.isLoading}>
                Update Tracker
              </UiButtonLoader>
            </form>
          </UiPanel>
        </UiGrid.Column>
      </UiGrid>
    )
  }

  handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (this.state.isLoading) {
      return
    }

    this.setState({
      errors: {},
      isLoading: true
    })

    try {
      await axios.put(`/api/trackers/${this.props.tracker.id}`, this.state.form)
    } catch(e) {
      this.setState({
        errors: e.response.data.errors,
        isLoading: false
      })

      return
    }

    this.setState({
      isLoading: false
    })

    toast('Your tracker was updated.')

    this.props.onUpdateTracker(this.state.form)
  }
}

export default DashboardTrackerStats
