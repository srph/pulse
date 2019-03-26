import * as React from 'react'
import { Subscribe as UnstatedSubscribe } from 'unstated'
import { AuthContainer } from '@app/containers'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

interface IGuestRouteProps extends RouteProps {
  component: any
}

class GuestRoute extends React.Component<IGuestRouteProps> {
  render() {
    const { component, ...rest } = this.props
    const Component = this.props.component

    return (
      <UnstatedSubscribe to={[AuthContainer]}>
        {(auth: AuthContainer) => 
          <Route {...rest} render={(props) => (
            auth.isGuest()
              ? <Component {...props} />
              : <Redirect to='/' />
          )} />
        }
      </UnstatedSubscribe>
    )
  }
}

export default GuestRoute