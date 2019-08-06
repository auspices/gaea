import React from 'react'
import { Query } from 'react-apollo'

import collectionsQuery from './queries/collections'

import { generate as generateHrefs } from 'util/hrefs'

import Link from 'components/UI/Link'
import Header from 'components/Header'
import Pagination from 'components/UI/Pagination'
import CreateCollection from 'components/CreateCollection'
import CollectionsList from 'components/CollectionsList'
import { WithAlerts } from 'components/Alerts'

export default WithAlerts(({ dispatchError, page, per }) => (
  <Query
    query={collectionsQuery}
    variables={{ page, per }}
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

          <Pagination
            href={hrefs.collections}
            page={page}
            per={per}
            total={me.counts.collections}
            mt="-1px"
          />

          <CollectionsList collections={collections} hrefs={hrefs} />

          <Pagination
            href={hrefs.collections}
            page={page}
            per={per}
            total={me.counts.collections}
            mt="-1px"
          />
        </>
      )
    }}
  </Query>
))
