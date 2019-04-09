import { AxiosError } from 'axios'
import instance from './instance'
import * as cookie from 'cookie-machine'
import ErrorHandler from '~/components/ErrorHandler'

instance.interceptors.response.use(null, (error: AxiosError) => {
  if (error.config.method !== 'GET' && error.response) {
    ErrorHandler.Consumer._currentValue.onError(error.response.status === 404 ? 404 : 500)
  }

  return Promise.reject(error);
})