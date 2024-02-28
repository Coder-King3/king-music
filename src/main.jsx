import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { Spin } from 'antd'
import 'virtual:svg-icons-register'
import 'normalize.css'
import './assets/styles/index.less'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Suspense fallback={<Spin size="large" tip="Loading" fullscreen />}>
      <App></App>
    </Suspense>
  </Provider>
)
