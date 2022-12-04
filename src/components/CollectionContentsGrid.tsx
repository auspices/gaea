import React from 'react'
import { useQuery } from '@apollo/client'
import { gql } from 'graphql-tag'
import { Grid, GridProps, Loading, MultiSelect } from '@auspices/eos'
import {
  COLLECTION_CONTENT_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_CONTENT_FRAGMENT,
  CollectionContent,
} from './CollectionContent'
import {
  CollectionContentsGridFragment,
  CollectionContentsGridQuery,
  CollectionContentsGridQueryVariables,
} from '../generated/graphql'
import { useRefetch } from '../hooks'

export const COLLECTION_CONTENTS_GRID_FRAGMENT = gql`
  fragment CollectionContentsGridFragment on Collection {
    id
    ...CollectionContentCollectionFragment
    contents(page: $page, per: $per) {
      id
      ...CollectionContentContentFragment
    }
  }
  ${COLLECTION_CONTENT_CONTENT_FRAGMENT}
  ${COLLECTION_CONTENT_COLLECTION_FRAGMENT}
`

export type CollectionContentsGridProps = GridProps & {
  collection: CollectionContentsGridFragment
}

export const CollectionContentsGrid: React.FC<CollectionContentsGridProps> = ({
  collection,
  ...rest
}) => {
  return (
    // FIXME: @auspices/eos
    // @ts-ignore
    <MultiSelect>
      <Grid {...rest}>
        {collection.contents.map((content) => (
          <CollectionContent
            key={content.id}
            collection={collection}
            content={content}
          />
        ))}
      </Grid>
    </MultiSelect>
  )
}

export const COLLECTION_CONTENTS_GRID_QUERY = gql`
  query CollectionContentsGridQuery($id: ID!, $page: Int, $per: Int) {
    me {
      id
      collection(id: $id) {
        id
        ...CollectionContentsGridFragment
      }
    }
  }
  ${COLLECTION_CONTENTS_GRID_FRAGMENT}
`

type CollectionContentsGridPaginationContainerProps = GridProps & {
  id: string
  page: number
  per: number
}

export const CollectionContentsGridPaginationContainer: React.FC<
  CollectionContentsGridPaginationContainerProps
> = ({ id, page, per, ...rest }) => {
  const { data, loading, error, refetch } = useQuery<
    CollectionContentsGridQuery,
    CollectionContentsGridQueryVariables
  >(COLLECTION_CONTENTS_GRID_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id, page, per },
  })

  // Sets refetch for adding/removing content from collection
  useRefetch({ refetch })

  if (error) {
    throw error
  }

  if (loading || !data) {
    return <Loading />
  }

  const {
    me: { collection },
  } = data

  return <CollectionContentsGrid collection={collection} {...rest} />
}
