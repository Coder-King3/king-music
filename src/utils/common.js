import eventBus from './eventBus'
import { fileDownload } from '@/utils'
import { getSongUrl } from '@/service/modules/track'

//! 全局提示
export const toastInfo = (content, options) =>
  eventBus.emit('global/toast', { type: 'info', content, options })
export const toastSuccess = (content, options) =>
  eventBus.emit('global/toast', { type: 'success', content, options })
export const toastError = (content, options) =>
  eventBus.emit('global/toast', { type: 'error', content, options })
export const toastWarning = (content, options) =>
  eventBus.emit('global/toast', { type: 'warning', content, options })

// 共用下载方法
export const downloadMP3 = ({ id, name }, fetchCycle) => {
  if (fetchCycle && fetchCycle?.cycleStart) fetchCycle?.cycleStart()
  getSongUrl(id)
    .then((result) => {
      if (result.code == 200 && result.data[0].url)
        fileDownload(result.data[0].url, `《${name}》`)
    })
    .finally(() => {
      if (fetchCycle && fetchCycle?.cycleEnd) fetchCycle?.cycleEnd()
    })
}

// 映射数据
export const mapTracksToIds = (songs) => songs.map((i) => i.id)
export const mapTracksToType = (list, type) => {
  const tracks = []

  list.forEach((item) => {
    const track = {
      id: item.id,
      name: item.name,
      source: item
    }

    switch (type) {
      case 'artist':
        track.cover = item['img1v1Url']
        break
      case 'album':
        track.cover = item['picUrl']
        break
      case 'playlist':
        track.cover = item['coverImgUrl']
        break
      case 'songs':
        track.cover = item['al']['picUrl']
        track.artist = item.ar
        break
    }

    tracks.push(track)
  })
  return tracks
}
