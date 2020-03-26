import React from 'react'
import gql from 'graphql-tag'
import { Pill } from '@auspices/eos'
import {
  COLLECTION_STUB_LIST_FRAGMENT,
  CollectionStubList,
} from '../CollectionStubList'
import {
  FilteredCollectionStubListQuery,
  FilteredCollectionStubListQueryVariables,
} from '../../generated/types/FilteredCollectionStubListQuery'
import { useQuery } from '@apollo/react-hooks'

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
    return <Pill {...rest}>sifting</Pill>
  }

  const {
    filtered: { collections },
  } = data

  return <CollectionStubList collections={collections} {...rest} />
}
