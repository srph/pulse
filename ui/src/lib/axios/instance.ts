import axios from 'axios'
import config from '@app/config'

const instance = axios.create({
  baseURL: config.api.baseUrl
})

export default instance