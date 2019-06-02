/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
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
  form: {
    name: string
    description: string
  }
  errors: AppDataValidationBag
  isLoading: boolean
}

class TrackerSettings extends React.Component<ClonedProps, State> {
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
      <UiFieldGroup heading="Tracker Settings" tagline="Edit your tracker's name and description in this section.">
        <form onSubmit={this.handleSubmit}>
          <UiField label="Name" isRequired error={errors.name}>
            <UiInput type="text" name="name" value={form.name} autoFocus onChange={ls(this, 'form.name')} />
          </UiField>

          <UiSpacer />

          <UiField label="Description" error={errors.description}>
            <UiInput type="text" name="name" value={form.description} onChange={ls(this, 'form.description')} />
          </UiField>

          <UiSpacer />

          <UiButtonAction>
            <UiButtonLoader preset="primary" isLoading={this.state.isLoading}>
              Update Tracker
            </UiButtonLoader>
          </UiButtonAction>
        </form>
      </UiFieldGroup>
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

export default TrackerSettings
