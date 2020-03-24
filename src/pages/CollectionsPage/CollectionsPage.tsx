import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Box, Button, Pane, PaneOption, Popper, Stack } from '@auspices/eos'
import { useQuery } from '@apollo/react-hooks'
import { useActive, useHrefs, usePagination } from '../../hooks'
import { Loading } from '../../components/Loading'
import { Pagination } from '../../components/Pagination'
import { CreateCollection } from '../../components/CreateCollection'
import {
  COLLECTION_STUB_LIST_FRAGMENT,
  CollectionStubList,
} from '../../components/CollectionStubList'
import { FilteredCollectionStubList } from '../../components/FilteredCollectionStubList'
import {
  CollectionsPageQuery,
  CollectionsPageQueryVariables,
} from '../../generated/types/CollectionsPageQuery'
import { useDebounce } from 'use-debounce/lib'

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
        ...CollectionStubListFragment
      }
    }
  }
  ${COLLECTION_STUB_LIST_FRAGMENT}
`

export type CollectionsPageProps = {}

export const CollectionsPage: React.FC<CollectionsPageProps> = () => {
  const { page, per } = usePagination()

  const hrefs = useHrefs()

  const { mode, setResting, setActive, Mode } = useActive()

  const { data, loading, error } = useQuery<
    CollectionsPageQuery,
    CollectionsPageQueryVariables
  >(COLLECTIONS_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: { page, per },
  })

  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event
      setQuery(value)
    },
    []
  )

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
              <PaneOption as={Link} to={hrefs.account()}>
                account settings
              </PaneOption>
            </Pane>
          </Popper>
        </Box>

        <CreateCollection onChange={handleChange} />
      </Stack>

      <Pagination
        href={hrefs.collections()}
        page={page}
        per={per}
        total={me.counts.collections}
      />

      {debouncedQuery ? (
        <FilteredCollectionStubList query={debouncedQuery} />
      ) : (
        <CollectionStubList collections={collections} />
      )}

      <Pagination
        href={hrefs.collections()}
        page={page}
        per={per}
        total={me.counts.collections}
      />
    </Stack>
  )
}
