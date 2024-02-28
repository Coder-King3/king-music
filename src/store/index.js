import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './features/common'
import trackReducer from './features/track'
import settingReducer from './features/setting'

const store = configureStore({
  reducer: {
    common: commonReducer,
    track: trackReducer,
    setting: settingReducer
  }
})

export default store
