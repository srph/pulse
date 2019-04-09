/** @jsx jsx  */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import Helmet from 'react-helmet'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'
import UiAlert from '~/components/UiAlert'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'
import UiSpacer from '~/components/UiSpacer'
import UiButtonLoader from '~/components/UiButtonLoader'
import { Link } from 'react-router-dom'

import { RouteComponentProps } from '~/lib/history/types'
import history from '~/lib/history'
import ls from 'linkstate'
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

type RouteProps = RouteComponentProps<{
  success?: string
}>

interface OwnProps {
  login: (credentials: UserCredentials) => Promise<any>
}

type Props = RouteProps & OwnProps

interface State {
  form: UserCredentials
  error: string
  isRegistrationSuccessful: boolean
  isLoading: boolean
}

class MainLogin extends React.Component<Props, State> {
  state = {
    form: {
      username: '',
      password: ''
    },
    error: '',
    isRegistrationSuccessful: 'success' in this.props.location.query,
    isLoading: false
  }

  render() {
    const { form } = this.state
    
    return (
      <div css={C.wrapper}>
        <Helmet title="Login" />

        <UiContainer size="sm">
          <div css={C.heading}>
            <img
              src="https://caretv.sgp1.digitaloceanspaces.com/app-pulse/logos/logo-icon.svg"
              alt="Pulse Logo"
              css={C.logo}
            />
            <h4 css={C.text}>Welcome to Pulse</h4>
            <p css={C.body}>Login below to start tracking your goals!</p>
          </div>
        </UiContainer>

        <UiContainer size="xs">
          {this.state.isRegistrationSuccessful && (
            <React.Fragment>
              <UiAlert preset="success" isCompact>
                Your account was successfully created.
              </UiAlert>

              <UiSpacer />
            </React.Fragment>
          )}

          {Boolean(this.state.error.length) && (
            <React.Fragment>
              <UiAlert preset="error" isCompact>
                {this.state.error}
              </UiAlert>

              <UiSpacer />
            </React.Fragment>
          )}

          <div css={C.panel}>
            <form onSubmit={this.handleSubmit}>
              <UiField label="Email">
                <UiInput type="email" value={form.username} onChange={ls(this, 'form.username')} placeholder="johnny" />
              </UiField>

              <UiSpacer />

              <UiField label="Password">
                <UiInput
                  type="password"
                  value={form.password}
                  onChange={ls(this, 'form.password')}
                  placeholder="********"
                />
              </UiField>

              <UiSpacer />

              <UiButtonLoader isLoading={this.state.isLoading} isBlock preset="primary">
                Login
              </UiButtonLoader>
            </form>
          </div>

          <div css={C.linkWrapper}>
            <Link to="/register" css={C.link}>
              New? Create a new account here →
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
      isRegistrationSuccessful: false,
      isLoading: true
    })

    try {
      await this.props.login(this.state.form)
    } catch (e) {
      this.setState({
        error: e.response && e.response.status === 400
          ? 'Invalid username/password combination.'
          : 'An error occurred with the server. Try again later.',
        isLoading: false
      })

      return
    }

    this.setState({
      isLoading: false
    })

    history.push('/?login=true')
  }
}

function WrappedMainLogin(props: RouteProps) {
  return (
    <Subscribe to={[AuthContainer]}>{(auth: typeof AuthContainer) => <MainLogin {...props} login={auth.login} />}</Subscribe>
  )
}

export default WrappedMainLogin
