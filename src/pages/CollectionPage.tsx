import React from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Box,
  Button,
  Caret,
  Divider,
  Dropdown,
  Flyout,
  Loading,
  PaneHeader,
  PaneOption,
  Stack,
} from '@auspices/eos'
import { useHrefs, usePagination } from '../hooks'
import { AddToCollection } from '../components/AddToCollection'
import { Pagination } from '../components/Pagination'
import { BottomNav } from '../components/BottomNav'
import { PublishCollectionPaneOption } from '../components/PublishCollection'
import { CollectionContentsGridPaginationContainer } from '../components/CollectionContentsGrid'
import {
  COLLECTION_SETTINGS_FRAGMENT,
  CollectionSettings,
} from '../components/CollectionSettings'
import { SampleCollectionContent } from '../components/SampleCollectionContent'
import {
  CollectionPageQuery,
  CollectionPageQueryVariables,
} from '../generated/graphql'
import { Z } from '../util/zIndexes'
import { useParams } from 'react-router'

export const COLLECTION_PAGE_QUERY = gql`
  query CollectionPageQuery($id: ID!) {
    me {
      id
      slug
      username
      collection(id: $id) {
        id
        slug
        key
        title
        updatedAt(relative: true)
        counts {
          contents
        }
        within {
          id
          slug
          title
        }
        ...CollectionSettingsFragment
      }
    }
  }
  ${COLLECTION_SETTINGS_FRAGMENT}
`

export const CollectionPage: React.FC = () => {
  const { id = '' } = useParams()
  const { page, per } = usePagination()

  const hrefs = useHrefs()

  const { data, loading, error } = useQuery<
    CollectionPageQuery,
    CollectionPageQueryVariables
  >(COLLECTION_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id },
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

      <Stack flex="1">
        <Stack direction={['vertical', 'vertical', 'horizontal']}>
          <Stack direction="horizontal">
            <Button as={Link} to={hrefs.collections()}>
              <Caret direction="left" mr={3} />
              {username}
            </Button>

            <Dropdown flex="1" label={collection.title} zIndex={Z.DROPDOWN}>
              <PaneHeader>last updated {collection.updatedAt}</PaneHeader>

              <PaneOption
                as={Link}
                to={hrefs.collectionSettings(collection.slug)}
              >
                settings
              </PaneOption>

              <Divider />

              {collection.key ? (
                <>
                  <PaneOption
                    key="data"
                    as="a"
                    href={hrefs.data(collection.key)}
                    target="_blank"
                  >
                    view data
                  </PaneOption>

                  <PaneOption
                    as={Link}
                    to={hrefs.collectionSettings(collection.slug)}
                  >
                    unpublish
                  </PaneOption>
                </>
              ) : (
                <PublishCollectionPaneOption id={collection.id} />
              )}

              <Divider />

              {collection.within.length > 0 ? (
                <Flyout
                  label={
                    <Box as="span">
                      backlinks{' '}
                      <Box as="span" color="tertiary">
                        {collection.within.length}
                      </Box>
                    </Box>
                  }
                >
                  {/* TODO: Move this into an async component that only fetches when needed */}
                  {collection.within.map(({ id, title, slug }) => {
                    return (
                      <PaneOption
                        key={id}
                        as={Link}
                        to={hrefs.collection(slug)}
                      >
                        {title}
                      </PaneOption>
                    )
                  })}
                </Flyout>
              ) : (
                <PaneHeader>no backlinks</PaneHeader>
              )}
            </Dropdown>
          </Stack>

          <AddToCollection id={collection.id} />
        </Stack>

        <CollectionSettings collection={collection} />

        <Box flex="1">
          <CollectionContentsGridPaginationContainer
            my={4}
            id={id}
            page={page}
            per={per}
          />
        </Box>

        {collection.counts.contents > 0 && (
          <BottomNav>
            <Stack direction={['vertical', 'vertical', 'horizontal']}>
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
                  random
                </SampleCollectionContent>
              )}
            </Stack>
          </BottomNav>
        )}
      </Stack>
    </>
  )
}
