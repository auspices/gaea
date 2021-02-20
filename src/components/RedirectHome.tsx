import React from 'react'
import { Redirect } from 'react-router-dom'
import { useHrefs } from '../hooks'

export const RedirectHome = () => {
  const hrefs = useHrefs()
  return <Redirect to={hrefs.collections()} />
}
