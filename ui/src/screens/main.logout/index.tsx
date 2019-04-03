import * as React from 'react'
import { AuthContainer } from '~/containers'
import { Subscribe as UnstatedSubscribe } from 'unstated'


interface IMainLogoutScreenProps {
  auth: AuthContainer
}

class MainLogoutScreen extends React.Component<IMainLogoutScreenProps, {}> {
  componentDidMount() {
    this.props.auth.logout()
  }

  render() {
    return null
  }
}

function MainLogoutScreenWrapper(props: any) {
  return (
    <UnstatedSubscribe to={[AuthContainer]}>
      {auth => <MainLogoutScreen {...props} auth={auth} />}
    </UnstatedSubscribe>
  )
}

export default MainLogoutScreenWrapper