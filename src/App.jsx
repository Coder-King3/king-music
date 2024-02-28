import React, { Fragment, memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

const App = memo(() => {
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
    </Fragment>
  )
})

export default App
