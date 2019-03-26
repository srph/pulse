import instance from './instance'
import * as cookie from 'cookie-machine'
import history from '@app/lib/history'
import { AxiosError } from 'axios';

instance.interceptors.response.use(null, (err: AxiosError) => {
  if (err.response && err.response.status === 401) {
    cookie.remove('app_token')
    history.push('/login')
    // So anything after this never gets resolved, thus interrupted.
    return new Promise(() => {})
  }

  return Promise.reject(err)
})