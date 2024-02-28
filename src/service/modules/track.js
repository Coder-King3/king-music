import request from '@/service'
import {
  toastInfo,
  toastSuccess,
  toastError,
  toastWarning
} from '@/utils/common'

// 获取歌曲详情
export const getSongDetail = (ids) =>
  request.get({ url: '/song/detail', params: { ids } })

export const getSongUrl = (id) =>
  request
    .get({ url: '/song/url/v1', params: { id, level: 'standard' } })
    .then((result) => {
      console.log(`result:`, result)
      if (result.code == 200 && result.data[0].url) {
        return {
          status: 'success',
          ...result.data[0]
        }
      } else {
        toastError('该音乐暂无音源！')
        return {
          status: 'error',
          ...result.data[0]
        }
      }
    })
    .catch((err) => {
      toastError('获取音乐资源出错！')
      return {
        status: 'error',
        ...err
      }
    })
