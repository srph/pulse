import { Container } from 'unstated'

type ErrorCodes = 404 | 500 | 0

type Handler = (error: ErrorCodes) => void

interface State {
  error: ErrorCodes
}

class ErrorContainer extends Container<State> {
  state = {
    error: null
  }

  set: Handler = (error) => {
    this.setState({ error })
  }
}

export default new ErrorContainer()