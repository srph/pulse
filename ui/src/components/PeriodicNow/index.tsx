import * as React from 'react'

interface Props {
  interval: number
  children: (now: Date) => React.ReactNode
}

interface State {
  now: Date
}

class PeriodicNow extends React.Component<Props, State> {
  state = {
    now: new Date()
  }

  interval: number

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState({
        now: new Date()
      })
    }, this.props.interval)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    console.log('Rendering PeriodicNow')
    return this.props.children(this.state.now)
  }
}

export default PeriodicNow