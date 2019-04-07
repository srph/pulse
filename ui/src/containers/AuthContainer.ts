import { Container } from 'unstated'
import axios from '~/lib/axios'
import * as cookie from 'cookie-machine'
import history from '~/lib/history'
import immer from 'immer'
import config from '~/config';

export interface AuthContainerState {
  data: AppDataUser | null,
  token: string | null
}

export interface UserCredentials {
  username: string
  password: string
}

class AuthContainer extends Container<AuthContainerState> {
  state = {
    data: null,
    token: null
  }

  isAuthenticated = (): boolean => {
    return this.state.data != null
  }

  isGuest = (): boolean => {
    return !this.isAuthenticated()
  }

  login = async (credentials: UserCredentials) => {
    const tokenResponse = await axios.post('/oauth/token', {
      username: credentials.username,
      password: credentials.password,
      client_id: config.api.clientId,
      client_secret: config.api.clientSecret,
      grant_type: 'password'
    })
    const token = tokenResponse.data.access_token
    cookie.set('app_token', token)
    const dataResponse = await axios.get('/api/me')
    const data = dataResponse.data
    this.setState({ data, token })
  }

  logout = () => {
    this.setState({ data: null, token: null })
    cookie.remove('app_token')
    history.push('/')
  }

  getUserData = async () => {
    const token: string = cookie.get('app_token') || ''

    if (!token.length) {
      return
    }

    const dataResponse = await axios.get('/api/me')
    const data = dataResponse.data
    this.setState({ token, data })
  }

  updateUserData = (payload: Partial<AppDataUser>) => {
    this.setState({
      data: {
        ...this.state.data,
        ...payload
      }
    })
  }

  updateNotificationCount = (count: 0 | -1 | 1) => {
    this.setState({
      data: immer(this.state.data, draft => {
        if (count === 0) {
          draft.notifications_count.unread = 0
        } else {
          draft.notifications_count.unread += count
        }
      })
    })
  }
}

export default AuthContainer