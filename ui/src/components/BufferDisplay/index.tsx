import * as React from 'react'

interface Props {
  flag: boolean
  timeout: number
  children: React.ReactNode
}

interface State {
  active: boolean
}

class BufferDisplay extends React.Component<Props, State> {
  state = {
    active: false
  }

  timeout: number

  componentDidUpdate(prevProps) {
    if (!prevProps.flag && this.props.flag) {
      clearTimeout(this.timeout)

      this.setState({
        active: false
      }, () => {
        this.setState({ active: true })

        this.timeout = window.setTimeout(() => {
          this.setState({ active: false })
        }, this.props.timeout)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    if (this.state.active) {
      return this.props.children
    }

    return null
  }
}

export default BufferDisplay