import { gql } from 'graphql-tag'
import { FC } from 'react'
import { BoxProps, Grid } from '@auspices/eos'
import { FadeOut } from './FadeOut'
import { usePagination } from '../hooks/usePagination'
import { useQuery } from '@apollo/client'
import {
  CollectionPreviewQuery,
  CollectionPreviewQueryVariables,
} from '../generated/graphql'
import {
  COLLECTION_CONTENT_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_CONTENT_FRAGMENT,
  CollectionContent,
} from './CollectionContent'

type EmbeddedCollectionProps = BoxProps & {
  id: number
}

export const EmbeddedCollection: FC<EmbeddedCollectionProps> = ({
  id,
  ...rest
}) => {
  const { per } = usePagination()

  const { data, loading, error } = useQuery<
    CollectionPreviewQuery,
    CollectionPreviewQueryVariables
  >(EMBEDDED_COLLECTION_QUERY, {
    variables: { id: `${id}`, per },
  })

  if (error) return null
  if (loading || !data) return null

  const {
    me: { collection },
  } = data

  return (
    <FadeOut style={{ pointerEvents: 'none' }} {...rest}>
      <Grid>
        {collection.contents.map((content) => {
          return (
            <CollectionContent
              key={content.id}
              // FIXME: Mysterious type-error that doesn't seem to actually cause issues
              // @ts-ignore
              collection={collection}
              // @ts-ignore
              content={content}
            />
          )
        })}
      </Grid>
    </FadeOut>
  )
}

export const EMBEDDED_COLLECTION_FRAGMENT = gql`
  fragment EmbeddedCollectionFragment on Collection {
    ...CollectionContentCollectionFragment
    contents(per: $per) {
      ...CollectionContentContentFragment
      id
    }
  }
  ${COLLECTION_CONTENT_COLLECTION_FRAGMENT}
  ${COLLECTION_CONTENT_CONTENT_FRAGMENT}
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
