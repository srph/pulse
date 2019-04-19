import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface PositionProps {
  offset: number
  target: () => HTMLElement
  children: (state: PositionState) => JSX.Element
  placement?: 'left' | 'right'
}

interface PositionState {
  top: number
  left: number
}

export default class Position extends React.Component<PositionProps, PositionState> {
  static defaultProps = {
    offset: 0,
    placement: 'left'
  }

  state: PositionState = {
    top: 0,
    left: 0
  }

  componentDidMount() {
    const targetBox = this.props.target().getBoundingClientRect()
    const tooltipBox = ReactDOM.findDOMNode(this).getBoundingClientRect()

    let position: PositionState
    if (this.props.placement === 'left') {
      position = {
        top: -(tooltipBox.height / 2 - targetBox.height / 2),
        left: -(tooltipBox.width + this.props.offset)
      }
    } else if (this.props.placement === 'right') {
      position = {
        top: -(tooltipBox.height / 2 - targetBox.height / 2),
        left: targetBox.width + this.props.offset
      }
    }

    this.setState(position)
  }

  render() {
    return this.props.children(this.state)
  }
}
