import * as React from 'react'
import { Route } from 'react-router-dom'
import { RouteProps } from 'react-router'

interface IRouterRouteProps extends RouteProps {
  component: any
}

class RouterRoute extends React.Component<IRouterRouteProps> {
  render() {
    const { component, children, ...rest } = this.props
    const Component = this.props.component

    return (
      <Route {...rest} render={(props) => <Component {...props} {...rest}>{children}</Component>} />
    )
  }
}

export default RouterRoute