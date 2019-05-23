import React from 'react'
import { Query } from 'react-apollo'

import { collectionSettingsQuery } from './queries/collectionSettings'

import { generate as generateHrefs } from 'util/hrefs'

import Link from 'components/UI/Link'
import Header from 'components/Header'
import { WithAlerts } from 'components/Alerts'
import { CollectionSettings as Settings } from 'components/CollectionSettings'

export const CollectionSettings = WithAlerts(
  ({ id, page, per, dispatchError }) => {
    return (
      <Query
        query={collectionSettingsQuery}
        variables={{ id, page, per }}
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
            me: { username, collection },
          } = data

          const hrefs = generateHrefs(me)

          return (
            <>
              <Header>
                <Link to={hrefs.collections} key="username">
                  {username}
                </Link>

                <Link to={hrefs.collection(collection)} key="title">
                  {collection.title}
                </Link>
              </Header>

              <Settings collection={collection} />
            </>
          )
        }}
      </Query>
    )
  }
)
