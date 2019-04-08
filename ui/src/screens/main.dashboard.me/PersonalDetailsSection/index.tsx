import * as React from 'react'
import UiFieldGroup from '~/components/UiFieldGroup'
import UiButtonLoader from '~/components/UiButtonLoader'
import UiSpacer from '~/components/UiSpacer'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'

import { Subscribe } from 'unstated'
import { AuthContainer } from '~/containers'

import axios from '~/lib/axios'
import ls from 'linkstate'
import { toast } from '~/components/Toast'

interface State {
  form: {
    email: string
    name: string
  }
  errors: AppDataValidationBag
  isLoading: boolean
}

interface InjectedProps {
  auth: AppDataUser
  onUserUpdate: (data: Partial<AppDataUser>) => void
}

class PersonalDetailsSection extends React.Component<InjectedProps, State> {
  state = {
    form: this.getInitialFormState(),
    errors: {} as AppDataValidationBag,
    isLoading: false
  }

  getInitialFormState() {
    return {
      email: this.props.auth.email,
      name: this.props.auth.name
    }
  }
  
  render() {
    const { form, errors } = this.state

    return (
      <UiFieldGroup heading="Profile" tagline="Your email address is used to login to Pulse.">
        <form onSubmit={this.handleSubmit}>
          <UiField label="Email" error={errors.email}>
            <UiInput type="email" placeholder="********" value={form.email} onChange={ls(this, 'form.email')} />
          </UiField>

          <UiSpacer />

          <UiField label="Name" error={errors.name}>
            <UiInput placeholder="********" value={form.name} onChange={ls(this, 'form.name')} />
          </UiField>

          <UiSpacer />

          <UiButtonLoader preset="primary" isLoading={this.state.isLoading}>Update Profile</UiButtonLoader>
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
      await axios.put('/api/me', this.state.form)
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

    toast('Your profile was successfully updated!')

    this.props.onUserUpdate(this.state.form)
  }
}

function WrappedPersonalDetailsSection() {
  return (
    <Subscribe to={[AuthContainer]}>
      {(auth: AuthContainer) => <PersonalDetailsSection auth={auth.state.data} onUserUpdate={auth.updateUserData} />}
    </Subscribe>
  )
}

export default WrappedPersonalDetailsSection
