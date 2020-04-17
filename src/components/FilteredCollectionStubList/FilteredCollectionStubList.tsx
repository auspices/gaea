import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Loading, Pill } from '@auspices/eos'
import {
  COLLECTION_STUB_LIST_FRAGMENT,
  CollectionStubList,
} from '../CollectionStubList'
import {
  FilteredCollectionStubListQuery,
  FilteredCollectionStubListQueryVariables,
} from '../../generated/types/FilteredCollectionStubListQuery'

export const FILTERED_COLLECTION_STUB_LIST_QUERY = gql`
  query FilteredCollectionStubListQuery($query: String!) {
    filtered: me {
      id
      collections(query: $query) {
        id
        ...CollectionStubListFragment
      }
    }
  }
  ${COLLECTION_STUB_LIST_FRAGMENT}
`

export type FilteredCollectionStubListProps = {
  query?: string
  onCompleted?(): void
}

export const FilteredCollectionStubList: React.FC<FilteredCollectionStubListProps> = ({
  query,
  onCompleted,
  ...rest
}) => {
  const { data, loading, error } = useQuery<
    FilteredCollectionStubListQuery,
    FilteredCollectionStubListQueryVariables
  >(FILTERED_COLLECTION_STUB_LIST_QUERY, {
    skip: !query,
    variables: { query: query || '' },
    onCompleted,
  })

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading>looking for “{query}”</Loading>
  }

  const {
    filtered: { collections },
  } = data

  if (collections.length === 0) {
    return (
      <Pill color="secondary" borderColor="secondary">
        nothing for “{query}”
      </Pill>
    )
  }

  return <CollectionStubList collections={collections} {...rest} />
}
