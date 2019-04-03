/** @jsx jsx  */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'
import UiSpacer from '~/components/UiSpacer'
import UiButtonLoader from '~/components/UiButtonLoader'
import { Link } from 'react-router-dom'

import history from '~/lib/history'
import ls from 'linkstate'
import axios from '~/lib/axios'
import { Subscribe } from 'unstated'
import { AuthContainer } from '~/containers'
import { UserCredentials } from '~/containers/AuthContainer'

const C = {} as any
C.wrapper = css`
  padding-top: 80px;
  padding-bottom: 48px;
`
C.heading = css`
  text-align: center;
  margin-bottom: 36px;
`
C.logo = css`
  width: 72px;
  height: 72px;
  margin-bottom: 48px;
`
C.text = css`
  margin: 0;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
`
C.body = css`
  color: ${s['color-bw-700']};
  margin: 0;
  font-size: ${s['font-size-title']}px;
  line-height: 1.5;
`
C.panel = css`
  margin-bottom: 24px;
  padding: 24px;
  background: ${s['color-bw-100']};
  border: 1px solid ${s['color-bw-400']};
  border-radius: ${s['border-radius']}px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
C.linkWrapper = css`
  text-align: center;
`
C.link = css`
  display: inline-block;
  padding-bottom: 4px;
  color: ${s['color-bw-600']};
  text-decoration: none;
  text-align: center;
  transition: 100ms color ease;
  border-bottom: 1px solid ${s['color-bw-400']};

  &:hover {
    color: ${s['color-bw-700']};
  }
`

interface Props {
  login: (credentials: UserCredentials) => Promise<any>
}

interface State {
  form: {
    email: string
    name: string
    password: string
    password_confirmation: string
  }
  errors: AppDataValidationBag
  error: string
  isLoading: boolean
}

class MainLogin extends React.Component<Props, State> {
  state = {
    form: {
      email: '',
      name: '',
      password: '',
      password_confirmation: ''
    },
    errors: {} as AppDataValidationBag,
    error: '',
    isLoading: false
  }

  render() {
    const { form, errors } = this.state

    return (
      <div css={C.wrapper}>
        <UiContainer size="sm">
          <div css={C.heading}>
            <img
              src="https://caretv.sgp1.digitaloceanspaces.com/app-pulse/logos/logo-icon.svg"
              alt="Pulse Logo"
              css={C.logo}
            />
            <h4 css={C.text}>Create an account</h4>
            <p css={C.body}>Register to get started on your goals.</p>
          </div>
        </UiContainer>

        <UiContainer size="xs">
          <div css={C.panel}>
            <form onSubmit={this.handleSubmit}>
              <UiField label="Your name" error={errors.name} isRequired>
                <UiInput
                  type="name"
                  value={form.name}
                  onChange={ls(this, 'form.name')}
                  placeholder="Jan Jason Bodolo"
                  name="email"
                />
              </UiField>

              <UiSpacer />

              <UiField label="Email" error={errors.email} isRequired>
                <UiInput
                  type="email"
                  value={form.email}
                  onChange={ls(this, 'form.email')}
                  placeholder="your@email.com"
                  name="email"
                />
              </UiField>

              <UiSpacer />

              <UiField label="Password" error={errors.password} isRequired>
                <UiInput
                  type="password"
                  value={form.password}
                  onChange={ls(this, 'form.password')}
                  placeholder="********"
                  name="password"
                />
              </UiField>

              <UiSpacer />

              <UiField label="Password Confirmation" error={errors.password_confirmation} isRequired>
                <UiInput
                  type="password"
                  value={form.password_confirmation}
                  onChange={ls(this, 'form.password_confirmation')}
                  placeholder="********"
                  name="password_confirmation"
                />
              </UiField>

              <UiSpacer />

              <UiButtonLoader isLoading={this.state.isLoading} isBlock preset="primary">
                Create an account
              </UiButtonLoader>
            </form>
          </div>

          <div css={C.linkWrapper}>
            <Link to="/login" css={C.link}>
              ← I'd like to login instead
            </Link>
          </div>
        </UiContainer>
      </div>
    )
  }

  handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (this.state.isLoading) {
      return
    }

    this.setState({
      error: '',
      errors: {},
      isLoading: true
    })

    try {
      await axios.post('/api/register', this.state.form)
    } catch (e) {
      this.setState({
        errors: e.response.data.errors,
        isLoading: false
      })

      return
    }

    this.setState({
      isLoading: false
    })

    history.push('/login')
  }
}

function WrappedMainLogin(props: {}) {
  return (
    <Subscribe to={[AuthContainer]}>{(auth: AuthContainer) => <MainLogin {...props} login={auth.login} />}</Subscribe>
  )
}

export default WrappedMainLogin
