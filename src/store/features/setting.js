import { createSlice } from '@reduxjs/toolkit'
import { localCache } from '@/utils/cache'

export const common = createSlice({
  name: 'setting',
  initialState: {
    themeMode: localCache.getCache('theme-mode') || 'dark', // dark or light
    backdropUrl: localCache.getCache('backdrop-url'),
    backdropMode: localCache.getCache('backdrop-mode') || 'video' // image / bing / video
  },
  reducers: {
    changeBackdropUrl(state, { payload }) {
      localCache.setCache('backdrop-url', payload)
      state.backdrop = payload
    },
    changeBackdropMode(state, { payload }) {
      localCache.setCache('backdrop-mode', payload)
      state.backdrop = payload
    },
    changeThemeMode(state, { payload }) {
      localCache.setCache('theme-mode', payload)
      state.themeMode = payload
    }
  }
})

export const { changeBackdropUrl, changeBackdropMode, changeThemeMode } =
  common.actions

export default common.reducer
