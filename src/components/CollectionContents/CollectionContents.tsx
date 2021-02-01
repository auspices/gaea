import React from 'react'
import gql from 'graphql-tag'
import { Grid, GridProps, MultiSelect } from '@auspices/eos'
import {
  COLLECTION_CONTENT_FRAGMENT,
  CollectionContent,
} from '../../components/CollectionContent'
import { CollectionContentsFragment } from '../../generated/types/CollectionContentsFragment'

export const COLLECTION_CONTENTS_FRAGMENT = gql`
  fragment CollectionContentsFragment on Collection {
    id
    contents(page: $page, per: $per) {
      id
      ...CollectionContentFragment
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
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
            collectionId={collection.id}
            content={content}
          />
        ))}
      </Grid>
    </MultiSelect>
  )
}
