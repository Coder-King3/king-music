import request from '@/service'
import { toastError } from '@/utils/common'
import axios from 'axios'

// 获取搜索数据
export const getSearchData = (params) =>
  request.get({ url: '/search', params: params })

// 搜索增强
export const search = (keywords, type = 'all', limit = 16) => {
  const typeTable = {
    all: 1018, // 综合
    musicVideos: 1004, // MV
    tracks: 1, // 单曲
    albums: 10, //  专辑
    artists: 100, // 歌手
    playlists: 1000 // 歌单
  }

  return getSearchData({
    keywords,
    type: typeTable[type],
    limit
  })
    .then((result) => {
      return { result: result.result, type }
    })
    .catch((err) => {
      toastError(err.response.data.msg || err.response.data.message)
    })
}
