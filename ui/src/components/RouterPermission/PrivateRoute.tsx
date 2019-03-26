import * as React from 'react'
import { Subscribe as UnstatedSubscribe } from 'unstated'
import { AuthContainer } from '@app/containers'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

interface IPrivateRouteProps extends RouteProps {
  component: any
}

class PrivateRoute extends React.Component<IPrivateRouteProps> {
  render() {
    const { component, children, ...rest } = this.props
    const Component = this.props.component

    return (
      <UnstatedSubscribe to={[AuthContainer]}>
        {(auth: AuthContainer) => 
          <Route {...rest} render={(props) => (
            auth.isAuthenticated()
              ? <Component {...props} children={children}  />
              : <Redirect to='/login' />
          )} />
        }
      </UnstatedSubscribe>
    )
  }
}

export default PrivateRoute