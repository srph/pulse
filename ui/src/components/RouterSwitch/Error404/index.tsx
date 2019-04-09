import * as React from 'react'
import ErrorHandler, { Context } from '~/components/ErrorHandler'

class Error404 extends React.Component<Context, {}> {
  componentDidMount() {
    this.props.onError(404)
  }

  render() {
    return <div />
  }
}

function WrappedError404(props: {}) {
  return (
    <ErrorHandler.Consumer>
      {(errorProps: Context) => (
        <Error404 {...errorProps} />
      )}
    </ErrorHandler.Consumer>
  )
}

export default WrappedError404