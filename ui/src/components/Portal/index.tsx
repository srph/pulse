import * as React from 'react'
import * as ReactDOM from 'react-dom'

class Portal extends React.Component {
  portalNode: HTMLElement

  constructor(props) {
    super(props)
    this.portalNode = document.createElement('div')
    document.body.appendChild(this.portalNode)
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalNode)
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.portalNode
    )
  }
}

export default Portal