import React from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Cell, Loading } from '@auspices/eos'
import {
  COLLECTION_STUB_LIST_FRAGMENT,
  CollectionStubList,
} from './CollectionStubList'
import {
  FilteredCollectionStubListQuery,
  FilteredCollectionStubListQueryVariables,
} from '../generated/graphql'

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

export const FilteredCollectionStubList: React.FC<
  FilteredCollectionStubListProps
> = ({ query, onCompleted, ...rest }) => {
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
    return <Loading {...rest}>looking for “{query}”</Loading>
  }

  const {
    filtered: { collections },
  } = data

  if (collections.length === 0) {
    return (
      <Cell color="secondary" borderColor="secondary" {...rest}>
        nothing for “{query}”
      </Cell>
    )
  }

  return <CollectionStubList collections={collections} {...rest} />
}
