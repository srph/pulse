/** @jsx jsx */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import UiModal from '~/components/UiModal'
import UiField from '~/components/UiField'
import UiInput from '~/components/UiInput'
import UiSpacer from '~/components/UiSpacer'
import UiButtonLoader from '~/components/UiButtonLoader'
import ls from 'linkstate'
import axios from '~/lib/axios'
import history from '~/lib/history'

interface Props {
  onClose: () => void
}

interface State {
  form: {
    name: string
    description: string
  },
  errors: AppDataValidationBag
  isLoading: boolean
}

class CreateTrackerModal extends React.Component<Props, State> {
  state = {
    form: {
      name: '',
      description: ''
    },
    errors: {} as AppDataValidationBag,
    isLoading: false
  }

  render() {
    const { form, errors } = this.state;

    return (
      <UiModal title="Create New Tracker" onClose={this.props.onClose}>
        <form onSubmit={this.handleSubmit}>
          <UiField label="Name" error={errors.name} isRequired>
            <UiInput value={form.name} onChange={ls(this, 'form.name')} placeholder="Fitness Goal 2019" name="name" />
          </UiField>

          <UiSpacer />

          <UiField label="Description">
            <UiInput value={form.description} onChange={ls(this, 'form.description')} placeholder="Be the best version of myself" name="description" />
          </UiField>

          <UiSpacer />

          <div css={css`text-align: right;`}>
            <UiButtonLoader isLoading={this.state.isLoading} preset="primary">
              Create Tracker
            </UiButtonLoader>
          </div>
        </form>
      </UiModal>
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
      const response = await axios.post('/api/trackers', this.state.form)

      this.setState({
        isLoading: false
      })

      this.props.onClose()

      history.push(
        `/tracker/${response.data.id}`
      )
    } catch(err) {
      this.setState({
        errors: err.response.data.errors, 
        isLoading: false
      })
    }
  }
}

export default CreateTrackerModal