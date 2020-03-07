import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'

import { collections as collectionsHref } from '../../util/hrefs'

import { WithAlerts } from '../../components/Alerts'

export const RedirectHome = WithAlerts(({ dispatchError }) => {
  return (
    <Query
      query={gql`
        {
          me {
            __typename
            id
            slug
          }
        }
      `}
      onError={dispatchError}
    >
      {({ data, loading, error }) => {
        if (error || loading) return null

        const { me } = data

        return <Redirect to={collectionsHref(me)} />
      }}
    </Query>
  )
})
