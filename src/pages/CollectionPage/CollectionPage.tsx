import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Box,
  Button,
  Caret,
  Dropdown,
  Loading,
  PaneOption,
  Stack,
} from '@auspices/eos'
import { RefetchProvider, useHrefs, usePagination } from '../../hooks'
import { AddToCollection } from '../../components/AddToCollection'
import { Pagination } from '../../components/Pagination'
import { BottomNav } from '../../components/BottomNav'
import {
  COLLECTION_CONTENTS_FRAGMENT,
  CollectionContents,
} from '../../components/CollectionContents'
import {
  COLLECTION_SETTINGS_FRAGMENT,
  CollectionSettings,
} from '../../components/CollectionSettings'
import { SampleCollectionContent } from '../../components/SampleCollectionContent'
import {
  CollectionPageQuery,
  CollectionPageQueryVariables,
} from '../../generated/types/CollectionPageQuery'
import { Z } from '../../util/zIndexes'

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

  const hrefs = useHrefs()

  const { data, loading, error, refetch } = useQuery<
    CollectionPageQuery,
    CollectionPageQueryVariables
  >(COLLECTION_PAGE_QUERY, {
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
    me: { username, collection },
  } = data

  return (
    <>
      <Helmet>
        <title>{[collection.title, username].join(' / ')}</title>
      </Helmet>

      <RefetchProvider refetch={refetch}>
        <Stack flex="1">
          <Stack direction={['vertical', 'vertical', 'horizontal']}>
            <Stack direction="horizontal">
              <Button as={Link} to={hrefs.collections()}>
                <Caret direction="left" mr={3} />
                {username}
              </Button>

              <Dropdown flex="1" label={collection.title} zIndex={Z.DROPDOWN}>
                <PaneOption as={Link} to={hrefs.collection(collection.slug)}>
                  refresh
                </PaneOption>

                <PaneOption
                  as={Link}
                  to={hrefs.collectionSettings(collection.slug)}
                >
                  collection settings
                </PaneOption>
              </Dropdown>
            </Stack>

            <AddToCollection id={collection.id} />
          </Stack>

          <CollectionSettings collection={collection} />

          <Box flex="1">
            <CollectionContents collection={collection} />
          </Box>

          {collection.counts.contents > 0 && (
            <BottomNav>
              <Stack direction="horizontal">
                <Pagination
                  href={hrefs.collection(collection.slug)}
                  page={page}
                  per={per}
                  total={collection.counts.contents}
                  flex="1"
                />

                {collection.counts.contents > 1 && (
                  <SampleCollectionContent
                    id={collection.slug}
                    flex={collection.counts.contents <= per ? 1 : null}
                  >
                    rand
                  </SampleCollectionContent>
                )}
              </Stack>
            </BottomNav>
          )}
        </Stack>
      </RefetchProvider>
    </>
  )
}
