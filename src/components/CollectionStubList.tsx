import React, { useCallback } from 'react'
import { gql } from 'graphql-tag'
import { useNavigate } from 'react-router'
import { useKeyboardListNavigation } from 'use-keyboard-list-navigation'
import { Stack, StackProps } from '@auspices/eos'
import { useContextualRef, useHrefs } from '../hooks'
import { COLLECTION_STUB_FRAGMENT, CollectionStub } from './CollectionStub'
import { CollectionStubListFragment } from '../generated/graphql'

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
  const navigate = useNavigate()
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
      navigate(hrefs.collection(collection.slug))
    },
    [navigate, hrefs]
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
          highlighted={index === i}
        />
      ))}
    </Stack>
  )
}
