import React from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { Dropdown, PaneOption, Truncate } from '@auspices/eos'
import { Z } from '../../../../util/zIndexes'
import { useHrefs } from '../../../../hooks'
import { ContentEntityHeaderCollectionFragment } from '../../../../generated/types/ContentEntityHeaderCollectionFragment'

export const CONTENT_ENTITY_HEADER_COLLECTION_FRAGMENT = gql`
  fragment ContentEntityHeaderCollectionFragment on Collection {
    id
    name
    slug
  }
`

type ContentEntityHeaderCollectionProps = {
  collection: ContentEntityHeaderCollectionFragment
}

export const ContentEntityHeaderCollection: React.FC<ContentEntityHeaderCollectionProps> = ({
  collection,
  ...rest
}) => {
  const hrefs = useHrefs()
  return (
    <Dropdown
      label={<Truncate title={collection.name}>{collection.name}</Truncate>}
      zIndex={Z.DROPDOWN}
      flex="1"
      {...rest}
    >
      <PaneOption as={Link} to={hrefs.collection(collection.slug)}>
        go to {collection.name}
      </PaneOption>
    </Dropdown>
  )
}
