import * as React from 'react'
import { Switch } from 'react-router-dom'

interface IRouterSwitch {
  children: any
}

class RouterSwitch extends React.Component<IRouterSwitch, {}> {
  render() {
    const {children, ...rest} = this.props

    return (
      <Switch>
        {React.Children.map(children, (child: any) =>
          React.cloneElement(child, rest)
        )}
      </Switch>
    )
  }
}

export default RouterSwitch