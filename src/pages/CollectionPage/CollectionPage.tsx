import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Box,
  Button,
  Caret,
  colorHash,
  Dropdown,
  Loading,
  PaneOption,
  space,
  Stack,
  Tooltip,
} from '@auspices/eos'
import { useHrefs, usePagination, useRefetch } from '../../hooks'
import { AddToCollection } from '../../components/AddToCollection'
import { Pagination } from '../../components/Pagination'
import { BottomNav } from '../../components/BottomNav'
import { PublishCollection } from '../../components/PublishCollection'
import { UnpublishCollection } from '../../components/UnpublishCollection'
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
        key
        title
        counts {
          contents
        }
        within {
          id
          slug
          title
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
    variables: { id, page, per },
  })

  useRefetch({ refetch })

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
              <PaneOption
                as={Link}
                to={hrefs.collectionSettings(collection.slug)}
              >
                settings
              </PaneOption>

              {collection.key ? (
                <>
                  <PaneOption
                    key="data"
                    as="a"
                    href={hrefs.data(collection.key)}
                    target="_blank"
                    borderTop="1px solid"
                    borderColor="hint"
                  >
                    data
                  </PaneOption>

                  <UnpublishCollection id={collection.id} />

                  <PublishCollection id={collection.id} regenerate />
                </>
              ) : (
                <PublishCollection
                  borderTop="1px solid"
                  borderColor="hint"
                  id={collection.id}
                />
              )}
            </Dropdown>
          </Stack>

          <Stack direction="horizontal" flex={1}>
            <AddToCollection id={collection.id} />

            <Box border="1px solid" display="flex">
              {collection.within.length > 0 &&
                collection.within.map(({ id, title, slug }) => {
                  return (
                    <Tooltip key={id} label={title} placement="right">
                      <Box
                        as={Link}
                        to={hrefs.collection(slug)}
                        bg={colorHash(title)}
                        width={space(3)}
                      />
                    </Tooltip>
                  )
                })}
            </Box>
          </Stack>
        </Stack>

        <CollectionSettings collection={collection} />

        <Box flex="1">
          <CollectionContents my={4} collection={collection} />
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
                  rand
                </SampleCollectionContent>
              )}
            </Stack>
          </BottomNav>
        )}
      </Stack>
    </>
  )
}
