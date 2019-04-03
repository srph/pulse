import * as React from 'react'
import { Subscribe as UnstatedSubscribe } from 'unstated'
import { AuthContainer } from '~/containers'
import { Route, Redirect } from 'react-router-dom'
import { RouteProps } from 'react-router'

interface Props extends RouteProps {
  component: any
}

class GuestRoute extends React.Component<Props> {
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