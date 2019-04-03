/** @jsx jsx  */
import * as React from 'react'
import { jsx, css } from '@emotion/core'
import s from '~/styles'
import UiContainer from '~/components/UiContainer'
import UiInput from '~/components/UiInput'
import UiField from '~/components/UiField'
import UiSpacer from '~/components/UiSpacer'
import UiButtonLoader from '~/components/UiButtonLoader'
import { Link }  from 'react-router-dom'

import history from '~/lib/history'
import ls from 'linkstate'
import { Subscribe } from 'unstated'
import { AuthContainer } from '~/containers'
import { UserCredentials } from '~/containers/AuthContainer';

const C = {} as any
C.wrapper = css`
  padding-top: 80px;
  padding-bottom: 48px;
`
C.text = css`
  color: ${s['color-bw-700']};
  margin-top: 0;
  margin-bottom: 36px;
  font-size: ${s['font-size-title']}px;
  line-height: 1.5;
  text-align: center;
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
  form: UserCredentials
  error: string
  isLoading: boolean
}

class MainLogin extends React.Component<Props, State> {
  state = {
    form: {
      username: '',
      password: ''
    },
    error: '',
    isLoading: false
  }

  render() {
    const { form } = this.state

    return (
      <div css={C.wrapper}>
        <UiContainer size="sm">
          <p css={C.text}>Login below to start tracking your goals!</p>
        </UiContainer>

        <UiContainer size="xs">
          <div css={C.panel}>
           <form onSubmit={this.handleSubmit}>
              <UiField label="Username">
                <UiInput type="email" value={form.username} onChange={ls(this, 'form.username')}  placeholder="johnny" />
              </UiField>

              <UiSpacer />

              <UiField label="Password">
                <UiInput type="password" value={form.password} onChange={ls(this, 'form.password')} placeholder="********" />
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
      isLoading: true
    })

    try {
      await this.props.login(this.state.form)
    } catch(e) {
      this.setState({
        error: 'Invalid username/password combination',
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

function WrappedMainLogin(props: {}) {
  return (
    <Subscribe to={[AuthContainer]}>
      {(auth: AuthContainer) => <MainLogin {...props} login={auth.login} />}
    </Subscribe>
  )
}

export default WrappedMainLogin
