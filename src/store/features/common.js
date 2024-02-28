import { createSlice } from '@reduxjs/toolkit'

export const common = createSlice({
  name: 'common',
  initialState: {
    scrollFullMode: false,
    searchMode: false
  },
  reducers: {
    changeScrollFullMode(state, { payload }) {
      state.scrollFullMode = payload
    },
    changeSearchMode(state, { payload }) {
      state.searchMode = payload
    }
  }
})

export const { changeScrollFullMode, changeSearchMode } = common.actions

export default common.reducer
