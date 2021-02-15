import React from 'react'
import gql from 'graphql-tag'
import { Grid, GridProps, MultiSelect } from '@auspices/eos'
import {
  COLLECTION_CONTENT_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_FRAGMENT,
  CollectionContent,
} from '../../components/CollectionContent'
import { CollectionContentsFragment } from '../../generated/types/CollectionContentsFragment'

export const COLLECTION_CONTENTS_FRAGMENT = gql`
  fragment CollectionContentsFragment on Collection {
    id
    ...CollectionContentCollectionFragment
    contents(page: $page, per: $per) {
      id
      ...CollectionContentFragment
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
  ${COLLECTION_CONTENT_COLLECTION_FRAGMENT}
`

export type CollectionContentsProps = GridProps & {
  collection: CollectionContentsFragment
}

export const CollectionContents: React.FC<CollectionContentsProps> = ({
  collection,
  ...rest
}) => {
  return (
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
