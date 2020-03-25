import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Box, Button, Pane, PaneOption, Popper, Stack } from '@auspices/eos'
import {
  RefetchProvider,
  useActive,
  useHrefs,
  usePagination,
} from '../../hooks'
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
import {
  CollectionPageQuery,
  CollectionPageQueryVariables,
} from '../../generated/types/CollectionPageQuery'

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

  const { mode, setResting, setActive, Mode } = useActive()

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
    <RefetchProvider refetch={refetch}>
      <Stack flex="1">
        <Stack direction={['vertical', 'vertical', 'horizontal']}>
          <Button as={Link} to={hrefs.collections()}>
            {username}
          </Button>

          <Box zIndex={1}>
            <Popper
              open={mode === Mode.Active}
              onClose={setResting}
              anchor={<Button onClick={setActive}>{collection.title}</Button>}
              placement="bottom"
            >
              <Pane>
                <PaneOption
                  as={Link}
                  to={hrefs.collectionSettings(collection.slug)}
                >
                  collection settings
                </PaneOption>
              </Pane>
            </Popper>
          </Box>

          <AddToCollection id={collection.id} />

          <SampleCollectionContent id={collection.slug}>
            random
          </SampleCollectionContent>
        </Stack>

        <CollectionSettings collection={collection} />

        <Pagination
          href={hrefs.collection(collection.slug)}
          page={page}
          per={per}
          total={collection.counts.contents}
        />

        <Box flex="1">
          <CollectionContents collection={collection} />
        </Box>

        <Pagination
          href={hrefs.collection(collection.slug)}
          page={page}
          per={per}
          total={collection.counts.contents}
        />
      </Stack>
    </RefetchProvider>
  )
}
