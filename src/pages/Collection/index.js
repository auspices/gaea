import React from 'react'
import { Query } from 'react-apollo'

import collectionQuery from './queries/collection'

import Grid from 'components/UI/Grid'
import Link from 'components/UI/Link'
import Pagination from 'components/UI/Pagination'
import Header from 'components/Header'
import AddToCollection from 'components/AddToCollection'
import CollectionContent from 'components/CollectionContent'
import { WithAlerts } from 'components/Alerts'

const Collection = ({ id, page, per, dispatchError }) => (
  <Query
    query={collectionQuery}
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
        me: { username, collection },
      } = data

      return (
        <>
          <Header>
            <Link to="/collections" key="username">
              {username}
            </Link>

            <Link to={`/collections/${id}`} key="title">
              {collection.title}
            </Link>

            <AddToCollection key="input" collection={collection} per={per} />
          </Header>

          <Pagination
            href={`/collections/${id}`}
            page={page}
            per={per}
            total={collection.counts.contents}
            mt="-1px"
          />

          <Grid my={6}>
            {collection.contents.map(content => (
              <CollectionContent
                key={`CollectionContent:${content.id}`}
                collection={collection}
                content={content}
                page={page}
                per={per}
              />
            ))}
          </Grid>
        </>
      )
    }}
  </Query>
)

export default WithAlerts(Collection)
