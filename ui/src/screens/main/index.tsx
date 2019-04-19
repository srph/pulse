import * as React from 'react'

import { AuthContainer, ErrorContainer } from '~/containers'
import { Subscribe as UnstatedSubscribe } from 'unstated'

interface OwnProps {
  auth: typeof AuthContainer
  error: typeof ErrorContainer
}

interface InjectedProps {
  children: React.ReactNode
}

interface State {
  isLoading: boolean
}

class MainScreen extends React.Component<OwnProps, State> {
  state = {
    isLoading: true
  }

  async componentDidMount() {
    try {
      await this.props.auth.getUserData()
    } catch(err) {
      // Handle issues that aren't expired tokens.
      if (err.response && err.response.status !== 401) {
        this.props.error.set(500)
      }
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    if (this.state.isLoading) {
      return null
    }

    return (
      this.props.children
    )
  }
}

function WrappedMainScreen(props: InjectedProps) {
  return (
    <UnstatedSubscribe to={[AuthContainer, ErrorContainer]}>
      {(auth: typeof AuthContainer, errorProps: typeof ErrorContainer) => (
        <MainScreen {...props} auth={auth} error={errorProps} />
      )}
    </UnstatedSubscribe>
  )
}

export default WrappedMainScreen