import * as React from 'react'
import { AuthContainer } from '/containers'
import { Subscribe as UnstatedSubscribe } from 'unstated'

interface OwnProps {
  auth: AuthContainer
}

interface InjectedProps {
  children: any
}

interface State {
  isLoading: boolean
}

class MainScreen extends React.Component<OwnProps, State> {
  state = {
    isLoading: true
  }

  async componentDidMount() {
    await this.props.auth.getUserData()
    this.setState({ isLoading: false })
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
    <UnstatedSubscribe to={[AuthContainer]}>
      {(auth: AuthContainer) => (
        <MainScreen {...props} auth={auth} />
      )}
    </UnstatedSubscribe>
  )
}

export default WrappedMainScreen