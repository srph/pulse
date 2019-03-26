import { Container } from 'unstated'
import axios from '@app/lib/axios'
import * as cookie from 'cookie-machine'
import history from '@app/lib/history'
import immer from 'immer'

export interface AuthContainerState {
  data: AppDataUser | null,
  token: string | null
}

interface UserCredentials {
  email: string
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
      username: credentials.email,
      password: credentials.password,
      client_id: 3,
      client_secret: 'kYQThaV8wq6j5YdEaJxB96Nt9UtEuf9TrYi4kdPp',
      grant_type: 'password'
    })
    const token = tokenResponse.data.access_token
    cookie.set('app_token', token)
    const dataResponse = await axios.get('/api/user')
    const data = dataResponse.data.data
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

    const dataResponse = await axios.get('/api/user')
    const data = dataResponse.data.data
    this.setState({ token, data })
  }

  updateUserData = (payload: Partial<AppDataUser>) => {
    let data: Partial<AppDataUser> = { ...payload }

    if (data.first_name || data.last_name) {
      data.name = `${data.first_name} ${data.last_name}`
    }

    this.setState({
      data: {
        ...this.state.data,
        ...data
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