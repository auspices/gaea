import React, { useCallback } from 'react'
import gql from 'graphql-tag'
import { useHistory } from 'react-router'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { Stack, StackProps } from '@auspices/eos'
import { useContextualRef, useHrefs } from '../../hooks'
import {
  COLLECTION_STUB_FRAGMENT,
  CollectionStub,
} from '../../components/CollectionStub'
import { CollectionStubListFragment } from '../../generated/types/CollectionStubListFragment'

export const COLLECTION_STUB_LIST_FRAGMENT = gql`
  fragment CollectionStubListFragment on Collection {
    ...CollectionStubFragment
  }
  ${COLLECTION_STUB_FRAGMENT}
`

export type CollectionStubListProps = StackProps & {
  collections: CollectionStubListFragment[]
}

export const CollectionStubList: React.FC<CollectionStubListProps> = ({
  collections,
  ...rest
}) => {
  const history = useHistory()
  const hrefs = useHrefs()

  const { getContextualRef } = useContextualRef()

  const handleEnter = useCallback(
    ({
      event,
      element: collection,
    }: {
      event: KeyboardEvent
      element: CollectionStubListFragment
    }) => {
      event.preventDefault()
      history.push(hrefs.collection(collection.slug))
    },
    [history, hrefs]
  )

  const { index } = useKeyboardListNavigation({
    ref: getContextualRef('primaryInput'),
    list: collections,
    onEnter: handleEnter,
    waitForInteractive: true,
  })

  return (
    <Stack {...rest}>
      {collections.map((collection, i) => (
        <CollectionStub
          key={collection.id}
          collection={collection}
          selected={index === i}
        />
      ))}
    </Stack>
  )
}
