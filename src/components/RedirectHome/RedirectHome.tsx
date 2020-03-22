import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { collections as collectionsHref } from '../../util/hrefs'
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
  // if (error || loading) return null
  if (error) {
    throw error
  }

  if (loading) {
    return <Loading />
  }

  return <Redirect to={collectionsHref(data.me)} />
}
