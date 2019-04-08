import * as React from 'react'
import UiFieldGroup from '~/components/UiFieldGroup'
import UiButtonLoader from '~/components/UiButtonLoader'
import UiSpacer from '~/components/UiSpacer'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'

import axios from '~/lib/axios'
import ls from 'linkstate'

interface State {
  form: {
    old_password: string
    new_password: string
    new_password_confirmation: string
  }
  errors: AppDataValidationBag
  isLoading: boolean
}

class AvatarSection extends React.Component<{}, State> {
  state = {
    form: this.getInitialFormState(),
    errors: {} as AppDataValidationBag,
    isLoading: false
  }

  getInitialFormState() {
    return {
      old_password: '',
      new_password: '',
      new_password_confirmation: ''
    }
  }
  
  render() {
    const { form, errors } = this.state

    return (
      <UiFieldGroup heading="Change password" tagline="Don't forget to change your password every now and then!">
        <form onSubmit={this.handleSubmit}>
          <UiField label="Current Password" error={errors.old_password}>
            <UiInput type="password" placeholder="********" value={form.old_password} onChange={ls(this, 'form.old_password')} />
          </UiField>

          <UiSpacer />

          <UiField label="New Password" error={errors.new_password}>
            <UiInput type="password" placeholder="********" value={form.new_password} onChange={ls(this, 'form.new_password')} />
          </UiField>

          <UiSpacer />

          <UiField label="New Password Confirmation" error={errors.new_password_confirmation}>
            <UiInput type="password" placeholder="********" value={form.new_password_confirmation} onChange={ls(this, 'form.new_password_confirmation')} />
          </UiField>

          <UiSpacer />

          <UiButtonLoader preset="primary" isLoading={this.state.isLoading}>Update Password</UiButtonLoader>
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
      await axios.put('api/me/password', this.state.form)
    } catch(e) {
      this.setState({
        errors: e.response.data.errors,
        isLoading: false
      })

      return 
    }

    this.setState({
      form: this.getInitialFormState(),
      isLoading: false
    })
  }
}

export default AvatarSection
