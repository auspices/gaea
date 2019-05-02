import React from 'react'
import { Query } from 'react-apollo'

import collectionQuery from './queries/collection'

import { generate as generateHrefs } from 'util/hrefs'

import Grid from 'components/UI/Grid'
import Link from 'components/UI/Link'
import Pagination from 'components/UI/Pagination'
import Header from 'components/Header'
import AddToCollection from 'components/AddToCollection'
import CollectionContent from 'components/CollectionContent'
import { WithAlerts } from 'components/Alerts'
import { CollectionFileDropzone } from 'components/CollectionFileDropzone'

const Collection = ({ id, page, per, dispatchError }) => {
  return (
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
          me,
          me: { username, collection },
        } = data

        const hrefs = generateHrefs(me)

        return (
          <>
            <CollectionFileDropzone collectionId={collection.id} per={per} />

            <Header>
              <Link to={hrefs.collections} key="username">
                {username}
              </Link>

              <Link to={hrefs.collection(collection)} key="title">
                {collection.title}
              </Link>

              <AddToCollection key="input" collection={collection} per={per} />
            </Header>

            <Pagination
              href={hrefs.collection(collection)}
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
                  hrefs={hrefs}
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
}

export default WithAlerts(Collection)
