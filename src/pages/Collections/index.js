import React from 'react'
import { Query } from 'react-apollo'

import collectionsQuery from './queries/collections'

import { generate as generateHrefs } from 'util/hrefs'

import Link from 'components/UI/Link'
import Header from 'components/Header'
import CreateCollection from 'components/CreateCollection'
import CollectionsList from 'components/CollectionsList'
import { WithAlerts } from 'components/Alerts'

export default WithAlerts(({ dispatchError }) => (
  <Query
    query={collectionsQuery}
    onError={dispatchError}
    fetchPolicy="network-only"
  >
    {({ data, loading, error }) => {
      if (error) return null

      if (loading) {
        return <Header isLoading />
      }

      const {
        me,
        me: { username, collections },
      } = data

      const hrefs = generateHrefs(me)

      return (
        <>
          <Header>
            <Link key="name" to={hrefs.home}>
              {username}
            </Link>

            <CreateCollection key="input" hrefs={hrefs} />
          </Header>

          <CollectionsList collections={collections} hrefs={hrefs} />
        </>
      )
    }}
  </Query>
))
