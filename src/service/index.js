// service统一出口
import CKRequest from './request'
import { BASE_URL, TIME_OUT } from './config/config'

export default new CKRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors: {
  //   requestSuccessFn: (config) => {
  //     return config
  //   },
  //   responseSuccessFn(response) {
  //     return response
  //   }
  // }
})
