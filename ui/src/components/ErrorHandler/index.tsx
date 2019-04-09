import * as React from 'react'
import UiEmptySlate from '~/components/UiEmptySlate'
import UiButton from '~/components/UiButton'
import UiScreenCenter from '~/components/UiScreenCenter'
import error404 from './error404.svg'
import error500 from './error404.svg'

interface Props {
  children: React.ReactNode
}

type ErrorCodes = 404 | 500 | 0

interface State {
  error: ErrorCodes
}

export type Callback = (error: ErrorCodes) => void

export interface Context {
  onError: Callback
}

const context = React.createContext<Context>({ onError: (error: ErrorCodes) => {} })

class ErrorHandler extends React.Component<Props, State> {
  state = {
    error: null
  }

  static Consumer = context.Consumer

  render() {
    console.log(this.state.error)
    if (this.state.error === 404) {
      return (
        <UiScreenCenter>
          <UiEmptySlate img={error500}
            heading="Oops!"
            text="We couldn't find your request."
            action={<UiButton preset="primary" link to="/" onClick={this.handleReset}>Go back</UiButton>}
          />
        </UiScreenCenter>
      )
    }

    if (this.state.error === 500) {
      return (
        <UiScreenCenter>
          <UiEmptySlate img={error404}
            heading="Oh no!"
            text="We're having issues at the moment. Try again in a moment."
            action={<UiButton preset="primary" onClick={() => {
              window.location.reload()
            }}>Refresh</UiButton>}
          />
        </UiScreenCenter>
      )
    }

    return (
      <context.Provider value={{
        onError: this.handleError
      }}>
        {this.props.children}
      </context.Provider>
    )
  }
  
  handleReset = () => {
    this.setState({ error: null})
  }

  handleError = (error: ErrorCodes) => {
    this.setState({ error })
  }
}

export default ErrorHandler