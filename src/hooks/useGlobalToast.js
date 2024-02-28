import { useEffect } from 'react'
import { message } from 'antd'
import eventBus from '@/utils/eventBus'

const useGlobalToast = () => {
  const [toastApi, toastContext] = message.useMessage()

  useEffect(() => {
    eventBus.on('global/toast', ({ type, content, options }) => {
      const toastOptons = {
        type,
        content,
        className: 'global-toast',
        duration: 1.5,
        ...options
      }
      toastApi.open(toastOptons)
    })
  }, [])

  return toastContext
}

export default useGlobalToast
