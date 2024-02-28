import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeBackdropUrl,
  changeBackdropMode,
  changeThemeMode
} from '@/store/features/setting'
import { localCache } from '@/utils/cache'

function useInitialState() {
  const dispatch = useDispatch()
  const setThemeMode = (mode) => dispatch(changeThemeMode(mode))
  const setBackdropMode = (mode) => dispatch(changeBackdropMode(mode))
  const setBackdropUrl = (url) => dispatch(changeBackdropUrl(url))

  useEffect(() => {
    const themeMode = localCache.getCache('theme-mode')
    const backdropMode = localCache.getCache('backdrop-mode')
    const backdropUrl = localCache.getCache('backdrop-url')

    if (!themeMode || themeMode.trim() === '') setThemeMode('dark')
    if (!backdropMode || backdropMode.trim() === '') setBackdropMode('video')
    if (!backdropUrl || backdropUrl.trim() === '') {
      setBackdropUrl('https://assets.codepen.io/3364143/7btrrd.mp4')
    } else if (backdropMode == 'bing') {
      setBackdropUrl('https://api.oneneko.com/v1/bing_today')
    }
  }, [])
}

export default useInitialState
