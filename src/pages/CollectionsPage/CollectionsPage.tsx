import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Box, Button, Pane, PaneOption, Popper, Stack } from '@auspices/eos'
import { useQuery } from '@apollo/react-hooks'
import { useActive, usePagination } from '../../hooks'
import { generate as generateHrefs } from '../../util/hrefs'
import { Loading } from '../../components/Loading'
import { Pagination } from '../../components/Pagination'
import { CreateCollection } from '../../components/CreateCollection'
import {
  COLLECTION_STUB_FRAGMENT,
  CollectionStub,
} from '../../components/CollectionStub'
import {
  CollectionsPageQuery,
  CollectionsPageQueryVariables,
} from '../../generated/types/CollectionsPageQuery'

export const COLLECTIONS_PAGE_QUERY = gql`
  query CollectionsPageQuery($page: Int, $per: Int) {
    me {
      id
      slug
      username
      counts {
        collections
      }
      collections(page: $page, per: $per) {
        ...CollectionStubFragment
      }
    }
  }
  ${COLLECTION_STUB_FRAGMENT}
`

export type CollectionsPageProps = {}

export const CollectionsPage: React.FC<CollectionsPageProps> = () => {
  const { page, per } = usePagination()

  const { mode, setResting, setActive, Mode } = useActive()

  const { data, loading, error } = useQuery<
    CollectionsPageQuery,
    CollectionsPageQueryVariables
  >(COLLECTIONS_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: { page, per },
  })

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me,
    me: { username, collections },
  } = data

  const hrefs = generateHrefs(me)

  return (
    <Stack>
      <Stack direction="horizontal">
        <Box zIndex={1}>
          <Popper
            open={mode === Mode.Active}
            onClose={setResting}
            anchor={<Button onClick={setActive}>{username}</Button>}
            placement="bottom"
          >
            <Pane>
              <PaneOption as={Link} to="/account">
                account settings
              </PaneOption>
            </Pane>
          </Popper>
        </Box>

        <CreateCollection hrefs={hrefs} />
      </Stack>

      <Pagination
        href={hrefs.collections}
        page={page}
        per={per}
        total={me.counts.collections}
      />

      <Stack>
        {collections.map((collection) => (
          <CollectionStub
            key={collection.id}
            collection={collection}
            hrefs={hrefs}
          />
        ))}
      </Stack>

      <Pagination
        href={hrefs.collections}
        page={page}
        per={per}
        total={me.counts.collections}
      />
    </Stack>
  )
}
