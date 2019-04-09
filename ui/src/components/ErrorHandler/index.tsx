import * as React from 'react'
import UiEmptySlate from '~/components/UiEmptySlate'
import UiButton from '~/components/UiButton'
import UiScreenCenter from '~/components/UiScreenCenter'
import error404 from './error404.svg'
import error500 from './error500.svg'

import { ErrorContainer } from '~/containers'
import { Subscribe } from 'unstated'

interface Props {
  children: React.ReactNode
}

class ErrorHandler extends React.Component<Props> {
  renderContent(errorProps: typeof ErrorContainer) {
    if (errorProps.state.error === 404) {
      return (
        <UiScreenCenter>
          <UiEmptySlate img={error404}
            heading="You seem lost."
            text="Sorry, but whatever you're looking for isn't here."
            action={<UiButton preset="primary" link to="/" onClick={() => errorProps.set(null)}>Home</UiButton>}
          />
        </UiScreenCenter>
      )
    }

    if (errorProps.state.error === 500) {
      return (
        <UiScreenCenter>
          <UiEmptySlate img={error500}
            heading="Oh no!"
            text="We're having issues at the moment. Try again in a moment."
            action={<UiButton preset="primary" onClick={() => {
              window.location.reload()
            }}>Refresh</UiButton>}
          />
        </UiScreenCenter>
      )
    }

    return this.props.children
  }

  render() {
    return (
      <Subscribe to={[ErrorContainer]}>
        {(errorProps: typeof ErrorContainer) => this.renderContent(errorProps)}
      </Subscribe>
    )
  }
}

export default ErrorHandler