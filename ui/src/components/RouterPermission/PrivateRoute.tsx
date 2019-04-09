import * as React from 'react'
import { Subscribe as UnstatedSubscribe } from 'unstated'
import { AuthContainer } from '~/containers'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

interface Props extends RouteProps {
  component: any
}

class PrivateRoute extends React.Component<Props> {
  render() {
    const { component, children, ...rest } = this.props
    const Component = this.props.component

    return (
      <UnstatedSubscribe to={[AuthContainer]}>
        {(auth: typeof AuthContainer) => 
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