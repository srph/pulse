import * as React from 'react'
import { AuthContainer } from '~/containers'
import { Subscribe as UnstatedSubscribe } from 'unstated'
import ErrorHandler, { Context as ErrorHandlerContext, Callback as ErrorHandlerCallback } from '~/components/ErrorHandler'

interface OwnProps {
  auth: AuthContainer
  onError: ErrorHandlerCallback
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
    } catch(e) {
      this.props.onError(500)
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
    <ErrorHandler.Consumer>
      {(errorProps: ErrorHandlerContext) => (
        <UnstatedSubscribe to={[AuthContainer]}>
          {(auth: AuthContainer) => (
            <MainScreen {...props} auth={auth} onError={errorProps.onError} />
          )}
        </UnstatedSubscribe>
      )}
    </ErrorHandler.Consumer>
  )
}

export default WrappedMainScreen