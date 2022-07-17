import React from 'react'
import { Navigate } from 'react-router-dom'
import { useHrefs } from '../hooks'

export const RedirectHome = () => {
  const hrefs = useHrefs()
  return <Navigate to={hrefs.collections()} />
}
