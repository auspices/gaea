import { useQuery } from '@apollo/client'
import { Button, Grid, Loading, Stack } from '@auspices/eos'
import { gql } from 'graphql-tag'
import { usePagination } from '../hooks'
import { HomePageQuery, HomePageQueryVariables } from '../generated/graphql'
import {
  COLLECTION_STUB_FRAGMENT,
  CollectionStub,
} from '../components/CollectionStub'
import { CreateCollection } from '../components/CreateCollection'
import { FilteredCollectionStubList } from '../components/FilteredCollectionStubList'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import {
  COLLECTION_CONTENT_CONTENT_FRAGMENT,
  CollectionContent,
} from '../components/CollectionContent'

export const HomePage = () => {
  const { page, per } = usePagination()
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 150)

  const { data, loading, error } = useQuery<
    HomePageQuery,
    HomePageQueryVariables
  >(HOME_PAGE_QUERY, {
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
    me: { username, collections, contents },
  } = data

  return (
    <>
      <Stack spacing={5}>
        <Stack direction="horizontal">
          <Button>{username}</Button>

          <CreateCollection onChange={setQuery} />
        </Stack>

        {debouncedQuery && (
          <FilteredCollectionStubList query={debouncedQuery} />
        )}

        <Grid>
          {collections.map((collection) => (
            <CollectionStub key={collection.id} collection={collection} />
          ))}
        </Grid>

        <Grid>
          {contents.map((content) => (
            <CollectionContent key={content.id} content={content} />
          ))}
        </Grid>
      </Stack>
    </>
  )
}

export const HOME_PAGE_QUERY = gql`
  query HomePageQuery($page: Int, $per: Int) {
    me {
      id
      slug
      username
      counts {
        collections
      }
      collections(page: $page, per: $per) {
        ...CollectionStubFragment
        id
      }
      contents(sortBy: CREATED_AT_DESC) {
        ...CollectionContentContentFragment
        id
      }
    }
  }
  ${COLLECTION_CONTENT_CONTENT_FRAGMENT}
  ${COLLECTION_STUB_FRAGMENT}
`
