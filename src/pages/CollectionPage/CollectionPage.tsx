import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { RefetchProvider, usePagination } from '../../hooks'
import { Link } from 'react-router-dom'
import { Box, Button, Stack } from '@auspices/eos'
import { generate as generateHrefs } from '../../util/hrefs'
import { AddToCollection } from '../../components/AddToCollection'
import { Loading } from '../../components/Loading'
import { Pagination } from '../../components/Pagination'
import {
  COLLECTION_CONTENTS_FRAGMENT,
  CollectionContents,
} from '../../components/CollectionContents'
import {
  COLLECTION_SETTINGS_FRAGMENT,
  CollectionSettings,
} from '../../components/CollectionSettings'
import { SampleCollectionContent } from '../../components/SampleCollectionContent'

export const COLLECTION_PAGE_QUERY = gql`
  query CollectionPageQuery($id: ID!, $page: Int, $per: Int) {
    me {
      id
      slug
      username
      collection(id: $id) {
        id
        slug
        title
        counts {
          contents
        }
        ...CollectionContentsFragment
        ...CollectionSettingsFragment
      }
    }
  }
  ${COLLECTION_CONTENTS_FRAGMENT}
  ${COLLECTION_SETTINGS_FRAGMENT}
`

type CollectionPageProps = {
  id: string
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ id }) => {
  const { page, per } = usePagination()
  const { data, loading, error, refetch } = useQuery(COLLECTION_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      id,
      page,
      per,
    },
  })

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me,
    me: { username, collection },
  } = data

  const hrefs = generateHrefs(me)

  return (
    <RefetchProvider refetch={refetch}>
      <Stack flex="1">
        <Stack direction={['vertical', 'horizontal']}>
          <Button as={Link} to={hrefs.collections}>
            {username}
          </Button>

          <Button as={Link} to={`${hrefs.collection(collection)}`}>
            {collection.title}
          </Button>

          <AddToCollection id={collection.id} />

          <SampleCollectionContent id={collection.id}>
            random
          </SampleCollectionContent>
        </Stack>

        <CollectionSettings collection={collection} />

        <Pagination
          href={`${hrefs.collection(collection)}`}
          page={page}
          per={per}
          total={collection.counts.contents}
        />

        <Box flex="1">
          <CollectionContents collection={collection} hrefs={hrefs} />
        </Box>

        <Pagination
          href={`${hrefs.collection(collection)}`}
          page={page}
          per={per}
          total={collection.counts.contents}
        />
      </Stack>
    </RefetchProvider>
  )
}
