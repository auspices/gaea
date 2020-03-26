import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Dropdown, PaneOption, Stack } from '@auspices/eos'
import { useQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import { useHrefs, usePagination } from '../../hooks'
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

  const { data, loading, error } = useQuery<
    CollectionsPageQuery,
    CollectionsPageQueryVariables
  >(COLLECTIONS_PAGE_QUERY, {
    fetchPolicy: 'network-only',
    variables: { page, per },
  })

  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 150)

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
        <Dropdown label={username} zIndex={1}>
          <PaneOption as={Link} to={hrefs.collections()}>
            refresh
          </PaneOption>

          <PaneOption as={Link} to={hrefs.account()}>
            account settings
          </PaneOption>
        </Dropdown>

        <CreateCollection onChange={setQuery} />
      </Stack>

      {debouncedQuery ? (
        <FilteredCollectionStubList query={debouncedQuery} />
      ) : (
        [
          <Pagination
            key="a"
            href={hrefs.collections()}
            page={page}
            per={per}
            total={me.counts.collections}
          />,

          <CollectionStubList key="b" collections={collections} />,

          <Pagination
            key="c"
            href={hrefs.collections()}
            page={page}
            per={per}
            total={me.counts.collections}
          />,
        ]
      )}
    </Stack>
  )
}
