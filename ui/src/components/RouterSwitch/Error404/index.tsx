import * as React from 'react'

import { ErrorContainer } from '~/containers'
import { Subscribe } from 'unstated'

interface Props {
  error: typeof ErrorContainer
}

class Error404 extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.error.set(404)
  }

  render() {
    return <div />
  }
}

function WrappedError404(props) {
  return (
    <Subscribe to={[ErrorContainer]}>
      {(errorProps: typeof ErrorContainer) => (
        <Error404 error={errorProps} />
      )}
    </Subscribe>
  )
}

export default WrappedError404