import React from 'react'
import { gql } from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { StackProps } from '@auspices/eos'
import {
  AddToCollectionExtendedSearchQuery,
  AddToCollectionExtendedSearchQueryVariables,
} from '../../generated/graphql'
import { AddToCollectionExtendedOptions } from './AddToCollectionExtendedOptions'

export const ADD_TO_COLLECTION_EXTENDED_SEARCH_QUERY = gql`
  query AddToCollectionExtendedSearchQuery($query: String!) {
    filtered: me {
      id
      collections(query: $query, per: 3) {
        id
        slug
        name
      }
    }
  }
`

type AddToCollectionExtendedProps = StackProps & {
  value: string
  onDone(): void
}

export const AddToCollectionExtended: React.FC<
  AddToCollectionExtendedProps
> = ({ value, ...rest }) => {
  // Skip if value is unreasonably long or looks like a URL
  const skip =
    value.length > 65 || (value.startsWith('http') && value.indexOf(' ') === -1)

  const { data, error } = useQuery<
    AddToCollectionExtendedSearchQuery,
    AddToCollectionExtendedSearchQueryVariables
  >(ADD_TO_COLLECTION_EXTENDED_SEARCH_QUERY, {
    variables: { query: value },
    skip,
  })

  if (error) {
    console.error(error)
    return null
  }

  if (!data) return null

  const {
    filtered: { collections },
  } = data

  return (
    <AddToCollectionExtendedOptions
      collections={collections}
      value={value}
      {...rest}
    />
  )
}
