import React from 'react'
import { gql } from 'graphql-tag'
import { Grid, GridProps, MultiSelect } from '@auspices/eos'
import {
  COLLECTION_CONTENT_COLLECTION_FRAGMENT,
  COLLECTION_CONTENT_CONTENT_FRAGMENT,
  CollectionContent,
} from './CollectionContent'
import { CollectionContentsGridFragment } from '../generated/types/CollectionContentsGridFragment'

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
