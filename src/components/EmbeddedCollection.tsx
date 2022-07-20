import { gql } from 'graphql-tag'
import { FC } from 'react'
import { COLLECTION_CONTENT_ENTITY_FRAGMENT } from './CollectionContentEntity'
import { File, Grid } from '@auspices/eos'
import { FadeOut } from './FadeOut'
import { usePagination } from '../hooks/usePagination'
import { useQuery } from '@apollo/client'
import {
  CollectionPreviewQuery,
  CollectionPreviewQueryVariables,
} from '../generated/graphql'
import { COLLECTION_PREVIEW_QUERY } from './CollectionPreview'

type EmbeddedCollectionProps = {
  id: number
}

export const EmbeddedCollection: FC<EmbeddedCollectionProps> = ({ id }) => {
  const { per } = usePagination()

  const { data, loading, error } = useQuery<
    CollectionPreviewQuery,
    CollectionPreviewQueryVariables
  >(COLLECTION_PREVIEW_QUERY, {
    variables: { id: `${id}`, per },
  })

  if (error) return null
  if (loading || !data) return null

  const {
    me: { collection },
  } = data

  return (
    <FadeOut>
      <Grid>
        {collection.contents.map((content) => {
          return (
            <File key={content.id} disabled>
              {/* TODO: */}
              {/* <CollectionContentEntity entity={content.entity} /> */}
            </File>
          )
        })}
      </Grid>
    </FadeOut>
  )
}

export const EMBEDDED_COLLECTION_FRAGMENT = gql`
  fragment EmbeddedCollectionFragment on Collection {
    contents(per: $per) {
      id
      entity {
        __typename
        ...CollectionContentEntityFragment
      }
    }
  }
  ${COLLECTION_CONTENT_ENTITY_FRAGMENT}
`

export const EMBEDDED_COLLECTION_QUERY = gql`
  query EmbeddedCollectionQuery($id: ID!, $per: Int) {
    me {
      id
      collection(id: $id) {
        ...EmbeddedCollectionFragment
        id
      }
    }
  }
  ${EMBEDDED_COLLECTION_FRAGMENT}
`
