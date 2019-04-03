import { AxiosResponse } from 'axios'

type IAxiosResponse =
  | AxiosResponse
  | (AxiosResponse & {
      data: {
        errors: {
          [key: string]: string[]
        }
      }
    })

/**
 * Get appropriate message for the given status
 *
 * @example getStatusMessage(err.response);
 *
 * @param {IAxiosResponse} response Axios response object
 * @param {string} custom Key of the custom message to use
 */
export default function getStatusMessage(response: IAxiosResponse, custom?: string): string {
  if (!response || response.status == null) {
    return 'Unable to connect to the server due to your connection.'
  }

  if (response.status == 422) {
    const errors = response.data && response.data.errors
    return errors ? errors[Object.keys(errors)[0]][0] : 'It appears that you filled some input with invalid values.'
  }

  if (response.status == 500) {
    return 'Oops! It looks an error occured in our servers. Try again at another time.'
  }

  return custom || 'An unknown error occured. Please try again!'
}
