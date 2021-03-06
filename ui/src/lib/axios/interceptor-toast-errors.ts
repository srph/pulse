import instance from './instance'
import { toast }  from '~/components/Toast'
import { AxiosRequestConfig, AxiosError } from 'axios';

interface AxiosValidationConfig extends AxiosRequestConfig {
  appToastError?: string | boolean
}

interface AxiosValidationError extends AxiosError {
  config: AxiosValidationConfig
}

/**
 * @example Disable the default validation toast
 * axios({ appToastError: false })
 * 
 * @example Provide a custom error message
 * axios({ appToastError: 'An error occured trying to create a contact })
 */
instance.interceptors.response.use(null, (err: AxiosValidationError) => {
  if (err.config.method === 'get') {
    return Promise.reject(err)
  }

  if (!err.response) {
    toast('We couldn\'t quite reach the servers. Please try refreshing the page.')
  } else if (err.response.status === 500) {
    toast('An error occurred with the server. Try again.')
  } else if (err.response.status === 422) {
    const cfg = err.config.appToastError

    if (cfg == null) {
      toast('Some fields were not properly provided.')
    } else if (typeof cfg === 'string') {
      toast(cfg)
    }
  } else if (err.response.status === 403) {
    toast('You\'re not authorized to perform this action.')
  }

  return Promise.reject(err)
})