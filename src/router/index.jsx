import React, { useEffect } from 'react'

import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../layout'
import Search from '@/pages/search'
import Recomm from '@/pages/recomm'

const AuthRoute = (props) => {
  const { children, location } = props

  useEffect(() => {
    // console.log(`props:`, props)
    // console.log(`location:`, location)
  }, [location])

  return <>{children}</>
}

const LayoutRoutes = (childrens) => [
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout></Layout>
      </AuthRoute>
    ),
    children: childrens
  }
]

const routes = LayoutRoutes([
  {
    path: '/',
    element: <Navigate to="/search"></Navigate>
  },
  {
    path: '/search',
    element: <Search></Search>
  },
  {
    path: '/recomm',
    element: <Recomm></Recomm>
  }
])

const router = createBrowserRouter(routes)

export default router
