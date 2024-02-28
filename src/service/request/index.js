import axios from 'axios'

class CKRequest {
  constructor(config) {
    this.config = config
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  // 设置拦截器
  setupInterceptors() {
    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    // 针对特定的request实例添加拦截器
    this.instance.interceptors.request.use(
      this.config.interceptors?.requestSuccessFn,
      this.config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      this.config.interceptors?.responseSuccessFn,
      this.config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  request(config) {
    // 返回Promise
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default CKRequest
