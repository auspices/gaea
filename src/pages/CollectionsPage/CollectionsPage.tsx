import React, { useCallback, useState } from 'react'
import gql from 'graphql-tag'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Loading, PaneOption, Stack, useThemer } from '@auspices/eos'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import { Helmet } from 'react-helmet'
import { useHrefs, usePagination } from '../../hooks'
import { Pagination } from '../../components/Pagination'
import { BottomNav } from '../../components/BottomNav'
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
import { Z } from '../../util/zIndexes'

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

  const history = useHistory()

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

  const client = useApolloClient()

  const { scheme, toggleScheme } = useThemer()

  const handleLogout = useCallback(() => {
    client.resetStore()
    localStorage.removeItem('jwt')
    history.push(hrefs.root())
  }, [client, history, hrefs])

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
    <>
      <Helmet>
        <title>{username}</title>
      </Helmet>

      <Stack>
        <Stack direction="horizontal">
          <Dropdown label={username} zIndex={Z.DROPDOWN}>
            <PaneOption as={Link} to={hrefs.collections()}>
              refresh
            </PaneOption>

            <PaneOption as={Link} to={hrefs.account()}>
              settings
            </PaneOption>

            <PaneOption onClick={toggleScheme}>
              {{ dark: 'light', light: 'dark' }[scheme]}
            </PaneOption>

            <PaneOption
              borderTop="1px solid"
              borderColor="hint"
              onClick={handleLogout}
            >
              logout
            </PaneOption>
          </Dropdown>

          <CreateCollection onChange={setQuery} />
        </Stack>

        {debouncedQuery ? (
          <FilteredCollectionStubList query={debouncedQuery} />
        ) : (
          [
            <CollectionStubList key="a" collections={collections} />,

            <BottomNav key="b">
              <Pagination
                href={hrefs.collections()}
                page={page}
                per={per}
                total={me.counts.collections}
              />
            </BottomNav>,
          ]
        )}
      </Stack>
    </>
  )
}
