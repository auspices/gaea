import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { useHrefs } from '../../hooks'
import { Loading } from '../Loading'

const REDIRECT_HOME_QUERY = gql`
  query RedirectHomeQuery {
    me {
      id
      slug
    }
  }
`

export const RedirectHome = () => {
  const { data, loading, error } = useQuery(REDIRECT_HOME_QUERY)

  const hrefs = useHrefs()

  if (error) {
    throw error
  }

  if (loading) {
    return <Loading />
  }

  return <Redirect to={hrefs.collections(data.me.slug)} />
}
